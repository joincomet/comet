import { ReactElement, Component, RefObject, createRef, ChangeEvent, KeyboardEvent } from 'react'
import * as TenorAPI from "./TenorAPI";
import Client from "./Client";
import Search from "./Search";

export const defaultState = {
  autoComplete: null,
  autoFocus: false,
  page: 0,
  pages: [],
  search: "",
  searching: false,
  suggestions: []
};

const searchDelay = 250;

const keyCodes = {
  Tab: 9,
  ArrowLeft: 37,
  ArrowRight: 39
};

type TenorProps = {
  autoFocus?: boolean;
  base?: string;
  contentRef?: RefObject<HTMLDivElement>;
  defaultResults?: boolean;
  initialSearch?: string;
  onSelect: (result: TenorAPI.Result) => void;
  token: string;
  locale?: string;
  mediaFilter?: string;
  contentFilter?: string;
  searchPlaceholder?: string;
  limit?: number;
};

type TenorState = {
  autoComplete: string | null;
  page: number;
  pages: TenorAPI.SearchResponse[];
  search: string;
  searching: boolean;
  suggestions: string[];
};

type SetState<K extends keyof TenorState> = (
  ((prev: TenorState) => Pick<TenorState, K>) | Pick<TenorState, K>
);

class Tenor extends Component<TenorProps, TenorState> {
  public client: Client;

  public componentIsMounted: boolean;

  public contentRef: RefObject<HTMLDivElement>;

  public inputRef: RefObject<HTMLInputElement>;

  public timeout: ReturnType<typeof setTimeout> | null;

  constructor(props: TenorProps) {
    super(props);

    this.client = this.makeClient();

    this.contentRef = createRef();
    this.inputRef = createRef();

    this.timeout = null;
    this.componentIsMounted = false;

    this.state = {
      ...defaultState,
      search: props.initialSearch || "",
      searching: !!(props.initialSearch || props.defaultResults)
    };
  }

  componentDidMount(): void {
    const { autoFocus, initialSearch, defaultResults } = this.props;

    this.componentIsMounted = true;
    window.addEventListener("keydown", this.handleWindowKeyDown);
    window.addEventListener("click", this.handleWindowClick);

    if (initialSearch) {
      this.fetchAutoComplete(initialSearch);
      this.fetchSuggestions(initialSearch);
    }

    if (initialSearch || defaultResults) {
      this.performSearch(initialSearch || "");
    }

    if (autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps: TenorProps): void {
    const { base, token, locale, mediaFilter, contentFilter, defaultResults, limit } = this.props;

    if (
      base !== prevProps.base
      || token !== prevProps.token
      || locale !== prevProps.locale
      || mediaFilter !== prevProps.mediaFilter
      || contentFilter !== prevProps.contentFilter
      || defaultResults !== prevProps.defaultResults
      || limit !== prevProps.limit
    ) {
      this.client = this.makeClient();
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("click", this.handleWindowClick);
    window.removeEventListener("keydown", this.handleWindowKeyDown);
    this.componentIsMounted = false;
  }

  fetchAutoComplete = (currentSearch: string): Promise<void> => (
    this.client.autocomplete(currentSearch).then(({ results: [autoComplete] }) => {
      const { search } = this.state;

      if (search === currentSearch) {
        this.mountedSetState({ autoComplete });
      }
    })
  );

  fetchSuggestions = (currentSearch: string): Promise<void> => (
    this.client.suggestions(currentSearch).then(({ results: suggestions }) => {
      const { search } = this.state;

      if (search === currentSearch) {
        this.mountedSetState({ suggestions });
      }
    })
  );

  handleWindowClick = (event: MouseEvent): void => {
    const { contentRef } = this.props;
    const { search } = this.state;

    if (!search) {
      return;
    }

    const container = (contentRef || this.contentRef).current;
    if (container && (event.target instanceof Element) && container.contains(event.target)) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState(defaultState);
  };

  handleWindowKeyDown = (event: KeyboardEvent): void => {
    const { contentRef } = this.props;
    const container = (contentRef || this.contentRef).current;

    if (
      (container && (event.target instanceof Element) && !container.contains(event.target))
      || ([keyCodes.ArrowLeft, keyCodes.ArrowRight].indexOf(event.keyCode) === -1)
      || !event.metaKey
    ) {
      return;
    }

    event.preventDefault();

    if (event.keyCode === keyCodes.ArrowLeft) {
      this.handlePageLeft();
    } else {
      this.handlePageRight();
    }
  };

  handlePageLeft = (): void => {
    this.setState(({ page }) => ({ page: page === 0 ? 0 : page - 1 }));
  };

  handlePageRight = (): Promise<void> => {
    const { defaultResults } = this.props;
    const {
      page,
      pages,
      search,
      searching
    } = this.state;

    if ((!defaultResults && !search) || searching) {
      return Promise.resolve();
    }

    if (page < pages.length - 1) {
      this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }));
      return Promise.resolve();
    }

    return this.client.search(search, pages[page].next)
      .then((nextPage: TenorAPI.SearchResponse) => {
        if (nextPage.results) {
          this.mountedSetState(({ page: prevPage, pages: prevPages }) => ({
            page: prevPage + 1,
            pages: prevPages.concat([nextPage]),
            searching: false
          }));
        }
      }).catch(() => {
        this.mountedSetState({ searching: false });
      });
  };

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { defaultResults } = this.props;
    const search = event.target.value;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!search.length) {
      if (defaultResults) {
        this.setState({ ...defaultState, searching: true });
        this.performSearch(search);
      } else {
        this.setState(defaultState);
      }
      return;
    }

    this.setState({ autoComplete: null, search, searching: true });
    this.fetchAutoComplete(search);
    this.fetchSuggestions(search);
    this.timeout = setTimeout(() => this.performSearch(search), searchDelay);
  };

  handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const { autoComplete, search: prevSearch } = this.state;

    if (event.keyCode !== keyCodes.Tab || !autoComplete || !prevSearch) {
      return;
    }

    const lowerAutoComplete = autoComplete.toLowerCase();
    const lowerSearch = prevSearch.toLowerCase().replace(/\s/g, "");

    if (lowerAutoComplete === lowerSearch) {
      return;
    }

    event.preventDefault();

    const typeahead = lowerAutoComplete.replace(lowerSearch, "");
    const search = `${prevSearch}${typeahead}`;

    this.setState({ autoComplete: null, search, searching: true });
    this.fetchSuggestions(search);
    this.performSearch(search);
  };

  handleSuggestionClick = (suggestion: string): void => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ search: suggestion, searching: true });
    this.performSearch(suggestion);
  };

  performSearch = (search: string): Promise<void> => {
    if (!this.componentIsMounted) {
      return Promise.resolve();
    }

    return this.client.search(search).then(page => {
      this.mountedSetState({ page: 0, pages: [page], searching: false });
    }).catch(() => {
      this.mountedSetState({ searching: false });
    });
  };

  mountedSetState = <K extends keyof TenorState>(state: SetState<K>): void => {
    if (this.componentIsMounted) {
      this.setState<K>(state);
    }
  };

  makeClient(): Client {
    const { base, token, locale, mediaFilter, contentFilter, defaultResults, limit } = this.props;

    return new Client({
      base,
      token,
      locale,
      mediaFilter,
      contentFilter,
      defaultResults,
      limit
    });
  }

  focus(): void {
    const input = this.inputRef.current;

    if (input) {
      input.focus();
    }
  }

  render(): ReactElement {
    const { contentRef, onSelect, searchPlaceholder } = this.props;
    const {
      autoComplete, page, pages, search, searching, suggestions
    } = this.state;

    return (
      <Search
        autoComplete={autoComplete}
        contentRef={contentRef || this.contentRef}
        inputRef={this.inputRef}
        onPageLeft={this.handlePageLeft}
        onPageRight={this.handlePageRight}
        onSearchChange={this.handleSearchChange}
        onSearchKeyDown={this.handleSearchKeyDown}
        onSuggestionClick={this.handleSuggestionClick}
        onSelect={onSelect}
        results={pages[page] ? pages[page].results : []}
        search={search}
        searching={searching}
        suggestions={suggestions}
        placeholder={searchPlaceholder}
      />
    );
  }
}

export default Tenor;

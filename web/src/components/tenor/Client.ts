import * as TenorAPI from "./TenorAPI";

type Query = {
  [key: string]: string | number | undefined;
};

export const stringify = (query: Query): string => {
  const keyValuePairs: string[] = [];

  Object.keys(query).forEach(key => {
    if (query[key] !== undefined) {
      keyValuePairs.push(`${key}=${query[key]}`);
    }
  });

  return encodeURI(`?${keyValuePairs.join("&")}`);
};

const fetch = (
  <T extends Record<string, unknown>>(base: string, path: string, query: Query): Promise<T> => (
    new Promise((resolve, reject) => {
      console.log('fetch')
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.responseText));
        }
      };

      xhr.open("GET", `${base}${path}${stringify(query)}`);
      xhr.send();
    })
  )
);

type ClientOptions = {
  base?: string;
  token?: string;
  locale?: string;
  contentFilter?: string;
  mediaFilter?: string;
  defaultResults?: boolean;
  limit?: number;
};

class Client {
  public base: string;

  public token: string;

  private locale: string;

  private contentFilter: string;

  private mediaFilter: string;

  private defaultResults: boolean;

  private limit: number;

  constructor(opts: ClientOptions) {
    this.base = opts.base || "https://g.tenor.com/v1";
    this.token = opts.token || "LIVDSRZULELA";
    this.locale = opts.locale || "en_US";
    this.contentFilter = opts.contentFilter || "mild";
    this.mediaFilter = opts.mediaFilter || "minimal";
    this.defaultResults = opts.defaultResults || false;
    this.limit = opts.limit || 12;
  }

  autocomplete(search: string): Promise<TenorAPI.AutocompleteResponse> {
    return fetch<TenorAPI.AutocompleteResponse>(this.base, "/autocomplete", {
      key: this.token,
      q: search,
      limit: 1,
      locale: "en_US"
    });
  }

  search(search: string, pos?: string): Promise<TenorAPI.SearchResponse> {
    const searchQuery = (this.defaultResults && !search) ? "/trending" : "/search";

    return fetch<TenorAPI.SearchResponse>(this.base, searchQuery, {
      key: this.token,
      q: search,
      limit: this.limit,
      locale: this.locale,
      contentfilter: this.contentFilter,
      media_filter: this.mediaFilter,
      ar_range: "all",
      pos
    });
  }

  suggestions(search: string): Promise<TenorAPI.SuggestionsResponse> {
    return fetch<TenorAPI.SuggestionsResponse>(this.base, "/search_suggestions", {
      key: this.token,
      q: search,
      limit: 5,
      locale: this.locale
    });
  }
}

export default Client;

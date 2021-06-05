import { Component, ReactElement } from 'react'
import * as TenorAPI from "./TenorAPI";

const BASE = "https://tenor.com/view/";

type ResultProps = {
  onSelect: (result: TenorAPI.Result) => void;
  result: TenorAPI.Result;
};

type ResultState = {
  loaded: boolean;
};

class Result extends Component<ResultProps, ResultState> {
  private componentIsMounted: boolean;

  public image: HTMLImageElement;

  constructor(props: ResultProps) {
    super(props);

    this.componentIsMounted = false;
    this.image = new Image();

    this.state = { loaded: false };
  }

  componentDidMount(): void {
    this.componentIsMounted = true;

    const { result } = this.props;

    this.image.src = result.media[0].tinygif.url;
    this.image.onload = () => {
      if (this.componentIsMounted) {
        this.setState({ loaded: true });
      }
    };
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  getLabel(): string {
    const { result: { itemurl } } = this.props;

    return itemurl.replace(BASE, "").replace(/-gif-\d+$/, "").replace(/-/g, " ");
  }

  handleClick = (): void => {
    const { result, onSelect } = this.props;

    onSelect(result);
  };

  render(): ReactElement {
    const { loaded } = this.state;

    return (
      <button
        aria-label={this.getLabel()}
        type="button"
        onClick={this.handleClick}
        className="react-tenor--result"
      >
        {loaded && <span style={{ backgroundImage: `url(${this.image.src})` }} />}
      </button>
    );
  }
}

export default Result;

type MediaType = {
  preview: string;
  url: string;
  dims: number[];
  size: number;
};

type Media = {
  tinygif: MediaType;
  gif: MediaType;
  mp4: MediaType;
};

export type Result = {
  created: number;
  hasaudio: boolean;
  id: string;
  media: Media[];
  tags: string[];
  itemurl: string;
  hascaption: boolean;
  url: string;
};

export type AutocompleteResponse = {
  results: string[];
};

export type SearchResponse = {
  next?: string;
  results: Result[];
};

export type SuggestionsResponse = {
  results: string[];
};

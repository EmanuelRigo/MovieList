export interface Movie {
  title: string;
  release_date: string;
  backdrop_path: string;
  formats: {
    vhs: boolean; dvd: boolean; bluray: boolean;
  };
}

export interface LocalMovie {
  _id: {
    _id: string;
    title: string;
    checked: boolean;
    formats: {
      dvd: boolean;
    };
  };
}

export interface Movie {
  title: string;
  release_date: string;
  backdrop_path: string;
  _id: {
    title: string;
    _id: string;
  };
}

export interface MovieDB {
  _id: { title: string; release_date: string; backdrop_path: string; _id: string; poster_path: string;
    overview: string
   };

  formats: {
    vhs: boolean;
    dvd: boolean;
    bluray: boolean;
  };
  checked: boolean;
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

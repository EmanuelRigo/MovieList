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
  _id: {
    $oid: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    _id: string;
    poster_path: string;
    overview: string;
    genres: {
      id: number;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    belongs_to_collection?: {
      id: number;
      name: string;
      poster_path: string | null;
      backdrop_path: string | null;
    };
    budget: number;
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    popularity: number;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
      _id: {
        $oid: string;
      };
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    status: string;
    tagline: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    createdAt: {
      $date: string;
    };
    updatedAt: {
      $date: string;
    };
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

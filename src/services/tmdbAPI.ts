type ID = string | number;

type MediaType = "movie" | "tv" | "person" | "all";
type GenderData = 0 | 1 | 2;
type GenreItem = {
  id: ID;
  name: string;
};

type CountryItem = {
  iso_3166_1: string;
  name: string;
};

type LanuageItem = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  UNKNOWN = 2,
}

type TmdbPaginated<T> = {
  page: number;
  results: T[];
};

type Maybe<T> = T | null;

type Node = {
  id: ID;
};

type AdultDetails = {
  adult: boolean;
};

type VoteDetails = {
  vote_count: number;
  vote_average: number;
};

type PopularityDetails = {
  popularity: number;
};

type PersonResult = Node &
  AdultDetails &
  PopularityDetails & {
    also_known_as: string[];
    biography: Maybe<string>;
    birthday: Maybe<string>;
    deathday: Maybe<string>;
    gender: GenderData;
    homepage: Maybe<string>;
    imdb_id: ID;
    known_for_department: string;
    name: string;
    place_of_birth: Maybe<string>;
    profile_path: Maybe<string>;
  };

type MovieResult = Node &
  AdultDetails &
  PopularityDetails &
  VoteDetails & {
    backdrop_path: string;
    belongs_to_collection: Maybe<ID>;
    budget: number;
    genres: GenreItem[];
    homepage: string;
    imdb_id: ID;
    original_language: string;
    original_title: string;
    overview: Maybe<string>;
    poster_path: string;
    production_companies: CompanyItemResult[];
    production_countries: CountryItem[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: LanuageItem[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
  };

type MovieExternalIdsResult = Node & {
  imdb_id: ID;
  wikidata_id: Maybe<ID>;
  facebook_id: Maybe<ID>;
  instagram_id: Maybe<ID>;
  twitter_id: Maybe<ID>;
};

type MovieReleaseDateResults = Node & {
  results: Array<{
    iso_3166_1: string;
    release_dates: ReleaseDateItem[];
  }>;
};

type TvResult = Node &
  PopularityDetails &
  VoteDetails & {
    adult: boolean;
    backdrop_path: Maybe<string>;
    created_by: CreatorPerson[];
    episode_run_time: number[];
    first_air_date: string;
    genres: GenreItem[];
    homepage: Maybe<string>;
    id: ID;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: EpisodeItemResult;
    name: string;
    next_episode_to_air: Maybe<EpisodeItemResult>;
    networks: NetworkItemResult[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: Maybe<string>;
    poster_path: Maybe<string>;
    production_companies: CompanyItemResult[];
    production_countries: CountryItem[];
    seasons: SeasonItemResult[];
    spoken_languages: LanuageItem[];
    status: string;
    tagline: string;
    type: string;
  };

type CreditsResult = {
  cast: CastPerson[];
  crew: CrewPerson[];
};

type TvOrMovieImagesResult = {
  backdrops: ImageItemResult[];
  logos: ImageItemResult[];
  posters: ImageItemResult[];
};

type TvExternalIdsResult = Node & {
  imdb_id: ID;
  freebase_mid: ID;
  freebase_id: ID;
  tvdb_id: ID;
  tvrage_id: ID;
  wikidata_id: ID;
  facebook_id: ID;
  instagram_id: ID;
  twitter_id: ID;
};

type TvContentRatingResult = Node & {
  results: ContentRatingsItem[];
};

type ContentRatingsItem = {
  descriptors: string[];
  iso_6166_1: string;
  rating: string;
};

type MediaItemResult = VoteDetails &
  PopularityDetails &
  AdultDetails &
  Node & {
    media_type: MediaType;
  };

type ReleaseDateItem = Node & {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

type CompanyItemResult = Node & {
  logo_path: Maybe<string>;
  name: string;
  origin_country: string;
};

type NetworkItemResult = Node & {
  logo_path: Maybe<string>;
  name: string;
  origin_country: string;
};

type SeasonItemResult = Node &
  Pick<VoteDetails, "vote_average"> & {
    air_date: string;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: Maybe<string>;
    season_number: number;
  };

type EpisodeItemResult = Node &
  VoteDetails & {
    name: string;
    overview: Maybe<string>;
    air_date: string;
    episode_number: number;
    production_code: Maybe<string>;
    runtime: number;
    season_number: number;
    show_id: ID;
    still_path: Maybe<string>;
  };

type TVItemResult = MediaItemResult & {
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: "tv";
  genre_ids: ID[];
  first_air_date: string;
  origin_country: string[];
};

type PersonItemResult = MediaItemResult &
  Pick<PersonResult, "name" | "known_for_department" | "gender"> & {
    original_name: string;
    media_type: "person";
    profile_path: string;
    known_for: TVItemResult[];
  };

type MovieItemResult = MediaItemResult & {
  backdrop_path: string;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie";
  genre_ids: ID[];
  release_date: string;
  video: boolean;
};

type ImageItemResult = VoteDetails & {
  aspect_ratio: number;
  height: number;
  iso_639_1: Maybe<string>;
  file_path: string;
  width: string;
};

type VideoItemResult = Node & {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

type CastPerson = Pick<
  PersonResult,
  | "id"
  | "name"
  | "known_for_department"
  | "profile_path"
  | "popularity"
  | "adult"
> & {
  original_name: string;
  character: string;
  credit_id: ID;
  order: number;
};

type CrewPerson = Pick<
  PersonResult,
  | "id"
  | "adult"
  | "gender"
  | "known_for_department"
  | "name"
  | "popularity"
  | "profile_path"
> & {
  credit_id: ID;
  department: string;
  job: string;
};

type CreatorPerson = Pick<
  PersonItemResult,
  "name" | "profile_path" | "gender" | "id" | "original_name"
> & {
  credit_id: ID;
};

/**
 * API url
 */
const TMDB_API_URL = "https://api.themoviedb.org/3";

const TMDB_API_PARAMS = {
  api_key: "73e6f6e34b28a4c3be0f745176c8225b", // import.meta.env.VITE_API_KEY
  // language: process.env.API_LANG
};

/**
 * Different types of lists
 */
const LISTS = {
  MOVIE: [
    { TITLE: "Trending Movies", QUERY: "trending" },
    { TITLE: "Popular Movies", QUERY: "popular" },
    { TITLE: "Top Rated Movies", QUERY: "top_rated" },
    { TITLE: "Upcoming Movies", QUERY: "upcoming" },
    { TITLE: "Now Playing Movies", QUERY: "now_playing" },
  ],
  TV: [
    { TITLE: "Trending TV Shows", QUERY: "trending" },
    { TITLE: "Popular TV Shows", QUERY: "popular" },
    { TITLE: "Top Rated TV Shows", QUERY: "top_rated" },
    { TITLE: "Currently Airing TV Shows", QUERY: "on_the_air" },
    { TITLE: "TV Shows Airing Today", QUERY: "airing_today" },
  ],
};

async function fetchTMD<T>(
  url: string,
  params: Record<string, string | number | undefined> = {}
): Promise<T> {
  "use server";
  let u = new URL(TMDB_API_URL + "/" + url);
  u.searchParams.set("api_key", TMDB_API_PARAMS.api_key);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== void 0) {
      u.searchParams.set(key, `${value}`);
    }
  });
  const response = await fetch(u);
  if (!response.ok) {
    console.error(url);
    throw new Error(response.statusText);
  }
  return await response.json();
}

/**
 * Get list item
 */

function getListItem(type: "movie" | "tv", query: string) {
  if (type === "movie") {
    return LISTS.MOVIE.find((list) => list.QUERY === query);
  } else if (type === "tv") {
    return LISTS.TV.find((list) => list.QUERY === query);
  }
}

/**
 * Get movies (listing)
 */

function getMovies(query: string, page = 1) {
  return fetchTMD(`movie/${query}`, { page });
}

/**
 * Get movie (single)
 */

function getMovie(id: ID) {
  return fetchTMD<
    MovieResult & {
      videos: { results: VideoItemResult[] };
      credits: CreditsResult;
      images: TvOrMovieImagesResult;
      external_ids: MovieExternalIdsResult;
      release_dates: MovieReleaseDateResults;
    }
  >(`movie/${id}`, {
    append_to_response: "videos,credits,images,external_ids,release_dates",
    include_image_language: "en",
  });
}

/**
 * Get movie recommended (single)
 */

function getMovieRecommended(id: ID, page = 1) {
  return fetchTMD(`movie/${id}/recommendations`, { page });
}

/**
 * Get TV shows (listing)
 */

function getTvShows(query: string, page = 1) {
  return fetchTMD(`tv/${query}`, { page });
}

/**
 * Get TV show (single)
 */

function getTvShow(id: ID) {
  return fetchTMD<
    TvResult & { videos: { results: VideoItemResult[] } } & {
      credits: CreditsResult;
    } & {
      images: TvOrMovieImagesResult;
    } & {
      external_ids: TvExternalIdsResult;
    } & {
      content_ratings: TvContentRatingResult;
    }
  >(`tv/${id}`, {
    append_to_response: "videos,credits,images,external_ids,content_ratings",
    include_image_language: "en",
  });
}

/**
 * Get TV show recommended (single)
 */

function getTvShowRecommended(id: string | number, page = 1) {
  return fetchTMD(`tv/${id}/recommendations`, { page });
}

/**
 * Get TV show episodes from season (single)
 */

function getTvShowEpisodes(id: string | number, season: string) {
  return fetchTMD(`tv/${id}/season/${season}`);
}

/**
 * Get trending
 */

function getTrending<T extends MediaType>(media: T, page = 1) {
  return fetchTMD<
    TmdbPaginated<
      T extends "tv"
        ? TVItemResult
        : T extends "movie"
        ? MovieItemResult
        : T extends "person"
        ? PersonItemResult
        : T extends "all"
        ? TVItemResult | MovieItemResult | PersonItemResult
        : never
    >
  >(`trending/${media}/week`, { page });
}

/**
 * Discover media by genre
 */

function getMediaByGenre(media: string, genre: string, page = 1) {
  return fetchTMD(`discover/${media}`, {
    with_genres: genre,
    page,
  });
}

/**
 * Get credits
 */

function getCredits(id: string | number, type: string) {
  return fetchTMD(`person/${id}/${type}`);
}

/**
 * Get genre list
 */

function getGenreList(media: string) {
  return fetchTMD<any>(`genre/${media}/list`, { language: undefined }).then(
    (res) => res.genre
  );
}

/**
 * Get person (single)
 */

function getPerson(id: string | number) {
  return fetchTMD(`person/${id}`, {
    append_to_response: "images,combined_credits,external_ids",
    include_image_language: "en",
  });
}

/**
 * Search (searches movies, tv and people)
 */

function search(query: string, page = 1) {
  return fetchTMD("search/multi", { query, page });
}

/**
 * Get YouTube video info
 */

function getYouTubeVideo(id: string | number) {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("key", process.env.API_YOUTUBE_KEY || "");
  url.searchParams.set("id", `${id}`);
  url.searchParams.set("part", "contentDetails");
  return fetch(url);
}

export {
  getListItem,
  getMovies,
  getMovie,
  getMovieRecommended,
  getTvShows,
  getTvShow,
  getTvShowRecommended,
  getTvShowEpisodes,
  getTrending,
  getMediaByGenre,
  getCredits,
  getGenreList,
  getPerson,
  search,
  getYouTubeVideo,
};

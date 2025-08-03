export interface Movie {
    id: number;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
  poster_path: string | null;
  tagline: string | null;
  status: string;
  homepage: string | null;
}

import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
if (!API_KEY) { throw new Error('TMDB API key is not defined in environment variables');}
const BASE_URL = 'https://api.themoviedb.org/3';
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
}

interface SearchResponse {
  results: Movie[];
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const params = {
    api_key: API_KEY,
    query: query,
  };
  const response = await axios.get<SearchResponse>(`${BASE_URL}/search/movie`, { params });
  return response.data.results;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const params = {
    api_key: API_KEY,
  };
  const response = await axios.get<MovieDetails>(`${BASE_URL}/movie/${movieId}`, { params });
  return response.data;
}

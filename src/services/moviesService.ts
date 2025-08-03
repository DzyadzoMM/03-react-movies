import axios from "axios";
import { Movie } from "../types/movie";

interface fetchMoviesProps {
  results: Movie[];
}

export async function fetchMovies (query: string): Promise<Movie[]> {

    const response = await axios.get<fetchMoviesProps>("https://api.themoviedb.org/3/search/movie", {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    }
  )
   return response.data.results;
}
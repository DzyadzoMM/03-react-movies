import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import * as moviesApi from '../../services/moviesService';

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

export default function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await moviesApi.fetchMovies(query);
        setMovies(results);

        if (results.length === 0) {
          toast.error('No movies found for your request.');
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setMovies([]);
  };

  const handleMovieSelect = async (movieId: number) => {
    try {
      const movieDetails = await moviesApi.getMovieDetails(movieId);
      setSelectedMovie(movieDetails);
    } catch (err) {
      toast.error('Failed to fetch movie details.');
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  let content: JSX.Element | null = null;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorMessage />;
  } else if (movies.length > 0) {
    content = <MovieGrid onSelect={handleMovieSelect} movies={movies} />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      <main>
        {content}
      </main>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </>
  );
}

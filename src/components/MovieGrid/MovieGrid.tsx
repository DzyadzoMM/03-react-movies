import css from './MovieGrid.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieGridProps {
  onSelect: (id: number) => void;
  movies: Movie[];
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';

export default function MovieGrid({ onSelect, movies }: MovieGridProps): JSX.Element | null {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie.id)}>
            <img
              className={css.image}
              src={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE}
              alt={movie.title || 'Movie poster'}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

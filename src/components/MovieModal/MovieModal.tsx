import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';

const modalRoot = document.querySelector('#modal-root') as Element;

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
}

interface MovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/1280x720?text=No+Image';

export default function MovieModal({ movie, onClose }: MovieModalProps): JSX.Element {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { title, overview, release_date, vote_average, backdrop_path } = movie;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${backdrop_path}` : PLACEHOLDER_IMAGE}
          alt={title || 'movie_title'}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average ? `${vote_average.toFixed(1)}/10` : 'N/A'}
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

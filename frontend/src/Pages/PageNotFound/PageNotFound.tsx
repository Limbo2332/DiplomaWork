import './PageNotFound.scss';
import { IconButton } from '@mui/joy';
import { useNavigate } from 'react-router';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PageNotFoundProps {
  text: string;
}

const PageNotFound = ({
  text,
}: PageNotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className="main d-flex h-100 w-100 flex-column justify-content-center align-items-center">
      <h1 className="header-not-found">404</h1>
      <h2 className="fw-bold text-not-found">{text}</h2>
      <IconButton
        size="lg"
        color="primary"
        variant="solid"
        onClick={() => navigate('/')}
        className="mt-4"
      >
        <div className="d-flex justify-content-center align-items-center gap-2">
          <p className="mb-0 fs-5 p-3">Повернутись на головну сторінку.</p>
          <FontAwesomeIcon icon={faLocationArrow} size="xl" className="p-2" />
        </div>
      </IconButton>
    </div>
  );
};

export default PageNotFound;
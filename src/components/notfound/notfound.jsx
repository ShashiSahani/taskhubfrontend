import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-ligter">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-dark">404</h1>
        <p className="text-xl text-secondary-dark mt-4">
         {` Oops! The page you're looking for doesn't exist.`}
        </p>
        <p className="text-lg text-secondary-dark mt-2">
         {` Maybe you can find what you're looking for by going back to the`}{' '}
          <span className="flex items-center justify-center">
            <Link to="/" className="text-primary hover:text-primary-dark flex items-center">
              <HomeIcon className="mr-2" /> Home Page
            </Link>
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;

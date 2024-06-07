import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Link to="/classroom">
        <button>Assign Homework</button>
      </Link>
    </div>
  );
};

export default HomePage;

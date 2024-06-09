import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <p className="text-5xl">Class Grade: K1</p>

      <div className={styles.btnContainer}>
        <Link to="/classroom">
          <button>Assign Homework</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

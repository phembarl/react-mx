import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <span className={styles.navTitle}>Professor Dashboard</span>
      </Link>
    </nav>
  );
};

export default Navbar;

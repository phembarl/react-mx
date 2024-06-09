import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <span className={styles.navTitle}>Professor Dashboard</span>
      </Link>

      <Icon icon="el:user" width="30" height="30" />
    </nav>
  );
};

export default Navbar;

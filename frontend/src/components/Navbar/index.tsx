import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1 className={styles.navTitle}>Professor Dashboard</h1>
      </Link>

      <Icon icon="el:user" width="30" height="30" />
    </nav>
  );
};

export default Navbar;

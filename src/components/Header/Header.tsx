import rocketLogo from 'assets/rocket.svg';

import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} />
      <p className={styles.appName}>
        <span className={styles.to}>to</span>
        <span className={styles.do}>do</span>
      </p>
    </header>
  );
};

export default Header;

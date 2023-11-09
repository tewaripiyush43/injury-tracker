import styles from "./Navbar.module.css";
import Links from "./Links";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <h2 className={styles.navbarTitle}>Injury Tracker</h2>
        <Links />
      </div>
    </nav>
  );
}

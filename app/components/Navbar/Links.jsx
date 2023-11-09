"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
export default function Links() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        ☰
      </div>
      <div
        className={`${styles.navbarLinkContainer} ${
          menuOpen ? styles.showMenu : ""
        }`}
      >
        <Link className={styles.navbarLink} href="/">
          Create Report
        </Link>
        <Link className={styles.navbarLink} href="/reports">
          Reports
        </Link>
      </div>
    </>
  );
}

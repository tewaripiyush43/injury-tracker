"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useContext, useEffect } from "react";
import { StoreContext } from "@/app/context/Store";

export default function Links() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, logout } = useContext(StoreContext);

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
        {userData ? (
          <Link
            onClick={() => logout()}
            className={`${styles.navbarLink} ${styles.navbarLogin}`}
            href="/api/auth/logout"
          >
            Logout
          </Link>
        ) : (
          <Link
            className={`${styles.navbarLink} ${styles.navbarLogin}`}
            href="/api/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}

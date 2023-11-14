"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext, useEffect } from "react";
import { StoreContext } from "@/app/context/Store";

export default function Links() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, login, logout } = useContext(StoreContext);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user]);

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
        {isLoading ? (
          <span className={styles.navbarLink}>Loading..</span>
        ) : user ? (
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

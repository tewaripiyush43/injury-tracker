"use client";
import ReportList from "./components/ReportList";
import styles from "./page.module.css";
import { useContext } from "react";
import { StoreContext } from "@/app/context/Store";

export default function page() {
  const { userData, logout, isLoading } = useContext(StoreContext);

  if (isLoading) {
    return (
      <div className={styles.reportsPage}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.reportsPage}>
      <h1>Reports</h1>

      {userData ? (
        <ReportList />
      ) : (
        <div>
          <p>Please login to see reports</p>
        </div>
      )}
    </div>
  );
}

// actions.js
"use client";
import { useState } from "react";
import styles from "./ReportList.module.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

export function Actions(text, record) {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleDelete = () => {
    console.log("Item deleted!");
    setDeletePopupOpen(false);
  };

  return (
    <span className={styles.tableActions}>
      <button className={styles.view}>View</button>
      <button className={styles.update}>Update</button>
      <button
        className={styles.delete}
        onClick={() => setDeletePopupOpen(true)}
      >
        Delete
      </button>
      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setDeletePopupOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </span>
  );
}

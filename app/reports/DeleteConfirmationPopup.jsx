import React from "react";
import styles from "./DeleteConfirmationPopup.module.css";

export default function DeleteConfirmationPopup({ onClose, onDelete }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Are you sure you want to delete this item?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.delete} onClick={onDelete}>
            Delete
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

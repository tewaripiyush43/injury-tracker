// actions.js
"use client";
import { useState } from "react";
import styles from "./ReportList.module.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { DELETE_INJURY_REPORT } from "@/app/api/graphql/queries";

export function Actions({ reportId, onDelete }) {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteInjuryReport, { data: mutationData }] =
    useMutation(DELETE_INJURY_REPORT);

  const handleDelete = async () => {
    // console.log("Item deleted!");
    setDeletePopupOpen(false);
    await deleteInjuryReport({
      variables: { id: reportId },
    });
    onDelete();
  };

  return (
    <span className={styles.tableActions}>
      <Link href={`/reports/${reportId}`} className={styles.view}>
        View
      </Link>
      <Link
        href={""}
        className={styles.delete}
        onClick={() => setDeletePopupOpen(true)}
      >
        Delete
      </Link>
      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setDeletePopupOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </span>
  );
}

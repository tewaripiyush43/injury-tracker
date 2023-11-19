// actions.js
"use client";
import { useState } from "react";
import styles from "./ReportList.module.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import Link from "next/link";
export const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
import { useMutation } from "@apollo/client";
import { DELETE_INJURY_REPORT } from "@/app/api/graphql/queries";

export function Actions({ reportId }) {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteInjuryReport, { data: mutationData }] =
    useMutation(DELETE_INJURY_REPORT);

  const handleDelete = () => {
    console.log("Item deleted!");
    setDeletePopupOpen(false);
    deleteInjuryReport({
      variables: { id: reportId },
    });
  };

  return (
    <span className={styles.tableActions}>
      <Link href={`${BASE_URL}/reports/${reportId}`} className={styles.view}>
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

import styles from "./ReportList.module.css";

import { Actions } from "./Actions";

export default async function ReportList() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeading}>Reporter Name</th>
            <th className={styles.tableHeading}>Report Date</th>
            <th className={styles.tableHeading}>Injury Date & Time</th>
            <th className={styles.tableHeading}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>John Doe</td>
            <td className={styles.tableData}>2023-11-06</td>
            <td className={styles.tableData}>2023-10-25 15:30</td>
            <td className={styles.tableData}>
              <Actions />
            </td>
          </tr>{" "}
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>John Doe</td>
            <td className={styles.tableData}>2023-11-06</td>
            <td className={styles.tableData}>2023-10-25 15:30</td>
            <td className={styles.tableData}>
              <Actions />
            </td>
          </tr>{" "}
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>John Doe</td>
            <td className={styles.tableData}>2023-11-06</td>
            <td className={styles.tableData}>2023-10-25 15:30</td>
            <td className={styles.tableData}>
              <Actions />
            </td>
          </tr>{" "}
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>John Doe</td>
            <td className={styles.tableData}>2023-11-06</td>
            <td className={styles.tableData}>2023-10-25 15:30</td>
            <td className={styles.tableData}>
              <Actions />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import ReportList from "./ReportList";
import styles from "./page.module.css";

const page = async () => {
  return (
    <div className={styles.reportsPage}>
      <h1>Reports</h1>

      <ReportList />
    </div>
  );
};

export default page;

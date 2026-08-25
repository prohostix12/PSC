import AdminNavbar from "../components/AdminNavbar";
import EnquiriesTable from "../components/EnquiriesTable";
import styles from "./page.module.css";

export default function AdminPanel() {
  return (
    <div className={styles.page}>
      <AdminNavbar />
      <EnquiriesTable />
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Project Dashboard</h1>
      <p className={styles.subtitle}>
        Manage your projects, milestones, and notifications easily.
      </p>

      <div className={styles.links}>
        <Link to="/projects" className={styles.btnPrimary}>
          View Projects
        </Link>
        <Link to="/notifications" className={styles.btnSecondary}>
          View Notifications
        </Link>
      </div>
    </div>
  );
}

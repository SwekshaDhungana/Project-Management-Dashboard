import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

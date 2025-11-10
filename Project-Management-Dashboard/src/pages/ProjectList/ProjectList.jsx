import styles from "./ProjectList.module.css";

export default function ProjectList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Project List Page</h2>
      <p className={styles.subtitle}>All your projects will appear here.</p>
    </div>
  );
}

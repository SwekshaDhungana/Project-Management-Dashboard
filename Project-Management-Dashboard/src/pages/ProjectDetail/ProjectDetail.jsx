import styles from "./ProjectDetail.module.css";

export default function ProjectDetail() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Project Detail Page</h2>
      <p className={styles.text}>
        Details for the selected project will appear here.
      </p>
    </div>
  );
}

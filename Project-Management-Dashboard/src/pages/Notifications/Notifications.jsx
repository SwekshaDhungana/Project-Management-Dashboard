import styles from "./Notifications.module.css";

export default function Notifications() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications</h2>
      <p className={styles.text}>
        You’ll see browser and project updates here.
      </p>
    </div>
  );
}

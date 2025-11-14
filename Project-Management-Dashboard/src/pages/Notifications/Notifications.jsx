import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import styles from "./Notifications.module.css";
import BackButton from "../../components/BackButton/BackButton";

export default function Notifications() {
  const { notifications, markAsSeen } = useNotifications();
  const navigate = useNavigate();

  function handleClick(n) {
    markAsSeen(n.id);
    navigate(`/projects/${n.ref.projectId}`);
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <h2 className={styles.title}>Notifications</h2>

      {notifications.length === 0 && (
        <p className={styles.empty}>No notifications yet</p>
      )}

      <div className={styles.list}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`${styles.item} ${n.seen ? styles.seen : ""}`}
            onClick={() => handleClick(n)}
          >
            <p>{n.message}</p>
            <span className={styles.project}>{n.projectName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

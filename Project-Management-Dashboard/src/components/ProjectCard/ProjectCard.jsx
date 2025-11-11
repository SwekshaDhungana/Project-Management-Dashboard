import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  const progress =
    project.milestones.length > 0
      ? (() => {
          const tasks = project.milestones.flatMap((m) => m.tasks || []);
          console.log(tasks, "tasks");
          const completed = tasks.filter(
            (t) => t.status === "completed"
          ).length;

          console.log(completed, "completed");
          return tasks.length
            ? Math.round((completed / tasks.length) * 100)
            : 0;
        })()
      : 0;

  const spentPercent = Math.min(
    Math.round((project.resources.spent / project.resources.budget) * 100),
    100
  );

  return (
    <Link to={`/projects/${project.id}`} className={styles.card}>
      <h3 className={styles.name}>{project.name}</h3>
      <p>
        <strong>Department:</strong> {project.department}
      </p>
      <p>
        <strong>Owner:</strong> {project.owner.name}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={styles.progressText}>Progress: {progress}%</p>

      <div className={styles.budgetBar}>
        <div
          className={styles.budgetFill}
          style={{ width: `${spentPercent}%` }}
        ></div>
      </div>
      <p className={styles.progressText}>Budget used: {spentPercent}%</p>
    </Link>
  );
}

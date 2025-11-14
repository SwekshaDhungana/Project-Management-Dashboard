import { useParams, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { getProjects, saveProjects } from "../../data/projects";
import { useNotifications } from "../../context/NotificationContext";
import styles from "./ProjectDetail.module.css";
import DocumentViewer from "../../components/DocumentViewer/DocumentViewer";
import BackButton from "../../components/BackButton/BackButton";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [openDoc, setOpenDoc] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const allProjects = getProjects();
  const [data, setData] = useState(() =>
    allProjects.find((p) => p.id === Number(projectId))
  );
  console.log("Loaded project:", data);

  const { addNotification } = useNotifications();

  const statusFilter = searchParams.get("status");
  const tagFilter = searchParams.get("tag");

  if (!data) return <p className={styles.notFound}>Project not found</p>;

  const filteredMilestones = useMemo(() => {
    return data.milestones.map((m) => ({
      ...m,
      tasks: m.tasks.filter((t) => {
        const statusMatch = statusFilter ? t.status === statusFilter : true;
        const tagMatch = tagFilter ? t.tags.includes(tagFilter) : true;
        return statusMatch && tagMatch;
      }),
    }));
  }, [data, statusFilter, tagFilter]);

  function handleMarkComplete(milestoneId, taskId) {
    const updatedMilestones = data.milestones.map((m) => {
      if (m.id === milestoneId) {
        return {
          ...m,
          tasks: m.tasks.map((t) =>
            t.id === taskId ? { ...t, status: "completed" } : t
          ),
        };
      }
      return m;
    });

    const updatedProject = { ...data, milestones: updatedMilestones };
    setData(updatedProject);

    const updatedAll = allProjects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    saveProjects(updatedAll);

    const task = data.milestones
      .flatMap((m) => m.tasks)
      .find((t) => t.id === taskId);

    if (task) {
      const message = `Task "${task.title}" marked completed`;

      if (Notification.permission === "granted") {
        new Notification(message);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") new Notification(message);
        });
      }

      addNotification({
        id: Date.now().toString(),
        message,
        type: "task",
        ref: { projectId: Number(projectId) },
        seen: false,
        projectName: data.name,
      });

      alert(message);
    }
  }
  console.log(data.documents, "documents");

  return (
    <div className={styles.container}>
      <BackButton />
      <h2 className={styles.title}>{data.name}</h2>

      <section className={styles.ownerSection}>
        <h3>Owner Information</h3>
        <p>
          <strong>Name:</strong> {data.owner.name}
        </p>
        <p>
          <strong>Email:</strong> {data.owner.email}
        </p>
        {data.owner.contact && (
          <>
            <p>
              <strong>Phone:</strong> {data.owner.contact.phone}
            </p>
            <p>
              <strong>Office:</strong> {data.owner.contact.office}
            </p>
          </>
        )}
      </section>

      <div className={styles.filters}>
        <select
          value={statusFilter || ""}
          onChange={(e) =>
            setSearchParams({ status: e.target.value, tag: tagFilter || "" })
          }
        >
          <option value="">Filter by Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>

        <select
          value={tagFilter || ""}
          onChange={(e) =>
            setSearchParams({ tag: e.target.value, status: statusFilter || "" })
          }
        >
          <option value="">Filter by Tag</option>
          <option value="backend">Backend</option>
          <option value="api">API</option>
          <option value="devops">DevOps</option>
          <option value="automation">Automation</option>
        </select>

        <button onClick={() => setSearchParams({})}>Reset Filters</button>
      </div>

      <section className={styles.milestoneSection}>
        {filteredMilestones.map((m) => (
          <div key={m.id} className={styles.milestoneCard}>
            <h3>{m.title}</h3>
            <p>
              <strong>Deadline:</strong> {m.deadline}
            </p>

            <div className={styles.tasks}>
              {m.tasks.length === 0 ? (
                <p className={styles.noTasks}>No tasks found</p>
              ) : (
                m.tasks.map((t) => (
                  <div key={t.id} className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <h4>{t.title}</h4>
                      <span
                        className={`${styles.status} ${
                          t.status === "completed"
                            ? styles.done
                            : styles.inProgress
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <p>
                      <strong>Priority:</strong> {t.priority}
                    </p>
                    <p>
                      <strong>Tags:</strong> {t.tags.join(", ")}
                    </p>

                    <div className={styles.assignees}>
                      <strong>Assigned To:</strong>
                      <ul>
                        {t.assignedTo.map((a) => (
                          <li key={a.id}>
                            {a.name} ({a.role}) – {a.skills.join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {t.comments.length > 0 && (
                      <div className={styles.comments}>
                        <strong>Comments:</strong>
                        <ul>
                          {t.comments.map((c) => (
                            <li key={c.id}>
                              <em>{c.by}:</em> {c.message}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {t.status !== "completed" && (
                      <button
                        className={styles.completeBtn}
                        onClick={() => handleMarkComplete(m.id, t.id)}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </section>

      {/* {data.document && (
        <div className={styles.docs}>
          <h3>Project Document</h3>
          <button
            className={styles.viewBtn}
            onClick={() =>
              setOpenDoc({
                name: data.document.name,
                url: data.document.url,
                type: data.document.type,
              })
            }
          >
            View File
          </button>
        </div>
      )} */}
      {/* collect documents from all milestones */}
      {/* {data.milestones &&
        data.milestones.length > 0 &&
        (() => {
          const allDocs = data.milestones.flatMap((m) => m.documents || []);
          return allDocs.length > 0 ? (
            <div className={styles.docs}>
              <h3>Project Documents</h3>
              <div className={styles.docList}>
                {allDocs.map((doc) => (
                  <div key={doc.id} className={styles.docItem}>
                    <span>{doc.name}</span>
                    <button
                      className={styles.viewBtn}
                      onClick={() =>
                        setOpenDoc({
                          name: doc.name,
                          url: doc.url,
                          type: doc.type,
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null;
        })()}

      {openDoc && (
        <DocumentViewer doc={openDoc} onClose={() => setOpenDoc(null)} />
      )} */}
      {/* collect both project-level and milestone-level documents */}
      {(() => {
        const milestoneDocs = data.milestones
          ? data.milestones.flatMap((m) => m.documents || [])
          : [];
        const projectDocs = data.documents || [];
        const allDocs = [...projectDocs, ...milestoneDocs];

        return allDocs.length > 0 ? (
          <div className={styles.docs}>
            <h3>Project Documents</h3>
            <div className={styles.docList}>
              {allDocs.map((doc) => (
                <div key={doc.id} className={styles.docItem}>
                  <span>{doc.name}</span>
                  <button
                    className={styles.viewBtn}
                    onClick={() =>
                      setOpenDoc({
                        name: doc.name,
                        url: doc.url,
                        type: doc.type,
                      })
                    }
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })()}

      {openDoc && (
        <DocumentViewer doc={openDoc} onClose={() => setOpenDoc(null)} />
      )}
    </div>
  );
}

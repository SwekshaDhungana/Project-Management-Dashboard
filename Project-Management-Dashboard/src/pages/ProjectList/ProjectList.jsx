import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { projects } from "../../data/projects";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./ProjectList.module.css";
import Modal from "../../components/Modal/Modal";

export default function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Read filters from URL
  const statusFilter = searchParams.get("status");
  const departmentFilter = searchParams.get("department");

  // Filter projects by URL params
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const statusMatch = statusFilter ? p.status === statusFilter : true;
      const deptMatch = departmentFilter
        ? p.department === departmentFilter
        : true;
      return statusMatch && deptMatch;
    });
  }, [statusFilter, departmentFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <h2 className={styles.title}>Project Dashboard</h2> */}
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          ➕ Add Project
        </button>
      </div>

      {/* Filter component */}
      <SearchFilter setSearchParams={setSearchParams} />

      {/* Project list */}
      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Placeholder modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

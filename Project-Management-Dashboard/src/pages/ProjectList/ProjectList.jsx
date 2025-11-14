import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { defaultProjects } from "../../data/projects";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./ProjectList.module.css";
import Modal from "../../components/Modal/Modal";
import { getProjects } from "../../data/projects";
import BackButton from "../../components/BackButton/BackButton";

export default function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(getProjects());

  const statusFilter = searchParams.get("status");
  const departmentFilter = searchParams.get("department");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const statusMatch = statusFilter ? p.status === statusFilter : true;
      const deptMatch = departmentFilter
        ? p.department === departmentFilter
        : true;
      return statusMatch && deptMatch;
    });
  }, [projects, statusFilter, departmentFilter]);

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.header}></div>

      <div className={styles.addBtnContainer}>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          Add Project
        </button>
      </div>

      <SearchFilter setSearchParams={setSearchParams} />

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setProjects(getProjects());
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

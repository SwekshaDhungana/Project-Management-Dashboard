import React, { Component, createRef } from "react";
import styles from "./Modal.module.css";
import { projects } from "../../data/projects";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      department: "",
      status: "",
      email: "",
      budget: "",
      errors: {},
    };

    this.firstFieldRef = createRef();
  }

  componentDidMount() {
    if (this.firstFieldRef.current) {
      this.firstFieldRef.current.focus();
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getStatusOptions() {
    if (this.state.department === "Engineering") {
      return ["active", "paused", "completed"];
    } else if (this.state.department === "Marketing") {
      return ["planning", "active", "on-hold"];
    }
    return [];
  }

  validateForm() {
    const errors = {};
    if (!this.state.name.trim()) errors.name = "Project name is required";
    if (!this.state.department) errors.department = "Select a department";
    if (!this.state.status) errors.status = "Select a status";
    if (!this.state.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      errors.email = "Invalid email format";
    }
    if (!this.state.budget || isNaN(this.state.budget)) {
      errors.budget = "Enter a valid budget number";
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    const newProject = {
      id: projects.length + 1,
      name: this.state.name,
      department: this.state.department,
      status: this.state.status,
      owner: {
        name: this.state.email.split("@")[0],
        email: this.state.email,
      },
      resources: {
        budget: Number(this.state.budget),
        spent: 0,
        assets: [],
      },
      milestones: [],
      notifications: [],
    };

    projects.push(newProject);

    if (Notification.permission === "granted") {
      new Notification(
        `New project “${this.state.name}” created successfully!`
      );
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification(
            `New project “${this.state.name}” created successfully!`
          );
        }
      });
    }

    alert(`Project "${this.state.name}" added successfully!`);
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { errors } = this.state;

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h3>Add New Project</h3>

          <form onSubmit={this.handleSubmit} className={styles.form}>
            <label>
              Project Name:
              <input
                ref={this.firstFieldRef}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </label>

            <label>
              Department:
              <select
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.department && (
                <span className={styles.error}>{errors.department}</span>
              )}
            </label>

            <label>
              Status:
              <select
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option value="">Select Status</option>
                {this.getStatusOptions().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.status && (
                <span className={styles.error}>{errors.status}</span>
              )}
            </label>

            <label>
              Owner Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </label>

            <label>
              Budget:
              <input
                type="number"
                name="budget"
                value={this.state.budget}
                onChange={this.handleChange}
              />
              {errors.budget && (
                <span className={styles.error}>{errors.budget}</span>
              )}
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.submitBtn}>
                Add Project
              </button>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

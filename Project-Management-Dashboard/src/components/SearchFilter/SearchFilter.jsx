import React, { Component, createRef } from "react";
import styles from "./SearchFilter.module.css";

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.statusRef = createRef();
    this.departmentRef = createRef();
  }

  handleChange = () => {
    const status = this.statusRef.current.value;
    const department = this.departmentRef.current.value;

    const params = {};
    if (status) params.status = status;
    if (department) params.department = department;

    this.props.setSearchParams(params);
  };

  resetFilters = () => {
    this.statusRef.current.value = "";
    this.departmentRef.current.value = "";
    this.props.setSearchParams({});
    this.statusRef.current.focus();
  };

  render() {
    return (
      <div className={styles.filterContainer}>
        <select ref={this.statusRef} onChange={this.handleChange}>
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="planning">Planning</option>
          <option value="on-hold">On Hold</option>
        </select>

        <select ref={this.departmentRef} onChange={this.handleChange}>
          <option value="">Filter by Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>

        <button onClick={this.resetFilters}>Reset</button>
      </div>
    );
  }
}

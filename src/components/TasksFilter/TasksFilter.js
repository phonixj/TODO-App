import { Component } from "react";

export default class TasksFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    return this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const selected = isActive ? "selected" : "";
      return (
        <li key={name}>
          <button onClick={() => onFilterChange(name)} className={selected}>
            {label}
          </button>
        </li>
      );
    });
  }
}
//selected

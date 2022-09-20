import { Component } from "react";

export default class Task extends Component {
  render() {
    const { label, createdTime, onDeleted, done, onToggleDone } = this.props;
    const classes = [];

    if (done) {
      classes.push("completed");
    }
    return (
      <li className={classes.join(" ")}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">{createdTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

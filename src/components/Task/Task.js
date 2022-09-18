import { Component } from "react";

export default class Task extends Component {
  state = {
    done: false,
  };

  onLabelClick = () => {
    //setState( (state) => {} )
    this.setState(({ done }) => {
      return {
        done: !done,
      };
    });
  };

  render() {
    const { label, createdTime, onDeleted } = this.props;
    const { done } = this.state;
    const classes = [];

    if (done) {
      classes.push("completed");
    }
    return (
      <li className={classes.join(" ")}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>
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

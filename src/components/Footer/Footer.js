import TasksFilter from "../TasksFilter";
import { Component } from "react";

export default class Footer extends Component {
  render() {
    const { itemLeft, clearCompleted, filter, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemLeft} items left</span>
        <ul className="filters">
          <TasksFilter
            filter={filter}
            onFilterChange={onFilterChange}
            buttons={this.buttons}
          />
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

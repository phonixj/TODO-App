import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    itemLeft: PropTypes.number,
    clearCompleted: PropTypes.func.isRequired,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { itemLeft, clearCompleted, filter, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemLeft} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

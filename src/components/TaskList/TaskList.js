import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

export default class TaskList extends Component {
  state = {
    label: '',
  };

  onSubmitEdit = (e) => {
    e.preventDefault();
  };

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, onSubmitEdit } = this.props;
    return (
      <ul className="todo-list">
        {todos.map((todo) => {
          const { id, ...itemProps } = todo;

          return (
            <Task
              key={id}
              {...itemProps}
              onDeleted={() => onDeleted(id)}
              onToggleDone={() => onToggleDone(id)}
              onToggleEdit={() => onToggleEdit(id)}
              onSubmitEdit={() => onSubmitEdit(id)}
            />
          );
        })}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      editing: PropTypes.bool,
      addingTime: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
};

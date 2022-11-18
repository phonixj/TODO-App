// import { useState } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleDone, submitEdit }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const { id, ...itemProps } = todo;
        return (
          <Task
            key={id}
            id={id}
            {...itemProps}
            submitEdit={submitEdit}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        );
      })}
    </ul>
  );
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      editing: PropTypes.bool,
      addingTime: PropTypes.instanceOf(Date),
      id: PropTypes.number,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

export default TaskList;

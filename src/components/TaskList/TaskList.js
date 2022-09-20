import Task from "../Task";

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
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
          />
        );
      })}
    </ul>
  );
};

export default TaskList;

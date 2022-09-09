import Task from "../Task";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, statusItem, ...itemProps } = item;
    return (
      <li className={statusItem} key={id}>
        <Task {...itemProps} />
        <input type="text" className="edit" value="Editing task" />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;

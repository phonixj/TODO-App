const TasksFilter = ({ label, statusItem }) => {
  return <button className={statusItem}>{label}</button>;
};

export default TasksFilter;

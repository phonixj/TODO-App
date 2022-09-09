import TasksFilter from "../TasksFilter";

const Footer = ({ filterList }) => {
  const filter = filterList.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id}>
        <TasksFilter {...itemProps} />
      </li>
    );
  });
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <ul className="filters">{filter}</ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};
export default Footer;

import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

const Footer = ({ itemLeft, clearCompleted, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  filter: 'all',
};

Footer.propTypes = {
  itemLeft: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default Footer;

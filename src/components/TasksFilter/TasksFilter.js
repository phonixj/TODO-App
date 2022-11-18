import PropTypes from 'prop-types';

const TasksFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const btn = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const selected = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button onClick={() => onFilterChange(name)} className={selected}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btn}</ul>;
};

TasksFilter.defaultProps = {
  filter: 'all',
};

TasksFilter.defaultProps = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { filter, onFilterChange } = this.props;
    const btn = this.buttons.map(({ name, label }) => {
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
  }
}
//selected

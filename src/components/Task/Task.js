import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    onDeleted: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    addingTime: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
  };

  state = {
    label: this.props.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onToggleEdit();
  };

  onBlur = () => {
    this.props.onToggleEdit();
  };

  render() {
    const { onDeleted, done, onToggleDone, addingTime, onToggleEdit, editing } = this.props;
    const classes = [];

    if (done) {
      classes.push('completed');
    }
    if (editing) {
      classes.push('editing');
    }
    return (
      <li className={classes.join(' ')}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
          <label>
            <span className="description">{this.state.label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(addingTime, {
                includeSeconds: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {/*{this.props.children}*/}
        {editing && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={this.onLabelChange}
              onBlur={this.onBlur}
              autoFocus
            />
          </form>
        )}
      </li>
    );
  }
}

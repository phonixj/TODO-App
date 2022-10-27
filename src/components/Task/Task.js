import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    onDeleted: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    addingTime: PropTypes.instanceOf(Date).isRequired,
    editing: PropTypes.bool.isRequired,
  };

  state = {
    label: this.props.label,
    dateId: 0,
    isCounting: false,
    timeleft: Number(this.props.min * 60) + Number(this.props.sec),
  };

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState(({ dateId, isCounting, timeleft }) => {
      if (isCounting) {
        timeleft > 0 ? (timeleft -= 1) : 0;
      }
      return {
        timeleft: timeleft,
        dateId: dateId++,
      };
    });
  }

  onStartCounting = () => {
    this.setState({
      isCounting: true,
    });
  };

  onStopCounting = () => {
    this.setState({
      isCounting: false,
    });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitEdit(this.props.id, this.state.label);
  };

  onBlur = () => {
    this.props.submitEdit(this.props.id, this.state.label);
  };

  render() {
    const { onDeleted, done, onToggleDone, addingTime, editing, submitEdit, id } = this.props;
    const classes = [];
    const { timeleft } = this.state;

    const minutes = Math.floor(timeleft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeleft - minutes * 60).toString().padStart(2, '0');
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
          <section>
            <span className="title">{this.state.label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.onStartCounting}></button>
              <button className="icon icon-pause" onClick={this.onStopCounting}></button>
              {` ${minutes}:${seconds}`}
            </span>
            <span className="description">
              {formatDistanceToNow(addingTime, {
                includeSeconds: true,
              })}
            </span>
          </section>
          <button className="icon icon-edit" onClick={() => submitEdit(id)}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
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

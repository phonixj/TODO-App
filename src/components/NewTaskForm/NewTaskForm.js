import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    switch (e.target.name) {
      case 'label':
        this.setState({
          label: e.target.value,
        });
        break;
      case 'min':
        this.setState({
          min: e.target.value,
        });
        break;
      case 'sec':
        this.setState({
          sec: e.target.value,
        });
        break;
    }
  };

  onSubmit = (e) => {
    const { label, min, sec } = this.state;

    e.preventDefault();

    if (!label || !min || !sec) {
      return;
    }
    this.props.onItemAdded(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="Task" value={this.state.label} onChange={this.onChange} name="label" />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.min}
          onChange={this.onChange}
          name="min"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.sec}
          onChange={this.onChange}
          name="sec"
        />
        <input type="submit" hidden />
      </form>
    );
  }
}

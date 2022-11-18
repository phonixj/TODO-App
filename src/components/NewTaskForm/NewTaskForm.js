import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onChange = (e) => {
    switch (e.target.name) {
      case 'label':
        setLabel(e.target.value);
        break;
      case 'min':
        setMin(e.target.value);
        break;
      case 'sec':
        setSec(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!label || !min || !sec) {
      return;
    }
    onItemAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input className="new-todo" placeholder="Task" value={label} onChange={onChange} name="label" />
      <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={onChange} name="min" />
      <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={onChange} name="sec" />
      <input type="submit" hidden />
    </form>
  );
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;

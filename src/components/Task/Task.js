import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({ label, min, sec, submitEdit, id, onDeleted, done, onToggleDone, addingTime, editing }) => {
  const [labelValue, setLabelValue] = useState(label);
  const [createTime, setCreateTime] = useState('less than 5 seconds');
  const [isCounting, setIsCounting] = useState(false);
  const [timeleft, setTimeleft] = useState(Number(min * 60) + Number(sec));

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [isCounting]);

  const tick = () => {
    if (isCounting) {
      timeleft > 0 ? setTimeleft((time) => time - 1) : 0;
    }
    setCreateTime(
      formatDistanceToNow(addingTime, {
        includeSeconds: true,
      })
    );
  };

  const onStartCounting = () => {
    setIsCounting(true);
  };

  const onStopCounting = () => {
    setIsCounting(false);
  };

  const onLabelChange = (e) => {
    setLabelValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitEdit(id, labelValue);
  };

  const onBlur = () => {
    submitEdit(id, labelValue);
  };

  const classes = [];
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
          <span className="title">{labelValue}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onStartCounting}></button>
            <button className="icon icon-pause" onClick={onStopCounting}></button>
            {` ${minutes}:${seconds}`}
          </span>
          <span className="description">{createTime}</span>
        </section>
        <button className="icon icon-edit" onClick={() => submitEdit(id)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={labelValue} onChange={onLabelChange} onBlur={onBlur} autoFocus />
        </form>
      )}
    </li>
  );
};

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  addingTime: PropTypes.instanceOf(Date).isRequired,
  editing: PropTypes.bool.isRequired,
};

export default Task;

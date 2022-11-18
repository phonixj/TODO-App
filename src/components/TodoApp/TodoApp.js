import { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const TodoApp = () => {
  let maxId = 100;
  const [todoList, setTodoList] = useState([
    createTodoItem('Completed task', 10, 0),
    createTodoItem('Editing task', 10, 0),
    createTodoItem('Active task', 10, 0),
  ]);
  const [filter, setFilter] = useState('all');

  function createTodoItem(label, min, sec) {
    return {
      label,
      done: false,
      editing: false,
      addingTime: new Date(),
      min,
      sec,
      id: maxId++,
    };
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoList((todoList) => [...todoList, newItem]);
  };

  const deleteItem = (id) => {
    setTodoList((todoList) => {
      const idx = todoList.findIndex((el) => id === el.id);
      const newArray = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
      return newArray;
    });
  };

  const toggleProperty = (todoData, id, propName) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoList((todoList) => toggleProperty(todoList, id, 'done'));
  };

  const submitEdit = (id, label) => {
    setTodoList((todoList) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing, label: label };
      return [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)];
    });
  };

  const clearCompleted = () => {
    setTodoList((todoList) => todoList.filter((el) => !el.done));
  };

  const viewFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const itemLeft = todoList.length - todoList.filter((el) => el.done).length;
  const visibleItem = viewFilter(todoList, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList todos={visibleItem} onDeleted={deleteItem} onToggleDone={onToggleDone} submitEdit={submitEdit} />
        <Footer itemLeft={itemLeft} clearCompleted={clearCompleted} filter={filter} onFilterChange={onFilterChange} />
      </section>
    </section>
  );
};

export default TodoApp;

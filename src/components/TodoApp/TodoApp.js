import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    todoList: [
      this.createTodoItem('Completed task', 10, 0),
      this.createTodoItem('Editing task', 10, 0),
      this.createTodoItem('Active task', 10, 0),
    ],
    filter: 'all',
  };

  createTodoItem(label, min, sec) {
    return {
      label,
      done: false,
      editing: false,
      addingTime: new Date(),
      min,
      sec,
      id: this.maxId++,
    };
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoList }) => {
      return {
        todoList: [...todoList, newItem],
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => id === el.id);

      const newArray = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
      return {
        todoList: newArray,
      };
    });
  };

  toggleProperty = (todoData, id, propName) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoList }) => {
      return {
        todoList: this.toggleProperty(todoList, id, 'done'),
      };
    });
  };

  submitEdit = (id, label) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing, label: label };
      return {
        todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)],
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoList }) => {
      return {
        todoList: todoList.filter((el) => !el.done),
      };
    });
  };

  filter(items, filter) {
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
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoList, filter } = this.state;
    const itemLeft = todoList.length - todoList.filter((el) => el.done).length;

    const visibleItem = this.filter(todoList, filter);
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItem}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            submitEdit={this.submitEdit}
          />
          <Footer
            filterList={this.filterList}
            itemLeft={itemLeft}
            clearCompleted={this.clearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}

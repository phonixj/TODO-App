import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    todoList: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'all',
    dateId: 0,
  };

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState(({ dateId }) => {
      return {
        dateId: dateId++,
      };
    });
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      editing: false,
      addingTime: new Date(),
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
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

  onToggleEdit = (id) => {
    this.setState(({ todoList }) => {
      return {
        todoList: this.toggleProperty(todoList, id, 'editing'),
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
            onToggleEdit={this.onToggleEdit}
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

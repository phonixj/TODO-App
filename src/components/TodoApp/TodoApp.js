import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";
import { Component } from "react";

export default class TodoApp extends Component {
  maxId = 100;
  state = {
    todoList: [
      {
        label: "Completed task",
        createdTime: formatDistanceToNow(new Date()),
        done: false,
        id: 1,
      },
      {
        label: "Editing task",
        createdTime: formatDistanceToNow(new Date()),
        done: false,
        id: 2,
      },
      {
        label: "Active task",
        createdTime: formatDistanceToNow(new Date()),
        done: false,
        id: 3,
      },
    ],
    filter: "all",
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      createdTime: formatDistanceToNow(new Date()),
      id: this.maxId++,
    };
    this.setState(({ todoList }) => {
      const newArr = [...todoList, newItem];
      return {
        todoList: newArr,
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

  onToggleDone = (id) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);

      const oldItem = todoList[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      return {
        todoList: [
          ...todoList.slice(0, idx),
          newItem,
          ...todoList.slice(idx + 1),
        ],
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoList }) => {
      const newArr = todoList.filter((el) => !el.done);
      return {
        todoList: newArr,
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "completed":
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

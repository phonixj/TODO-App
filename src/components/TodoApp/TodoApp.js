import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";
import { Component } from "react";

export default class TodoApp extends Component {
  state = {
    todoList: [
      {
        label: "Completed task",
        createdTime: formatDistanceToNow(new Date()),
        id: 1,
      },
      {
        label: "Editing task",
        createdTime: formatDistanceToNow(new Date()),
        id: 2,
      },
      {
        label: "Active task",
        createdTime: formatDistanceToNow(new Date()),
        id: 3,
      },
    ],
  };

  filterList = [
    { label: "All", statusItem: "selected", id: 1 },
    { label: "Active", id: 2 },
    { label: "Completed", id: 3 },
  ];

  deleteItem = (id) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => id === el.id);
      const newArray = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
      return {
        todoList: newArray,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={this.state.todoList} onDeleted={this.deleteItem} />
          <Footer filterList={this.filterList} />
        </section>
      </section>
    );
  }
}

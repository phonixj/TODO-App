import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";

const TodoApp = () => {
  const todoList = [
    {
      label: "Completed task",
      createdTime: formatDistanceToNow(new Date()),
      statusItem: "completed",
      id: 1,
    },
    {
      label: "Editing task",
      createdTime: formatDistanceToNow(new Date()),
      statusItem: "editing",
      id: 2,
    },
    {
      label: "Active task",
      createdTime: formatDistanceToNow(new Date()),
      id: 3,
    },
  ];
  const filterList = [
    { label: "All", statusItem: "selected", id: 1 },
    { label: "Active", id: 2 },
    { label: "Completed", id: 3 },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoList} />
        <Footer filterList={filterList} />
      </section>
    </section>
  );
};
export default TodoApp;

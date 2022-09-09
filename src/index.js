import { createRoot } from "react-dom/client";
import TodoApp from "./components/TodoApp";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<TodoApp />);

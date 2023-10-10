import * as React from "react";
import { createTask } from "./utils";


function reducer(tasks, action) {
  switch (action.type) {
    case "add":
      return [...tasks, action.task];
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    case "update":
      return tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, status: task.status === "active" ? "completed" : "active" };
        }
        return task;
      });

    default:
    return tasks;
  }
}

export default function TaskManager() {
  const [tasks, dispatch] = React.useReducer(reducer, []);

  const handleUpdateTaskStatus = (id) => {
    dispatch({ type: "update", id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    dispatch({ type: "add", task: createTask(formData.get("task")) });

    e.target.reset();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input name="task" placeholder="Task title" />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <button
                className={`status ${task.status}`}
                onClick={() => handleUpdateTaskStatus(task.id)}
              />
              {task.title}
            </div>
            <button className="link" onClick={() => handleDeleteTask(task.id)}>
              Delete  1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

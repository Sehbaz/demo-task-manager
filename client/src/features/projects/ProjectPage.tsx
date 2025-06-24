import { useState } from "react";

import { useCreateProject, useDeleteProject, useProjects } from "./hook";
import { Task } from "../task/Task";
import { useCreateTasks } from "../task/hook";
import { Link } from "react-router-dom";

export function ProjectPage() {
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const { data: projects } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const createTask = useCreateTasks();

  const addProject = () => {
    if (!newProjectTitle) return;
    createProject.mutate({ name: newProjectTitle });
    setNewProjectTitle("");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Projects</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <input
        placeholder="New project title"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addProject()}
      />
      <button onClick={addProject}>Add Project</button>

      <div style={{ marginTop: "2rem" }}>
        {projects?.map((project: any) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <button onClick={() => deleteProject.mutate(project.id)}>
                🗑
              </button>
            </div>

            <input
              placeholder="New task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const input = e.target as HTMLInputElement;
                  createTask.mutate({
                    projectId: project.id,
                    name: input.value,
                  });
                  input.value = "";
                }
              }}
            />

            {/* <ul>
              {project.tasks?.map((task: any) => (
                <li key={task.id}>
                  {task.title}
                  <button
                    //  onClick={() => deleteTask(task.id)}
                    style={{ marginLeft: "1rem" }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul> */}
            <Task tasks={project.tasks} />
          </div>
        ))}
      </div>
    </div>
  );
}

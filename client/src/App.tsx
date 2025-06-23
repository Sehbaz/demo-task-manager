import { useEffect, useState } from "react";
import axios from "axios";
import { MantineProvider } from "@mantine/core";

import { useCreateTaskMutation, useDeleteTaskMutation } from "./store/api/task";

import {
  useGetAllProjectsQuery,
  useCreateProjectsMutation,
  useDeleteProjectMutation,
} from "./store/api/project";

import { token as tokenUtil } from "./store/slices/token";

type Task = {
  id: string;
  title: string;
  projectId: string;
};

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [createTask] = useCreateTaskMutation();
  const { data: projects } = useGetAllProjectsQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [createProject] = useCreateProjectsMutation();
  const [deleteProject] = useDeleteProjectMutation();

  // Load token on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt_token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Login to get JWT
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const receivedToken = res.data.access_token;
      setToken(receivedToken);
      localStorage.setItem("jwt_token", receivedToken);
      // Set the token getter for RTK Query
      tokenUtil.setTokenGetter(() => Promise.resolve(receivedToken));

      console.log("token", receivedToken);

      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("jwt_token");
  };

  const addProject = () => {
    if (!newProjectTitle) return;
    createProject({
      name: newProjectTitle,
    });
  };

  // On app start, set the token getter from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt_token");
    if (savedToken) {
      setToken(savedToken);
      tokenUtil.setTokenGetter(() => Promise.resolve(savedToken));
    }
  }, []);

  return (
    <MantineProvider>
      <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
        {!token ? (
          <>
            <h2>Login</h2>
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Projects</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>

            <input
              placeholder="New project title"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addProject();
              }}
            />
            <button onClick={addProject}>Add Project</button>

            <div style={{ marginTop: "2rem" }}>
              {projects &&
                projects.map((project: any) => (
                  <div
                    key={project.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: 8,
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>{project.name}</h3>
                      <button onClick={() => deleteProject(project.id)}>
                        🗑
                      </button>
                    </div>

                    {/* Add Task Input */}
                    <input
                      placeholder="New task"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const input = e.target as HTMLInputElement;
                          createTask({
                            projectId: project.id,
                            title: input.value,
                          });
                          input.value = "";
                        }
                      }}
                    />

                    {/* Task List */}
                    <ul>
                      {project.tasks &&
                        project.tasks.map((task: any) => (
                          <li key={task.id}>
                            {task.title}
                            <button
                              onClick={() => deleteTask(task.id)}
                              style={{ marginLeft: "1rem" }}
                            >
                              ❌
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;

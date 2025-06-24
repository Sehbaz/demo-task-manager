import { Link, useParams } from "react-router-dom";
import { useProject } from "./hook";
import { Task } from "../task/Task";

export function ProjectDetailPage() {
  const { id } = useParams();
  const { data: project } = useProject(id!);

  console.log("project", project);
  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <Link to="/projects">← Back to Projects</Link>
      <h2>{project.name}</h2>
      <h3>Tasks</h3>
      <Task tasks={project.tasks || []} />
    </div>
  );
}

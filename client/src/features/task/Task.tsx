import { useParams } from "react-router-dom";
import { TaskForm } from "./TaskForm";

export function Task({ tasks }: { tasks: any[] }) {
  console.log(tasks); // This will now log the array
  const { id } = useParams();

  return (
    <>
      <h1>sehbaz</h1>
      <TaskForm projectId={id ? parseInt(id) : 0} />
    </>
  );
}

import { useParams } from "react-router-dom";
import { TaskForm } from "./TaskForm";

export function Task({ tasks }: { tasks: any[] }) {
  console.log(tasks); // This will now log the array
  const { id } = useParams();

  return (
    <>
      <h1>sehbaz</h1>
      <TaskForm projectId={id ? parseInt(id) : 0} />
      <ul>
        {tasks?.map((task: any) => (
          <li key={task.id}>
            {task.title || task.name}
            <button
              // onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "1rem" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

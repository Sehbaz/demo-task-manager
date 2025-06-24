export function Task({ tasks }: { tasks: any[] }) {
  console.log(tasks); // This will now log the array
  return (
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
  );
}

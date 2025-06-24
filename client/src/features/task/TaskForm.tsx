// Example: TaskForm.tsx
import { Select, TextInput, Textarea, Button } from "@mantine/core";
import { useState } from "react";
import { useCreateTasks } from "./hook";

interface TaskFormProps {
  projectId: number; // or number, depending on your data model
}

export function TaskForm({ projectId }: TaskFormProps) {
  // ...state for title, description, status, priority
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const [priority, setPriority] = useState("low");

  const createTask = useCreateTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask.mutate({
      title: title,
      description: description,
      status: status,
      priority: priority,
      projectId: projectId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        label="Status"
        data={[
          { value: "todo", label: "To Do" },
          { value: "in_progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
        value={status}
        onChange={(value) => {
          if (value !== null) setStatus(value);
        }}
      />
      <Select
        label="Priority"
        data={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
        value={priority}
        onChange={(value) => {
          if (value !== null) setPriority(value);
        }}
      />
      <Button type="submit">Save Task</Button>
    </form>
  );
}

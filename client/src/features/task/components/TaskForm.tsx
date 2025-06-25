// react
import { useState } from "react";

// mantine
import { Select, TextInput, Textarea, Button, Modal } from "@mantine/core";

// hooks
import { useDisclosure } from "@mantine/hooks";
import { useCreateTask } from "@/features/task/hooks/task.hook";

// models
import type { TaskCreateDto } from "@/models/task";

interface TaskFormProps {
  projectId: number;
}

export const TaskForm = ({ projectId }: TaskFormProps) => {
  // states
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState<Omit<TaskCreateDto, "projectId">>({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  });

  // hooks
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask.mutate(
      { ...form, projectId },
      {
        onSettled: () => {
          setForm({
            title: "",
            description: "",
            status: "todo",
            priority: "low",
          });
          close();
        },
      }
    );
  };

  const handleChange = (
    field: keyof Omit<TaskCreateDto, "projectId">,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Button onClick={open}>Add Task</Button>
      <Modal opened={opened} onClose={close} title="Add Task" centered>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.currentTarget.value)}
            mb="sm"
          />
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.currentTarget.value)}
            mb="sm"
          />
          <Select
            label="Status"
            data={[
              { value: "todo", label: "To Do" },
              { value: "in_progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
            value={form.status}
            onChange={(value) => value && handleChange("status", value)}
            mb="sm"
          />
          <Select
            label="Priority"
            data={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            value={form.priority}
            onChange={(value) => value && handleChange("priority", value)}
            mb="sm"
          />
          <Button type="submit" fullWidth>
            Save Task
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default TaskForm;

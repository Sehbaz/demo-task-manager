import { Modal, Button, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useCreateProject, useUpdateProject } from "./hook";

export function ProjectForm({
  project,
  onSave,
  onCancel,
  triggerButton = true,
}: {
  project?: { id: number; title: string; description: string };
  onSave?: () => void;
  onCancel?: () => void;
  triggerButton?: boolean;
}) {
  console.log("project", project);
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  // Update form fields if editing a different project
  useEffect(() => {
    setTitle(project?.title ?? "");
    setDescription(project?.description ?? "");
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      console.log("updateing the project");
      updateProject.mutate(
        { title, description },
        {
          onSuccess: () => {
            setTitle("");
            setDescription("");
            close();
            onSave?.();
          },
        }
      );
    } else {
      console.log("creating the project...");
      createProject.mutate(
        { title, description },
        {
          onSuccess: () => {
            setTitle("");
            setDescription("");
            close();
            onSave?.();
          },
        }
      );
    }
  };

  const handleOpen = () => {
    open();
    if (onCancel) onCancel();
  };

  return (
    <>
      {triggerButton && (
        <Button onClick={handleOpen} style={{ marginBottom: 16 }}>
          {project ? "Edit Project" : "Create Project"}
        </Button>
      )}
      <Modal
        opened={opened || !!project}
        onClose={() => {
          close();
          onCancel?.();
        }}
        title={project ? "Edit Project" : "Create Project"}
        centered
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb="sm"
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb="sm"
          />
          <Button type="submit" fullWidth>
            {project ? "Update Project" : "Save Project"}
          </Button>
        </form>
      </Modal>
    </>
  );
}

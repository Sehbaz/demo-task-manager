// react
import { useState, useEffect } from "react";

// mantine
import { notifications } from "@mantine/notifications";

import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";

// hooks
import { useDisclosure } from "@mantine/hooks";
import {
  useCreateProject,
  // useUpdateProject,
} from "@/features/project/hooks/project.hook";

// models
import type { Project } from "@/models/project";

interface ProjectFormProps {
  project?: Project;
  triggerButton?: boolean;
}

export const ProjectForm = ({
  project,
  triggerButton = true,
}: ProjectFormProps) => {
  // states
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // hooks
  const [opened, { open, close }] = useDisclosure(false);
  const createProject = useCreateProject();
  // const updateProject = useUpdateProject();

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      console.log("updateing the project");
      // updateProject.mutate(
      //   { title, description },
      //   {
      //     onSuccess: () => {
      //       setTitle("");
      //       setDescription("");
      //       close();
      //       onSave?.();
      //     },
      //   }
      // );
    } else {
      createProject.mutate(
        { title, description },
        {
          onSuccess: () => {
            resetForm();
            setLoading(false);
            close();
            notifications.show({
              title: "Project created",
              message: "Your project has been saved successfully.",
              color: "green",
              autoClose: 1600,
              withCloseButton: false,
            });
          },
        }
      );
    }
  };

  // effects
  useEffect(() => {
    if (!project) return;
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
  }, [project]);

  return (
    <>
      {triggerButton && (
        <Button onClick={open} style={{ marginBottom: 16 }}>
          {project ? "Edit Project" : "Create"}Project
        </Button>
      )}

      <Modal
        opened={opened || !!project}
        onClose={close}
        title={project ? "Edit Project" : "Create Project"}
        centered
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            mb="sm"
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            mb="sm"
          />

          <Group justify="flex-end" mt="sm">
            <Button type="submit" loading={loading} fullWidth>
              {project ? "Update Project" : "Save Project"}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

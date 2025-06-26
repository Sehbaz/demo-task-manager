// react
import { useState } from "react";

// mantine
import { notifications } from "@mantine/notifications";
import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";

// hooks
import { useDisclosure } from "@mantine/hooks";
import { useCreateProject } from "@/features/project/hooks/project.hook";

export const ProjectForm = () => {
  // states
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  // hooks
  const [opened, { open, close }] = useDisclosure(false);
  const createProject = useCreateProject();

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  return (
    <>
      <Button onClick={open} style={{ marginBottom: 16 }}>
        {"Add Project"}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={"Add Project"}
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
              {"Save Project"}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

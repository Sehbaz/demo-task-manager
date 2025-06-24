import { Link, useParams } from "react-router-dom";
import { useProject } from "./hook";
import {
  Container,
  Title,
  Text,
  Loader,
  Alert,
  Card,
  Group,
  Badge,
  Stack,
  Button,
  Flex,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { IconArrowLeft, IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { TaskForm } from "../task/TaskForm";

import { modals } from "@mantine/modals";
import { useDeleteTasks } from "../task/hook";

export function ProjectDetailPage() {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(id!);

  // Always call hooks at the top level!
  const deleteTask = useDeleteTasks();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (project?.tasks) {
      setData(project.tasks);
    }
  }, [project?.tasks]);

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "title" },
      { accessorKey: "description", header: "Description" },
    ],
    []
  );

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container>
        <Alert color="red" title="Error">
          Project not found
        </Alert>
      </Container>
    );
  }

  //DELETE action
  const openDeleteConfirmModal = (row: any) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{" "}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteTask.mutate({ id: row.original.id, projectId: project.id });
      },
    });

  return (
    <Container size="sm" py="xl">
      <Button
        component={Link}
        to="/projects"
        leftSection={<IconArrowLeft size={18} />}
        variant="subtle"
        mb="md"
      >
        Back to Projects
      </Button>
      <Title order={2} mb="xs">
        {project.title}
      </Title>
      <TaskForm projectId={id ? parseInt(id) : 0} />
      {project.description && (
        <Text c="dimmed" mb="md">
          {project.description}
        </Text>
      )}
      <Title order={4} mt="lg" mb="sm">
        Tasks
      </Title>

      <MantineReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={data}
        enableRowOrdering
        enableRowActions // <-- Add this line!
        positionActionsColumn="last"
        enableSorting={false}
        renderRowActions={({ row, table }) => (
          <Flex gap="md">
            <Tooltip label="Edit">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon
                color="red"
                onClick={() => openDeleteConfirmModal(row)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        )}
        mantineRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (
              hoveredRow &&
              draggingRow &&
              typeof hoveredRow.index === "number" &&
              typeof draggingRow.index === "number"
            ) {
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0]
              );
              setData([...data]);
            }
          },
          onClick: () => {
            const { hoveredRow } = table.getState();

            console.log("howered row", hoveredRow);
          },
        })}
      />
    </Container>
  );
}

// react
import { Link, useParams } from "react-router-dom";
import { useProject } from "@/features/project/hooks/project.hook";
import {
  Container,
  Title,
  Text,
  Loader,
  Alert,
  Button,
  Flex,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { IconArrowLeft, IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { TaskForm } from "@/features/task/components/TaskForm";

import { modals } from "@mantine/modals";
import { useDeleteTask } from "@/features/task/hooks/task.hook";

export const ProjectDetailPage = () => {
  // state
  const [data, setData] = useState<any[]>([]);

  // hooks
  const { id } = useParams();
  const deleteTask = useDeleteTask();
  const { data: project, isLoading, error } = useProject(id ? parseInt(id) : 0);

  // effects
  useEffect(() => {
    if (project?.tasks) {
      setData(project.tasks);
    }
  }, [project?.tasks]);

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "title" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "status", header: "statys" },
      { accessorKey: "priority", header: "priority" },
    ],
    []
  );
  if (isLoading) {
    return (
      <Container size="xl" style={{ minHeight: "60vh" }}>
        <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
          <Loader size="lg" />
        </Flex>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container size="xl" style={{ minHeight: "60vh" }}>
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
        deleteTask.mutate({
          id: row.original.id,
          projectId: project.id,
        });
      },
    });

  return (
    <Container size="xl" py="xl">
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
      {project.description && (
        <Text c="dimmed" mb="md">
          {project.description}
        </Text>
      )}
      <TaskForm projectId={id ? parseInt(id) : 0} />

      <MantineReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={data}
        enableRowOrdering
        enableRowActions // <-- Add this line!
        positionActionsColumn="last"
        enableSorting={false}
        enableTopToolbar={false}
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
        paginationDisplayMode="pages" // or "default"
      />
    </Container>
  );
};

export default ProjectDetailPage;

// react
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/features/task/hooks/task.hook";

// hooks
import { useProject } from "@/features/project/hooks/project.hook";

// mantine
import {
  Container,
  Title,
  Text,
  Loader,
  Button,
  Flex,
  Tooltip,
  ActionIcon,
  Group,
  Select,
  Paper,
} from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { IconArrowLeft, IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

// components
import { TaskForm } from "@/features/task/components/TaskForm";

export const ProjectDetailPage = () => {
  // state
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // hooks
  const { id } = useParams();
  const projectId = Number(id) || 0;
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  const { data: tasks } = useTasks(projectId);
  const { data: project, isLoading } = useProject(projectId);

  // memos
  const filteredTasks = useMemo(
    () =>
      (tasks ?? [])
        .filter((task) => !statusFilter || task.status === statusFilter)
        .filter((task) => !priorityFilter || task.priority === priorityFilter),
    [tasks, statusFilter, priorityFilter]
  );

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "priority", header: "Priority" },
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
          projectId: projectId,
        });
      },
    });

  return (
    <Container size="md" py="xl">
      <Button
        component={Link}
        to="/projects"
        leftSection={<IconArrowLeft size={18} />}
        variant="outline"
        mb="md"
      >
        Back to Projects
      </Button>
      <Title order={2} mb="xs">
        {project?.title}
      </Title>
      <Text c="dimmed" mb="md">
        {project?.description}
      </Text>

      <Group mb="md" justify="space-between" align="end">
        <Group>
          <Select
            label="Filter by Status"
            data={[
              { value: "todo", label: "To Do" },
              { value: "in_progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
          />
          <Select
            label="Filter by Priority"
            data={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            value={priorityFilter}
            onChange={setPriorityFilter}
            clearable
          />
        </Group>
        <TaskForm projectId={id ? parseInt(id) : 0} />
      </Group>

      {filteredTasks.length === 0 ? (
        <Paper withBorder p="md" mb="md">
          <Text ta="center" c="dimmed">
            Either there are no tasks, or your filters are too picky!
          </Text>
        </Paper>
      ) : (
        <MantineReactTable
          autoResetPageIndex={false}
          columns={columns}
          data={filteredTasks}
          enableRowOrdering
          enableRowActions
          positionActionsColumn="last"
          enableSorting={false}
          enableTopToolbar={false}
          mantinePaginationProps={{
            px: "md",
            py: "sm",
          }}
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
          onEditingRowSave={async ({ values, table }) => {
            await updateTask.mutateAsync({
              id: project?.id || 0,
              data: {
                ...values,
                projectId,
              },
            });
            table.setEditingRow(null);
          }}
          mantineRowDragHandleProps={({}) => ({
            onDragEnd: () => {
              // NOTE:Here drag and drop implementation will go
            },
          })}
          paginationDisplayMode="pages"
        />
      )}
    </Container>
  );
};

export default ProjectDetailPage;

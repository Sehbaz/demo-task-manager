// react
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// mantine
import {
  Container,
  Flex,
  Loader,
  Alert,
  Button,
  Tooltip,
  Text,
  ActionIcon,
  Paper,
} from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

// icons
import { IconEdit, IconTrash } from "@tabler/icons-react";

// hooks
import {
  useProjects,
  useDeleteProject,
} from "@/features/project/hooks/project.hook";

// components
import { ProjectForm } from "./ProjectForm";
import { updateProject } from "../api/project.api";

export const ProjectsPage = () => {
  // state
  const [data, setData] = useState<any[]>([]);

  // hooks
  const navigate = useNavigate();
  const deleteProject = useDeleteProject();
  const { data: projects, isLoading, error } = useProjects();

  // effect
  useEffect(() => {
    if (projects) setData(projects);
  }, [projects]);

  // methods

  const handleLogout = useCallback(() => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/login";
  }, []);

  const openDeleteConfirmModal = useCallback(
    (row: any) => {
      const { id, title } = row.original;

      modals.openConfirmModal({
        title: "Delete Project",
        children: (
          <Text>
            Are you sure you want to delete <b>{title}</b>?
          </Text>
        ),
        labels: { confirm: "Delete", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: () => {
          deleteProject.mutate(id, {
            onSuccess: () => {
              notifications.show({
                title: "Project deleted",
                message: `${title} has been deleted.`,
                color: "green",
              });
            },
            onError: () => {
              notifications.show({
                title: "Error",
                message: `Failed to delete ${title}.`,
                color: "red",
              });
            },
          });
        },
      });
    },
    [deleteProject]
  );

  // memos
  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "description", header: "Description" },
    ],
    []
  );

  // loading state
  if (isLoading) {
    return (
      <Container size="xl" style={{ minHeight: "60vh" }}>
        <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
          <Loader size="lg" />
        </Flex>
      </Container>
    );
  }

  // error state
  if (error || !projects) {
    return (
      <Container size="xl" py="xl">
        <Alert title="Error" color="red">
          Failed to load projects.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Flex justify="space-between" align="center" mb="md">
        <h2>Projects</h2>
        <Button variant="light" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>

      <ProjectForm />

      {data.length === 0 ? (
        <Paper withBorder p="md" mb="md">
          <Text ta="center" c="dimmed">
            No projects found. Maybe it's time to start one and become famous!
          </Text>
        </Paper>
      ) : (
        <MantineReactTable
          columns={columns}
          data={data}
          autoResetPageIndex={false}
          enableRowOrdering
          enableRowActions
          enableSorting={false}
          enableTopToolbar={false}
          layoutMode="grid"
          paginationDisplayMode="pages"
          positionActionsColumn="last"
          mantineTableBodyRowProps={({ row }) => ({
            onClick: () => navigate(`/project/${row.original.id}`),
            style: { cursor: "pointer" },
          })}
          mantinePaginationProps={{
            px: "md",
            py: "sm",
          }}
          renderRowActions={({ row, table }) => (
            <Flex gap="md">
              <Tooltip label="Edit">
                <ActionIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    table.setEditingRow(row);
                  }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteConfirmModal(row);
                  }}
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
                const newData = [...data];
                newData.splice(
                  hoveredRow.index,
                  0,
                  newData.splice(draggingRow.index, 1)[0]
                );
                setData(newData);
              }
            },
          })}
          onEditingRowSave={async ({ values, row, table }) => {
            const projectUpdate: { title: string; description?: string } = {
              title: values.title,
              description: values.description,
            };
            await updateProject(row.original.id, projectUpdate);
            table.setEditingRow(null);
          }}
        />
      )}
    </Container>
  );
};

export default ProjectsPage;

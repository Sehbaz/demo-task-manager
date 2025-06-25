import { useEffect, useMemo, useState } from "react";

import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "./hook";
import { Link, useNavigate } from "react-router-dom";
import { ProjectForm } from "./ProjectForm";
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
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export function ProjectPage() {
  const navigate = useNavigate();

  const { data: projects, isLoading, error } = useProjects();
  const deleteProject = useDeleteProject();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/login";
  };

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (projects) {
      setData(projects);
    }
  }, [projects]);

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "title" },
      { accessorKey: "description", header: "Description" },
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

  if (error || !projects) {
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
        deleteProject.mutate(row.original.id);
      },
    });

  // const updateProject = useUpdateProject();

  return (
    <Container size="xl" py="xl">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Projects</h2>
        <Button variant="filled" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <ProjectForm />
      <MantineReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={data}
        enableRowOrdering
        enableRowActions // <-- Add this line!
        positionActionsColumn="last"
        enableSorting={false}
        enableTopToolbar={false}
        layoutMode="grid"
        paginationDisplayMode="pages"
        renderRowActions={({ row, table }) => (
          <Flex gap="md">
            <Tooltip label="Edit">
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
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
                  e.stopPropagation(); // Prevent row click
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
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0]
              );
            }
          },
          onClick: () => {
            const { hoveredRow } = table.getState();

            console.log("howered row", hoveredRow);
          },
        })}
        renderEditRowModalContent={({ row }) => (
          <ProjectForm project={row.original} />
        )}
        mantineTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/project/${row.original.id}`),
          style: { cursor: "pointer" },
        })}
      />

      {/* <div style={{ marginTop: "2rem" }}>
        {projects?.map((project: any) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </h3>
              <p>{project.description}</p>
              <button onClick={() => deleteProject.mutate(project.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </Container>
  );
}

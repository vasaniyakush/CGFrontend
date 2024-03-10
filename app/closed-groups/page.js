"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Fab,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import api from "@/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddClosedGroupModal from "@/components/CreateGroupModal";
// AddClosedGroupModal

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const theme = useTheme();
  const handleAddUserOpen = () => setAddUserOpen(true);
  const handleAddUserClose = () => setAddUserOpen(false);

  const columns = [
    {
      // field:"id",

      renderCell: (params) => {
        return (
          <Link target="_blank" href={"/closed-groups/" + params.row.id}>
            <Button color="primary">Open</Button>
          </Link>
        );
      },
    },
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width:200 },
    { field: "personLimit", headerName: "Person Limit", type: "number" },
    { field: "savingGoal", headerName: "Cycle Amount", type: "number" },
    {
      field: "payoutDuration",
      headerName: "Cycle Time",
      // description: "This column has a value getter and is not sortable.",
      valueGetter: (params) => `${params.row.payoutDuration} days`,
    },
    {
      field: "active",
      headerName: "Active Status",
      // description: "This column has a value getter and is not sortable.",
      valueGetter: (params) => (params.row.active ? "Active" : "Disabled"),
    },
    {
      field: "started",
      headerName: "Cycles Started",
      // description: "This column has a value getter and is not sortable.",
      valueGetter: (params) =>
        params.row.started ? "Waiting for members" : "Started",
      width: 160,
    },
    {
      field: "type",
      headerName: "Type",
      // description: "This column has a value getter and is not sortable.",
      // width:200
    },
    {
      field: "current_cycle",
      headerName: "Current Cycle",
      // description: "This column has a value getter and is not sortable.",
      // width:200
    },
    {
      field: "code",
      headerName: "Group Code",
      // description: "This column has a value getter and is not sortable.",
      width: 120,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      // description: "This column has a value getter and is not sortable.",
      renderCell: (params) => {
        return (
          <>
            {params.row.byAdmin ? (
              <Chip variant="outlined" color="primary" label="Admin" />
            ) : (
              <Typography>{params.row.FrontUser.Username}</Typography>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getClosedGroups();
    setLoading(true);
      setLoading(false);
 
  }, [refresh]);

  async function getClosedGroups() {
    // setLoading(true);
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await api.get("admin/closed-groups");
      console.log(response.data);
      setGroups(response.data.groups);
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
      // setLoading(false);
    }
  }

  function toggleRefresh() {
    setRefresh((prevRefresh) => !prevRefresh);
  }

  return (
    <>
      <Container disableGutters sx={{ width: "100%" }} maxWidth="false" fixed>
        <Box disableGutters sx={{ height: "80vh" }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              // editMode="false"
              rows={groups}
              columns={columns}
              autoPageSize
              loading={loading}
              disableRowSelectionOnClick
              disableColumnSelector
              disableColumnMenu
              disableColumnFilter
              disableDensitySelector
              // onRowClick={handleRowClick}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
            <Button variant="outlined" onClick={toggleRefresh}>Refresh</Button>
          </ThemeProvider>
          <Fab
            onClick={handleAddUserOpen}
            color="primary"
            sx={{
              position: "absolute",
              bottom: 16,
              // ml:"30%",
              // mr:"30%"
              right: 140,
              bottom: 16
            }}
            variant="extended"
            aria-label="add"
          >
            <AddIcon sx={{ mr: "auto",ml:"auto" }} />
            Create Group
          </Fab>
        </Box>
      </Container>
      <Modal
        open={addUserOpen}
        onClose={handleAddUserClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <AddClosedGroupModal setAddUserOpen={setAddUserOpen} refresh={toggleRefresh}/>
        </Box>
      </Modal>
    </>
  );
}

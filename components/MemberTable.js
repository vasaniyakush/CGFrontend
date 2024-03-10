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
function formatDateTime(datetime) {
    const date = new Date(datetime);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
    return formattedDateTime;
}

export default function MemberTable(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const theme = useTheme();
  const { groupId } = props;

  const columns = [
    // {
    //   // field:"id",

    //   renderCell: (params) => {
    //     return (
    //       <Link target="_blank" href={"/closed-groups/" + params.row.id}>
    //         <Button color="primary">Open</Button>
    //       </Link>
    //     );
    //   },
    // },
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) => `${params.row.FrontUser.Username}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => `${params.row.FrontUser.Email}`,
    },
    {
      field: "phone",
      headerName: "Mobile Number",
      width: 200,
    valueGetter: (params) => `${params.row.FrontUser.MobileNumber}`,
},
{
    field: "joined",
    headerName: "Joined on",
      width: 200,
      //   type:"dateTime",
      // description: "This column has a value getter and is not sortable.",
      valueGetter: (params) => formatDateTime(params.row.createdAt),
    },
    {
        field: "active",
        width: 200,
      headerName: "Active Status",
      // description: "This column has a value getter and is not sortable.",
      valueGetter: (params) => (params.row.active ? "Active" : "Inactive"),
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
      const response = await api.get(`closed-group/${groupId}/members`);
      console.log(response.data);
      setGroups(response.data.closedGroup.rows);
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
      // setLoading(false);
    }
  }

  return (
    <>
      {/* <Container disableGutters sx={{ width: "100%" }} maxWidth="false" fixed> */}
      <Box disableGutters sx={{ height: "60vh" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            // editMode="false"
            rows={users}
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
        </ThemeProvider>
      </Box>
      {/* </Container> */}
    </>
  );
}

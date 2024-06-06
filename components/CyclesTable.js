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
function formatDateTime(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-").map(Number);
  const monthName = months[month - 1]; // Adjust for zero-based indexing
  const formattedDateTime = `${monthName} ${day}, ${year}`;
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
    { field: "serial", headerName: "Cy. No.", width: 70 },
    { field: "payout_serial", headerName: "Py. No.", width: 70 },
    {
      field: "execute_date",
      headerName: "Pay Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Typography variant="h6">
              {formatDateTime(params.row.execute_date)}
            </Typography>
          </>
        );
      },
    },
    {
      field: "isExecuted",
      headerName: "Executed?",
      width: 200,
      valueGetter: (params) => (params.row.isExecuted ? "YES" : "NO"),
    },
    {
      field: "active",
      headerName: "Active?",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.active ? (
              <Chip
                size="xl"
                variant="outlined"
                color="success"
                label="Active"
              />
            ) : (
              <Chip
                size="xl"
                variant="outlined"
                color="warning"
                label="InActive"
              />
            )}
          </>
        );
      },
    },
    {
      field: "userId",
      headerName: "User Name",
      width: 200,
      valueGetter: (params) => {
        // console.log("params: ", params.row.CycleUser);
        return params.row.CycleUser?.Username || "Hello";
      },
    },
    {
      field: "payout",
      headerName: "Payout Type",

      width: 200,

      // description: "This column has a value getter and is not sortable.",
      renderCell: (params) => {
        return (
          <>
            {params.row.payout.type == "pay" ? (
              <Chip
                size="xl"
                variant="filled"
                color="success"
                label="Incoming"
              />
            ) : (
              <Chip size="xl" variant="filled" color="error" label="Outgoing" />
            )}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 200,
      valueGetter: (params) => {
        // console.log("params: ", params.row.CycleUser);
        return params.row.payout.status;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      valueGetter: (params) => {
        // console.log("params: ", params.row.CycleUser);
        return params.row.payout.amount;
      },
    },
    {
      field: "success",
      headerName: "Payment Successfull?",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.payout.accepted ? (
              <Chip size="xl" variant="outlined" color="success" label="Yes" />
            ) : (
              <Chip size="xl" variant="filled" color="error" label="No" />
            )}
          </>
        );
      },
    },

    // {
    //   field: "email",
    //   headerName: "Email",
    //   width: 200,
    //   valueGetter: (params) => `${params.row.FrontUser.Email}`,
    // },
    // {
    //   field: "phone",
    //   headerName: "Mobile Number",
    //   width: 200,
    //   valueGetter: (params) => `${params.row.FrontUser.MobileNumber}`,
    // },
    // {
    //   field: "joined",
    //   headerName: "Joined on",
    //   width: 200,
    //   //   type:"dateTime",
    //   // description: "This column has a value getter and is not sortable.",
    //   valueGetter: (params) => formatDateTime(params.row.createdAt),
    // },
    // {
    //   field: "active",
    //   width: 200,
    //   headerName: "Active Status",
    //   // description: "This column has a value getter and is not sortable.",
    //   valueGetter: (params) => (params.row.active ? "Active" : "Inactive"),
    // },
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
      const response = await api.get(`closed-group/${groupId}/cycles`);
      console.log("CYCLLESS", response.data);
      setGroups(response.data);
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

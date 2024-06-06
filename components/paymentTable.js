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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import api from "@/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import AddClosedGroupModal from "@/components/CreateGroupModal";

function formatDateTime(datetime) {
  const date = new Date(datetime);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  return formattedDateTime;
}

export default function PaymentTable(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const theme = useTheme();
  //   const { groupId } = props;

  const columns = [
    {
      field: "check_id",
      headerName: "ID",
      width: 200,
      valueGetter: (params) => `${params.row.check_id}`,
    },
    { field: "number", headerName: "Number", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "fee", headerName: "Fee", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "identifier", headerName: "Identifier", width: 200 },
    { field: "sndr_name", headerName: "Sender Name", width: 200 },
    { field: "sndr_email", headerName: "Sender Email", width: 200 },
    { field: "sndr_bname", headerName: "Sender Bank Name", width: 200 },
    { field: "sndr_lbacc", headerName: "Sender LBACC", width: 200 },
    { field: "rec_name", headerName: "Receiver Name", width: 200 },
    { field: "is_same_day", headerName: "Is Same Day", width: 150 },
    { field: "same_day_delay", headerName: "Same Day Delay", width: 200 },
    { field: "estimated_at", headerName: "Estimated At", width: 200 },
    { field: "rec_email", headerName: "Receiver Email", width: 200 },
    { field: "rec_bname", headerName: "Receiver Bank Name", width: 200 },
    { field: "rec_lbacc", headerName: "Receiver LBACC", width: 200 },
    { field: "direction", headerName: "Direction", width: 150 },
    { field: "debit_date", headerName: "Debit Date", width: 200 },
    { field: "credit_date", headerName: "Credit Date", width: 200 },
    { field: "printed_date", headerName: "Printed Date", width: 200 },
    { field: "recurring", headerName: "Recurring", width: 150 },
    { field: "receive_date", headerName: "Receive Date", width: 200 },
  ];

  useEffect(() => {
    getClosedGroups();
    setLoading(true);
    setLoading(false);
  }, [refresh]);

  async function getClosedGroups() {
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const axios = require("axios");

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://sandbox-paynote.seamlesschex.com/v1/check",
        headers: {
          Authorization: "sk_test_01HME7PCWSQ3ZPGD70K3VSVDD6",
          "Content-Type": "application/form-data",
        },
      };

      axios
        .request(config)
        .then((response) => {
          setGroups(response.data.list);
          console.log("payment", response.data.list);
        })
        .catch((error) => {
          console.log(error);
        });
      setGroups(response.data.closedGroup.rows);
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
      // setLoading(false);
    }
  }

  return (
    <>
      <Box disableGutters sx={{ height: "60vh" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            getRowId={(row) => row.check_id}
            rows={users}
            columns={columns}
            autoPageSize
            loading={loading}
            disableRowSelectionOnClick
            disableColumnSelector
            disableColumnMenu
            disableColumnFilter
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </ThemeProvider>
      </Box>
    </>
  );
}

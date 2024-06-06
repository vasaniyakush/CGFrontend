"use client";
import api from "@/api";
import PaymentTable from "@/components/paymentTable";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  // width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
export default function Home({ openTab }) {
  // const router = useRouter();
  const [detailsLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDashboardData();
    // setLoading(false);
  }, [refresh]);

  async function getDashboardData() {
    // setLoading(true);
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await api.get(`admin/dashboard`);
      console.log("Dashboard", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box sx={{ display: "flex", ml: 0 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          ml: 0,
        }}
      >
        <Container maxWidth={"xl"} sx={{ mt: 1, mb: 1, ml: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {false && detailsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={240}
                  sx={{ mt: 0 }}
                ></Skeleton>
              ) : (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    height: 150,
                  }}
                >
                  {/* <GroupDetails details={details} /> */}

                  <Grid container overflow={"auto"} spacing={3}>
                    <Grid item xs={3} md={3}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="primary"
                        gutterBottom
                        style={{ textAlign: "center" }}
                      >
                        Closed Groups
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        style={{ textAlign: "center" }}
                        variant="h4"
                      >
                        {data?.totalGroups}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="primary"
                        style={{ textAlign: "center" }}
                        gutterBottom
                      >
                        Public Closed Groups:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        style={{ textAlign: "center" }}
                        component="p"
                        variant="h4"
                      >
                        {data?.publicGroups}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="primary"
                        style={{ textAlign: "center" }}
                        gutterBottom
                      >
                        Private Closed Groups:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        variant="h4"
                        style={{ textAlign: "center" }}
                      >
                        {data?.privateGroups}
                        {/* {data.started ? "Running" : "Waiting for Members"} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              {detailsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={240}
                  sx={{ mt: 0 }}
                ></Skeleton>
              ) : (
                <Paper
                  sx={{
                    // p: 2,
                    display: "flex",
                    flexDirection: "row",
                    // height: 150,
                  }}
                >
                  <Grid container overflow={"auto"} spacing={3}>
                    <Grid item xs={6} md={6} lg={6}>
                      <PieChart
                        series={[
                          {
                            arcLabel: (item) => `${item.value}`,
                            arcLabelMinAngle: 45,
                            data: [
                              {
                                value: data?.publicGroups,
                                label: "Public Closed Groups",
                              },
                              {
                                value: data?.privateGroups,
                                label: "Private Closed Groups",
                              },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            // startAngle: -90,
                            // endAngle: 180,
                            // cx: 150,
                            // cy: 150,
                          },
                        ]}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fill: "white",
                            fontWeight: "bold",
                          },
                        }}
                        width={600}
                        height={300}
                      ></PieChart>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <PieChart
                        series={[
                          {
                            arcLabel: (item) => `${item.value}`,
                            arcLabelMinAngle: 45,
                            data: [
                              {
                                value: data?.totalUsers,
                                label: "Checkr Validated Users",
                              },
                              {
                                value: data?.totalUsers,
                                label: "Validation Pending Users",
                              },
                              {
                                value: 0,
                                label: "Invalidated Users",
                              },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            // startAngle: -90,
                            // endAngle: 180,
                            // cx: 150,
                            // cy: 150,
                          },
                        ]}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fill: "white",
                            fontWeight: "bold",
                          },
                        }}
                        width={600}
                        height={300}
                      ></PieChart>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {detailsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={240}
                  sx={{ mt: 0 }}
                ></Skeleton>
              ) : (
                <Paper
                  sx={{
                    // p: 2,
                    display: "flex",
                    flexDirection: "row",
                    // height: 150,
                  }}
                >
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: data?.lastSixMonths.map((item) => item.month),
                      },
                    ]}
                    series={[
                      {
                        data: data?.lastSixMonths.map(
                          (item) => item.outgoingMoney
                        ),
                        label: "Outgoing Money",
                      },
                      {
                        data: data?.lastSixMonths.map(
                          (item) => item.incomingMoney
                        ),
                        label: "Incoming Money",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "rainfall (mm)",
                      },
                    ]}
                    sx={{
                      [`.${axisClasses.left} .${axisClasses.label}`]: {
                        transform: "translate(-20px, 0)",
                      },
                    }}
                    grid={{ horizontal: true }}
                    // width={500}
                    height={300}
                  />
                </Paper>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              {false && detailsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={240}
                  sx={{ mt: 0 }}
                ></Skeleton>
              ) : (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    height: 150,
                  }}
                >
                  {/* <GroupDetails details={details} /> */}

                  <Grid container overflow={"auto"} spacing={3}>
                    <Grid item xs={2} md={2}>
                      <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                        style={{ textAlign: "center" }}
                      >
                        Active Groups
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        style={{ textAlign: "center" }}
                        variant="h5"
                      >
                        {data?.activeGroups}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        style={{ textAlign: "center" }}
                        gutterBottom
                      >
                        Inactive Groups:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        variant="h5"
                        style={{ textAlign: "center" }}
                      >
                        {data?.inactiveGroups}
                        {/* {data.started ? "Running" : "Waiting for Members"} */}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                        style={{ textAlign: "center" }}
                      >
                        Pending Groups
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        style={{ textAlign: "center" }}
                        variant="h5"
                      >
                        {data?.pendingGroups}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} md={2}>
                      <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        style={{ textAlign: "center" }}
                        gutterBottom
                      >
                        Running Groups:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        style={{ textAlign: "center" }}
                        component="p"
                        variant="h5"
                      >
                        {data?.runningGroups}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} md={2}>
                      <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        style={{ textAlign: "center" }}
                        gutterBottom
                      >
                        Completed Groups:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        mt={2}
                        component="p"
                        variant="h5"
                        style={{ textAlign: "center" }}
                      >
                        {data?.completedGroups}
                        {/* {data.started ? "Running" : "Waiting for Members"} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>
            {true && (
              <Grid item xs={12} md={6} lg={6}>
                {detailsLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={240}
                    sx={{ mt: 0 }}
                  ></Skeleton>
                ) : (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Grid container overflow={"auto"} spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Total Cash Flow
                        </Typography>
                        {/* <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.totalGroups}
                        </Typography> */}
                        <Divider />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Outgoing:
                        </Typography>
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.overall.outgoingMoney}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Divider orientation="vertical" />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Incoming:
                        </Typography>
                        {/* <Divider /> */}
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.overall.incomingMoney}
                          {/* {data.started ? "Running" : "Waiting for Members"} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Grid>
            )}
            {true && (
              <Grid item xs={12} md={6} lg={6}>
                {detailsLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={240}
                    sx={{ mt: 0 }}
                  ></Skeleton>
                ) : (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Grid container overflow={"auto"} spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Current Month Cash Flow
                        </Typography>
                        {/* <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.totalGroups}
                        </Typography> */}
                        <Divider />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Outgoing:
                        </Typography>
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.month.outgoingMoney}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Divider orientation="vertical" />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Incoming:
                        </Typography>
                        {/* <Divider /> */}
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.month.incomingMoney}
                          {/* {data.started ? "Running" : "Waiting for Members"} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Grid>
            )}
            {true && (
              <Grid item xs={12} md={6} lg={6}>
                {detailsLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={240}
                    sx={{ mt: 0 }}
                  ></Skeleton>
                ) : (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Grid container overflow={"auto"} spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Current Week Cash Flow
                        </Typography>
                        {/* <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.totalGroups}
                        </Typography> */}
                        <Divider />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Outgoing:
                        </Typography>
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.week.outgoingMoney}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Divider orientation="vertical" />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Incoming:
                        </Typography>
                        {/* <Divider /> */}
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.week.incomingMoney}
                          {/* {data.started ? "Running" : "Waiting for Members"} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Grid>
            )}
            {true && (
              <Grid item xs={12} md={6} lg={6}>
                {detailsLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={240}
                    sx={{ mt: 0 }}
                  ></Skeleton>
                ) : (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Grid container overflow={"auto"} spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Current Day Cash Flow
                        </Typography>
                        {/* <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.totalGroups}
                        </Typography> */}
                        <Divider />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Outgoing:
                        </Typography>
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.day.outgoingMoney}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Divider orientation="vertical" />
                      </Grid>

                      <Grid item xs={5} md={5}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="primary"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Incoming:
                        </Typography>
                        {/* <Divider /> */}
                        <Typography
                          component="p"
                          variant="h4"
                          style={{ textAlign: "center" }}
                        >
                          {data?.day.incomingMoney}
                          {/* {data.started ? "Running" : "Waiting for Members"} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Grid>
            )}

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Payments
                </Typography>
                <PaymentTable />
                {/* <MemberTable groupId={params.id} /> */}
              </Paper>
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  );
}

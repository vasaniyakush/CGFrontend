// import GroupDetails from "@/components/GroupDetails";
"use client";
import api from "@/api";
// import InvitesList from "@/components/InvitesList";
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
// import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Options({ openTab }) {
  const [payoutDuration, setPayoutDuration] = React.useState(null);
  const [personLimit, setPersonLimit] = React.useState(null);
  const [savingGoal, setSavingGoal] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const [payoutDurations, setPayoutDurations] = React.useState([]);
  const [personLimits, setPersonLimits] = React.useState([]);
  const [savingGoals, setSavingGoals] = React.useState([]);

  const handleParticipantDelete = (e, index) => {
    console.log(e, index);
    setPersonLimits(personLimits.filter((item) => item.key != index));
  };
  const handleSavingGoalDelete = (e, index) => {
    console.log(e, index);
    setSavingGoals(savingGoals.filter((item) => item.key != index));
  };
  const handlePayoutDurationDelete = (e, index) => {
    console.log(e, index);
    setPayoutDurations(payoutDurations.filter((item) => item.key != index));
  };

  const handleParticipantAdd = (e, index) => {
    console.log(e, index);
    if (
      personLimit == 0 ||
      isNaN(personLimit) ||
      personLimit == null ||
      personLimit == undefined
    ) {
      alert("Please enter a valid number of participants");
      return;
    }
    if (personLimit % 3 != 0) {
      alert("Number of participants must be a multiple of 3");
      return;
    }
    if (personLimits.find((item) => item.value == personLimit)) {
      alert("This number of participants already exists");
      return;
    }
    setPersonLimits([
      ...personLimits,
      { key: personLimits.length, value: personLimit },
    ]);
    setPersonLimit(0);
  };
  const handleSavingGoalAdd = (e, index) => {
    console.log(e, index);
    if (
      savingGoal == 0 ||
      isNaN(savingGoal) ||
      savingGoal == null ||
      savingGoal == undefined
    ) {
      alert("Please enter a valid saving goal");
      return;
    }
    if (savingGoals.find((item) => item.value == savingGoal)) {
      alert("This saving goal already exists");
      return;
    }
    setSavingGoals([
      ...savingGoals,
      { key: savingGoals.length, value: savingGoal },
    ]);
    setSavingGoal(0);
  };
  const handlePayoutDurationAdd = (e, index) => {
    console.log(e, index);
    if (
      payoutDuration == 0 ||
      isNaN(payoutDuration) ||
      payoutDuration == null ||
      payoutDuration == undefined
    ) {
      alert("Please enter a valid payout duration");
      return;
    }
    if (payoutDurations.find((item) => item.value == payoutDuration)) {
      alert("This payout duration already exists");
      return;
    }
    if (payoutDuration < 7) {
      alert("Payout duration must be greater than 7 days");
      return;
    }
    setPayoutDurations([
      ...payoutDurations,
      { key: payoutDurations.length, value: payoutDuration },
    ]);
    setPayoutDuration(0);
  };

  const handleParticipantSave = async (e, index) => {
    setLoading(true);
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let data = JSON.stringify({
      name: "PARTICIPANTS",
      values: personLimits.map((item) => item.value),
    });
    await api.post("admin/options", data);
    setLoading(false);
    alert("Participants List saved successfully");
  };
  const handleSavingGoalSave = async (e, index) => {
    setLoading(true);
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let data = JSON.stringify({
      name: "AMOUNTS",
      values: savingGoals.map((item) => item.value),
    });
    await api.post("admin/options", data);
    setLoading(false);
    alert("Saving Goals List saved successfully");
  };
  const handlePayoutDurationSave = async (e, index) => {
    setLoading(true);
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let data = JSON.stringify({
      name: "DURATIONS",
      values: payoutDurations.map((item) => item.value),
    });
    await api.post("admin/options", data);
    setLoading(false);
    alert("Payout Durations List saved successfully");
  };

  async function getAllOptions() {
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      let response = await api.get("closed-group/participants");
      // personLimits.push(response.data['participantList'])
      setPersonLimits(
        response.data["participantList"].map((item, index) => {
          return { key: index, value: item };
        })
      );
      response = await api.get("closed-group/contribution-amounts");
      // savingGoals.push(response.data['ContributionAmounts'])
      setSavingGoals(
        response.data["ContributionAmounts"].map((item, index) => {
          return { key: index, value: item };
        })
      );
      response = await api.get("closed-group/payout-durations");
      // payoutDurations.push(response.data['ContributionAmounts'])
      setPayoutDurations(
        response.data["PayoutDurations"].map((item, index) => {
          return { key: index, value: item };
        })
      );

      // console.log(response.data);
      // payoutDurations = response.data;
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
    }
  }

  React.useEffect(() => {
    getAllOptions();
  }, []);
  return (
    // <Typography paragraph>
    //   HEllo {openTab}
    //   </Typography>
    <Box sx={{ display: "flex", ml: 0 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          ml: 0,
          // overflow: "auto",
        }}
      >
        <Container maxWidth="false" sx={{ mt: 1, mb: 1, ml: 0 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 200,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Set Group Creation Options
                </Typography>
                <Container maxWidth="false" sx={{ mt: 2, mb: 0, ml: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={4.5}>
                      <Typography
                        // component="h2"
                        variant="h5"
                        // color="primary"
                        gutterBottom
                      >
                        Number of participants
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                          <TextField
                            required
                            id="name"
                            // value={name}
                            value={personLimit}
                            onChange={(e) =>
                              setPersonLimit(parseInt(e.target.value))
                            }
                            // onChange={handleNameChange}
                            // name="name"
                            placeholder="Group size . . ."
                            // label="Group Name"
                            fullWidth
                            type="numBer"
                            // autoComplete="given-name"
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center", ml: 2 }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => {
                              handleParticipantAdd();
                            }}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </LoadingButton>
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center" }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => {
                              handleParticipantSave();
                            }}
                            endIcon={<SaveIcon />}
                            loadingPosition="start"
                            loading={loading}
                          >
                            Save
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} md={1} lg={0.5}>
                      <Divider orientation="vertical"></Divider>
                    </Grid>
                    <Grid item xs={7} md={7} lg={7}>
                      <Grid container spacing={1}>
                        {personLimits.map((item) => {
                          return (
                            <Grid key={item.key} item xs={2} md={2} lg={2}>
                              <Chip
                                key={item.key}
                                size="medium"
                                color="warning"
                                // variant="success"
                                label={item.value + " people"}
                                deleteIcon={<DeleteIcon />}
                                onDelete={(e) =>
                                  handleParticipantDelete(e, item.key)
                                }
                                variant="outlined"
                              ></Chip>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Paper>
            </Grid>

            {/* Recent Orders */}
            {/* <Grid item x/ */}
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
        <Container maxWidth="false" sx={{ mt: 1, mb: 1, ml: 0 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 200,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Set Group Creation Options
                </Typography>
                <Container maxWidth="false" sx={{ mt: 2, mb: 0, ml: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={4.5}>
                      <Typography
                        // component="h2"
                        variant="h5"
                        // color="primary"
                        gutterBottom
                      >
                        Contribution Amounts
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                          <TextField
                            required
                            id="name"
                            value={savingGoal}
                            onChange={(e) =>
                              setSavingGoal(parseInt(e.target.value))
                            }
                            // value={name}
                            // onChange={handleNameChange}

                            placeholder="Contribution amount . . ."
                            // label="Group Name"
                            fullWidth
                            type="numBer"
                            // autoComplete="given-name"
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center", ml: 2 }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => handleSavingGoalAdd()}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </LoadingButton>
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center" }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => handleSavingGoalSave()}
                            endIcon={<SaveIcon />}
                            loadingPosition="start"
                            loading={loading}
                          >
                            Save
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} md={1} lg={0.5}>
                      <Divider orientation="vertical"></Divider>
                    </Grid>
                    <Grid item xs={7} md={7} lg={7}>
                      <Grid container spacing={1}>
                        {savingGoals.map((item) => {
                          return (
                            <Grid
                              key={item.key}
                              item
                              xs={1.5}
                              md={1.5}
                              lg={1.5}
                            >
                              <Chip
                                key={item.key}
                                size="medium"
                                color="success"
                                // variant="success"
                                label={"$" + item.value}
                                deleteIcon={<DeleteIcon />}
                                onDelete={(e) =>
                                  handleSavingGoalDelete(e, item.key)
                                }
                                variant="outlined"
                              ></Chip>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Paper>
            </Grid>

            {/* Recent Orders */}
            {/* <Grid item x/ */}
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
        <Container maxWidth="false" sx={{ mt: 1, mb: 1, ml: 0 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 200,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Set Group Creation Options
                </Typography>
                <Container maxWidth="false" sx={{ mt: 2, mb: 0, ml: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={4.5}>
                      <Typography
                        // component="h2"
                        variant="h5"
                        // color="primary"
                        gutterBottom
                      >
                        Payout Durations
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                          <TextField
                            required
                            id="name"
                            value={payoutDuration}
                            onChange={(e) =>
                              setPayoutDuration(parseInt(e.target.value))
                            }
                            // value={name}
                            // onChange={handleNameChange}
                            name="name"
                            placeholder="Payout Duration . . ."
                            // label="Group Name"
                            fullWidth
                            type="numBer"
                            // autoComplete="given-name"
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center", ml: 2 }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => handlePayoutDurationAdd()}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </LoadingButton>
                        </Grid>
                        <Grid item xs={2} md={2} lg={3}>
                          <LoadingButton
                            sx={{ alignSelf: "center" }}
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => handlePayoutDurationSave()}
                            endIcon={<SaveIcon />}
                            loadingPosition="start"
                            loading={loading}
                          >
                            Save
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} md={1} lg={0.5}>
                      <Divider orientation="vertical"></Divider>
                    </Grid>
                    <Grid item xs={7} md={7} lg={7}>
                      <Grid container spacing={1}>
                        {payoutDurations.map((item) => {
                          return (
                            <Grid key={item.key} item xs={2} md={2} lg={2}>
                              <Chip
                                key={item.key}
                                size="medium"
                                color="info"
                                // variant="success"
                                label={item.value + " days"}
                                deleteIcon={<DeleteIcon />}
                                onDelete={(e) =>
                                  handlePayoutDurationDelete(e, item.key)
                                }
                                variant="outlined"
                              ></Chip>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Paper>
            </Grid>

            {true && (
              <Grid item xs={12} md={6} lg={6}>
                {false ? (
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
                      height: 140,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Commission (%) :
                    </Typography>
                    <Input value={5} type="number"></Input>
                    {/* <Deposits /> */}
                    {/* <InvitesList name={"invite"} invites={invites}/> */}
                  </Paper>
                )}
              </Grid>
            )}

            {/* Recent Orders */}
            {/* <Grid item x/ */}
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  );
}

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import api from "@/api";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";
import { isAlphaNumeric } from "@/utils";

export default function AddressForm(props) {
  const { handleNext, setAddUserOpen, refresh } = props;
  const [personLimit, setpersonLimit] = React.useState(0);
  const handlePersonLimitChange = (e) => {
    setpersonLimit(parseInt(e.target.value));
  };
  const [payoutDuration, setpayoutDuration] = React.useState(0);
  const handlepayoutDurationChange = (e) => {
    setpayoutDuration(parseInt(e.target.value));
  };
  const [savingGoal, setsavingGoal] = React.useState(0);
  const handlesavingGoalChange = (e) => {
    setsavingGoal(parseInt(e.target.value));
  };

  const [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [type, setType] = React.useState("public");
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const [err, setErr] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErr("");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [payoutDurations, setPayoutDurations] = React.useState([0]);
  const [personLimits, setPersonLimits] = React.useState([0]);
  const [savingGoals, setSavingGoals] = React.useState([0]);

  async function getAllOptions() {
    const token = Cookies.get("token");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      let response = await api.get("closed-group/participants");
      // personLimits.push(response.data['participantList'])
      setPersonLimits([0, ...response.data["participantList"]]);
      response = await api.get("closed-group/contribution-amounts");
      // savingGoals.push(response.data['ContributionAmounts'])
      setSavingGoals([0, ...response.data["ContributionAmounts"]]);
      response = await api.get("closed-group/payout-durations");
      // payoutDurations.push(response.data['ContributionAmounts'])
      setPayoutDurations([0, ...response.data["PayoutDurations"]]);

      // console.log(response.data);
      // payoutDurations = response.data;
    } catch (error) {
      console.error("Error fetching closed groups:", error);
    } finally {
    }
  }

  const handleFormSubmit = async () => {
    if (name.trim() == "") {
      setErr(`Name cannot be Blank`);
      setName("");
      setOpen(true);
    } else if (!isAlphaNumeric(name)) {
      setErr(`Name can only contain English Alphabets`);
      setOpen(true);
    } else if (personLimit == 0) {
      setErr(`Group size cannot be 0`);
      setOpen(true);
    } else if (savingGoal == 0) {
      setErr(`Contribution Amount cannot be 0`);
      setOpen(true);
    } else if (payoutDuration == 0) {
      setErr(`Payout Duration cannot be 0`);
      setOpen(true);
    } else {
      let data = JSON.stringify({
        name: name,
        personLimit: personLimit,
        roundDuration: payoutDuration,
        savingGoal: savingGoal,
        type: type,
      });
      try {
        await api.post("/closed-group", data);
        handleNext();
        refresh();
      } catch (error) {
        console.error("Error fetching closed groups:", error);
        setErr(
          error.message +
            " " +
            (error?.response?.data?.message
              ? error?.response?.data?.message
              : "")
        );
        setOpen(true);
      } finally {
      }
    }
  };

  React.useEffect(() => {
    getAllOptions();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" mb={0}>
        Name
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={8}>
          <TextField
            required
            id="name"
            value={name}
            onChange={handleNameChange}
            name="name"
            placeholder="Closed group name . . ."
            // label="Group Name"
            fullWidth
            // autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        {/* PERSON LIMIT */}

        <Grid item xs={8} sm={8}>
          <InputLabel variant="standard" htmlFor="select-person-limit">
            <Typography variant="h6" mb={0}>
              Group Size
            </Typography>
          </InputLabel>
          <Select
            // labelId="demo-simple-select-label"
            id="select-person-limit"
            placeholder="Select a Group Size"
            value={personLimit}
            fullWidth={true}
            label="PersonLimit"
            onChange={handlePersonLimitChange}
          >
            {personLimits.map((val) => (
              <MenuItem key={val} value={val}>
                {val === 0 ? "Select Group Size..." : val + " People"}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={8} sm={8}>
          <InputLabel variant="standard" htmlFor="select-person-limit">
            <Typography variant="h6" mb={0}>
              Contribution Amount (per payout)
            </Typography>
          </InputLabel>
          <Select
            id="select-saving-goal"
            value={savingGoal}
            fullWidth={true}
            label="Saving Goal"
            onChange={handlesavingGoalChange}
          >
            {savingGoals.map((val) => (
              <MenuItem key={val} value={val}>
                {val === 0 ? "Select Contribution Amount..." : "$" + val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={8} sm={8}>
          <InputLabel variant="standard" htmlFor="select-person-limit">
            <Typography variant="h6" mb={0}>
              Payout Duration (Days)
            </Typography>
          </InputLabel>
          <Select
            id="select-payout-durations"
            value={payoutDuration}
            fullWidth={true}
            label="Saving Goal"
            onChange={handlepayoutDurationChange}
          >
            {payoutDurations.map((val) => (
              <MenuItem key={val} value={val}>
                {val === 0 ? "Select Payout Duration..." : val + " Days"}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={8} sm={8}>
          <InputLabel variant="standard" htmlFor="select-person-limit">
            <Typography variant="h6" mb={0}>
              Type
            </Typography>
          </InputLabel>
          <Select
            id="select-payout-durations"
            value={type}
            fullWidth={true}
            label="Saving Goal"
            onChange={handleTypeChange}
          >
            {/* {payoutDurations.map((val) => ( */}
            <MenuItem key={"public"} value={"public"}>
              {"Public"}
            </MenuItem>
            <MenuItem key={"private"} value={"private"}>
              {"Private"}
            </MenuItem>
            {/* ))} */}
          </Select>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          setAddUserOpen(false);
        }}
        sx={{ mt: 3, ml: 1 }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleFormSubmit}
        sx={{ mt: 3, ml: 1 }}
      >
        Submit
      </Button>
      {/* </FormControl> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={err}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {err}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

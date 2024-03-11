// import { Title } from "@mui/icons-material";
import { Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export default function GroupDetails(props) {
  const { details } = props;

  return (
    <>
      <Grid container overflow={"auto"} spacing={3}>
        <Grid item xs={4} md={4}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Name
          </Typography>
          <Typography component="p" variant="h4">
            {details.name}
          </Typography>
        </Grid>
        <Grid item xs={4} md={4}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Created By:
          </Typography>
          <Typography component="p" variant="h6">
            {details.FrontUser.Username} | {details.FrontUser.Phone} <Divider />{" "}
            {details.FrontUser.Email}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Cycles:
          </Typography>
          <Typography component="p" variant="h6">
            {details.started ? "Running" : "Waiting for Members"}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Status:
          </Typography>
          {/* <Typography component="p" variant="h5"> */}
          {details.active ? (
            <Chip variant="filled" color="success" label="Active" />
          ) : (
            <Chip
              size="medium"
              variant="filled"
              color="error"
              label="Suspended"
            />
          )}
          {/* </Typography> */}
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Person Limit
          </Typography>
          <Typography component="p" variant="h5">
            {details.personLimit}
          </Typography>
        </Grid>
        <Grid item xs={3.5} md={3.5}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Savings Goal
          </Typography>
          <Typography component="p" variant="h6">
            ${details.savingGoal * 3} (${details.savingGoal} / payout)
          </Typography>
        </Grid>
        <Grid item xs={2.5} md={2.5}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Payout Duration
          </Typography>
          <Typography component="p" variant="h6">
            {details.payoutDuration} Days / payout
          </Typography>
        </Grid>
        <Grid item xs={1} md={1.5}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Type
          </Typography>
          <Typography component="p" variant="h5">
            {details.type}
          </Typography>
        </Grid>
        <Grid item xs={2.5} md={2.5}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Code <IconButton color="primary"
              onClick={(e) => {
                //   console.log(e.target.innerHTML);
                
                navigator.clipboard.writeText(details.code);
              }}
              size="small"
              aria-label="delete"
            >
              <ContentCopyIcon />
            </IconButton>
          </Typography>
          <Typography
            onClick={(e) => {
              //   console.log(e.target.innerHTML);
              navigator.clipboard.writeText(details.code);
            }}
            component="p"
            variant="h5"
          >
            
            {details.code}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

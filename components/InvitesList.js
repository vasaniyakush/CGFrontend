import {
    Alert,
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import api from "@/api";

export default function InvitesList(props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const { invites, name,toggleRefresh } = props;
  const [type,setType] = React.useState("error")

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

  const reqeustAction = async(status,inviteId)=>{
    console.log(status,inviteId);
    let data = JSON.stringify({
        "inviteId":parseInt(inviteId),
        "accept":parseInt(status)//or true
    });
      try {
        await api.post("closed-group/invite/action", data);
        setType(status?"success":"error")
        setErr(`Request ${status?" Accepted":" Rejected"} Successfully!`);
        setOpen(true);

        // handleNext();
      } catch (error) {
        console.error("Error fetching closed groups:", error);
        setType("error")
        setErr(error.message + " "+ (  error?.response?.data?.message ?error?.response?.data?.message:"" ));
        setOpen(true);
      } finally {
        setTimeout(() => {
          
          toggleRefresh()
        }, 2000);
      }
  }

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {name == "invite" ? "Invites" : "Requests"}
      </Typography>
      <Divider></Divider>
      <Box width={"inherit"}>
        <List>
          {console.log(invites)}

          {invites.map((invite) => {
            if (invite.status == "pending" && invite.type == name)
              return (
                <ListItem
                  key={invite.id}
                  secondaryAction={
                    <>
                      {invite.type == "invite" ? (
                        <IconButton
                        color="error"
                        edge="end"
                        aria-label="delete"
                      >
                        {/* <CancelIcon fontSize="large" /> */}
                        <Chip
                          variant="filled"
                          color="error"
                          label="Cancel Invite"
                        />
                      </IconButton>
                      ) : (
                        <>
                          <IconButton
                            size="large"
                            color="success"
                            edge="end"
                            onClick={()=>{
                                reqeustAction(1,invite.id)
                            }}
                           
                          >
                        
                            <Chip
                              variant="filled"
                              color="success"
                              label="Accept Request"
                            />
                          </IconButton>

                          <IconButton
                            color="error"
                            edge="end"
                            onClick={()=>{
                                reqeustAction(0,invite.id)
                            }}
                         
                          >
                            
                            <Chip
                              variant="filled"
                              color="error"
                              label="Reject Request"
                            />
                          </IconButton>
                        </>
                      )}
                    </>
                  }
                >

                  <ListItemText
                    primary={invite.inviteeUser.Email}
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              );
          })}


        </List>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={err}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {err}
        </Alert>
      </Snackbar>
    </>
  );
}

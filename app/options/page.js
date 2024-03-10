
// import GroupDetails from "@/components/GroupDetails";
import { Box, Container, Grid, Paper, Skeleton, Typography } from "@mui/material";

export default function Options({openTab}) {
  return (
    // <Typography paragraph>
    //   HEllo {openTab}
    //   </Typography>
    <Box sx={{ display: "flex", ml:0 }}>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          ml:0
          // overflow: "auto",
        }}
      >
<Container maxWidth="false" sx={{ mt: 1, mb: 1, ml:0 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12} >
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
                    flexDirection: "row",
                    height: 240,
                  }}
                >
                  {/* {params.id} */}
                  {/* <Chart /> */}
                  {/* <GroupDetails details={details}/> */}
                </Paper>
              )}
            </Grid>
            {true &&
            
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
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
                  {/* <InvitesList toggleRefresh={toggleRefresh} name={"request"} invites={invites}/> */}
                </Paper>
              )}
            </Grid>
            }
            {false  &&
            
            <Grid item xs={12} md={6} lg={6}>
              {true ? (
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
                  {/* <Deposits /> */}
                  {/* <InvitesList name={"invite"} invites={invites}/> */}
                </Paper>
              )}
            </Grid>
            }
            {/* Recent Orders */}
            <Grid item xs={12}>
              
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {/* <Orders /> */}
                {/* <MemberTable groupId={params.id} /> */}
              </Paper>
            
            </Grid>
            <Grid item xs={12}>
              
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {/* <Orders /> */}
                {/* <CyclesTable /> */}
              </Paper>
            
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  );
}

import { Container, Grid, Paper, Typography } from "@mui/material";
import Post from "./Post";

const InfoContent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={10}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              height: 80,
              cursor: "pointer",
              ":hover": { backgroundColor: "#ebffef", color: "green" },
              color: "text.secondary",
            }}>
            <div>
              <img
                class="relative inline-block h-12 w-12 rounded-full object-cover object-center hover:z-10 focus:z-10"
                src="https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png"
                alt="User dropdown"
              />
            </div>
            <div className="ml-5">
              <Typography sx={{ marginTop: 1.5 }}>
                Announce something to your class
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Post title="Poll for Upcoming Topics" date="16 thg 11" />
        <Post title="Sample Nest project" date="16 thg 11" />
        <Post title="Final Project Feature list" date="16 thg 11" />
        <Post title="Midterm project (Deadline Nov 15 10pm)" date="13 thg 11" />
        <Post title="Simple JWT auth with Nest" date="13thg 11" />
        <Post title="Midterm Project" date="3 thg 11" />
      </Grid>
    </Container>
  );
};

export default InfoContent;
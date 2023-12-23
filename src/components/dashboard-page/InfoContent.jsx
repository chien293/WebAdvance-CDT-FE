import { Container, Grid, Paper, Typography } from "@mui/material";
import Post from "./Post";

const InfoContent = () => {
  const cmts = [
    {
      id: 1,
      userName: "John Doe",
      date: "December 3",
      content: "This is a sample comment.",
    },
    {
      id: 2,
      userName: "John Doe",
      date: "December 3",
      content: "This is a sample comment.",
    },
    {
      id: 3,
      userName: "John Doe",
      date: "December 3",
      content: "This is a sample comment.",
    },
  ];

  const posts = [
    {
      id: 1,
      postWriter: "Khanh Huy Nguyen",
      title: "Poll for Upcoming Topics",
      date: "Nov 16",
      comments: cmts,
    },
    {
      id: 2,
      postWriter: "Khanh Huy Nguyen",
      title: "Sample Nest project",
      date: "Nov 16",
      comments: cmts,
    },
    {
      id: 3,
      postWriter: "Khanh Huy Nguyen",
      title: "Final Project Feature list",
      date: "Nov 16",
      comments: cmts,
    },
    {
      id: 4,
      postWriter: "Khanh Huy Nguyen",
      title: "Midterm project (Deadline Nov 15 10pm)",
      date: "Nov 13",
      comments: cmts,
    },
    {
      id: 5,
      postWriter: "Khanh Huy Nguyen",
      title: "Simple JWT auth with Nest",
      date: "Nov 13",
      comments: cmts,
    },
    {
      id: 6,
      postWriter: "Khanh Huy Nguyen",
      title: "Midterm Project",
      date: "Nov 3",
      comments: cmts,
    },
  ];

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
              // overflow: "auto",
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
        {posts.length > 0 &&
          posts.reverse().map((post) => (
            <Post
              key={post.id}
              postWriter={post.postWriter}
              title={post.title}
              date={post.date}
              comments={post.comments}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default InfoContent;
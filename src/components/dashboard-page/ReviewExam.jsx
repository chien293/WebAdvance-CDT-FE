import { Container, Grid, Paper, Typography } from "@mui/material";
import Post from "./Post";
import Link from "next/link";

const ReviewExam = () => {
  const requestsReview = [
    {
      id: 1,
      link: "/review-exam-id",
      postWriter: "Nguyen Van A",
      title: "Review the mark again",
      date: "Nov 16",
      comments: [],
    },
    {
      id: 2,
      link: "/review-exam-id",
      postWriter: "Tran Van B",
      title: "I hope the teacher will review the mark again",
      date: "Nov 16",
      comments: [],
    },
    {
      id: 3,
      link: "/review-exam-id",
      postWriter: "Cao Tuan K",
      title: "Review the mark again",
      date: "Nov 16",
      comments: [],
    },
    {
      id: 4,
      link: "/review-exam-id",
      postWriter: "Vu Trong P",
      title: "Review the mark again",
      date: "Nov 13",
      comments: [],
    },
    {
      id: 5,
      link: "/review-exam-id",
      postWriter: "Ho Thi K",
      title: "Review the mark again",
      date: "Nov 13",
      comments: [],
    },
    {
      id: 6,
      link: "/review-exam-id",
      postWriter: "Le Thanh H",
      title: "Review the mark again",
      date: "Nov 3",
      comments: [],
    },
  ];

  const handleLink = () => {
    navigateToHome();
  };

  return (
    // <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //   <Grid container spacing={3}>
    <div className="flex flex-col w-full items-center">
      <div className="w-8/12 mt-10">
        {requestsReview.length > 0 &&
          requestsReview.reverse().map((req) => (
            <Link key={req.id} href={req.link} passHref>
              <div className="mb-5">
                <Post
                  postWriter={req.postWriter}
                  title={req.title}
                  date={req.date}
                  comments={req.comments}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
    //   </Grid>
    // </Container>
  );
};

export default ReviewExam;
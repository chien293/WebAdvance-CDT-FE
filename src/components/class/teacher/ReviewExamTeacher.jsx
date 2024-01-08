import { Container, Grid, Paper, Typography } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";
import authService from "@/auth/auth-service";
import classService from "@/service/class/classService";

const ReviewExam = ({ classId }) => {
  const [userId, setUserId] = useState(null);
  const [requestsReview, setRequestsReview] = useState([]);
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setUserId(user.user[0].id);
    }
  }, [classId]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const result = await classService.getReviewGradeByClassId(classId);
        setRequestsReview(result);
      }
    };
    fetchData();
  }, [userId]);

  const handleLink = () => {
    navigateToHome();
  };

  return (
    // <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //   <Grid container spacing={3}>
    <div className="flex flex-col w-full items-center">
      <div className="w-8/12 mt-7">
        <div className="flex justify-start w-full">
          <Typography className="text-2xl font-bold text-green-600">
            Review Exam Teacher
          </Typography>
        </div>
        {requestsReview ? (
          requestsReview
            .reverse()
            .map((req) => (
              <Post
                postAuthor={req.fullname}
                linkPath="teacher/review-grade"
                idReviewGrade={req.idReviewGrade}
                type={req.type}
                explanation={req.explanation}
                createdDate={req.createdDate}
                comments={req.comments}
              />
            ))
        ) : (
          <div className="flex w-full">
            <Typography className="text-2xl font-bold ">
              No request found
            </Typography>
          </div>
        )}
      </div>
    </div>
    //   </Grid>
    // </Container>
  );
};

export default ReviewExam;

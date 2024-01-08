import * as React from "react";
import { Typography, Grid } from "@mui/material";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import Comment from "@/components/dashboard-page/Comment";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";

const Post = ({
  postAuthor,
  type,
  explanation,
  createdDate,
  comments,
  idReviewGrade,
  linkPath,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const handleClick = () => {
    const data = {};
    data.idReviewGrade = idReviewGrade;
    data.type = type;
    data.explanation = explanation;
    data.createdDate = createdDate;
    data.comments = comments;

    const sendQuery = encodeURIComponent(JSON.stringify(data));
    router.push({
      pathname: `/${linkPath}/${idReviewGrade}`,
      // query: { data: sendQuery },
    });
  };
  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={10}>
        <div className="flex-row bg-white cursor-pointer hover:bg-green-100 rounded-lg border my-5 w-8/12 min-w-80">
          <div className="flex p-2 items-center" onClick={handleClick}>
            <div className="p-2 m-1 rounded-3xl bg-green-600">
              <ClassOutlinedIcon
                style={{ color: "white" }}
                // sx={{ display: "inline-flex" }}
              />
            </div>
            <div className="ml-5">
              <Typography>Grade composition: {type}</Typography>
              <Typography>From: {postAuthor}</Typography>
              <Typography>Explanation: {explanation}</Typography>

              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {createdDate}
              </Typography>
            </div>
          </div>
          {comments && (
            <div
              onClick={onOpen}
              className="px-4 py-2 border-t text-sm hover:underline hover:text-green-600"
            >
              {comments.length} comments about the class
            </div>
          )}
          <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Classroom comments
                  </ModalHeader>
                  <ModalBody>
                    {comments.map((cmt) => (
                      <Comment
                        image={cmt.image}
                        key={cmt.id}
                        userName={cmt.fullname}
                        date={cmt.createdDate}
                        content={cmt.content}
                      />
                    ))}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default Post;

import * as React from "react";
import Comment from "./Comment";
import { useDisclosure } from "@nextui-org/react";

const Post = ({ comments }) => {
 const comments = [
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
    <div>
      {comments.map((cmt) => (
        <Comment
          key={key}
          userName={cmt.userName}
          date={cmt.date}
          content={cmt.content}
        />
      ))}
    </div>
  );
};

export default Post;

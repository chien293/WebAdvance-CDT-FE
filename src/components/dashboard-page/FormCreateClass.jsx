import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthService from "@/auth/auth-service.js";
import { useRouter } from "next/navigation";
export default function FormCreateClass({ open, onClose, onCancel }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const URL = process.env.SERVER_URL;
  const onCreate = async (data) => {
    // Implement logic for creating the classroom
    const user = AuthService.getCurrentUser();
    const token = user.token;
    const body = {
      className: data.className,
      createdBy: user.user[0].id,
      description: "",
      topic: data.topic,
      room: data.room,
      title: data.title,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // write axios post with above url, body and config
    // the below axios return a value, you can use it to redirect to the classroom page

    const respone = await axios
      .post(URL + "/class/insertClass", body, config)
      .catch((err) => {
        console.log(err);
      });
    const insertId = respone.data.insertId;

    const respone2 = await axios
      .post(
        URL + "/class/insertEnrollment",
        {
          userId: user.user[0].id,
          classId: insertId,
          role: "teacher",
        },
        config
      )
      .catch((err) => {
        console.log(err);
      });
    router.push("/class/" + insertId);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Classroom</DialogTitle>
        <DialogContent>
          <TextField
            {...register("className")}
            autoFocus
            margin="dense"
            id="name"
            label="Class name (required)"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("title")}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("topic")}
            autoFocus
            margin="dense"
            id="name"
            label="Topic"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("room")}
            autoFocus
            margin="dense"
            id="name"
            label="Room"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit(onCreate)}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

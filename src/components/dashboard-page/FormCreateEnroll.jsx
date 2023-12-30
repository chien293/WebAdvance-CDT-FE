import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthService from "@/auth/auth-service.js";
import { useRouter } from "next/navigation";
import classService from "@/service/class/classService";
export default function FormCreateEnroll({ open, onClose, onCancel }) {
  const router = useRouter();
  const [inviteCode, setInviteCode] = React.useState("");
  const [isError, setIsError] = React.useState("");
  const [helperText, setHelperText] = React.useState("");

  const onCreate = async () => {
    // Implement logic for creating the classroom
    if (inviteCode === "" || inviteCode === null) {
      setIsError(true);
      setHelperText("Please enter invite code");
      return;
    }
    if (inviteCode.length !== 10) {
      setIsError(true);
      setHelperText("Invite must have 10 characters");
      return;
    }
    const user = AuthService.getCurrentUser();
    const classId = await classService.getClassByCode(inviteCode);

    const enrollmentData = {
      userId: user.user[0].id,
      classId: classId.id,
      role: "student",
    };
    const enrollment = await classService.insertEnrollment(enrollmentData);
    router.push(`/student/class/${classId.id}`);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enroll class</DialogTitle>
        <DialogContent>
          <TextField
            error={isError}
            helperText={isError ? helperText : ""}
            onChange={(e) => setInviteCode(e.target.value)}
            autoFocus
            margin="dense"
            id="code"
            label="Invite code"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

import Invitation from "@/components/class/invitation/Invitation";
import React from "react";
import withAuth from "@/auth/with-auth";

const InvitePage = () => {
  return (
    <div>
      <Invitation />
    </div>
  );
};

export default withAuth(InvitePage);

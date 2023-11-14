import React from "react";
import DefaultLayout from "@/layouts/default";
import SignUpComponent from "@/components/auth-page/SignUp";

const SignUp = () => {
  return (
    <DefaultLayout>
      <SignUpComponent/>
    </DefaultLayout>
  );
};

export default SignUp;

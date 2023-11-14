import React from "react";
import DefaultLayout from "@/layouts/default";
import SignInComponent from "@/components/auth-page/SignIn";

const SignIn = () => {
  return (
    <DefaultLayout>
      <SignInComponent></SignInComponent>
    </DefaultLayout>
  );
};

export default SignIn;

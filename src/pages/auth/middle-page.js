import React from "react";
import { useRouter } from "next/router";
import AuthService from "@/auth/auth-service";
const MiddlePage = () => {
  const router = useRouter();
  React.useEffect(() => {
    const fetchData = () => {
      if (router.isReady) {
        const userParam = router.query.user;
        const tokenParam = router.query.token;

        if (userParam && tokenParam) {
          const user = JSON.parse(decodeURI(userParam));       
          const userSave = { user: user, accessToken: tokenParam };
          AuthService.saveUser(userSave);
          router.push("/home-page");
        } else {
          router.push("/auth/sign-in");
        }
      }
    };
    fetchData();
  }, [router.isReady]);

  return <></>;
};

export default MiddlePage;

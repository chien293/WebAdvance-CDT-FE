// lib/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import AuthService from "./auth-service";
import classService from "@/service/class/classService";
const withAuth = (WrappedComponent, allowedRoles) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    const isTokenExpired = (token) => {
      const decodedToken = jwt.decode(token);
      return decodedToken.exp * 1000 < Date.now();
    };

    useEffect(() => {
      const fetchUserRole = async () => {
        const user = AuthService.getCurrentUser();
        //check if user is logged in and token is not expired or empty
        if (!user || isTokenExpired(user.accessToken) || !user.accessToken) {
          AuthService.logout();
          localStorage.setItem("redirect", router.asPath);
          router.push({
            pathname: "/auth/sign-in",
            // query: { redirect: router.asPath },
          });
        } else if (localStorage.getItem("redirect")) {
          const pathToRedirect = localStorage.getItem("redirect");
          localStorage.removeItem("redirect");
          router.push(pathToRedirect);
        } else if (router.pathname.includes("invite")) {
          //do nothing
          setUserRole("user");
        } else if (router.pathname.includes("class")) {
          const classId = router.query.id;
          console.log(classId);
          if (classId) {
            // Call API to get user's role in the specified class
            const role = await classService.getRoleInClass(
              user.user[0].id,
              classId
            );
            if (allowedRoles.includes(role.role)) {
              setUserRole(role);
            } else {
              router.push({ pathname: "/home-page" });
            }
          } else {
            // Handle missing classId in query params
            console.error("Missing classId in query params");
            router.push({ pathname: "/home-page" });
          }
        } else {
          // Check class role and redirect if not allowed
          if (allowedRoles.includes(user.user[0].role)) {
            setUserRole(user.user[0].role);
          } else {
            router.push({ pathname: "/home-page" });
          }
        }
      };
      fetchUserRole();
    }, [router.query]);

    if (userRole) {
      return <WrappedComponent {...props} />;
    }

    return null; // Or you can redirect to a loading page if you prefer
  };

  return AuthComponent;
};

export default withAuth;

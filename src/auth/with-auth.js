// lib/withAuth.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import AuthService from "./auth-service";
const withAuth = (WrappedComponent, allowedRoles) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    const isTokenExpired = (token) => {
      const decodedToken = jwt.decode(token);
      return decodedToken.exp * 1000 < Date.now();
    };

    useEffect(() => {
      const fetchUserRole = () => {
        const user = AuthService.getCurrentUser();

        if (!user || isTokenExpired(user.accessToken) || !user.accessToken) {
          AuthService.logout();
          router.push({ pathname: "/auth/sign-in" });
        }

        if (user && allowedRoles.includes(user.user[0].role)) {
          setUserRole(user.user[0].role);
        } else {
          router.push({ pathname: "/auth/sign-in" });
        }
      };

      fetchUserRole();
    }, []);

    if (userRole) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return AuthComponent;
};

export default withAuth;

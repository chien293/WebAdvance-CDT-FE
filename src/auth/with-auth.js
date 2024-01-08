// lib/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import AuthService from "./auth-service";
import classService from "@/service/class/classService";
import Loading from "@/components/Loading";
const withAuth = (WrappedComponent, allowedRoles) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    const isTokenExpired = (token) => {
      const decodedToken = jwt.decode(token);
      return decodedToken.exp * 1000 < Date.now();
    };

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const user = AuthService.getCurrentUser();

          if (!user || isTokenExpired(user.accessToken) || !user.accessToken) {
            AuthService.logout();
            localStorage.setItem("redirect", router.asPath);
            router.push({ pathname: "/auth/sign-in" });
          } else if (localStorage.getItem("redirect")) {
            const pathToRedirect = localStorage.getItem("redirect");
            localStorage.removeItem("redirect");
            router.push(pathToRedirect);
          } else if (router.pathname.includes("invite")) {
            setUserRole("user");
          } else if (router.pathname.includes("class")) {
            const classId = router.query.id;

            if (classId) {
              const role = await classService.getRoleInClass(
                user.user[0].id,
                classId
              );
              if (allowedRoles.includes(role.role)) {
                setUserRole(role);
              } else {
                router.push({ pathname: "/home-page" });
              }
            }
          } else if (router.pathname.includes("review-grade")) {
            const reviewGradeId = router.query.id;
            if (reviewGradeId) {
              const role = await classService.getRoleByReviewGradeId(
                reviewGradeId,
                user.user[0].id
              );
              if (allowedRoles.includes(role)) {
                setUserRole(role);
              } else {
                router.push({ pathname: "/home-page" });
              }
            }
          } else {
            if (allowedRoles.includes(user.user[0].role)) {
              setUserRole(user.user[0].role);
            } else {
              router.push({ pathname: "/home-page" });
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          // Set loading to false once the authentication check is done
          setLoading(false);
        }
      };

      fetchUserRole();
    }, [router.query]);

    // Render loading state while checking authentication
    if (loading) {
      return <Loading />;
    }

    // Render the WrappedComponent only if userRole is available
    if (userRole) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return AuthComponent;
};

export default withAuth;

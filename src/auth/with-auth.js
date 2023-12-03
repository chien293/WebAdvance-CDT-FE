// lib/withAuth.js

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import AuthService from './auth-service';
const withAuth = (WrappedComponent, allowedRoles) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const fetchUserRole = () => {
        const user = AuthService.getCurrentUser();
      
        if(user && allowedRoles.includes(user.user[0].role)){
            setUserRole(user.user[0].role);          
        }else{
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

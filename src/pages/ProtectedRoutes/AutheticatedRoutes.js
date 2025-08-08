/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const AutheticatedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isAuthenticated);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Navigate back if not authenticated
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default AutheticatedRoutes;

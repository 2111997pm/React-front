import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log(token, "-----", token ? children : "false");
  return token ? children : <Navigate to="/auth" replace />;
}

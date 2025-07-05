import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isLoggedIn } from "../utils/auth";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/signin" replace />;
};

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isLoggedIn } from "../utils/auth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  return isLoggedIn() ? <Navigate to="/blog" replace /> : <>{children}</>;
};

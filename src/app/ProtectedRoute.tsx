import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isLoggedIn = Boolean(sessionStorage.getItem("loggedInUser"));

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location.pathname,
          openLogin: true,
        }}
      />
    );
  }

  return <>{children}</>;
}

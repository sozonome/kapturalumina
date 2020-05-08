import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Route, Redirect } from "react-router";

export default function PrivateRoute({
  component: RouteComponent,
  ...rest
}: any) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <>
            <Redirect to={"/login"} />
          </>
        )
      }
    />
  );
}

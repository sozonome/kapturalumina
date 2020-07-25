import React, { useContext } from "react";
import { Route, Redirect } from "react-router";

import { AuthContext } from "../providers";

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

import React from "react";
import { Route, Redirect } from "react-router";
import { getCurrentUser } from "../firebaseConfig";

// export function PublicRoute({
//   component: Component,
//   restricted,
//   ...rest
// }: any) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         loggedIn() && restricted ? (
//           <Redirect to="/main" />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// }

// export function PrivateRoute({ component: Component, ...rest }: any) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         loggedIn() ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// }

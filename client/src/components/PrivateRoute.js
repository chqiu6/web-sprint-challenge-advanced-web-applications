import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest }) => {
    return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        }
        // otherwise, redirect to login
        else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};


export default PrivateRoute;

// return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (localStorage.getItem("token")) {
//           return <Component {...props} />;
//         }
//         // otherwise, redirect to login
//         else {
//           return <Redirect to="/login" />;
//         }
//       }}
//     />
//   );
// };
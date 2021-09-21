import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { Route, RouteProps, useHistory } from "react-router";

export default function PrivateRoute({ ...routeProps }: RouteProps) {
  let history = useHistory();
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch((e) => {
      console.log(e);
      history.push("/login");
    });
  });
  return <Route {...routeProps} />;
}

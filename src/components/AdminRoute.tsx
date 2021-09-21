import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { Route, RouteProps, useHistory } from "react-router";

export default function AdminRoute({ ...routeProps }: RouteProps) {
  let history = useHistory();
  useEffect(() => {
    async function checkUser() {
      const user: CognitoUser = await Auth.currentAuthenticatedUser().catch(
        (e) => {
          console.log(e);
          history.push("/login");
        }
      );

      const groups = await user.getSignInUserSession()?.getAccessToken()
        .payload;
      if (!groups || !groups["cognito:groups"].includes("admin")) {
        history.push("/login");
      }
    }
    checkUser();
  });
  return <Route {...routeProps} />;
}

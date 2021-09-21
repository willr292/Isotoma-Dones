import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";

// CognitoUser is missing challengeName https://github.com/aws-amplify/amplify-js/issues/3733
export type AuthChallengeName =
  | "NEW_PASSWORD_REQUIRED"
  | "SMS_MFA"
  | "SOFTWARE_TOKEN_MFA"
  | "MFA_SETUP";

export type AuthUser = CognitoUser & {
  challengeName: AuthChallengeName;
};

// TODO Add validation to form
export default function Login() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState<AuthUser>();
  let history = useHistory();
  return (
    <>
      {!showConfirm ? (
        <>
          <h1>Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              const user: AuthUser = await Auth.signIn(
                values.email,
                values.password
              );

              if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                setUser(user);
                setShowConfirm(true);
              } else {
                setSubmitting(false);
                history.push("/");
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                  <button disabled={isSubmitting} type="submit">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </>
      ) : (
        <>
          <h1>Please Choose a new password</h1>
          <Formik
            initialValues={{ password: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              await Auth.completeNewPassword(user, values.password);
              setSubmitting(false);
              history.push("/");
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                  <button disabled={isSubmitting} type="submit">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </>
  );
}

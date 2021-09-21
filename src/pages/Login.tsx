import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router";

// TODO Add validation to form
export default function Login() {
  let history = useHistory();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const user: CognitoUser = await Auth.signIn(
            values.email,
            values.password
          );
          console.log(user);
          //await Auth.completeNewPassword(x, values.password);
          setSubmitting(false);
          history.push("/");
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
  );
}

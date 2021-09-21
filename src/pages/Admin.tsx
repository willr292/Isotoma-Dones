import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useHistory } from "react-router";
import { useCreateUserMutation } from "../generated/graphql";

interface user {
  email: string;
  password: string;
  admin: boolean;
}

// TODO Add validation to form
const Admin = () => {
  let history = useHistory();
  const [createUser] = useCreateUserMutation();
  const initialValues: user = {
    email: "",
    password: "",
    admin: false,
  };
  return (
    <div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Home
      </button>
      <h1>Add a User</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          try {
            const data = await createUser({
              variables: {
                user: values,
              },
            });
            console.log(data);
          } catch (error) {
            console.log(error);
          }
          actions.resetForm({});
          actions.setSubmitting(false);
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
                placeholder="Enter an email"
              />
              <br />
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
              />
              <br />
              <label htmlFor="admin">Admin</label>
              <Field type="checkbox" name="admin" />
              <br />
              <button disabled={isSubmitting} type="submit">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Admin;

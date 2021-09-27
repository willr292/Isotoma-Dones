import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useCreateNoteMutation } from "../generated/graphql";
import Auth, { CognitoUser } from "@aws-amplify/auth";

interface FormValues {
  description: string;
}

// TODO Add validation to form
const AddNoteForm: React.FC<{}> = () => {
  const initialValues: FormValues = { description: "" };
  const [createNoteMutation] = useCreateNoteMutation();

  return (
    <div>
      <h1>Add Done</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          const user: CognitoUser = await Auth.currentAuthenticatedUser();
          await createNoteMutation({
            variables: {
              note: {
                description: values.description,
                creator: user.getUsername(),
              },
            },
            update: (cache) => {
              cache.evict({ id: "ROOT_QUERY", fieldName: "listNotesByDate" });
            },
          });
          actions.resetForm({});
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <label htmlFor="description">Description</label>
              <Field
                style={{ margin: "10px" }}
                disabled={isSubmitting}
                id="description"
                name="description"
                placeholder="Done"
              />
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

export default AddNoteForm;

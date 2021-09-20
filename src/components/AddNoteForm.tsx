import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useCreateNoteMutation } from "../generated/graphql";

interface FormValues {
  description: string;
}

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
          await createNoteMutation({
            variables: {
              note: {
                description: values.description,
              },
            },
            update: (cache) => {
              cache.evict({ id: "ROOT_QUERY", fieldName: "listNotes" });
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

import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useCreateNoteMutation } from "../generated/graphql";
import { v4 as uuidv4 } from "uuid";

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
          await createNoteMutation({
            variables: {
              note: {
                name: values.description,
                completed: false,
                id: uuidv4(),
              },
            },
            update: (cache) => {
              cache.evict({ id: "ROOT_QUERY", fieldName: "listNotes" });
            },
          });

          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="description">Description</label>
          <Field id="description" name="description" placeholder="Done" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNoteForm;

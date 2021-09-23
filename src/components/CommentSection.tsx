import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { Formik, Form, Field } from "formik";
import * as React from "react";
import {
  useAddCommentMutation,
  useGetCommentsByNoteIdQuery,
} from "../generated/graphql";

interface CommentSectionProps {
  noteId: string;
}

const CommentSection = ({ noteId }: CommentSectionProps) => {
  const [addComment] = useAddCommentMutation();
  const { data, loading, error } = useGetCommentsByNoteIdQuery({
    variables: {
      noteId: noteId,
    },
  });

  if (!loading && !data) {
    return <div>error {error}</div>;
  }

  return (
    <div>
      {!data && loading ? (
        <div>loading comments...</div>
      ) : (
        <div>
          {data?.getCommentsByNoteId?.map((comment) => (
            <div>{comment?.content}</div>
          ))}
          <Formik
            initialValues={{ content: "" }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              const user: CognitoUser = await Auth.currentAuthenticatedUser();
              await addComment({
                variables: {
                  comment: {
                    noteId: noteId,
                    content: values.content,
                    creator: user.getUsername(),
                  },
                },
                update: (cache) => {
                  console.log(cache);
                  cache.evict({
                    id: "ROOT_QUERY",
                    fieldName: "getCommentsByNoteId",
                    args: { noteId: noteId },
                  });
                },
              });
              actions.resetForm({});
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <label htmlFor="content">Add Comment</label>
                  <Field
                    style={{ margin: "10px" }}
                    disabled={isSubmitting}
                    id="content"
                    name="content"
                    placeholder="Comment"
                  />
                  <button disabled={isSubmitting} type="submit">
                    Add Comment
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CommentSection;

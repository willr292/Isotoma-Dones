import Auth, { CognitoUser } from "@aws-amplify/auth";
import * as React from "react";
import { useAddLikeMutation } from "../generated/graphql";

interface LikeButtonProps {
  noteId: string;
  voteStatus: boolean;
  score: number;
}

const LikeButton = ({ noteId, voteStatus, score }: LikeButtonProps) => {
  const [addLike] = useAddLikeMutation();

  return (
    <button
      disabled={voteStatus}
      onClick={async () => {
        const user: CognitoUser = await Auth.currentAuthenticatedUser();
        await addLike({
          variables: {
            like: {
              noteId: noteId,
              creator: user.getUsername(),
            },
          },
          update: (cache) => {
            console.log(cache);
            cache.evict({
              id: "ROOT_QUERY",
              fieldName: "listNotesByDate",
            });
          },
        });
      }}
    >
      👍 - {score}
    </button>
  );
};

export default LikeButton;

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  creator: Scalars['String'];
  id: Scalars['ID'];
  noteId: Scalars['ID'];
};

export type Like = {
  __typename?: 'Like';
  creator: Scalars['String'];
  id: Scalars['ID'];
  noteId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Scalars['String']>;
  addLike?: Maybe<Scalars['String']>;
  createNote?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
  deleteNote?: Maybe<Scalars['String']>;
};


export type MutationAddCommentArgs = {
  comment: AddCommentInput;
};


export type MutationAddLikeArgs = {
  like: AddLikeInput;
};


export type MutationCreateNoteArgs = {
  note: NoteInput;
};


export type MutationCreateUserArgs = {
  user: UserCreateInput;
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  likes?: Maybe<Array<Maybe<Like>>>;
  score: Scalars['Int'];
  voteStatus: Scalars['Boolean'];
};

export type NoteInput = {
  creator: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCommentsByNoteId?: Maybe<Array<Maybe<Comment>>>;
  getNoteById?: Maybe<Note>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
  listNotesByDate?: Maybe<Array<Maybe<Note>>>;
};


export type QueryGetCommentsByNoteIdArgs = {
  noteId: Scalars['String'];
};


export type QueryGetNoteByIdArgs = {
  noteId: Scalars['String'];
};


export type QueryListNotesByDateArgs = {
  date: Scalars['String'];
};

export type UpdateNoteInput = {
  description: Scalars['String'];
};

export type UserCreateInput = {
  admin: Scalars['Boolean'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddCommentInput = {
  content: Scalars['String'];
  creator: Scalars['String'];
  noteId: Scalars['String'];
};

export type AddLikeInput = {
  creator: Scalars['String'];
  noteId: Scalars['String'];
};

export type AddCommentMutationVariables = Exact<{
  comment: AddCommentInput;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: Maybe<string> };

export type AddLikeMutationVariables = Exact<{
  like: AddLikeInput;
}>;


export type AddLikeMutation = { __typename?: 'Mutation', addLike?: Maybe<string> };

export type CreateNoteMutationVariables = Exact<{
  note: NoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: Maybe<string> };

export type CreateUserMutationVariables = Exact<{
  user: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<string> };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote?: Maybe<string> };

export type GetCommentsByNoteIdQueryVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type GetCommentsByNoteIdQuery = { __typename?: 'Query', getCommentsByNoteId?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: string, content: string, creator: string }>>> };

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNotesQuery = { __typename?: 'Query', listNotes?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, description: string, createdAt: string, score: number, creator: string }>>> };

export type ListNotesByDateQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type ListNotesByDateQuery = { __typename?: 'Query', listNotesByDate?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, description: string, createdAt: string }>>> };


export const AddCommentDocument = gql`
    mutation addComment($comment: addCommentInput!) {
  addComment(comment: $comment)
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddLikeDocument = gql`
    mutation addLike($like: addLikeInput!) {
  addLike(like: $like)
}
    `;
export type AddLikeMutationFn = Apollo.MutationFunction<AddLikeMutation, AddLikeMutationVariables>;

/**
 * __useAddLikeMutation__
 *
 * To run a mutation, you first call `useAddLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikeMutation, { data, loading, error }] = useAddLikeMutation({
 *   variables: {
 *      like: // value for 'like'
 *   },
 * });
 */
export function useAddLikeMutation(baseOptions?: Apollo.MutationHookOptions<AddLikeMutation, AddLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLikeMutation, AddLikeMutationVariables>(AddLikeDocument, options);
      }
export type AddLikeMutationHookResult = ReturnType<typeof useAddLikeMutation>;
export type AddLikeMutationResult = Apollo.MutationResult<AddLikeMutation>;
export type AddLikeMutationOptions = Apollo.BaseMutationOptions<AddLikeMutation, AddLikeMutationVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($note: NoteInput!) {
  createNote(note: $note)
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      note: // value for 'note'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($user: UserCreateInput!) {
  createUser(user: $user)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation deleteNote($noteId: String!) {
  deleteNote(noteId: $noteId)
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const GetCommentsByNoteIdDocument = gql`
    query getCommentsByNoteId($noteId: String!) {
  getCommentsByNoteId(noteId: $noteId) {
    id
    content
    creator
  }
}
    `;

/**
 * __useGetCommentsByNoteIdQuery__
 *
 * To run a query within a React component, call `useGetCommentsByNoteIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByNoteIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByNoteIdQuery({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useGetCommentsByNoteIdQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByNoteIdQuery, GetCommentsByNoteIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByNoteIdQuery, GetCommentsByNoteIdQueryVariables>(GetCommentsByNoteIdDocument, options);
      }
export function useGetCommentsByNoteIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByNoteIdQuery, GetCommentsByNoteIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByNoteIdQuery, GetCommentsByNoteIdQueryVariables>(GetCommentsByNoteIdDocument, options);
        }
export type GetCommentsByNoteIdQueryHookResult = ReturnType<typeof useGetCommentsByNoteIdQuery>;
export type GetCommentsByNoteIdLazyQueryHookResult = ReturnType<typeof useGetCommentsByNoteIdLazyQuery>;
export type GetCommentsByNoteIdQueryResult = Apollo.QueryResult<GetCommentsByNoteIdQuery, GetCommentsByNoteIdQueryVariables>;
export const ListNotesDocument = gql`
    query listNotes {
  listNotes {
    id
    description
    createdAt
    score
    creator
  }
}
    `;

/**
 * __useListNotesQuery__
 *
 * To run a query within a React component, call `useListNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListNotesQuery(baseOptions?: Apollo.QueryHookOptions<ListNotesQuery, ListNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNotesQuery, ListNotesQueryVariables>(ListNotesDocument, options);
      }
export function useListNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNotesQuery, ListNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNotesQuery, ListNotesQueryVariables>(ListNotesDocument, options);
        }
export type ListNotesQueryHookResult = ReturnType<typeof useListNotesQuery>;
export type ListNotesLazyQueryHookResult = ReturnType<typeof useListNotesLazyQuery>;
export type ListNotesQueryResult = Apollo.QueryResult<ListNotesQuery, ListNotesQueryVariables>;
export const ListNotesByDateDocument = gql`
    query listNotesByDate($date: String!) {
  listNotesByDate(date: $date) {
    id
    description
    createdAt
  }
}
    `;

/**
 * __useListNotesByDateQuery__
 *
 * To run a query within a React component, call `useListNotesByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNotesByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNotesByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useListNotesByDateQuery(baseOptions: Apollo.QueryHookOptions<ListNotesByDateQuery, ListNotesByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNotesByDateQuery, ListNotesByDateQueryVariables>(ListNotesByDateDocument, options);
      }
export function useListNotesByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNotesByDateQuery, ListNotesByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNotesByDateQuery, ListNotesByDateQueryVariables>(ListNotesByDateDocument, options);
        }
export type ListNotesByDateQueryHookResult = ReturnType<typeof useListNotesByDateQuery>;
export type ListNotesByDateLazyQueryHookResult = ReturnType<typeof useListNotesByDateLazyQuery>;
export type ListNotesByDateQueryResult = Apollo.QueryResult<ListNotesByDateQuery, ListNotesByDateQueryVariables>;
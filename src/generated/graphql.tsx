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

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  createUser?: Maybe<Scalars['String']>;
  deleteNote?: Maybe<Scalars['String']>;
  updateNote?: Maybe<Note>;
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


export type MutationUpdateNoteArgs = {
  note: UpdateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type NoteInput = {
  creator: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getNoteById?: Maybe<Note>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
  listNotesByDate?: Maybe<Array<Maybe<Note>>>;
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
  username: Scalars['String'];
};

export type CreateNoteMutationVariables = Exact<{
  note: NoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: Maybe<{ __typename?: 'Note', description: string, creator: string }> };

export type CreateUserMutationVariables = Exact<{
  user: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<string> };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote?: Maybe<string> };

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNotesQuery = { __typename?: 'Query', listNotes?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, description: string, createdAt: string }>>> };

export type ListNotesByDateQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type ListNotesByDateQuery = { __typename?: 'Query', listNotesByDate?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, description: string, createdAt: string }>>> };


export const CreateNoteDocument = gql`
    mutation createNote($note: NoteInput!) {
  createNote(note: $note) {
    description
    creator
  }
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
export const ListNotesDocument = gql`
    query listNotes {
  listNotes {
    id
    description
    createdAt
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
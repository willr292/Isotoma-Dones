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
  AWSDateTime: any;
  AWSJSON: any;
  AWSPhone: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  deleteNote?: Maybe<Scalars['String']>;
  updateNote?: Maybe<Note>;
};


export type MutationCreateNoteArgs = {
  note: NoteInput;
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  note: UpdateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['AWSDateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type NoteInput = {
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getNoteById?: Maybe<Note>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
};


export type QueryGetNoteByIdArgs = {
  noteId: Scalars['String'];
};

export type UpdateNoteInput = {
  description: Scalars['String'];
};

export type CreateNoteMutationVariables = Exact<{
  note: NoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: Maybe<{ __typename?: 'Note', description: string }> };

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNotesQuery = { __typename?: 'Query', listNotes?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, description: string, createdAt: any }>>> };


export const CreateNoteDocument = gql`
    mutation createNote($note: NoteInput!) {
  createNote(note: $note) {
    description
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
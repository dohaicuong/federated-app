import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  content: Scalars['String'],
  authorId: Scalars['ID'],
  author: User,
};

export type MessageDeleteInput = {
  messageId: Scalars['ID'],
};

export type MessageSendInput = {
  roomId: Scalars['ID'],
  content: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  signup?: Maybe<AuthPayload>,
  login?: Maybe<AuthPayload>,
  roomCreate: Room,
  roomAddPeople: Room,
  roomRemovePeople: Room,
  messageSend: Message,
  messageDelete: Message,
};


export type MutationSignupArgs = {
  data: UserSignupDataInput
};


export type MutationLoginArgs = {
  data: UserLoginDataInput
};


export type MutationRoomCreateArgs = {
  input: RoomCreateInput
};


export type MutationRoomAddPeopleArgs = {
  input: RoomAddPeopleInput
};


export type MutationRoomRemovePeopleArgs = {
  input: RoomRemovePeopleInput
};


export type MutationMessageSendArgs = {
  input: MessageSendInput
};


export type MutationMessageDeleteArgs = {
  input: MessageDeleteInput
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  isAuth: Scalars['Boolean'],
  me?: Maybe<User>,
  room?: Maybe<Room>,
  rooms?: Maybe<Array<Room>>,
  user?: Maybe<User>,
  users?: Maybe<Array<User>>,
};


export type QueryRoomArgs = {
  id: Scalars['ID']
};


export type QueryRoomsArgs = {
  userId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryUsersArgs = {
  ids?: Maybe<Array<Scalars['ID']>>
};

export type Room = {
   __typename?: 'Room',
  id: Scalars['ID'],
  name: Scalars['String'],
  messages?: Maybe<Array<Message>>,
  adminIds?: Maybe<Array<Scalars['ID']>>,
  userIds?: Maybe<Array<Scalars['ID']>>,
  admins?: Maybe<Array<User>>,
  users?: Maybe<Array<User>>,
};

export type RoomAddPeopleInput = {
  roomId: Scalars['ID'],
  userId: Scalars['ID'],
};

export type RoomCreateInput = {
  name: Scalars['String'],
};

export type RoomRemovePeopleInput = {
  roomId: Scalars['ID'],
  userId: Scalars['ID'],
};

export type Subscription = {
   __typename?: 'Subscription',
  messageInRoom: Message,
  randomNumber: Scalars['Int'],
};


export type SubscriptionMessageInRoomArgs = {
  roomId: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  rooms?: Maybe<Array<Room>>,
};

export type UserLoginDataInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UserSignupDataInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type AuthQueryVariables = {};


export type AuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isAuth'>
);

export type RoomListQueryVariables = {};


export type RoomListQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name'>
    )>> }
  )> }
);

export type AddUserDialogDataQueryVariables = {};


export type AddUserDialogDataQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id'>
    )>> }
  )>> }
);

export type AddUserDialogActionMutationVariables = {
  input: RoomAddPeopleInput
};


export type AddUserDialogActionMutation = (
  { __typename?: 'Mutation' }
  & { roomAddPeople: (
    { __typename?: 'Room' }
    & { users: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
      & { rooms: Maybe<Array<(
        { __typename?: 'Room' }
        & Pick<Room, 'id'>
      )>> }
    )>> }
  ) }
);

export type SendMessageMutationVariables = {
  input: MessageSendInput
};


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { messageSend: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type RoomQueryVariables = {
  id: Scalars['ID']
};


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room: Maybe<(
    { __typename?: 'Room' }
    & Pick<Room, 'id'>
    & { messages: Maybe<Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content'>
    )>> }
  )> }
);

export type ChatRoomSubscriptionSubscriptionVariables = {
  roomId: Scalars['ID']
};


export type ChatRoomSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { messageInRoom: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type ChatRoomQueryVariables = {
  id: Scalars['ID']
};


export type ChatRoomQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>, room: Maybe<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name'>
    & { admins: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>, users: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>, messages: Maybe<Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    )>> }
  )> }
);

export type CreateRoomMutationVariables = {
  input: RoomCreateInput
};


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { roomCreate: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name'>
  ) }
);

export type GetRoomListQueryVariables = {};


export type GetRoomListQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name'>
    )>> }
  )> }
);

export type DashboardSubscriptionVariables = {};


export type DashboardSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'randomNumber'>
);

export type LoginMutationVariables = {
  data: UserLoginDataInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )> }
);

export type SignupMutationVariables = {
  data: UserSignupDataInput
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )> }
);


export const AuthDocument = gql`
    query Auth {
  isAuth @client(always: true)
}
    `;

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthQuery, AuthQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, baseOptions);
      }
export function useAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthQuery, AuthQueryVariables>(AuthDocument, baseOptions);
        }
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>;
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>;
export type AuthQueryResult = ApolloReactCommon.QueryResult<AuthQuery, AuthQueryVariables>;
export const RoomListDocument = gql`
    query RoomList {
  me {
    id
    rooms {
      id
      name
    }
  }
}
    `;

/**
 * __useRoomListQuery__
 *
 * To run a query within a React component, call `useRoomListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RoomListQuery, RoomListQueryVariables>) {
        return ApolloReactHooks.useQuery<RoomListQuery, RoomListQueryVariables>(RoomListDocument, baseOptions);
      }
export function useRoomListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RoomListQuery, RoomListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RoomListQuery, RoomListQueryVariables>(RoomListDocument, baseOptions);
        }
export type RoomListQueryHookResult = ReturnType<typeof useRoomListQuery>;
export type RoomListLazyQueryHookResult = ReturnType<typeof useRoomListLazyQuery>;
export type RoomListQueryResult = ApolloReactCommon.QueryResult<RoomListQuery, RoomListQueryVariables>;
export const AddUserDialogDataDocument = gql`
    query AddUserDialogData {
  users {
    id
    name
    email
    rooms {
      id
    }
  }
}
    `;

/**
 * __useAddUserDialogDataQuery__
 *
 * To run a query within a React component, call `useAddUserDialogDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddUserDialogDataQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddUserDialogDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddUserDialogDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddUserDialogDataQuery, AddUserDialogDataQueryVariables>) {
        return ApolloReactHooks.useQuery<AddUserDialogDataQuery, AddUserDialogDataQueryVariables>(AddUserDialogDataDocument, baseOptions);
      }
export function useAddUserDialogDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddUserDialogDataQuery, AddUserDialogDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AddUserDialogDataQuery, AddUserDialogDataQueryVariables>(AddUserDialogDataDocument, baseOptions);
        }
export type AddUserDialogDataQueryHookResult = ReturnType<typeof useAddUserDialogDataQuery>;
export type AddUserDialogDataLazyQueryHookResult = ReturnType<typeof useAddUserDialogDataLazyQuery>;
export type AddUserDialogDataQueryResult = ApolloReactCommon.QueryResult<AddUserDialogDataQuery, AddUserDialogDataQueryVariables>;
export const AddUserDialogActionDocument = gql`
    mutation AddUserDialogAction($input: RoomAddPeopleInput!) {
  roomAddPeople(input: $input) {
    users {
      id
      name
      email
      rooms {
        id
      }
    }
  }
}
    `;
export type AddUserDialogActionMutationFn = ApolloReactCommon.MutationFunction<AddUserDialogActionMutation, AddUserDialogActionMutationVariables>;

/**
 * __useAddUserDialogActionMutation__
 *
 * To run a mutation, you first call `useAddUserDialogActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserDialogActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserDialogActionMutation, { data, loading, error }] = useAddUserDialogActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserDialogActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddUserDialogActionMutation, AddUserDialogActionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddUserDialogActionMutation, AddUserDialogActionMutationVariables>(AddUserDialogActionDocument, baseOptions);
      }
export type AddUserDialogActionMutationHookResult = ReturnType<typeof useAddUserDialogActionMutation>;
export type AddUserDialogActionMutationResult = ApolloReactCommon.MutationResult<AddUserDialogActionMutation>;
export type AddUserDialogActionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddUserDialogActionMutation, AddUserDialogActionMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: MessageSendInput!) {
  messageSend(input: $input) {
    id
    content
    author {
      id
    }
  }
}
    `;
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const RoomDocument = gql`
    query Room($id: ID!) {
  room(id: $id) {
    id
    messages {
      id
      content
    }
  }
}
    `;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RoomQuery, RoomQueryVariables>) {
        return ApolloReactHooks.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
      }
export function useRoomLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
        }
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = ApolloReactCommon.QueryResult<RoomQuery, RoomQueryVariables>;
export const ChatRoomSubscriptionDocument = gql`
    subscription ChatRoomSubscription($roomId: ID!) {
  messageInRoom(roomId: $roomId) {
    id
    content
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useChatRoomSubscriptionSubscription__
 *
 * To run a query within a React component, call `useChatRoomSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomSubscriptionSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useChatRoomSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ChatRoomSubscriptionSubscription, ChatRoomSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ChatRoomSubscriptionSubscription, ChatRoomSubscriptionSubscriptionVariables>(ChatRoomSubscriptionDocument, baseOptions);
      }
export type ChatRoomSubscriptionSubscriptionHookResult = ReturnType<typeof useChatRoomSubscriptionSubscription>;
export type ChatRoomSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<ChatRoomSubscriptionSubscription>;
export const ChatRoomDocument = gql`
    query ChatRoom($id: ID!) {
  me {
    id
  }
  room(id: $id) {
    id
    name
    admins {
      id
    }
    users {
      id
    }
    messages {
      id
      content
      author {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useChatRoomQuery__
 *
 * To run a query within a React component, call `useChatRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatRoomQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChatRoomQuery, ChatRoomQueryVariables>) {
        return ApolloReactHooks.useQuery<ChatRoomQuery, ChatRoomQueryVariables>(ChatRoomDocument, baseOptions);
      }
export function useChatRoomLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChatRoomQuery, ChatRoomQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChatRoomQuery, ChatRoomQueryVariables>(ChatRoomDocument, baseOptions);
        }
export type ChatRoomQueryHookResult = ReturnType<typeof useChatRoomQuery>;
export type ChatRoomLazyQueryHookResult = ReturnType<typeof useChatRoomLazyQuery>;
export type ChatRoomQueryResult = ApolloReactCommon.QueryResult<ChatRoomQuery, ChatRoomQueryVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($input: RoomCreateInput!) {
  roomCreate(input: $input) {
    id
    name
  }
}
    `;
export type CreateRoomMutationFn = ApolloReactCommon.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = ApolloReactCommon.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const GetRoomListDocument = gql`
    query GetRoomList {
  me {
    id
    rooms {
      id
      name
    }
  }
}
    `;

/**
 * __useGetRoomListQuery__
 *
 * To run a query within a React component, call `useGetRoomListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRoomListQuery, GetRoomListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRoomListQuery, GetRoomListQueryVariables>(GetRoomListDocument, baseOptions);
      }
export function useGetRoomListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRoomListQuery, GetRoomListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRoomListQuery, GetRoomListQueryVariables>(GetRoomListDocument, baseOptions);
        }
export type GetRoomListQueryHookResult = ReturnType<typeof useGetRoomListQuery>;
export type GetRoomListLazyQueryHookResult = ReturnType<typeof useGetRoomListLazyQuery>;
export type GetRoomListQueryResult = ApolloReactCommon.QueryResult<GetRoomListQuery, GetRoomListQueryVariables>;
export const DashboardDocument = gql`
    subscription Dashboard {
  randomNumber
}
    `;

/**
 * __useDashboardSubscription__
 *
 * To run a query within a React component, call `useDashboardSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDashboardSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDashboardSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<DashboardSubscription, DashboardSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<DashboardSubscription, DashboardSubscriptionVariables>(DashboardDocument, baseOptions);
      }
export type DashboardSubscriptionHookResult = ReturnType<typeof useDashboardSubscription>;
export type DashboardSubscriptionResult = ApolloReactCommon.SubscriptionResult<DashboardSubscription>;
export const LoginDocument = gql`
    mutation Login($data: UserLoginDataInput!) {
  login(data: $data) {
    token
    user {
      id
      name
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: UserSignupDataInput!) {
  signup(data: $data) {
    token
    user {
      id
      name
    }
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
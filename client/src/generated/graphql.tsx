/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post: Post;
  updatedAt: Scalars['String'];
};

export type ConfirmUserInput = {
  __typename?: 'ConfirmUserInput';
  id: Scalars['ID'];
  token: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['String'];
  latestMessage?: Maybe<Message>;
  participants: Array<Participant>;
  updatedAt: Scalars['Date'];
};

export type ConversationCreatedSubscriptionPayload = {
  __typename?: 'ConversationCreatedSubscriptionPayload';
  conversation: Conversation;
};

export type ConversationDeletedSubscriptionPayload = {
  __typename?: 'ConversationDeletedSubscriptionPayload';
  conversation: Conversation;
};

export type ConversationUpdatedSubscriptionPayload = {
  __typename?: 'ConversationUpdatedSubscriptionPayload';
  conversation: Conversation;
};

export type CreateConversationResponse = {
  __typename?: 'CreateConversationResponse';
  conversationId: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  post: Post;
  user: User;
};

export type LoginInput = {
  __typename?: 'LoginInput';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  sender: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Scalars['Boolean'];
  changePassword: User;
  confirmUser: Scalars['Boolean'];
  createComment: Comment;
  createConversation: CreateConversationResponse;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deleteConversation: Scalars['Boolean'];
  deleteFriend: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  dislikePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  markConversationAsRead: Scalars['Boolean'];
  register: User;
  rejectFriendRequest: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  updateComment: Comment;
  updateParticipants: Scalars['Boolean'];
  updatePost: Post;
  updateProfile: Profile;
};


export type MutationAcceptFriendRequestArgs = {
  requestorId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  id: Scalars['ID'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  id: Scalars['ID'];
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationCreateConversationArgs = {
  participantsIds: Array<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  postImage?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  postId: Scalars['ID'];
};


export type MutationDeleteConversationArgs = {
  conversationId: Scalars['String'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationDislikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRejectFriendRequestArgs = {
  requestorId: Scalars['String'];
};


export type MutationSendFriendRequestArgs = {
  addresseeId: Scalars['String'];
};


export type MutationSendMessageArgs = {
  body: Scalars['String'];
  conversationId: Scalars['String'];
  id: Scalars['String'];
  senderId: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationUpdateParticipantsArgs = {
  conversationId: Scalars['String'];
  participantIds: Array<InputMaybe<Scalars['String']>>;
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
  postImage?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProfileArgs = {
  avatarImage?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Participant = {
  __typename?: 'Participant';
  hasSeenLatestMessage: Scalars['Boolean'];
  id: Scalars['String'];
  user: User;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  likes: Array<Like>;
  postImage: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatarImage: Scalars['String'];
  bio: Scalars['String'];
  coverImage: Scalars['String'];
  id: Scalars['ID'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  conversation: Conversation;
  conversations: Array<Conversation>;
  getAllComments: Array<Comment>;
  getAllPosts: Array<Post>;
  getAllProfiles: Array<Profile>;
  getMe: User;
  getPost: Post;
  getProfile: Profile;
  getUserfriends: Array<User>;
  getUsers: Array<User>;
  messages: Array<Message>;
};


export type QueryConversationArgs = {
  conversationId: Scalars['String'];
};


export type QueryGetAllCommentsArgs = {
  postId: Scalars['ID'];
};


export type QueryGetAllProfilesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetProfileArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserfriendsArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUsersArgs = {
  searchName?: InputMaybe<Scalars['String']>;
};


export type QueryMessagesArgs = {
  conversationId: Scalars['ID'];
};

export type RegisterInput = {
  __typename?: 'RegisterInput';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated: ConversationCreatedSubscriptionPayload;
  conversationDeleted: ConversationDeletedSubscriptionPayload;
  conversationUpdated: ConversationUpdatedSubscriptionPayload;
  messageSent?: Maybe<Message>;
};


export type SubscriptionMessageSentArgs = {
  conversationId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  conversations: Array<Conversation>;
  email: Scalars['String'];
  friendRequests: Array<Scalars['String']>;
  id: Scalars['ID'];
  likes: Array<Like>;
  name: Scalars['String'];
  password: Scalars['String'];
  posts: Array<Post>;
  profile: Profile;
};

export type ConversationFieldsFragment = { __typename?: 'Conversation', id: string, updatedAt: any, participants: Array<{ __typename?: 'Participant', hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, name: string } }>, latestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null };

export type MessageFieldsFragment = { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } };

export type AcceptFriendRequestMutationVariables = Exact<{
  requestorId: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: boolean };

export type ConfirmUserMutationVariables = Exact<{
  confirmUserId: Scalars['ID'];
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = { __typename?: 'Mutation', confirmUser: boolean };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, createdAt: string, author: { __typename?: 'User', id: string, name: string, profile: { __typename?: 'Profile', id: string, avatarImage: string } } } };

export type CreateConversationMutationVariables = Exact<{
  participantsIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'CreateConversationResponse', conversationId: string } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  postImage?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, content: string, postImage: string, author: { __typename?: 'User', id: string } } };

export type DeleteConversationMutationVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DislikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DislikePostMutation = { __typename?: 'Mutation', dislikePost: boolean };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MarkConversationAsReadMutationVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type MarkConversationAsReadMutation = { __typename?: 'Mutation', markConversationAsRead: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, name: string } };

export type RejectFriendRequestMutationVariables = Exact<{
  requestorId: Scalars['String'];
}>;


export type RejectFriendRequestMutation = { __typename?: 'Mutation', rejectFriendRequest: boolean };

export type SendFriendRequestMutationVariables = Exact<{
  addresseeId: Scalars['String'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: boolean };

export type SendMessageMutationVariables = Exact<{
  id: Scalars['String'];
  conversationId: Scalars['String'];
  senderId: Scalars['String'];
  body: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UpdateProfileMutationVariables = Exact<{
  bio?: InputMaybe<Scalars['String']>;
  avatarImage?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, bio: string, avatarImage: string, coverImage: string } };

export type ConversationQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type ConversationQuery = { __typename?: 'Query', conversation: { __typename?: 'Conversation', id: string, updatedAt: any, participants: Array<{ __typename?: 'Participant', hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, name: string } }>, latestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null } };

export type ConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConversationsQuery = { __typename?: 'Query', conversations: Array<{ __typename?: 'Conversation', id: string, updatedAt: any, participants: Array<{ __typename?: 'Participant', hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, name: string } }>, latestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null }> };

export type GetAllCommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetAllCommentsQuery = { __typename?: 'Query', getAllComments: Array<{ __typename?: 'Comment', id: string, createdAt: string, content: string, author: { __typename?: 'User', id: string, name: string, profile: { __typename?: 'Profile', avatarImage: string } } }> };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: string, createdAt: string, content: string, postImage: string, likes: Array<{ __typename?: 'Like', user: { __typename?: 'User', id: string } }>, author: { __typename?: 'User', id: string, name: string, profile: { __typename?: 'Profile', avatarImage: string } } }> };

export type GetAllUsersQueryVariables = Exact<{
  searchName?: InputMaybe<Scalars['String']>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string, profile: { __typename?: 'Profile', id: string, avatarImage: string } }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, email: string, friendRequests: Array<string>, name: string, profile: { __typename?: 'Profile', avatarImage: string } } };

export type GetProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'Profile', id: string, bio: string, avatarImage: string, coverImage: string, user: { __typename?: 'User', name: string, friendRequests: Array<string> } } };

export type GetUserfriendsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserfriendsQuery = { __typename?: 'Query', getUserfriends: Array<{ __typename?: 'User', id: string, name: string, profile: { __typename?: 'Profile', avatarImage: string } }> };

export type MessagesQueryVariables = Exact<{
  conversationId: Scalars['ID'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } }> };

export type ConversationCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ConversationCreatedSubscription = { __typename?: 'Subscription', conversationCreated: { __typename?: 'ConversationCreatedSubscriptionPayload', conversation: { __typename?: 'Conversation', id: string, updatedAt: any, participants: Array<{ __typename?: 'Participant', hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, name: string } }>, latestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null } } };

export type ConversationDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ConversationDeletedSubscription = { __typename?: 'Subscription', conversationDeleted: { __typename?: 'ConversationDeletedSubscriptionPayload', conversation: { __typename?: 'Conversation', id: string } } };

export type ConversationUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ConversationUpdatedSubscription = { __typename?: 'Subscription', conversationUpdated: { __typename?: 'ConversationUpdatedSubscriptionPayload', conversation: { __typename?: 'Conversation', id: string, updatedAt: any, participants: Array<{ __typename?: 'Participant', hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, name: string } }>, latestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null } } };

export type MessageSentSubscriptionVariables = Exact<{
  conversationId: Scalars['ID'];
}>;


export type MessageSentSubscription = { __typename?: 'Subscription', messageSent?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender: { __typename?: 'User', id: string, name: string } } | null };

export const MessageFieldsFragmentDoc = gql`
    fragment MessageFields on Message {
  id
  sender {
    id
    name
  }
  body
  createdAt
}
    `;
export const ConversationFieldsFragmentDoc = gql`
    fragment ConversationFields on Conversation {
  id
  updatedAt
  participants {
    user {
      id
      name
    }
    hasSeenLatestMessage
  }
  latestMessage {
    ...MessageFields
  }
}
    ${MessageFieldsFragmentDoc}`;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($requestorId: String!) {
  acceptFriendRequest(requestorId: $requestorId)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      requestorId: // value for 'requestorId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($confirmUserId: ID!, $token: String!) {
  confirmUser(id: $confirmUserId, token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      confirmUserId: // value for 'confirmUserId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, options);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: ID!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    id
    content
    createdAt
    author {
      id
      name
      profile {
        id
        avatarImage
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateConversationDocument = gql`
    mutation CreateConversation($participantsIds: [String!]!) {
  createConversation(participantsIds: $participantsIds) {
    conversationId
  }
}
    `;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      participantsIds: // value for 'participantsIds'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $postImage: String) {
  createPost(title: $title, content: $content, postImage: $postImage) {
    id
    title
    content
    postImage
    author {
      id
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      postImage: // value for 'postImage'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteConversationDocument = gql`
    mutation DeleteConversation($conversationId: String!) {
  deleteConversation(conversationId: $conversationId)
}
    `;
export type DeleteConversationMutationFn = Apollo.MutationFunction<DeleteConversationMutation, DeleteConversationMutationVariables>;

/**
 * __useDeleteConversationMutation__
 *
 * To run a mutation, you first call `useDeleteConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConversationMutation, { data, loading, error }] = useDeleteConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useDeleteConversationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConversationMutation, DeleteConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteConversationMutation, DeleteConversationMutationVariables>(DeleteConversationDocument, options);
      }
export type DeleteConversationMutationHookResult = ReturnType<typeof useDeleteConversationMutation>;
export type DeleteConversationMutationResult = Apollo.MutationResult<DeleteConversationMutation>;
export type DeleteConversationMutationOptions = Apollo.BaseMutationOptions<DeleteConversationMutation, DeleteConversationMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DislikePostDocument = gql`
    mutation DislikePost($postId: ID!) {
  dislikePost(postId: $postId)
}
    `;
export type DislikePostMutationFn = Apollo.MutationFunction<DislikePostMutation, DislikePostMutationVariables>;

/**
 * __useDislikePostMutation__
 *
 * To run a mutation, you first call `useDislikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikePostMutation, { data, loading, error }] = useDislikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDislikePostMutation(baseOptions?: Apollo.MutationHookOptions<DislikePostMutation, DislikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DislikePostMutation, DislikePostMutationVariables>(DislikePostDocument, options);
      }
export type DislikePostMutationHookResult = ReturnType<typeof useDislikePostMutation>;
export type DislikePostMutationResult = Apollo.MutationResult<DislikePostMutation>;
export type DislikePostMutationOptions = Apollo.BaseMutationOptions<DislikePostMutation, DislikePostMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarkConversationAsReadDocument = gql`
    mutation MarkConversationAsRead($conversationId: String!) {
  markConversationAsRead(conversationId: $conversationId)
}
    `;
export type MarkConversationAsReadMutationFn = Apollo.MutationFunction<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;

/**
 * __useMarkConversationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkConversationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkConversationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markConversationAsReadMutation, { data, loading, error }] = useMarkConversationAsReadMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMarkConversationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>(MarkConversationAsReadDocument, options);
      }
export type MarkConversationAsReadMutationHookResult = ReturnType<typeof useMarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationResult = Apollo.MutationResult<MarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
  register(email: $email, password: $password, name: $name) {
    id
    email
    name
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RejectFriendRequestDocument = gql`
    mutation RejectFriendRequest($requestorId: String!) {
  rejectFriendRequest(requestorId: $requestorId)
}
    `;
export type RejectFriendRequestMutationFn = Apollo.MutationFunction<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;

/**
 * __useRejectFriendRequestMutation__
 *
 * To run a mutation, you first call `useRejectFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFriendRequestMutation, { data, loading, error }] = useRejectFriendRequestMutation({
 *   variables: {
 *      requestorId: // value for 'requestorId'
 *   },
 * });
 */
export function useRejectFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>(RejectFriendRequestDocument, options);
      }
export type RejectFriendRequestMutationHookResult = ReturnType<typeof useRejectFriendRequestMutation>;
export type RejectFriendRequestMutationResult = Apollo.MutationResult<RejectFriendRequestMutation>;
export type RejectFriendRequestMutationOptions = Apollo.BaseMutationOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($addresseeId: String!) {
  sendFriendRequest(addresseeId: $addresseeId)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      addresseeId: // value for 'addresseeId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($id: String!, $conversationId: String!, $senderId: String!, $body: String!) {
  sendMessage(
    id: $id
    conversationId: $conversationId
    senderId: $senderId
    body: $body
  )
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

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
 *      id: // value for 'id'
 *      conversationId: // value for 'conversationId'
 *      senderId: // value for 'senderId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($bio: String, $avatarImage: String, $coverImage: String) {
  updateProfile(bio: $bio, avatarImage: $avatarImage, coverImage: $coverImage) {
    id
    bio
    avatarImage
    coverImage
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      avatarImage: // value for 'avatarImage'
 *      coverImage: // value for 'coverImage'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ConversationDocument = gql`
    query Conversation($conversationId: String!) {
  conversation(conversationId: $conversationId) {
    ...ConversationFields
  }
}
    ${ConversationFieldsFragmentDoc}`;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useConversationQuery(baseOptions: Apollo.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = Apollo.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const ConversationsDocument = gql`
    query Conversations {
  conversations {
    ...ConversationFields
  }
}
    ${ConversationFieldsFragmentDoc}`;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConversationsQuery(baseOptions?: Apollo.QueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
      }
export function useConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsQueryResult = Apollo.QueryResult<ConversationsQuery, ConversationsQueryVariables>;
export const GetAllCommentsDocument = gql`
    query GetAllComments($postId: ID!) {
  getAllComments(postId: $postId) {
    id
    author {
      id
      name
      profile {
        avatarImage
      }
    }
    createdAt
    content
  }
}
    `;

/**
 * __useGetAllCommentsQuery__
 *
 * To run a query within a React component, call `useGetAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetAllCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetAllCommentsQuery, GetAllCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCommentsQuery, GetAllCommentsQueryVariables>(GetAllCommentsDocument, options);
      }
export function useGetAllCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommentsQuery, GetAllCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCommentsQuery, GetAllCommentsQueryVariables>(GetAllCommentsDocument, options);
        }
export type GetAllCommentsQueryHookResult = ReturnType<typeof useGetAllCommentsQuery>;
export type GetAllCommentsLazyQueryHookResult = ReturnType<typeof useGetAllCommentsLazyQuery>;
export type GetAllCommentsQueryResult = Apollo.QueryResult<GetAllCommentsQuery, GetAllCommentsQueryVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    id
    likes {
      user {
        id
      }
    }
    author {
      id
      name
      profile {
        avatarImage
      }
    }
    createdAt
    content
    postImage
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers($searchName: String) {
  getUsers(searchName: $searchName) {
    id
    name
    profile {
      id
      avatarImage
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      searchName: // value for 'searchName'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    id
    email
    friendRequests
    name
    profile {
      avatarImage
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($userId: String!) {
  getProfile(userId: $userId) {
    id
    bio
    avatarImage
    coverImage
    user {
      name
      friendRequests
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetUserfriendsDocument = gql`
    query GetUserfriends($userId: ID!) {
  getUserfriends(userId: $userId) {
    id
    name
    profile {
      avatarImage
    }
  }
}
    `;

/**
 * __useGetUserfriendsQuery__
 *
 * To run a query within a React component, call `useGetUserfriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserfriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserfriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserfriendsQuery(baseOptions: Apollo.QueryHookOptions<GetUserfriendsQuery, GetUserfriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserfriendsQuery, GetUserfriendsQueryVariables>(GetUserfriendsDocument, options);
      }
export function useGetUserfriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserfriendsQuery, GetUserfriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserfriendsQuery, GetUserfriendsQueryVariables>(GetUserfriendsDocument, options);
        }
export type GetUserfriendsQueryHookResult = ReturnType<typeof useGetUserfriendsQuery>;
export type GetUserfriendsLazyQueryHookResult = ReturnType<typeof useGetUserfriendsLazyQuery>;
export type GetUserfriendsQueryResult = Apollo.QueryResult<GetUserfriendsQuery, GetUserfriendsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($conversationId: ID!) {
  messages(conversationId: $conversationId) {
    ...MessageFields
  }
}
    ${MessageFieldsFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const ConversationCreatedDocument = gql`
    subscription ConversationCreated {
  conversationCreated {
    conversation {
      ...ConversationFields
    }
  }
}
    ${ConversationFieldsFragmentDoc}`;

/**
 * __useConversationCreatedSubscription__
 *
 * To run a query within a React component, call `useConversationCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useConversationCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ConversationCreatedSubscription, ConversationCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConversationCreatedSubscription, ConversationCreatedSubscriptionVariables>(ConversationCreatedDocument, options);
      }
export type ConversationCreatedSubscriptionHookResult = ReturnType<typeof useConversationCreatedSubscription>;
export type ConversationCreatedSubscriptionResult = Apollo.SubscriptionResult<ConversationCreatedSubscription>;
export const ConversationDeletedDocument = gql`
    subscription ConversationDeleted {
  conversationDeleted {
    conversation {
      id
    }
  }
}
    `;

/**
 * __useConversationDeletedSubscription__
 *
 * To run a query within a React component, call `useConversationDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useConversationDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ConversationDeletedSubscription, ConversationDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConversationDeletedSubscription, ConversationDeletedSubscriptionVariables>(ConversationDeletedDocument, options);
      }
export type ConversationDeletedSubscriptionHookResult = ReturnType<typeof useConversationDeletedSubscription>;
export type ConversationDeletedSubscriptionResult = Apollo.SubscriptionResult<ConversationDeletedSubscription>;
export const ConversationUpdatedDocument = gql`
    subscription ConversationUpdated {
  conversationUpdated {
    conversation {
      ...ConversationFields
    }
  }
}
    ${ConversationFieldsFragmentDoc}`;

/**
 * __useConversationUpdatedSubscription__
 *
 * To run a query within a React component, call `useConversationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useConversationUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>(ConversationUpdatedDocument, options);
      }
export type ConversationUpdatedSubscriptionHookResult = ReturnType<typeof useConversationUpdatedSubscription>;
export type ConversationUpdatedSubscriptionResult = Apollo.SubscriptionResult<ConversationUpdatedSubscription>;
export const MessageSentDocument = gql`
    subscription MessageSent($conversationId: ID!) {
  messageSent(conversationId: $conversationId) {
    ...MessageFields
  }
}
    ${MessageFieldsFragmentDoc}`;

/**
 * __useMessageSentSubscription__
 *
 * To run a query within a React component, call `useMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSentSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessageSentSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSentSubscription, MessageSentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSentSubscription, MessageSentSubscriptionVariables>(MessageSentDocument, options);
      }
export type MessageSentSubscriptionHookResult = ReturnType<typeof useMessageSentSubscription>;
export type MessageSentSubscriptionResult = Apollo.SubscriptionResult<MessageSentSubscription>;
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  content: Scalars['String'],
  authorId: Scalars['ID'],
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
  roomCreate: Room,
  roomAddPeople: Room,
  roomRemovePeople: Room,
  messageSend: Message,
  messageDelete: Message,
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
  room?: Maybe<Room>,
  /** to extend on type User */
  rooms?: Maybe<Array<Room>>,
};


export type QueryRoomArgs = {
  id: Scalars['ID']
};


export type QueryRoomsArgs = {
  userId: Scalars['ID']
};

export type Room = {
   __typename?: 'Room',
  id: Scalars['ID'],
  name: Scalars['String'],
  messages?: Maybe<Array<Message>>,
  adminIds?: Maybe<Array<Scalars['ID']>>,
  userIds?: Maybe<Array<Scalars['ID']>>,
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
};


export type SubscriptionMessageInRoomArgs = {
  roomId: Scalars['ID']
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Room: ResolverTypeWrapper<Room>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Message: ResolverTypeWrapper<Message>,
  Mutation: ResolverTypeWrapper<{}>,
  RoomCreateInput: RoomCreateInput,
  RoomAddPeopleInput: RoomAddPeopleInput,
  RoomRemovePeopleInput: RoomRemovePeopleInput,
  MessageSendInput: MessageSendInput,
  MessageDeleteInput: MessageDeleteInput,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Room: Room,
  String: Scalars['String'],
  Message: Message,
  Mutation: {},
  RoomCreateInput: RoomCreateInput,
  RoomAddPeopleInput: RoomAddPeopleInput,
  RoomRemovePeopleInput: RoomRemovePeopleInput,
  MessageSendInput: MessageSendInput,
  MessageDeleteInput: MessageDeleteInput,
  Subscription: {},
  Boolean: Scalars['Boolean'],
};

export type MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  roomCreate?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationRoomCreateArgs, 'input'>>,
  roomAddPeople?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationRoomAddPeopleArgs, 'input'>>,
  roomRemovePeople?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationRoomRemovePeopleArgs, 'input'>>,
  messageSend?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationMessageSendArgs, 'input'>>,
  messageDelete?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationMessageDeleteArgs, 'input'>>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>,
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType, RequireFields<QueryRoomsArgs, 'userId'>>,
};

export type RoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>,
  adminIds?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>,
  userIds?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageInRoom?: SubscriptionResolver<ResolversTypes['Message'], "messageInRoom", ParentType, ContextType, RequireFields<SubscriptionMessageInRoomArgs, 'roomId'>>,
};

export type Resolvers<ContextType = Context> = {
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;

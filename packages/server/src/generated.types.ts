import { GraphQLResolveInfo } from "graphql";
import { QuestionDB } from "./db/types";
import { GqlContext } from "./create-context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Answer = {
  _id: Scalars["ID"]["output"];
  questionId: Scalars["ID"]["output"];
  text: Scalars["String"]["output"];
};

export type Comment = {
  _id: Scalars["ID"]["output"];
  questionId: Scalars["ID"]["output"];
  text: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  questionById?: Maybe<Question>;
  questions: Array<Question>;
};

export type QueryQuestionByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type Question = {
  _id: Scalars["ID"]["output"];
  answers: Array<Answer>;
  comments: Array<Comment>;
  description: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  votes: Scalars["Int"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Answer: never;
  Comment: never;
  Question: never;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["Answer"]
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Comment: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>["Comment"]
  >;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<QuestionDB>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: ResolversInterfaceTypes<ResolversParentTypes>["Answer"];
  Boolean: Scalars["Boolean"]["output"];
  Comment: ResolversInterfaceTypes<ResolversParentTypes>["Comment"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Query: {};
  Question: QuestionDB;
  String: Scalars["String"]["output"];
};

export type AnswerResolvers<
  ContextType = GqlContext,
  ParentType extends
    ResolversParentTypes["Answer"] = ResolversParentTypes["Answer"],
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = GqlContext,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = GqlContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  questionById?: Resolver<
    Maybe<ResolversTypes["Question"]>,
    ParentType,
    ContextType,
    RequireFields<QueryQuestionByIdArgs, "id">
  >;
  questions?: Resolver<
    Array<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >;
};

export type QuestionResolvers<
  ContextType = GqlContext,
  ParentType extends
    ResolversParentTypes["Question"] = ResolversParentTypes["Question"],
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  answers?: Resolver<Array<ResolversTypes["Answer"]>, ParentType, ContextType>;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type Resolvers<ContextType = GqlContext> = {
  Answer?: AnswerResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
};

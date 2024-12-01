/* eslint-disable */
// import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Movie = {
  __typename?: 'Movie';
  imageUrl: Scalars['String']['output'];
  movieID: Scalars['Int']['output'];
  originalLanguage: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  releaseDate: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  voteAverage: Scalars['Float']['output'];
  voteCount: Scalars['Int']['output'];
};

export type MovieConnection = {
  __typename?: 'MovieConnection';
  edges: Array<MovieEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MovieConnectionInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MovieEdge = {
  __typename?: 'MovieEdge';
  cursor: Scalars['String']['output'];
  node: Movie;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  movies: MovieConnection;
  user: User;
};


export type QueryMoviesArgs = {
  input?: InputMaybe<MovieConnectionInput>;
};


export type QueryUserArgs = {
  uid: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


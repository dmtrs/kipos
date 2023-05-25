export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Paper = {
  __typename?: 'Paper';
  about: Scalars['String'];
  abstract: Scalars['String'];
  id: Scalars['ID'];
  keywords: Array<Maybe<Scalars['String']>>;
  refs: Array<Maybe<Paper>>;
};

export type Query = {
  __typename?: 'Query';
  hello: Paper;
};


export type QueryHelloArgs = {
  doi: Scalars['ID'];
};

export type GetHelloQueryVariables = Exact<{
  doi: Scalars['ID'];
}>;


export type GetHelloQuery = { __typename?: 'Query', hello: { __typename?: 'Paper', id: string, about: string, abstract: string, keywords: Array<string | null>, refs: Array<{ __typename?: 'Paper', id: string, about: string, keywords: Array<string | null> } | null> } };

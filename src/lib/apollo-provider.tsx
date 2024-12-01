'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:5050/query', // GoサーバーのGraphQLエンドポイント
  cache: new InMemoryCache({
    // ページネーションのためのキャッシュ設定
    typePolicies: {
      Query: {
        fields: {
          movies: {
            keyArgs: false,
            merge(existing = { edges: [] }, incoming) {
              return {
                ...incoming,
                edges: [
                  ...(existing.edges || []),
                  ...incoming.edges
                ]
              }
            }
          }
        }
      }
    }
  })
})

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../api/queries'
import { MovieConnection, MovieConnectionInput } from '@/gql/graphql'

export const useMovies = (input?: MovieConnectionInput) => {
  const { data, loading, error, fetchMore } = useQuery<{ movies: MovieConnection }>(GET_MOVIES, {
    variables: { input: input || { first: 10 } },
  })

  const loadMore = () => {
    if (!data?.movies.pageInfo.hasNextPage) return

    fetchMore({
      variables: {
        input: {
          ...input,
          first: 10,
          after: data.movies.pageInfo.endCursor
        }
      }
    })
  }

  return {
    movies: data?.movies.edges.map(edge => edge.node) || [],
    totalCount: data?.movies.totalCount || 0,
    loading,
    error,
    loadMore,
    hasNextPage: data?.movies.pageInfo.hasNextPage || false
  }
}
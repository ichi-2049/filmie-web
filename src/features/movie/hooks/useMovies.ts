import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_MOVIES } from '@/features/movie/api/queries'
import { MovieConnection } from '@/features/movie/types/movie'
import { Movie } from '@/features/movie/types/movie'

export const useMovies = (searchQuery?: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { data, fetchMore, refetch } = useQuery<{ movies: MovieConnection }>(GET_MOVIES, {
    variables: { 
      input: { 
        first: 10, 
        title: searchQuery 
      } 
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (fetchedData) => {
      if (fetchedData?.movies) {
        setMovies(prev => 
          searchQuery !== undefined || prev.length === 0
            ? fetchedData.movies.edges.map(edge => edge.node)
            : [...prev, ...fetchedData.movies.edges.map(edge => edge.node)]
        )
        setHasNextPage(fetchedData.movies.pageInfo.hasNextPage)
        setLoading(false)
      }
    },
    onError: (queryError) => {
      setError(queryError)
      setLoading(false)
    }
  })

  useEffect(() => {
    refetch()
  }, [searchQuery, refetch])

  const loadMore = () => {
    if (!hasNextPage || loading) return

    setLoading(true)
    fetchMore({
      variables: {
        input: {
          first: 10,
          after: data?.movies.pageInfo.endCursor,
          title: searchQuery
        }
      }
    })
  }

  return {
    movies,
    loading,
    error,
    loadMore,
    hasNextPage
  }
}
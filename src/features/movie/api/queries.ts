import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query GetMovies($input: MovieConnectionInput) {
    movies(input: $input) {
      totalCount
      edges {
        node {
          movieID
          title
          overview
          imageUrl
          releaseDate
          voteAverage
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
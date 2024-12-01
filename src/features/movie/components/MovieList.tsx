// import Image from 'next/image'
import { useMovies } from '../hooks/useMovies'
import styles from '../styles/movie.module.css'

export const MovieList = () => {
  const { movies, loading, error, loadMore, hasNextPage } = useMovies()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className={styles.movieGrid}>
      {movies.map(movie => (
        <div key={movie.movieID} className={styles.movieCard}>
          {/* <Image 
            src={movie.imageUrl} 
            alt={movie.title} 
            width={200} 
            height={300} 
            className={styles.movieImage}
          /> */}
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <div>
            <span>Vote Average: {movie.voteAverage}</span>
          </div>
        </div>
      ))}
      {hasNextPage && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  )
}
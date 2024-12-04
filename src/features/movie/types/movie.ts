export interface Movie {
    movieID: string;
    title: string;
    overview: string;
    imageUrl: string;
    releaseDate: string;
    voteAverage: number;
  }
  
  export interface MovieConnection {
    totalCount: number;
    edges: {
      node: Movie;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  }
  
  export interface MovieConnectionInput {
    first?: number;
    after?: string;
    title?: string;
  }
'use client';

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image'; // next/image をインポート
import { useMovies } from '@/features/movie/hooks/useMovies';

type MovieListProps = {
  searchQuery?: string;
};

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MoviesInfiniteList: React.FC<MovieListProps> = ({ searchQuery }) => {
  const { movies, loadMore, hasNextPage } = useMovies(searchQuery);

  return (
    <InfiniteScroll
      dataLength={movies.length} // 現在のデータ数
      next={loadMore} // 次のデータをロード
      hasMore={hasNextPage} // さらにデータがあるか
      loader={<p>Loading...</p>} // ロード中に表示
      scrollThreshold={0.9} // スクロール位置のトリガー（90% 到達時）
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.movieID}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}
          >
            {/* 映画ポスター */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '150%' }}>
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.imageUrl}`}
                alt={movie.title}
                fill // 画像のサイズを親要素に合わせる
                style={{ objectFit: 'cover' }} // 画像の表示形式
                sizes="(max-width: 768px) 100vw, 20vw" // レスポンシブなサイズ指定
              />
            </div>
            {/* 映画タイトル */}
            <h3 style={{ marginTop: '8px' }}>{movie.title}</h3>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

import React from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  year: string;
  rating: string;
  duration: string;
  posterUrl: string;
  description: string;
}

interface MovieGridProps {
  movies?: Movie[];
  onLoadMore?: () => void;
}


const MovieGrid = ({
  movies,
}: MovieGridProps) => {
  return (
    <div className="w-full h-fit bg-background p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            // duration={movie.duration}
            posterUrl={movie.posterUrl}
            description={movie.description}
            // onQuickView={() => console.log(`Quick view for ${movie.title}`)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        {/* <button
          onClick={onLoadMore}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Load More
        </button> */}
      </div>
    </div>
  );
};

export default MovieGrid;

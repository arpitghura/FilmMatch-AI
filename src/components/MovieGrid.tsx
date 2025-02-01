import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import MovieCard from "./MovieCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useMovieContext } from "@/context/MovieContext";
import { CircularLoader } from "./ui/Loader";
import { Trash2 } from "lucide-react";

export interface Movie {
  id: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
}

const MovieGrid = () => {
  const { searchedResult, setSearchedResult } = useMovieContext();

  return (
    <Card className="w-full min-h-[200px] bg-inherit border-t my-5">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-semibold">Your Search Recommendations</CardTitle>
        <div className="text-muted-foreground text-sm flex items-center cursor-pointer gap-2" onClick={() => setSearchedResult([])}>
          <Trash2 className="h-5 w-5" /> Clear All Search Results 
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className="w-full whitespace-nowrap"
        >
          <div className="flex flex-wrap sm:gap-x-2 gap-y-5 sm:px-2 sm:py-4 justify-center sm:justify-start items-center">
            {searchedResult?.length > 0 ? (
              searchedResult?.map((movie, index) => (
                <div key={index} className="shrink-0">
                  <MovieCard
                    title={movie.Title}
                    year={movie.Year}
                    rating={movie.imdbRating}
                    posterUrl={movie.Poster}
                    description={movie.Plot}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-lg mt-5 text-muted-foreground">
                No search results found
              </p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MovieGrid;

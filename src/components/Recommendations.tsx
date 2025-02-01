// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import MovieCard from "./MovieCard";
// import { ScrollArea, ScrollBar } from "./ui/scroll-area";

// interface Movie {
//   id: string;
//   title: string;
//   year: number;
//   rating: number;
//   posterUrl: string;
//   description: string;
// }

// interface SmartRecommendationPanelProps {
//   recommendations?: Movie[];
//   title?: string;
// }

// const SmartRecommendationPanel = ({
//   recommendations = [
//     {
//       id: "1",
//       title: "The Dark Knight",
//       year: 2008,
//       rating: 9.0,
//       posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
//       description:
//         "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     },
//     {
//       id: "2",
//       title: "Pulp Fiction",
//       year: 1994,
//       rating: 8.9,
//       posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
//       description:
//         "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
//     },
//     {
//       id: "3",
//       title: "The Godfather",
//       year: 1972,
//       rating: 9.2,
//       posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
//       description:
//         "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
//     },
//   ],
//   title = "Recommended for You",
// }: SmartRecommendationPanelProps) => {
//   return (
//     <Card className="w-full min-h-[200px] bg-background border-t">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-xl font-semibold">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="w-full whitespace-nowrap">
//           <div className="flex space-x-4 p-4">
//             {recommendations.map((movie) => (
//               <div key={movie.id} className="shrink-0">
//                 <MovieCard
//                   title={movie.title}
//                   year={Stringmovie.year}
//                   rating={movie.rating}
//                   posterUrl={movie.posterUrl}
//                   description={movie.description}
//                 />
//               </div>
//             ))}
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default SmartRecommendationPanel;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import MovieCard from "./MovieCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useMovieContext } from "@/context/MovieContext";
import { CircularLoader } from "./ui/Loader";

export interface Movie {
  id: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
}

const SmartRecommendationPanel = () => {
  const { recommendations, isSubmitted, error } = useMovieContext();

  console.log({recommendations});

  if (isSubmitted) {
    return (
      <CircularLoader message="Please Wait... AI is finding the best movies for you." />
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg mt-5 text-muted-foreground">
        {error}
      </div>
    );
  }

  return (
    recommendations?.length !== 0 && (
      <Card className="w-full min-h-[200px] bg-secondary border-t my-5">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea
            className="w-full whitespace-nowrap"
            id="movie-recommendations"
          >
            <div className="flex flex-wrap sm:gap-x-2 gap-y-5 sm:px-2 sm:py-4 justify-center sm:justify-start items-center">
              {recommendations?.map((movie, index) => (
                <div key={index} className="shrink-0">
                  <MovieCard
                    title={movie.Title}
                    year={movie.Year}
                    rating={movie.imdbRating}
                    posterUrl={movie.Poster}
                    description={movie.Plot}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    )
  );
};

export default SmartRecommendationPanel;

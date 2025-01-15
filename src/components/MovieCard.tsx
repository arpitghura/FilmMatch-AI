// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { Star, Clock, Calendar } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "./ui/tooltip";

// interface MovieCardProps {
//   title?: string;
//   year?: number;
//   rating?: number;
//   duration?: string;
//   posterUrl?: string;
//   description?: string;
//   onQuickView?: () => void;
// }

// const MovieCard = ({
//   title = "Inception",
//   year = 2010,
//   rating = 8.8,
//   duration = "2h 28min",
//   posterUrl = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
//   description = "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//   onQuickView = () => console.log("Quick view clicked"),
// }: MovieCardProps) => {
//   return (
//     <TooltipProvider>
//       <Card className="w-[280px] h-[400px] bg-card transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
//         <CardHeader className="p-0 h-[200px] overflow-hidden">
//           <img
//             src={posterUrl}
//             alt={title}
//             className="w-full h-full object-cover rounded-t-xl"
//           />
//         </CardHeader>
//         <CardContent className="p-4">
//           <div className="flex justify-between items-start mb-2">
//             <CardTitle className="text-lg truncate">{title}</CardTitle>
//             <Tooltip>
//               <TooltipTrigger>
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 text-yellow-400" />
//                   <span className="text-sm">{rating}</span>
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>IMDb Rating</p>
//               </TooltipContent>
//             </Tooltip>
//           </div>
//           <div className="flex gap-4 text-sm text-muted-foreground mb-2">
//             <div className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               <span>{year}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Clock className="w-4 h-4" />
//               <span>{duration}</span>
//             </div>
//           </div>
//           <CardDescription className="line-clamp-3 text-sm">
//             {description}
//           </CardDescription>
//         </CardContent>
//         <CardFooter className="p-4 pt-0">
//           <Button variant="secondary" className="w-full" onClick={onQuickView}>
//             Quick View
//           </Button>
//         </CardFooter>
//       </Card>
//     </TooltipProvider>
//   );
// };

// export default MovieCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MovieCardProps {
  title: string;
  year: string;
  rating: string; // Updated to accommodate ratings like "8.0/10"
  posterUrl: string;
  description: string;
}

const MovieCard = ({
  title,
  year,
  rating,
  posterUrl,
  description,
}: MovieCardProps) => {
  return (
    <Card className="w-72 bg-background hover:scale-105 transition-transform duration-300">
      <img
        src={posterUrl}
        alt={title}
        className="w-full min-h-[20.4rem] max-h-96 object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-wrap">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{year}</p>
        <p className="text-sm text-muted-foreground">{`Rating: ${rating}`}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;


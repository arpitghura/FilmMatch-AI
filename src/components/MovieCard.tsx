import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MovieCardProps {
  title: string;
  year: string;
  rating: string;
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
    <Card className="group w-[270px] sm:w-72 bg-background hover:bg-[#fc6767bd] sm:hover:scale-105 transition-colors sm:transition-transform duration-300">
      <div className="w-full p-2 min-h-[20.4rem] max-h-96 select-none">
      <img
        src={posterUrl}
        alt={title}
        className="w-full min-h-[20.4rem] max-h-96 object-cover rounded-t-lg object-center"
        loading="lazy"
        />
        </div>
      <CardHeader className="pt-2 pb-4 px-2">
        <CardTitle className="text-lg font-semibold text-wrap select-text text-gray-300">
          {title}
        </CardTitle>
        <div className="flex justify-between select-none">
        <p className="text-sm text-muted-foreground group-hover:text-gray-800">{year}</p>
        <p className="text-sm text-muted-foreground group-hover:text-gray-800">{`Rating: ${rating}`}</p>
        </div>
      </CardHeader>
      {description !== "N/A" && (<CardContent className="px-2 pt-0 pb-2">
        <p className="text-sm text-wrap line-clamp-4 group-hover:text-gray-800 overflow-ellipsis">{description}</p>
      </CardContent>)}
    </Card>
  );
};

export default MovieCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

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
      <Image
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


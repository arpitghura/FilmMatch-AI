"use client";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { useMovieContext } from "@/context/MovieContext";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
];

const industries = [
  "Bollywood",
  "Hollywood",
  "Tollywood",
  // "Kollywood",
  // "Mollywood",
  // "Pollywood",
  // "Sandalwood",
];

const initialValues: {
  selectedGenres: string[];
  yearRange: [number, number];
  rating: [number, number];
  industry: string | undefined;
} = {
  selectedGenres: [],
  yearRange: [1990, 2025],
  rating: [0, 10],
  industry: undefined,
};

const FilterSidebar = () => {
  const { setFilters } = useMovieContext();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialValues.selectedGenres
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(
    initialValues.industry
  );
  const [yearRange, setYearRange] = useState<[number, number]>(
    initialValues?.yearRange
  );
  const [rating, setRating] = useState<[number, number]>(initialValues?.rating);

  const handleGenreSelect = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    setFilters((prev) => ({ ...prev, genre: updatedGenres }));
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setFilters((prev) => ({ ...prev, industry: industry }));
  };

  const handleYearRangeChange = (start: number, end: number) => {
    const updatedRange: [number, number] = [
      Math.max(1900, start),
      Math.min(2025, end),
    ];
    setYearRange(updatedRange);
    setFilters((prev) => ({
      ...prev,
      fromYear: updatedRange[0],
      toYear: updatedRange[1],
    }));
  };

  const handleRatingChange = (range: [number, number]) => {
    setRating(range);
    setFilters((prev) => ({
      ...prev,
      fromRating: range[0],
      toRating: range[1],
    }));
  };

  const handleReset = () => {
    setSelectedGenres(initialValues.selectedGenres);
    setYearRange(initialValues.yearRange);
    setRating(initialValues.rating);
    setFilters({
      genre: initialValues.selectedGenres,
      fromYear: initialValues.yearRange[0],
      toYear: initialValues.yearRange[1],
      fromRating: initialValues.rating[0],
      toRating: initialValues.rating[1],
      industry: initialValues.industry,
    });
  };

  return (
    <div className="h-full bg-background border rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      <div className="space-y-6">
        {/* Industry */}
        <div className="h-fit">
          <h3 className="text-sm font-medium mb-3">Industry</h3>
          <ScrollArea className="pr-4 h-fit">
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={
                    selectedIndustry === industry ? "default" : "outline"
                  }
                  className={`cursor-pointer text-gray-300 hover:bg-[#fc1666cb] ${
                    selectedIndustry === industry
                      ? "bg-[#fc1666cb] text-dark"
                      : "bg-gray-800"
                  }`}
                  onClick={() => handleIndustrySelect(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Genres */}
        <div className="h-fit">
          <h3 className="text-sm font-medium mb-3">Genres</h3>
          <ScrollArea className="pr-4 h-fit">
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant={
                    selectedGenres.includes(genre) ? "default" : "outline"
                  }
                  className={`cursor-pointer text-gray-300 hover:bg-[#fc1666cb] ${
                    selectedGenres.includes(genre)
                      ? "bg-[#fc1666cb] text-dark"
                      : "bg-gray-800"
                  }`}
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Year Range */}
        <div>
          <h3 className="text-sm font-medium mb-3">Year Range</h3>
          <div className="flex items-center gap-4 px-2">
            <Input
              type="number"
              value={yearRange[0]}
              min={yearRange[0]}
              max={2025}
              onChange={(e) =>
                handleYearRangeChange(
                  parseInt(e.target.value) || 1900,
                  yearRange[1]
                )
              }
              className="w-20"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              value={yearRange[1]}
              min={1900}
              max={2024}
              onChange={(e) =>
                handleYearRangeChange(
                  yearRange[0],
                  parseInt(e.target.value) || 2024
                )
              }
              className="w-20"
            />
          </div>
          <div className="px-2 mt-4">
            <Slider
              value={yearRange}
              min={1900}
              max={2024}
              step={1}
              onValueChange={(value) =>
                handleYearRangeChange(value[0], value[1])
              }
            />
          </div>
        </div>

        <Separator />

        {/* Rating Range */}
        <div>
          <h3 className="text-sm font-medium mb-3">Rating</h3>
          <div className="px-2">
            <Slider
              defaultValue={rating}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(value) =>
                handleRatingChange(value as [number, number])
              }
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{rating[0].toFixed(1)}</span>
              <span>{rating[1].toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

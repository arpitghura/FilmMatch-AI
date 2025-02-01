"use client";

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
import React from "react";
import {
  Delete,
  DeleteIcon,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMovieContext } from "@/context/MovieContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  setIsShowFilters?: (isShow: boolean) => void;
  scrollToRecommendations: () => void;
  isShowFilters?: boolean;
  setSearchTriggered: (searchTriggered: boolean) => void;
}

const HeroSection = ({
  setIsShowFilters = () => console.log("Filters toggled"),
  isShowFilters = false,
  scrollToRecommendations,
  setSearchTriggered,
}: HeroSectionProps) => {
  const {
    search,
    setSearch,
    addMovieToHistory,
    deleteMovieHistory,
    setRecommendations,
    setSearchedResult,
    filters,
    setSubmitted,
    history,
    setError,
  } = useMovieContext();

  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search === "") {
      toast({
        title: "Please enter a movie name to search",
        className: "bg-[#FC6767] text-dark-foreground",
      });
      return;
    }
    setSubmitted(true);

    try {
      // api call to fetch movie data
      const postData = {
        filters: {
          title: search.trim(),
          ...filters,
        },
      };

      //console.log("Post Data: ", postData);
      const response = await axios.post("/api/recommend", postData);
      //console.log(response.data);
      setRecommendations(response.data?.movieData);
      scrollToRecommendations(); // Scroll to recommendations on search

      setTimeout(() => {
        setSearchTriggered(true);
        setSearchedResult((prev) => [...prev, ...response.data?.movieData]);
        addMovieToHistory(search); // Add to history on search
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "search_movie",
          search_query: search,
          response:
            response.data?.movieData?.length > 0 ? "success" : "failure",
          chosen_filters: filters,
          history: history,
        });
      }, 500);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error("Failed to fetch movie data: ", error);
    } finally {
      setSubmitted(false);
    }
  };

  const handleToggleFilters = () => {
    setIsShowFilters(!isShowFilters);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "filter_clicked",
      filter_visibility: isShowFilters ? "hidden" : "visible",
    });
  };

  return (
    <div className="w-full h-full">
      {/* Gradient Background */}
      <div className="inset-0 bg-gradient-to-b to-background opacity-10" />

      {/* Content Container */}
      <div className="h-full max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center bebas-neue-font tracking-wide gradient-text-animated">
          Discover Your Next Favorite Movie
        </h1>

        <p className="text-lg text-center text-muted-foreground max-w-xl md:max-w-2xl lg:max-w-4xl">
          Discover personalized movie recommendations tailored just for you,
          powered by cutting-edge AI that analyzes your tastes and viewing
          history.
        </p>

        {/* Search and Filter Container */}
        <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter your last watched movie..."
                className="pl-10 py-4 w-full text-base md:text-lg rounded-lg placeholder:text-sm sm:placeholder:text-base"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <Button
              variant="default"
              onClick={handleSubmit}
              className="bg-primary py-4 px-4 text-base rounded-lg w-full sm:w-auto"
            >
              Search
            </Button>

            {/* Filter Toggle */}
            <button
              onClick={handleToggleFilters}
              id="filter-toggle"
              className="px-1 py-1 bg-transparent text-secondary-foreground rounded-lg hover:bg-primary/20 
          transition-colors flex flex-row items-center gap-2 w-fit"
            >
              <span>
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <span>Filters</span>
            </button>
          </div>
          {/* Movie Search History if available */}
          {history?.length > 0 && (
            <div className="flex flex-row gap-2 justify-between mt-1 sm:mt-2">
              <div className="flex flex-row gap-1 overflow-x-auto">
                {history.map((movie, index) => (
                  <div
                    key={index}
                    className="text-sm text-muted-foreground bg-secondary rounded-full px-2 py-1"
                  >
                    {movie}
                  </div>
                ))}
              </div>
              <button
                className="text-sm m-0 p-0 text-muted-foreground hover:underline hover:underline-offset-4"
                onClick={() => deleteMovieHistory()}
                title="Clear Search History"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

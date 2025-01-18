"use client";
import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMovieContext } from "@/context/MovieContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  setIsShowFilters?: (isShow: boolean) => void;
  scrollToRecommendations: () => void;
  isShowFilters?: boolean;
}

const HeroSection = ({
  setIsShowFilters = () => console.log("Filters toggled"),
  isShowFilters = false,
  scrollToRecommendations,
}: HeroSectionProps) => {
  const {
    search,
    setSearch,
    addMovieToHistory,
    deleteMovieHistory,
    setRecommendations,
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
    scrollToRecommendations(); // Scroll to recommendations on search
    addMovieToHistory(search); // Add to history on search
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
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error("Failed to fetch movie data: ", error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-background">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b to-background opacity-10`}
      />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto mt-10 sm:mt-0 px-4 py-16 flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center bebas-neue-font tracking-wide gradient-text-animated">
          Discover Your Next Favorite Movie
        </h1>

        <p className="text-lg text-center text-muted-foreground max-w-xl md:max-w-2xl">
          Get personalized movie recommendations powered by AI across global
          film industries
        </p>

        {/* Search and Filter Container */}
        <div className="w-full max-w-xl md:max-w-2xl  mb-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter your last watched movie..."
                className="pl-10 py-5 w-full text-base md:text-lg rounded-lg placeholder:text-sm sm:placeholder:text-base"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <Button
              variant="default"
              onClick={handleSubmit}
              className="bg-[#fc6767e5] py-5 px-5 text-base rounded-lg w-full sm:w-auto"
            >
              Search
            </Button>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsShowFilters(!isShowFilters)}
              className="px-2 py-1 bg-transparent text-secondary-foreground rounded-lg hover:bg-primary/20 transition-colors flex flex-row items-center gap-2 w-fit"
            >
              <span>
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <span>Filters</span>
            </button>
          </div>
          {/* Movie Search History if available */}
          {/* <div>
            {history?.length > 0 && (
              <div className="flex flex-row gap-2 justify-between mt-4">
                <div className="flex flex-row gap-1">
                  <h3 className="text-sm text-muted-foreground">
                    Recent Searches:
                  </h3>
                  <div className="flex flex-row">
                    <span className="text-sm text-muted-foreground">
                      {history.join(", ")}
                    </span>
                  </div>
                </div>
                  <button className="text-sm m-0 p-0 text-muted-foreground hover:underline hover:underline-offset-4" onClick={() => deleteMovieHistory()}>
                      Clear History
                  </button>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

"use client";
import React, { useRef, useState } from "react";
import HeroSection from "./Hero";
import FilterSidebar from "./Filter";
import MovieGrid from "./MovieGrid";
import SmartRecommendationPanel from "./Recommendations";

const Home = () => {
  const [isShowFilters, setIsShowFilters] = useState(false);

  const recommendationsRef = useRef<HTMLDivElement | null>(null);

  // const scrollToRecommendations = () => {
  //     if (recommendationsRef.current) {
  //         recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  // };

  const scrollToRecommendations = () => {
    if (recommendationsRef.current) {
      const element = recommendationsRef.current;
      const top = element.getBoundingClientRect().top + window.scrollY;

      // Custom scroll behavior
      let start: any = null;
      const duration = 1000; // Adjust duration for slower or faster scrolling (in milliseconds)

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the current scroll position
        const position =
          Math.min(progress / duration, 1) * (top - window.scrollY) +
          window.scrollY;

        window.scrollTo(0, position);

        if (progress < duration) {
          requestAnimationFrame(step); // Continue the animation
        }
      };

      requestAnimationFrame(step);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <HeroSection
        setIsShowFilters={setIsShowFilters}
        isShowFilters={isShowFilters}
        scrollToRecommendations={scrollToRecommendations}
      />

      {isShowFilters && (
        <div className="flex items-center gap-6 mx-4 sm:max-w-[80%] sm:mx-auto">
          <FilterSidebar />
        </div>
      )}

      {/* Smart Recommendation Panel */}
      <div
        className="w-full md:max-w-7xl mx-auto px-4"
        id="recommendations"
        ref={recommendationsRef}
      >
        <SmartRecommendationPanel />
      </div>

      {/* Main Content Area */}
      {/* <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex-1">
          <MovieGrid onLoadMore={() => console.log("Loading more movies")} />
        </div>
      </div> */}
    </div>
  );
};

export default Home;

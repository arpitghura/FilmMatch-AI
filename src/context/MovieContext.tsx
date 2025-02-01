"use client";
import { Movie } from "@/components/Recommendations";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define types for the context state
interface MovieContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  history: string[];
  addMovieToHistory: (movie: string) => void;
  deleteMovieHistory: () => void;
  recommendations: Movie[];
  setRecommendations: React.Dispatch<React.SetStateAction<Movie[]>>;
  searchedResult: Movie[];
  setSearchedResult: React.Dispatch<React.SetStateAction<Movie[]>>;
  isSubmitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

// Define the structure of the filters
interface Filters {
  genre?: string[];
  fromYear?: number;
  toYear?: number;
  industry?: string;
  fromRating?: number;
  toRating?: number;
}

// Create the context
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// MovieProvider component that will wrap your app
interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});
  const [history, setHistory] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [searchedResult, setSearchedResult] = useState<Movie[]>([]);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Load search history from localStorage on initial load
  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("movieHistory") || "[]"
    );
    setHistory(savedHistory);

    const savedRecommendations = JSON.parse(
      localStorage.getItem("searchedResult") || "[]"
    );
    setSearchedResult(savedRecommendations);
  }, []);

  useEffect(() => {
    localStorage.setItem("movieHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("movieRecommendations", JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem("searchedResult", JSON.stringify(searchedResult));
  }, [searchedResult]);

  const addMovieToHistory = (movie: string) => {
    if (!history.includes(movie)) {
      setHistory((prevHistory) => [movie, ...prevHistory].slice(0, 4)); // Keep only the latest 5 searches
    }
  };

  const deleteMovieHistory = () => {
    setHistory([]);
  }

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        filters,
        setFilters,
        history,
        addMovieToHistory,
        deleteMovieHistory,
        recommendations,
        setRecommendations,
        searchedResult,
        setSearchedResult,
        isSubmitted,
        setSubmitted,
        error,
        setError
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the MovieContext
export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

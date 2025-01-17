import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["SAMBANOVA_API_KEY"], // Use SambaNova API Key
  baseURL: process.env["SAMBANOVA_API_URL"],
});

// Function to parse the string and generate API response
const parseMovieSuggestions = (input: string) => {
  const suggestions: { title: string; imdb_id: string }[] = [];

  // Regular expression to match movie suggestion blocks
  const regex = /\{\s*"title":\s*"([^"]+)",\s*"imdb_id":\s*"([^"]+)"\s*\}/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const title = match[1];
    const imdb_id = match[2];

    suggestions.push({ title, imdb_id });
  }

  return suggestions;
};

// Function to fetch movie details from OMDB API
const fetchMovieDetails = async (
  movies: { title: string; imdb_id: string }[]
) => {
  const apiKey = process.env["OMDB_API_KEY"]; // Replace with your OMDB API key
  const results = [];
  for (const movie of movies) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movie.title}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        results.push(data);
      } else {
        console.error(
          `Error fetching data for IMDb ID: ${movie.imdb_id}`,
          data.Error
        );
      }
    } catch (error) {
      console.error(
        `Failed to fetch data for IMDb ID: ${movie.imdb_id}`,
        error
      );
    }
  }

  return results;
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { filters } = await req.json();

  // console.log("Filters: ", filters);
  if (!filters || typeof filters !== "object") {
    return NextResponse.json(
      { message: "Prompt is required and should be an object" },
      { status: 400 }
    );
  }

  let prompt = "";

  try {
    prompt = `I watched "${filters.title}" and I liked it. I want to watch something similar.`;

    if (filters?.genre && filters.genre.length > 0) {
      prompt = prompt.concat(
        ` The genre of the movie should be "${filters.genre.join(", ")}".`
      );
    }
    if (filters?.industry) {
      prompt = prompt.concat(
        ` The industry of the movie should be "${filters.industry}".`
      );
    }
    if (filters?.fromYear) {
      prompt = prompt.concat(
        ` The movie should be released between ${filters.fromYear} and ${
          filters.toYear || 2025
        }.`
      );
    }
    if (filters?.fromRating) {
      prompt = prompt.concat(
        ` The movie should have a rating above ${
          filters.fromRating
        } and below ${filters.toRating || 10}.`
      );
    }

    // console.log("Prompt: ", prompt);
    // Send request to SambaNova Cloud API
    const chatCompletion: any = await client.chat.completions.create({
      // messages: [{ role: 'user', content: filters }],
      messages: [
        {
          role: "system",
          content: `Suggest top 3 movies based on the previously watched movie, genre, and industry (Hollywood, Bollywood, Tollywood). 
            Provide the suggestions in the following format, including only the movie title and/or IMDb ID:
            Suggestion:
            {
            "title": "The Dark Knight",
            "imdb_id": "tt0468569"
            },
            {
            "title": "Inception",
            "imdb_id": "tt1375666"
            }`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: process.env["SAMBANOVA_MODEL"] || "Meta-Llama-3.1-405B-Instruct",
      stream: false, // Replace with an actual SambaNova model
    });

    // Parse movie suggestions from the response
    const inputString = chatCompletion.choices[0].message.content;
    const movieSuggestions = parseMovieSuggestions(inputString);
    const movieData = await fetchMovieDetails(movieSuggestions);
    // const inputString =  "Avengers: Infinity Wars is a superhero film. Based on the genre and industry (Hollywood), here are two movie suggestions:\n\nSuggestion:\n{\n\"title\": \"The Avengers\",\n\"imdb_id\": \"tt0848228\"\n},\n{\n\"title\": \"Avengers: Endgame\",\n\"imdb_id\": \"tt4154756\"\n}";
    // const movieSuggestions = parseMovieSuggestions(inputString);
    // console.log(chatCompletion.choices[0]);
    return NextResponse.json({ movieData }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as any).message || "Internal Server Error";
    console.error("Error calling SambaNova API:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

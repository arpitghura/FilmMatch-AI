import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { MovieProvider } from "@/context/MovieContext";
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Discover Your Next Favorite Movie | CineMatch",
  description: "Find your perfect movie recommendation based on your taste. Explore trending films, genres, and personalized picks. Start your movie journey now with CineMatch!",
  keywords: "movie recommendations, trending movies, film suggestions, personalized movies, movie genres, best movies to watch, cinematch",
  authors: [{ name: "Arpit Ghura" }],
  openGraph: {
    title: "Discover Your Next Favorite Movie | CineMatch",
    description: "Find your perfect movie recommendation based on your taste. Explore trending films, genres, and personalized picks.",
    // images: [{ url: "" }],
    url: "https://www.cinematch.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Next Favorite Movie | CineMatch",
    description: "Explore trending films and get personalized movie recommendations.",
    // images: "https://www.example.com/assets/twitter-image.jpg",
    site: "@cinematch",
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${BebasNeue.variable} antialiased`}
      >
        <MovieProvider>
        {children}
        </MovieProvider>
        <Toaster />
      </body>
    </html>
  );
}

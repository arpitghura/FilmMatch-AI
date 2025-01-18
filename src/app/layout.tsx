import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { MovieProvider } from "@/context/MovieContext";
import { Toaster } from "@/components/ui/toaster";
import { GTM_ID, gtmScript } from "@/lib/gtm";
import { hotJarScript } from "@/lib/hotjar";

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
  title: "Discover Your Next Favorite Movie | Filmmatch",
  description:
    "Find your perfect movie recommendation based on your taste. Explore trending films, genres, and personalized picks. Start your movie journey now with filmmatch!",
  keywords: [
    "movie recommendations",
    "trending movies",
    "film suggestions",
    "personalized movies",
    "movie genres",
    "best movies to watch",
    "filmmatch",
    "filmmatch.vercel.app",
  ],
  authors: [{ name: "Arpit Ghura" }],
  openGraph: {
    title: "Discover Your Next Favorite Movie | Filmmatch",
    description:
      "Find your perfect movie recommendation based on your taste. Explore trending films, genres, and personalized picks.",
    // images: [{ url: "" }],
    url: "https://www.filmmatch.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Next Favorite Movie | filmmatch",
    description:
      "Explore trending films and get personalized movie recommendations.",
    // images: "https://www.example.com/assets/twitter-image.jpg",
    // site: "@filmmatch",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: hotJarScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer = window.dataLayer || [];",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${BebasNeue.variable} antialiased dark`}
      >
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
        <MovieProvider>{children}</MovieProvider>
        <Toaster />
      </body>
    </html>
  );
}

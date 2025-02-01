import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 left-0 w-full backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold text-primary">FilmMatch AI</h1>

        {/* Login and Signup Buttons */}
        {/* <div className="space-x-4">
          <Link href="/signin">
            <Button variant="secondary" className="px-4 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
              Signin
            </Button>
          </Link>
        </div> */}
      </div>
    </header>
  );
}

import { Loader2 } from "lucide-react"; // Import Lucide's Loader icon
import React from "react";

interface CircularLoaderProps {
    size?: number; // Size of the loader
    color?: string; // Color of the loader
    message?: string; // Optional loading message
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({
    size = 40,
    color = "text-blue-500",
    message,
}) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {/* Loader Icon */}
            <div
                className={`animate-spin ${color}`}
                style={{ width: size, height: size }}
            >
                <Loader2 className="w-full h-full" />
            </div>
            {/* Optional Loading Message */}
            {message && <p className="text-sm text-gray-500">{message}</p>}
        </div>
    );
};



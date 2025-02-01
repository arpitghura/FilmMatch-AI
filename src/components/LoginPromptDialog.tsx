"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginPromptDialog({ searchTriggered, data }: { searchTriggered: boolean, data?:any }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      if (searchTriggered && !data?.user) {
        // Show modal after 5 seconds delay
        const timer = setTimeout(() => setOpen(true), 5000);
  
        // Cleanup timer if component unmounts or search changes
        return () => clearTimeout(timer);
      }
    }, [searchTriggered, data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Unlock the Full Experience!</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm sm:text-base">
            Enjoy movie recommendations without signing in, but with an account, you can:
          </DialogDescription>
        </DialogHeader>
        
        <ul className="list-disc pl-5 space-y-2 text-foreground">
          <li>Bookmark your favorite movies.</li>
          <li>Save your search history.</li>
          <li>Get personalized AI recommendations.</li>
          <li>Access your previous searches anytime.</li>
        </ul>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Maybe Later
          </Button>
          <Button variant="default" onClick={() => router.push("/signin")}>
            Sign In Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

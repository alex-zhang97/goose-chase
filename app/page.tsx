"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromptMessage } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingCard from "@/components/loading_card"; 

export default function ItineraryPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
  const router = useRouter();

  const [location, setLocation] = useState("New York, NY, USA");
  const [chaseLength, setChaseLength] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    location
  )}&zoom=12`;

  const fetchItinerary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          chase_length: chaseLength,
        }),
      });

      const data = await res.json();
      console.log("Generated Itinerary:", data.itinerary);
      sessionStorage.setItem("itinerary", JSON.stringify(data.itinerary));
      router.push("/itinerary");

    } catch (err) {
      console.error("Error fetching itinerary:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white relative">

      <h1 className="text-3xl font-semibold mb-6">Your Itinerary Map</h1>

      <div className="flex flex-col md:flex-row gap-4 max-w-md mb-6">
        <Input
          type="text"
          placeholder="City, State, Country"
          className = "w-3xl"
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          type="number"
          placeholder="# of locations"
          className = "w-xl"
          onChange={(e) => setChaseLength(Number(e.target.value))}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={fetchItinerary}>
              Generate Itinerary
            </Button>
          </DialogTrigger>

          <DialogContent className="fixed flex items-center justify-center w-[90vw] h-[90vh]">
            <DialogHeader className="sr-only">
              <DialogTitle>Generating Itinerary</DialogTitle>
              <DialogDescription>Loading your itinerary...</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center w-full h-full">
              <LoadingCard />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full max-w-4xl h-[500px] rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}

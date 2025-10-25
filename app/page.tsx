"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { send } from "process";

export default function ItineraryPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  // 🧭 State for inputs
  const [location, setLocation] = useState("New York, NY, USA");
  const [chaseLength, setChaseLength] = useState();

  // 🗺️ Build map query
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    location
  )}&zoom=12`;

  const sendMessage = async (message: JSON) => {
    console.log("Sending message:", message);
    const itineraryJSON = {
      location: location,
      chaseLength: chaseLength,
    };
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    return data.reply;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 oklch(21.6% 0.006 56.043) ">
      <h1 className="text-3xl font-semibold mb-6">Your Itinerary Map</h1>

      {/* 🔍 Input Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mb-6">
        {/* city Input */}

        <Input type="integer" placeholder="City, State, Country" onChange={(e) => setChaseLength(e.target.value)}  />
        <Input type="integer" placeholder="# of locations" onChange={(e) => setLocation(Number(e.target.value))} />

        <Button variant="outline" onClick={sendMessage}>
          Generate Itinerary
        </Button>
      </div>

      {/* 🗺️ Map Display */}
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

      {/* 🧭 Info Summary */}
      {/* <p className="mt-4 text-gray-600">
        Showing itinerary for <strong>{location}</strong>
      </p> */}
    </main>
  );
}

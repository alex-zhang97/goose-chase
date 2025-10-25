"use client";

import React, { useState } from "react";

export default function ItineraryPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  // 🧭 State for inputs
  const [city, setCity] = useState("Paris");
  const [locations, setLocations] = useState(3);

  // 🗺️ Build map query
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&zoom=12`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 oklch(21.6% 0.006 56.043) ">
      <h1 className="text-3xl font-semibold mb-6">Your Itinerary Map</h1>

      {/* 🔍 Input Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mb-6">
        {/* City Input */}
        <input
          type="text"
          placeholder="Enter a city or region"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Number of Locations */}
        <input
          type="number"
          min={1}
          value={locations}
          onChange={(e) => setLocations(Number(e.target.value))}
          className="w-40 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
          placeholder="# of locations"
        />

        <button 
        className = "border-gray-3000 bg-color-blue"
        src="">Generate Itinerary</button>
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
      <p className="mt-4 text-gray-600">
        Showing itinerary for <strong>{locations}</strong> locations in{" "}
        <strong>{city}</strong>.
      </p>
    </main>
  );
}

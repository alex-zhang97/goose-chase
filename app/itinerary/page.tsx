"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ItineraryStop {
  stop_number: number;
  name: string;
  description: string;
  hint: string;
  challenge: string;
}

function revealStopName(id: number) {
    const element = document.getElementById(`${id}`);
    element?.classList.remove("blur-sm");
}

export default function ItineraryResultPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<ItineraryStop[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("itinerary");
      if (stored) {
        const parsed = JSON.parse(stored);
        const itineraryArray = Array.isArray(parsed) ? parsed : parsed.itinerary ?? [];
        const formatted = itineraryArray.map((stop: any, index: number) => ({
          stop_number: stop.stop_number ?? index + 1,
          name: stop.name ?? `Stop ${index + 1}`,
          description: stop.description ?? "No description available for this stop.",
          hint: stop.hint ?? "No hint available.",
          challenge: stop.challenge ?? "No challenge provided.",
        }));
        setItinerary(formatted);
      } else {
        console.warn("No itinerary data found in sessionStorage");
      }
    } catch (err) {
      console.error("Error parsing itinerary:", err);
    }
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-zinc-50 p-8">
      <Card className="w-full max-w-3xl shadow-md border border-zinc-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Your GooseChase Itinerary
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="mt-6 space-y-4">
          {itinerary.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {itinerary.map((stop) => (
                <AccordionItem
                  key={stop.stop_number}
                  value={`stop-${stop.stop_number}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    Stop #{stop.stop_number} {stop.hint}
                  </AccordionTrigger>

                  <AccordionContent className="space-y-3 text-zinc-700">
                    <div className="">
                      <p className="font-semibold text-zinc-900">Stop Name:</p>
                      <p className="italic text-zinc-600 text-lg blur-sm" id={stop.stop_number}>“{stop.name}”</p>
                      <Button onClick={() => revealStopName(stop.stop_number)}>Unblur</Button>
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-900"> Description: </p>
                      <p>{stop.description}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-900">Challenge:</p>
                      <p>{stop.challenge}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-zinc-500 text-center">
              No itinerary found. Please go back and generate one first.
            </p>
          )}
        </CardContent>

        <div className="flex justify-center mt-8 mb-4">
          <Button onClick={() => router.push("/")}>Back to Generator</Button>
        </div>
      </Card>
    </main>
  );
}

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { gooseChasePrompt } from "@/lib/prompts";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { location, chase_length } = await req.json();
    const prompt = gooseChasePrompt(location, chase_length);

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a creative and precise travel itinerary generator." },
            { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;

    if (!content) {
        throw new Error("No content returned from OpenAI response");
    }

    const itinerary = JSON.parse(content);  return Response.json({ itinerary });
}

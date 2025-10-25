export function gooseChasePrompt(location: string, chase_length: number) {
  return `
You are an expert travel guide and game designer.

Create a scavenger-hunt-style vacation itinerary set in **${location}** with **${chase_length} stops**.

Each stop should:
- Be a real, interesting place in or near ${location}.
- Include a short, vivid description of what's there.
- Give a clever or poetic **hint/riddle** that leads to the next location (without revealing it directly).
- Include a small challenge or task to do at a given location (e.g., "find a red door", "order a local pastry", "take a photo of a statue").

End with a short “Final Reward” description (e.g., a beautiful view, a relaxing café, a symbolic spot) to wrap up the scavenger hunt.


⚠️ Important:
Return your entire answer **strictly as valid JSON** that can be parsed into a JSON array.
Do not include any text outside the JSON.
Do not use markdown formatting or backticks.

Each array element should have this structure:
{
  "stop_number": number,
  "name": string,
  "description": string,
  "hint": string,
  "challenge": string
}

After the final stop, include an extra object with:
{
  "final_reward": string
}

Now generate the JSON for the scavenger hunt.
`;
}
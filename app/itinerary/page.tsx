"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// If you don't use the "@" alias, change the imports above to relative paths.

type Item = {
  id: string;              // unique, non-empty
  title: string;
  content: React.ReactNode;
};

export default function InfiniteCluesAccordion() {
  // --- Initial clues ---
  const [items, setItems] = React.useState<Item[]>([
    {
      id: "clue-1",
      title: "Clue 1",
      content:
        "We allocate your budget across travel, stays, and quests. You can lock categories or let the app optimize automatically.",
    },
    {
      id: "clue-2",
      title: "What are trip riddles/quests?",
      content:
        "They are location-aware prompts that unlock the next stop. Solve them to reveal the route and earn badges.",
    },
    {
      id: "clue-3",
      title: "Do you track my location?",
      content:
        "Only during an active trip. You can pause or disable live tracking anytime in Settings → Privacy.",
    },
  ]);

  // simple counter to generate unique IDs
  const [nextNum, setNextNum] = React.useState<number>(4);

  // Helper to create a new clue (you can replace with fetched content)
  const makeClue = (n: number): Item => ({
    id: `clue-${n}`,
    title: `Clue ${n}`,
    content: `Auto-generated clue #${n}. Replace this with your dynamic content.`,
  });

  // Append one or many new clues
  const addMore = (count = 1) => {
    setItems((prev) => {
      const fresh: Item[] = [];
      for (let i = 0; i < count; i++) {
        fresh.push(makeClue(nextNum + i));
      }
      return [...prev, ...fresh];
    });
    setNextNum((n) => n + count);
  };

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Trip Clues</h1>

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl border bg-white/50 p-1 shadow-sm backdrop-blur"
      >
        {items.map(({ id, title, content }) => (
          <AccordionItem
            key={id}
            value={id}
            className="rounded-xl border-none px-1"
          >
            <AccordionTrigger className="rounded-xl px-3 py-3 text-left hover:no-underline data-[state=open]:shadow-sm">
              {title}
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-4 text-sm text-muted-foreground">
              {content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => addMore(1)}>Load 1 more</Button>
        <Button variant="secondary" onClick={() => addMore(3)}>
          Load 3 more
        </Button>
      </div>
    </div>
  );
}

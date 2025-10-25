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

  // Track which clues are revealed
  const [revealed, setRevealed] = React.useState<Set<string>>(new Set());

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

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">
        YOUR ADVENTURE STARTS NOW
      </h1>

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl border bg-white/50 p-1 shadow-sm backdrop-blur"
      >
        {items.map(({ id, title, content }) => {
          const isRevealed = revealed.has(id);
          return (
            <AccordionItem
              key={id}
              value={id}
              className="rounded-xl border-none px-1"
            >
              <AccordionTrigger className="rounded-xl px-3 py-3 text-left hover:no-underline data-[state=open]:shadow-sm">
                {title}
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-4 text-sm">
                <div className="rounded-xl border bg-background/50 p-4">
                  {/* Reveal control */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {isRevealed ? "Revealed" : "Hidden — tap Reveal to view"}
                    </span>
                    <Button
                      size="sm"
                      variant={isRevealed ? "secondary" : "default"}
                      onClick={() => toggleReveal(id)}
                    >
                      {isRevealed ? "Hide" : "Reveal"}
                    </Button>
                  </div>

                  {/* Content with blur when hidden */}
                  <div className="relative">
                    <div
                      className={
                        "transition-all " +
                        (isRevealed
                          ? "blur-0"
                          : "blur-sm select-none pointer-events-none")
                      }
                    >
                      <p className="text-muted-foreground">{content}</p>
                    </div>

                    {!isRevealed && (
                      <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-lg bg-background/40">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                          Hidden
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
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

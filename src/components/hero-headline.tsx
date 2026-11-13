"use client";

import { useEffect, useState } from "react";

/** Phrases that complete "Office furniture, made to fit how ___" */
const PHRASES = ["you work.", "teams meet.", "offices run.", "you grow."];

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2600;
const PAUSE_MS = 250;

/** Time one phrase is on screen from first letter to the next phrase starting. */
function cycleMs(phrase: string, alreadyShown: boolean) {
  const typing = alreadyShown ? 0 : phrase.length * TYPE_MS;
  return typing + HOLD_MS + phrase.length * DELETE_MS + PAUSE_MS;
}

/**
 * Hero headline whose last (purple) line types and swaps through a few phrases,
 * with a thin progress bar along the bottom of the hero card.
 * The first phrase is what the server renders, so the headline reads correctly
 * with no JavaScript and to search engines. Reduced-motion users get it static.
 */
export function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(PHRASES[0]);
  const [animate, setAnimate] = useState(false);
  const [barMs, setBarMs] = useState(cycleMs(PHRASES[0], true));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    // One-time client-only flag (matchMedia is unavailable during SSR)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(true);

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let i = 0;

    const wait = (ms: number, fn: () => void) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    // Type phrase `i` (or, for the server-rendered first phrase, just hold it), then delete and move on.
    const play = (phrase: string, alreadyShown: boolean) => {
      setIndex(i);
      setBarMs(cycleMs(phrase, alreadyShown));
      let n = alreadyShown ? phrase.length : 0;
      const deleteNext = () => {
        n -= 1;
        setText(phrase.slice(0, n));
        if (n > 0) wait(DELETE_MS, deleteNext);
        else {
          i = (i + 1) % PHRASES.length;
          wait(PAUSE_MS, () => play(PHRASES[i], false));
        }
      };
      const typeNext = () => {
        n += 1;
        setText(phrase.slice(0, n));
        if (n < phrase.length) wait(TYPE_MS, typeNext);
        else wait(HOLD_MS, deleteNext);
      };
      if (alreadyShown) wait(HOLD_MS, deleteNext);
      else typeNext();
    };
    play(PHRASES[0], true);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <h1
        className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] xl:text-[64px]"
        aria-label={`Office furniture, made to fit how ${PHRASES[0]}`}
      >
        <span aria-hidden>
          Office furniture,
          <br />
          made to fit how
          <br />
          <span className="whitespace-nowrap text-brand">
            {text}
            {animate && (
              <span className="hero-caret ml-[2px] inline-block h-[0.85em] w-[3px] translate-y-[0.1em] rounded-sm bg-brand align-baseline" />
            )}
          </span>
        </span>
      </h1>

      {animate && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-6 right-6 h-[3px] overflow-hidden rounded-full bg-line/60 md:left-12 md:right-auto md:w-[200px] lg:left-16"
        >
          <span
            key={index}
            className="hero-progress block h-full rounded-full bg-oak"
            style={{ animationDuration: `${barMs}ms` }}
          />
        </span>
      )}
    </>
  );
}

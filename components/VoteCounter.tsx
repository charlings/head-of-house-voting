"use client";

import React from "react";
import { FaVoteYea } from "react-icons/fa";
import { useVotes } from "@/lib/voteStore";

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function VoteCounter() {
  const { totalVotes, totalParticipants } = useVotes();
  const pct = totalParticipants === 0 ? 0 : totalVotes / totalParticipants;
  const offset = CIRCUMFERENCE * (1 - pct);
  const complete = totalVotes >= totalParticipants;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex select-none flex-col items-center"
      role="status"
      aria-live="polite"
      aria-label={`${totalVotes} of ${totalParticipants} votes cast`}
    >
      <div className="relative h-[68px] w-[68px]">
        <svg
          viewBox="0 0 64 64"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="#14213D"
            stroke="rgba(251,249,244,0.15)"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke={complete ? "#1B998B" : "#F2A93B"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <FaVoteYea className="text-gold" size={16} />
        </div>
        {totalVotes > 0 && !complete && (
          <span className="absolute -inset-0.5 rounded-full animate-pulse-ring" />
        )}
      </div>
      <div className="-mt-1 rounded-full border border-white/10 bg-ink px-2.5 py-0.5 font-mono text-[11px] font-semibold text-paper shadow-stamp">
        {String(totalVotes).padStart(2, "0")}
        <span className="text-white/40">/{totalParticipants}</span>
      </div>
    </div>
  );
}

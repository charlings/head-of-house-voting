"use client";

import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiX, FiBarChart2 } from "react-icons/fi";
import { getParticipantById } from "@/lib/participants";

type LastVote = { candidateId: string; voterId: string; at: number } | null;

type ResultsToastProps = {
  lastVote: LastVote;
  totalVotes: number;
  onOpenResults: () => void;
};

const AUTO_DISMISS_MS = 6000;

export default function ResultsToast({
  lastVote,
  totalVotes,
  onOpenResults,
}: ResultsToastProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!lastVote) return;
    setExpanded(true);
    const t = setTimeout(() => setExpanded(false), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [lastVote]);

  if (totalVotes === 0) return null;

  const candidate = lastVote ? getParticipantById(lastVote.candidateId) : null;

  if (expanded && candidate) {
    return (
      <div className="fixed bottom-5 left-5 z-40 max-w-[300px] animate-toast-in">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpenResults}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenResults();
            }
          }}
          className="group flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-ink px-4 py-3.5 text-left shadow-stamp"
        >
          <FiCheckCircle className="mt-0.5 shrink-0 text-teal" size={20} />
          <span className="flex-1">
            <span className="block text-sm font-semibold text-paper">
              Vote recorded
            </span>
            <span className="block text-xs text-white/60">
              You voted for{" "}
              <span className="font-medium text-gold">{candidate.name}</span>.
              Tap to see the leaderboard.
            </span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
            className="shrink-0 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss"
          >
            <FiX size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-toast-in">
      <button
        type="button"
        onClick={onOpenResults}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-ink px-3.5 py-2 text-xs font-semibold text-paper shadow-stamp transition hover:border-gold/60"
      >
        <FiBarChart2 className="text-gold" size={14} />
        Live standings
      </button>
    </div>
  );
}

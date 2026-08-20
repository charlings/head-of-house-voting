"use client";

import React from "react";
import { FiX } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { getParticipantById } from "@/lib/participants";

type TopResultsModalProps = {
  open: boolean;
  onClose: () => void;
  topThree: { id: string; votes: number }[];
  totalVotes: number;
};

const RANK_STYLES = [
  { badge: "bg-gold text-ink", ring: "ring-gold/40", label: "1st" },
  { badge: "bg-ink/10 text-ink", ring: "ring-ink/15", label: "2nd" },
  { badge: "bg-coral-soft text-coral", ring: "ring-coral/25", label: "3rd" },
];

export default function TopResultsModal({
  open,
  onClose,
  topThree,
  totalVotes,
}: TopResultsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ballot-texture w-full max-w-md overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-stamp"
      >
        <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-5 py-4">
          <div className="flex items-center gap-2">
            <FaTrophy className="text-gold" />
            <h2 id="results-modal-title" className="font-display text-base font-semibold text-paper">
              Top 3 — Head of House
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Close results"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-3 px-5 py-5">
          {topThree.length === 0 && (
            <p className="py-6 text-center text-sm text-slate">
              No votes cast yet — be the first to vote.
            </p>
          )}

          {topThree.map((entry, i) => {
            const candidate = getParticipantById(entry.id);
            const pct = totalVotes > 0 ? Math.round((entry.votes / totalVotes) * 100) : 0;
            const style = RANK_STYLES[i];
            return (
              <div
                key={entry.id}
                className={`rounded-xl border border-ink/10 bg-white p-3.5 shadow-card ring-1 ${style.ring}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${style.badge}`}
                    >
                      {style.label}
                    </span>
                    <div>
                      <p className="font-medium text-ink">
                        {candidate?.name ?? "Unknown participant"}
                      </p>
                      <p className="font-mono text-[11px] text-slate">
                        ID {entry.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-semibold text-ink">
                      {entry.votes}
                    </p>
                    <p className="text-[11px] text-slate">{pct}% of votes</p>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-ink/10 px-5 py-3 text-center text-[11px] text-slate">
          {totalVotes} vote{totalVotes === 1 ? "" : "s"} counted so far
        </div>
      </div>
    </div>
  );
}

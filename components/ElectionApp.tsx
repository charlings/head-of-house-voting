"use client";

import React, { useState } from "react";
import { useVotes } from "@/lib/voteStore";
import VotingForm from "./VotingForm";
import VoteCounter from "./VoteCounter";
import ResultsToast from "./ResultsToast";
import TopResultsModal from "./TopResultsModal";

export default function ElectionApp() {
  const { lastVote, totalVotes, topThree } = useVotes();
  const [resultsOpen, setResultsOpen] = useState(false);

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4 py-16 sm:py-20">
        <div className="mb-6 flex items-center justify-between text-white/70">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
            Hackathon Africa 3.0
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
            African Plan Foundation
          </span>
        </div>
        <VotingForm />
        <p className="mt-5 text-center text-[11px] text-white/40">
          Classwork simulation — votes are stored locally in this browser only.
        </p>
      </main>

      <VoteCounter />
      <ResultsToast
        lastVote={lastVote}
        totalVotes={totalVotes}
        onOpenResults={() => setResultsOpen(true)}
      />
      <TopResultsModal
        open={resultsOpen}
        onClose={() => setResultsOpen(false)}
        topThree={topThree}
        totalVotes={totalVotes}
      />
    </>
  );
}

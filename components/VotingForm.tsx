"use client";

import React, { useState } from "react";
import { FiUser, FiHash, FiAlertCircle } from "react-icons/fi";
import { FaRegFlag, FaStamp } from "react-icons/fa";
import { PARTICIPANTS } from "@/lib/participants";
import { Participant } from "@/lib/types";
import { useVotes } from "@/lib/voteStore";
import NameCombobox from "./NameCombobox";

export default function VotingForm() {
  const { castVote, hasVoted, votedIds } = useVotes();

  const [candidate, setCandidate] = useState<Participant | null>(null);
  const [voter, setVoter] = useState<Participant | null>(null);
  const [voterIdInput, setVoterIdInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showStamp, setShowStamp] = useState(false);

  function resetForm() {
    setCandidate(null);
    setVoter(null);
    setVoterIdInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!candidate) {
      setError("Select a candidate from the dropdown to continue.");
      return;
    }
    if (!voter) {
      setError("Select your name from the list of voters.");
      return;
    }
    const normalizedId = voterIdInput.trim().padStart(3, "0");
    if (!/^\d{3}$/.test(normalizedId)) {
      setError("Enter your 3-digit Voter ID, e.g. 007.");
      return;
    }
    if (normalizedId !== voter.id) {
      setError("That Voter ID doesn't match the voter you selected.");
      return;
    }
    if (hasVoted(voter.id)) {
      setError(`${voter.name} has already cast a vote — one ballot per person.`);
      return;
    }

    const result = castVote(candidate.id, voter.id);
    if (!result.ok) {
      setError(
        result.reason === "already-voted"
          ? "This voter has already cast a ballot."
          : "Something's missing — check your selections and try again."
      );
      return;
    }

    setShowStamp(true);
    window.setTimeout(() => setShowStamp(false), 1400);
    resetForm();
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="ballot-texture space-y-6 rounded-3xl border border-ink/10 bg-paper p-6 shadow-stamp sm:p-8"
      >
        <div className="flex items-center gap-2 text-coral">
          <FaRegFlag />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Official Ballot
          </span>
        </div>

        <div className="space-y-1.5">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Head of House Election
          </h1>
          <p className="text-sm text-slate">
            20 eligible participants. One vote each. Choose carefully.
          </p>
        </div>

        <div className="h-px w-full bg-ink/10" />

        <div className="space-y-5">
          <NameCombobox
            id="candidate-select"
            label="Step 1 — Choose your candidate"
            placeholder="Search or select a candidate…"
            icon={<FiUser />}
            participants={PARTICIPANTS}
            value={candidate}
            onChange={setCandidate}
          />

          <NameCombobox
            id="voter-select"
            label="Step 2 — Confirm it's you"
            placeholder="Search or select your name…"
            icon={<FiUser />}
            participants={PARTICIPANTS}
            value={voter}
            onChange={setVoter}
            votedIds={votedIds}
            helperText="Find yourself in the list of registered voters."
          />

          <div>
            <label
              htmlFor="voter-id"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/60"
            >
              <FiHash />
              Voter ID
            </label>
            <input
              id="voter-id"
              value={voterIdInput}
              onChange={(e) => setVoterIdInput(e.target.value)}
              placeholder="e.g. 007"
              inputMode="numeric"
              maxLength={3}
              className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 font-mono text-lg tracking-widest text-ink shadow-card outline-none transition placeholder:text-slate/50 focus:border-gold"
            />
            <p className="mt-1 text-xs text-slate">
              Your ID is the 3-digit number assigned to you, from 001 to 020.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-coral/30 bg-coral-soft/60 px-3.5 py-3 text-sm text-coral">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn w-full border-none bg-ink text-paper hover:bg-ink-3 focus-visible:outline-gold"
        >
          Cast my vote
        </button>
      </form>

      {showStamp && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-stamp-in flex -rotate-6 flex-col items-center gap-1 rounded-2xl border-4 border-teal bg-paper/95 px-8 py-5 shadow-stamp">
            <FaStamp className="text-teal" size={28} />
            <span className="font-display text-xl font-bold uppercase tracking-widest text-teal">
              Vote Cast
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

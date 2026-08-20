"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PARTICIPANTS } from "./participants";
import { VoteState, VoteTally } from "./types";

const STORAGE_KEY = "hoh-election-2026-votes";

const emptyTally: VoteTally = PARTICIPANTS.reduce((acc, p) => {
  acc[p.id] = 0;
  return acc;
}, {} as VoteTally);

type CastVoteResult =
  | { ok: true }
  | { ok: false; reason: "already-voted" | "invalid" };

type VoteContextValue = {
  tally: VoteTally;
  votedIds: string[];
  totalVotes: number;
  totalParticipants: number;
  hasVoted: (voterId: string) => boolean;
  castVote: (candidateId: string, voterId: string) => CastVoteResult;
  topThree: { id: string; votes: number }[];
  lastVote: { candidateId: string; voterId: string; at: number } | null;
  resetElection: () => void;
};

const VoteContext = createContext<VoteContextValue | null>(null);

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<VoteState>({
    tally: emptyTally,
    votedIds: [],
  });
  const [lastVote, setLastVote] = useState<
    { candidateId: string; voterId: string; at: number } | null
  >(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as VoteState;
        setState({
          tally: { ...emptyTally, ...parsed.tally },
          votedIds: parsed.votedIds ?? [],
        });
      }
    } catch {
      // Corrupt or inaccessible storage — start fresh.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change, once hydrated.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage failures (e.g. private browsing quota).
    }
  }, [state, hydrated]);

  const hasVoted = useCallback(
    (voterId: string) => state.votedIds.includes(voterId),
    [state.votedIds]
  );

  const castVote = useCallback(
    (candidateId: string, voterId: string): CastVoteResult => {
      if (!candidateId || !voterId) return { ok: false, reason: "invalid" };
      let result: CastVoteResult = { ok: true };
      setState((prev) => {
        if (prev.votedIds.includes(voterId)) {
          result = { ok: false, reason: "already-voted" };
          return prev;
        }
        return {
          tally: {
            ...prev.tally,
            [candidateId]: (prev.tally[candidateId] ?? 0) + 1,
          },
          votedIds: [...prev.votedIds, voterId],
        };
      });
      if (result.ok) {
        setLastVote({ candidateId, voterId, at: Date.now() });
      }
      return result;
    },
    []
  );

  const resetElection = useCallback(() => {
    setState({ tally: emptyTally, votedIds: [] });
    setLastVote(null);
  }, []);

  const totalVotes = useMemo(
    () => Object.values(state.tally).reduce((a, b) => a + b, 0),
    [state.tally]
  );

  const topThree = useMemo(() => {
    return Object.entries(state.tally)
      .map(([id, votes]) => ({ id, votes }))
      .filter((entry) => entry.votes > 0)
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 3);
  }, [state.tally]);

  const value: VoteContextValue = {
    tally: state.tally,
    votedIds: state.votedIds,
    totalVotes,
    totalParticipants: PARTICIPANTS.length,
    hasVoted,
    castVote,
    topThree,
    lastVote,
    resetElection,
  };

  return (
    <VoteContext.Provider value={value}>{children}</VoteContext.Provider>
  );
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) {
    throw new Error("useVotes must be used within a VoteProvider");
  }
  return ctx;
}

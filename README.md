# Head of House Election — Digital Voting System

Built for **Hackathon Africa 3.0**, organized by the **African Plan Foundation**.
A classwork simulation of a digital voting system for a "Head of House" election
among 20 participants who are all simultaneously eligible voters and candidates.

## Stack

- **Next.js 14** (App Router)
- **React Icons** (Feather + Font Awesome sets)
- **Tailwind CSS**
- **DaisyUI**

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How it works

- **Candidate selection** — a searchable combobox lists all 20 participants; type
  a name or ID to filter, then pick one.
- **Voter validation** — select your own name from the same roster, then enter
  your 3-digit Voter ID (`001`–`020`). The ID must match the name selected, and
  each voter can only cast one ballot (enforced client-side and persisted to
  `localStorage` under the key `hoh-election-2026-votes`).
- **Progress counter** — the ring badge in the bottom-right corner updates in
  real time as votes come in, turning teal once all 20 ballots are cast.
- **Results toast** — after a vote is cast, a toast appears in the bottom-left
  corner confirming the vote; it collapses into a small "Live standings" pill
  you can tap any time. Tapping either opens a modal with the current Top 3
  candidates and their vote counts.

## Notes for the demo

- The 20-person roster lives in `lib/participants.ts` — edit names there to
  match your actual class list. Voter IDs are simply the zero-padded index
  (`001`–`020`) matched to that array's order.
- There's no backend: state is held in React Context (`lib/voteStore.tsx`) and
  mirrored to `localStorage` so a page refresh doesn't lose votes on the same
  device. For a multi-device classroom vote, swap the provider's persistence
  for a small API route / database — the `castVote` / `hasVoted` interface is
  already isolated to make that swap straightforward.
- To reset the election during testing, run this in the browser console:
  `localStorage.removeItem("hoh-election-2026-votes")` and refresh.

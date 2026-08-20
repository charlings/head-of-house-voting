export type Participant = {
  id: string; // "001" .. "020" — also serves as the Voter ID
  name: string;
  room: string; // a light flavor field, e.g. house block / cluster
};

export type VoteTally = Record<string, number>; // participant id -> vote count

export type VoteState = {
  tally: VoteTally;
  votedIds: string[]; // participant ids who have already cast a vote
};

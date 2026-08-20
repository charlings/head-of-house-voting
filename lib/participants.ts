import { Participant } from "./types";

// All 20 participants are simultaneously eligible voters and eligible candidates.
// Voter ID == participant id, zero-padded "001" – "020", per the brief.
export const PARTICIPANTS: Participant[] = [
  { id: "001", name: "Kosisochukwu Onyia", room: "Block A" },
  { id: "002", name: "Abigial Chukwu", room: "Block A" },
  { id: "003", name: "Amarachi Ekwebelum", room: "Block A" },
  { id: "004", name: "Rita Nwosu", room: "Block B" },
  { id: "005", name: "Lilian Amadioha", room: "Block B" },
  { id: "006", name: "Stephanie Afunogu", room: "Block B" },
  { id: "007", name: "Loveth Doctor", room: "Block C" },
  { id: "008", name: "Chidinma Nwankwo", room: "Block C" },
  { id: "009", name: "Christopher Onyedikachi", room: "Block C" },
  { id: "010", name: "Ifeanyi Charles", room: "Block D" },
  { id: "012", name: "Charles Udeh", room: "Block D" },
  { id: "013", name: "Austine Okoronkwo", room: "Block E" },
  { id: "014", name: "James Onwude", room: "Block E" },
  { id: "015", name: "Victor Ogbodo", room: "Block E" },
  { id: "016", name: "Majesty Madu", room: "Block F" },
  { id: "017", name: "David Onuoha", room: "Block F" },
  { id: "018", name: "Peter Obi", room: "Block F" },
  { id: "019", name: "Gabriel Kelechi", room: "Block G" },
  { id: "020", name: "Bonaventure Onukwube", room: "Block G" },
];

export function getParticipantById(id: string): Participant | undefined {
  return PARTICIPANTS.find((p) => p.id === id);
}

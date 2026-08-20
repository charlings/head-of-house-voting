import { VoteProvider } from "@/lib/voteStore";
import ElectionApp from "@/components/ElectionApp";

export default function Page() {
  return (
    <VoteProvider>
      <ElectionApp />
    </VoteProvider>
  );
}

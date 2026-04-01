export interface RankingEntry {
  rank: number;
  name: string;
  imageUrl: string;
  totalAmount: number;
  spending: number;
}

export interface RankingPodiumProps {
  entries: RankingEntry[];
}

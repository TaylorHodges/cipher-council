export interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  isActive: boolean;
  isExecuted: boolean;
  proposer: string;
  startTime: number;
  endTime: number;
}

export interface Member {
  address: string;
  votingPower: number;
  reputation: number;
  isActive: boolean;
  joinTime: number;
  role: string;
}

export interface Vote {
  id: number;
  proposalId: number;
  voter: string;
  voteChoice: boolean;
  votingPower: number;
  timestamp: number;
}

export interface CipherCouncil {
  // Contract interface methods would be defined here
  createProposal: (title: string, description: string, duration: number) => Promise<void>;
  castVote: (proposalId: number, votingPower: number, voteChoice: boolean) => Promise<void>;
  executeProposal: (proposalId: number) => Promise<void>;
  getProposalInfo: (proposalId: number) => Promise<Proposal>;
  getMemberInfo: (address: string) => Promise<Member>;
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Vote, TrendingUp, Users, Shield } from "lucide-react";

interface VoteResult {
  option: string;
  votes: number;
  percentage: number;
  color: string;
}

const VotingFooter = () => {
  const [voteResults, setVoteResults] = useState<VoteResult[]>([
    { option: "Proposal A", votes: 127, percentage: 45, color: "bg-primary" },
    { option: "Proposal B", votes: 89, percentage: 32, color: "bg-accent" },
    { option: "Abstain", votes: 64, percentage: 23, color: "bg-muted" }
  ]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [totalVotes, setTotalVotes] = useState(280);

  // Simulate live voting updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setVoteResults(prev => {
        const newResults = prev.map(result => ({
          ...result,
          votes: result.votes + Math.floor(Math.random() * 3),
        }));
        
        const newTotal = newResults.reduce((sum, result) => sum + result.votes, 0);
        const updatedResults = newResults.map(result => ({
          ...result,
          percentage: Math.round((result.votes / newTotal) * 100)
        }));
        
        setTotalVotes(newTotal);
        return updatedResults;
      });
      
      setTimeout(() => setIsAnimating(false), 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border bg-gradient-chamber backdrop-blur-md">
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Voting Results */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Vote className="h-5 w-5 text-primary animate-vote-pulse" />
              <h3 className="text-lg font-semibold text-foreground">Live Voting Results</h3>
              <span className="text-sm text-muted-foreground">({totalVotes} votes)</span>
            </div>
            
            <div className="space-y-3">
              {voteResults.map((result, index) => (
                <div key={result.option} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{result.option}</span>
                    <span className="text-sm text-muted-foreground">
                      {result.votes} votes ({result.percentage}%)
                    </span>
                  </div>
                  <Progress 
                    value={result.percentage} 
                    className={`h-2 ${isAnimating ? "animate-vote-pulse" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Governance Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-encrypted animate-encrypt" />
              <h3 className="text-lg font-semibold text-foreground">Governance Stats</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-chamber p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Active Members</span>
                </div>
                <p className="text-lg font-bold text-foreground">1,247</p>
              </div>
              
              <div className="bg-chamber p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-revealed" />
                  <span className="text-xs text-muted-foreground">Proposals</span>
                </div>
                <p className="text-lg font-bold text-foreground">23</p>
              </div>
            </div>
            
            <Button variant="chamber" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              View Full Analytics
            </Button>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Powered by Fully Homomorphic Encryption • Ensuring Privacy in Governance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default VotingFooter;
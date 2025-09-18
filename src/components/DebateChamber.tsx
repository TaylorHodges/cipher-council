import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";

interface DialogueBubble {
  id: number;
  member: string;
  content: string;
  isEncrypted: boolean;
  isRevealed: boolean;
  timestamp: string;
}

const DebateChamber = () => {
  const [dialogues, setDialogues] = useState<DialogueBubble[]>([
    {
      id: 1,
      member: "Member #001",
      content: "████████ ████ ███████ ██ ████ ████████",
      isEncrypted: true,
      isRevealed: false,
      timestamp: "14:32"
    },
    {
      id: 2,
      member: "Member #027",
      content: "█████ ██████ ████ ███ ████████ ██████",
      isEncrypted: true,
      isRevealed: false,
      timestamp: "14:35"
    },
    {
      id: 3,
      member: "Member #143",
      content: "I propose we allocate 25% to infrastructure development",
      isEncrypted: false,
      isRevealed: true,
      timestamp: "14:38"
    }
  ]);

  const [consensusReached, setConsensusReached] = useState(false);

  const revealAllMessages = () => {
    setConsensusReached(true);
    setDialogues(prev => prev.map(dialogue => ({
      ...dialogue,
      isEncrypted: false,
      isRevealed: true,
      content: dialogue.isEncrypted ? 
        "We should focus on community growth and sustainable tokenomics for long-term success" : 
        dialogue.content
    })));
  };

  return (
    <div className="min-h-[600px] bg-gradient-chamber border border-border rounded-lg p-6 shadow-chamber">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Debate Chamber</h2>
        <div className="flex gap-3">
          <Button 
            variant="encrypted" 
            size="sm"
            className="animate-encrypt"
          >
            <Lock className="mr-2 h-4 w-4" />
            {dialogues.filter(d => d.isEncrypted).length} Encrypted
          </Button>
          <Button 
            variant="reveal" 
            size="sm"
            onClick={revealAllMessages}
            disabled={consensusReached}
            className={consensusReached ? "animate-reveal" : ""}
          >
            <Unlock className="mr-2 h-4 w-4" />
            {consensusReached ? "Consensus Reached!" : "Reveal on Consensus"}
          </Button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {dialogues.map((dialogue) => (
          <Card 
            key={dialogue.id} 
            className={`p-4 transition-all duration-500 ${
              dialogue.isEncrypted 
                ? "bg-chamber border-encrypted/30 shadow-encrypted" 
                : "bg-card border-revealed/30 shadow-glow"
            } ${dialogue.isRevealed ? "animate-reveal" : ""}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">{dialogue.member}</span>
                {dialogue.isEncrypted ? (
                  <EyeOff className="h-4 w-4 text-encrypted animate-encrypt" />
                ) : (
                  <Eye className="h-4 w-4 text-revealed" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{dialogue.timestamp}</span>
            </div>
            <p className={`${dialogue.isEncrypted ? "font-mono text-encrypted animate-encrypt" : "text-foreground"}`}>
              {dialogue.content}
            </p>
          </Card>
        ))}
      </div>

      {consensusReached && (
        <div className="text-center p-4 bg-gradient-gold rounded-lg animate-reveal">
          <p className="text-primary-foreground font-semibold">
            🎉 Consensus achieved! All encrypted negotiations are now revealed.
          </p>
        </div>
      )}
    </div>
  );
};

export default DebateChamber;
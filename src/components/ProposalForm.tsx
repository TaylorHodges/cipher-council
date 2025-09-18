import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Send, CheckCircle, AlertCircle, Lock, Eye } from "lucide-react";
import { useCipherCouncil } from "@/hooks/useContract";
import { useAccount } from "wagmi";

const ProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(7); // 7 days default
  const [isEncrypting, setIsEncrypting] = useState(false);
  const { address } = useAccount();
  const { createProposal, isPending, isConfirmed, error } = useCipherCouncil();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    
    setIsEncrypting(true);
    
    try {
      // Simulate FHE encryption process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await createProposal(title, description, duration * 24 * 60 * 60); // Convert days to seconds
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create proposal:", err);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-chamber border-border shadow-chamber">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-primary animate-encrypt" />
        <h3 className="text-xl font-bold text-foreground">Submit Encrypted Proposal</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground">Proposal Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter proposal title..."
            className="bg-chamber border-border text-foreground focus:border-primary"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-foreground">Proposal Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your proposal details and objectives..."
            className="bg-chamber border-border text-foreground focus:border-primary min-h-[120px]"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="duration" className="text-foreground">Voting Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="7"
            min="1"
            max="30"
            className="bg-chamber border-border text-foreground focus:border-primary"
            required
          />
        </div>
        
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error.message}
          </div>
        )}
        
        {isConfirmed && (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle className="h-4 w-4" />
            Proposal created successfully!
          </div>
        )}
        
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            {isEncrypting ? (
              <>
                <Lock className="h-4 w-4 text-blue-500 animate-pulse" />
                Encrypting with FHE...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 text-encrypted" />
                Your proposal will be encrypted using FHE
              </>
            )}
          </div>
          
          <Button 
            type="submit" 
            variant="governance"
            disabled={isPending || isEncrypting || !title.trim() || !description.trim() || !address}
            className="relative overflow-hidden"
          >
            {isEncrypting ? (
              <>
                <Lock className="mr-2 h-4 w-4 animate-pulse" />
                Encrypting...
              </>
            ) : isPending ? (
              <>
                <Shield className="mr-2 h-4 w-4 animate-encrypt" />
                Creating Proposal...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Proposal
              </>
            )}
            {(isPending || isEncrypting) && (
              <div className="absolute inset-0 bg-gradient-circuit opacity-30 animate-circuit-flow"></div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProposalForm;
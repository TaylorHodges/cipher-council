import Header from "@/components/Header";
import DebateChamber from "@/components/DebateChamber";
import ProposalForm from "@/components/ProposalForm";
import VotingFooter from "@/components/VotingFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Users, Vote } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-6 bg-gradient-chamber">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Confidential DAO
            </span>
            <br />
            <span className="text-foreground">Negotiations</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            DAO members submit encrypted negotiation terms, revealed only after consensus. 
            Governance protected with Fully Homomorphic Encryption.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="p-6 bg-chamber border-border shadow-chamber">
              <Lock className="h-8 w-8 text-encrypted mx-auto mb-4 animate-encrypt" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Encrypted Proposals</h3>
              <p className="text-sm text-muted-foreground">
                Submit confidential terms using FHE technology
              </p>
            </Card>
            
            <Card className="p-6 bg-chamber border-border shadow-chamber">
              <Users className="h-8 w-8 text-primary mx-auto mb-4 animate-vote-pulse" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Consensus</h3>
              <p className="text-sm text-muted-foreground">
                Reach agreement without revealing private information
              </p>
            </Card>
            
            <Card className="p-6 bg-chamber border-border shadow-chamber">
              <Vote className="h-8 w-8 text-revealed mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Transparent Results</h3>
              <p className="text-sm text-muted-foreground">
                Automatic revelation once consensus is achieved
              </p>
            </Card>
          </div>
          
          <Button variant="governance" size="lg" className="relative overflow-hidden">
            <Shield className="mr-2 h-5 w-5" />
            Join the Chamber
            <div className="absolute inset-0 bg-gradient-circuit opacity-20 animate-circuit-flow"></div>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Debate Chamber - Takes 2 columns */}
            <div className="lg:col-span-2">
              <DebateChamber />
            </div>
            
            {/* Proposal Form - Takes 1 column */}
            <div>
              <ProposalForm />
            </div>
          </div>
        </div>
      </main>

      <VotingFooter />
    </div>
  );
};

export default Index;
import daoGavelLogo from "@/assets/dao-gavel-logo.png";
import { WalletConnect } from "./WalletConnect";

const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-chamber backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={daoGavelLogo} 
              alt="DAO Gavel" 
              className="h-10 w-10 animate-gavel-strike hover:animate-gavel-strike"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                Cipher Council
              </h1>
              <p className="text-sm text-muted-foreground">
                Confidential DAO Governance with FHE
              </p>
            </div>
          </div>
          
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
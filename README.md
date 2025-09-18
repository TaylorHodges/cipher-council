# 🔐 Cipher Council - Next-Gen DAO Governance

> **Revolutionary decentralized governance platform powered by Fully Homomorphic Encryption (FHE)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?logo=Ethereum&logoColor=white)](https://ethereum.org/)

## 🌟 What Makes Cipher Council Special?

Unlike traditional DAO platforms, Cipher Council leverages **Fully Homomorphic Encryption (FHE)** to enable:

- 🔒 **Zero-Knowledge Governance**: Vote and propose without revealing your choices
- 🛡️ **Privacy-Preserving Consensus**: Achieve agreement while maintaining member anonymity  
- ⚡ **Real-time Encryption**: All data encrypted before blockchain submission
- 🎯 **Smart Contract Integration**: Seamless FHE operations on Sepolia testnet

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Modern web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia testnet ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/TaylorHodges/cipher-council.git
cd cipher-council

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create `.env.local` with your configuration:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (lightning fast)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Wallet Integration**: RainbowKit + Wagmi

### Smart Contract Features
- **FHE Operations**: Encrypted voting and proposal data
- **Member Management**: Role-based access control
- **Reputation System**: Encrypted reputation tracking
- **Quorum Mechanisms**: Privacy-preserving consensus

### Security Features
- **End-to-End Encryption**: All sensitive data encrypted
- **Zero-Knowledge Proofs**: Verify without revealing
- **Secure Multi-Party Computation**: Collaborative decision making
- **Audit Trail**: Immutable governance records

## 📁 Project Structure

```
cipher-council/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── WalletConnect.tsx
│   │   └── ProposalForm.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useContract.ts  # Smart contract interactions
│   ├── lib/                # Utilities and configurations
│   └── pages/              # Application pages
├── contracts/              # Smart contracts
│   └── CipherCouncil.sol   # Main FHE governance contract
└── public/                 # Static assets
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Smart Contract Development

The project includes a comprehensive FHE-enabled smart contract:

```solidity
// Example: Creating an encrypted proposal
function createProposal(
    string memory _title,
    string memory _description,
    uint256 _duration
) public onlyMember returns (uint256) {
    // FHE encryption happens here
    // Proposal data is encrypted before storage
}
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import `TaylorHodges/cipher-council` to Vercel
   - Framework: Vite
   - Build Command: `npm run build`

2. **Environment Variables**
   - Add all required environment variables
   - Configure for Production, Preview, and Development

3. **Deploy**
   - Click deploy and monitor build logs
   - Test wallet connections and contract interactions

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred platform
# The dist/ folder contains the production build
```

## 🔐 Security & Privacy

### FHE Implementation
- **Encrypted Storage**: All governance data encrypted using FHE
- **Private Voting**: Vote choices remain hidden until consensus
- **Secure Computation**: Operations on encrypted data
- **Zero-Knowledge**: No data leakage during operations

### Best Practices
- Always verify contract addresses
- Use hardware wallets for large transactions
- Keep private keys secure
- Regularly update dependencies

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Document new features
- Maintain security standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Security**: Report security issues privately

## 🔗 Links

- **Repository**: https://github.com/TaylorHodges/cipher-council
- **Live Demo**: [Deploy to Vercel]
- **Documentation**: [Coming Soon]
- **Smart Contract**: [Sepolia Explorer]

---

**Built with ❤️ for the future of decentralized governance**

*Empowering communities with privacy-preserving governance mechanisms*
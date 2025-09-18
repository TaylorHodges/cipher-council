# Vercel Deployment Guide for Cipher Council

This guide provides step-by-step instructions for deploying the Cipher Council application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

The repository is already prepared with:
- ✅ Clean git history (no Lovable commits)
- ✅ All dependencies updated
- ✅ Environment variables configured
- ✅ Build configuration optimized

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `TaylorHodges/cipher-council`
   - Click "Import"

### 3. Configure Project Settings

1. **Project Name**
   - Set project name: `cipher-council`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4. Environment Variables

Add the following environment variables in Vercel dashboard:

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url_here

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key

# Contract Configuration (Update with deployed contract address)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

**Steps to add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with the values above
3. Make sure to set them for Production, Preview, and Development
4. Click "Save"

### 5. Deploy

1. **Deploy Now**
   - Click "Deploy" button
   - Wait for build to complete (usually 2-3 minutes)

2. **Monitor Deployment**
   - Watch the build logs for any errors
   - Check that all dependencies install correctly
   - Verify the build completes successfully

### 6. Post-Deployment Configuration

1. **Update Contract Address**
   - Deploy the smart contract to Sepolia testnet
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the application

2. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

### 7. Testing the Deployment

1. **Access the Application**
   - Visit the provided Vercel URL
   - Test wallet connection functionality
   - Verify the UI loads correctly

2. **Test Features**
   - Connect wallet (MetaMask, Rainbow, etc.)
   - Create a test proposal
   - Verify blockchain interactions work

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure contract address is deployed

### Build Optimization

The project is optimized for Vercel with:
- ✅ Vite build configuration
- ✅ TypeScript compilation
- ✅ Asset optimization
- ✅ Environment variable handling

## Production Checklist

Before going live:

- [ ] Smart contract deployed to Sepolia
- [ ] Contract address updated in environment variables
- [ ] All environment variables configured
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active
- [ ] Application tested thoroughly
- [ ] Wallet connections working
- [ ] Blockchain interactions functional

## Support

For deployment issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Contact support if needed

## Repository Information

- **Repository**: https://github.com/TaylorHodges/cipher-council
- **Framework**: Vite + React + TypeScript
- **Blockchain**: Ethereum Sepolia
- **Wallet**: Rainbow, MetaMask, WalletConnect
- **Encryption**: FHE (Fully Homomorphic Encryption)

---

**Deployment Status**: Ready for Vercel deployment
**Last Updated**: January 2025
**Version**: 1.0.0

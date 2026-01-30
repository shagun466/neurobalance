# NeuroBalance

NeuroBalance is a mental fitness platform that measures and improves your Mental Fitness Index (MFI). It combines real-time data (sentiment, activity, rest) with an ML model, visual dashboards, and a tokenized marketplace to incentivize healthy habits.

## Overview
- Personalized dashboard with an animated MFI gauge and weekly trend chart driven by your latest Firestore entries.
- Optional FastAPI service hosts an ML model to compute MFI from `sentiment`, `activity`, and `rest` scores.
- Marketplace pricing adapts dynamically based on your current MFI.
- DAO page shows simulated proposals to explore governance flows.

## Stack
- Frontend: React + Vite + TypeScript + TailwindCSS
- Data: Firebase Auth, Firestore, Storage
- Model API: FastAPI, scikit-learn, pandas, joblib
- Blockchain: Hardhat + Ethers + OpenZeppelin (SOT token, ProofOfCare NFT)

## Quick Start
1. Install Node and Python 3
2. Install frontend deps: `npm install`
3. Run dev server: `npm run dev` then open `http://localhost:5173/`
4. Sign in via Google or email link to access the dashboard

## Firebase Setup
- Configuration lives in `src/lib/firebase.ts`. Replace with your own Firebase project settings when deploying.
- Firestore collections used by the dashboard:
  - `users/{uid}/mfi_entries` with fields `{ score: number, createdAt: Timestamp }`
  - `users/{uid}/rest_entries` with fields `{ score: number, createdAt: Timestamp }`
- The dashboard fetches latest entries via ordered queries and renders:
  - MFI gauge (animated SVG stroke)
  - Weekly bar chart (stress, recovery, mfi per day)

## Model API (Optional)
You can run the model API locally to compute MFI scores from inputs:

1. `cd ai-model` (or project root if using the duplicate `server.py`)
2. `pip install -r requirements.txt`
3. `uvicorn server:app --reload --port 8000`

Endpoint: `POST /api/mfi/score`

Body:
```
{ "sentiment": 0-100, "activity": 0-100, "rest": 0-100 }
```

Response:
```
{ "mfi": 0-100 }
```

## Blockchain
- Contracts: `StressOffsetToken.sol`, `ProofOfCareNFT.sol`
- Hardhat config: `hardhat.config.js`
- Compile: `cd blockchain/ethereum && npm install && npm run build`
- Deploy (example): set `SEPOLIA_RPC_URL` and `PRIVATE_KEY` in `.env`, then `npm run deploy:sepolia`

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build locally
- `npm run typecheck` – TypeScript project checks
- `npm run lint` – ESLint code quality

## FAQs
- What is MFI?
  - A normalized 0–100 metric summarizing mental fitness from sentiment, activity, and rest.
- Why is my weekly chart empty?
  - You need recent entries in `mfi_entries` and/or `rest_entries`. Once added, the chart populates automatically.
- How is marketplace pricing determined?
  - It applies a bounded factor (≈0.7–1.3) based on your latest MFI to adjust SOT/ETH pricing.
- Do I need a wallet connected?
  - The current UI simulates proposals and pricing. Contracts are included for on-chain deployments when ready.
- Can I use my own Firebase project?
  - Yes. Update `src/lib/firebase.ts`. Avoid committing secrets; prefer environment config for production.
- Can I run without the model API?
  - Yes. The frontend and Firestore-backed visuals work without the FastAPI server.
- How do I ensure code quality?
  - Run `npm run lint` and `npm run typecheck` before committing.

## Notes
- This repository includes model artifacts and example backend scripts for local experimentation. For production, separate secrets and services and use environment configuration
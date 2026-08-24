# 🏠 Blockchain-Based Land Registry and Property Ownership

A decentralized blockchain-based land registry system designed to securely record property ownership, maintain transparent ownership histories, and simplify property transfers using smart contracts.

The system uses blockchain technology to create a tamper-resistant record of property ownership and transactions. Property owners can register properties, transfer ownership, and verify property records through a Web3 application.

---

## 📌 Project Overview

Traditional land registry systems often depend on centralized databases and paper-based records. These systems can face challenges such as:

* Property-record manipulation
* Duplicate or fraudulent records
* Slow ownership transfers
* Lack of transparency
* Difficult verification processes
* Dependence on centralized authorities

This project demonstrates how blockchain can be used to create a transparent and auditable digital land registry.

The blockchain stores property identifiers, ownership information, transfer records, and transaction history, while additional documents can be stored securely off-chain.

---

## 🎯 Objectives

The main objectives of this project are:

* Create a decentralized property registry
* Digitally record property ownership
* Provide transparent ownership history
* Prevent unauthorized ownership changes
* Enable blockchain-based property transfers
* Allow users to verify property records
* Maintain an immutable transaction history
* Reduce paperwork and manual verification

---

## ✨ Key Features

### 🏡 Property Registration

Authorized users can register a property on the blockchain.

Property information may include:

* Property ID
* Property address
* Property type
* Area
* Current owner
* Registration timestamp
* Document reference

---

### 👤 Property Ownership

Each registered property is associated with an owner wallet address.

The blockchain provides a verifiable record of the current registered owner.

---

### 🔄 Property Transfer

Property ownership can be transferred from one wallet address to another through a smart contract.

Example:

```text id="q1f1ck"
Current Owner
      │
      ▼
Transfer Request
      │
      ▼
Smart Contract
      │
      ▼
New Owner
```

---

### 📜 Ownership History

The system can maintain a history of ownership transfers.

Example:

```text id="j8z0sl"
Property #1001

Owner A
   ↓
Owner B
   ↓
Owner C
   ↓
Current Owner
```

Each blockchain transaction provides a verifiable record of the transfer.

---

### 🔍 Property Verification

Users can search for a property using its property ID and view:

* Current owner
* Property details
* Registration status
* Ownership history
* Blockchain transaction information

---

### 🔐 Access Control

Administrative functions can be restricted to authorized addresses.

For example:

* Property registration
* Property verification
* Ownership updates
* Administrative actions

---

### 📊 Property Dashboard

The frontend can display:

* Total registered properties
* Properties owned by the connected wallet
* Recent transfers
* Property status
* Registration activity

---

## 🏗️ System Architecture

```text id="9clx7c"
                     ┌───────────────────┐
                     │       User        │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │  React Frontend   │
                     │     Web3 UI       │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │     MetaMask      │
                     │  Wallet Provider  │
                     └─────────┬─────────┘
                               │
                               ▼
                     ┌───────────────────┐
                     │ Smart Contract    │
                     │     Solidity      │
                     └─────────┬─────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │   Blockchain     │   │ Off-chain Files  │
          │                  │   │                  │
          │ Property Data    │   │ Deeds            │
          │ Ownership        │   │ Documents        │
          │ Transfers        │   │ Images           │
          │ Audit Events     │   │ Metadata         │
          └──────────────────┘   └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Ethers.js

### Blockchain

* Ethereum-compatible blockchain
* Solidity
* Smart Contracts
* Hardhat

### Wallet

* MetaMask

### Storage

* Blockchain for ownership and transaction records
* IPFS or secure off-chain storage for larger documents

### Development Tools

* Node.js
* npm
* Git
* VS Code

---

## 📂 Project Structure

```text id="y9n2w8"
blockchain-land-registry/
│
├── contracts/
│   └── LandRegistry.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
│   └── LandRegistry.test.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── contract.js
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── artifacts/
├── hardhat.config.js
├── package.json
└── README.md
```

---

## 🔄 How the System Works

### Step 1 — Connect Wallet

The user connects a Web3 wallet such as MetaMask.

```text id="hmy4lo"
User → MetaMask → Land Registry DApp
```

---

### Step 2 — Register Property

An authorized authority registers a property.

Example:

```text id="g1j8ya"
Property ID: PROP-1001
Type: Residential
Area: 1500 sq.ft
Location: Example City
Owner: 0x123...
```

---

### Step 3 — Store Property Record

The smart contract stores important property information on the blockchain.

Large documents should generally be stored off-chain, with a reference or hash recorded on-chain.

---

### Step 4 — Verify Ownership

A user can search for a property and verify its current blockchain-recorded owner.

---

### Step 5 — Initiate Transfer

The current owner initiates a property transfer.

The smart contract verifies that the sender is authorized to transfer the property.

---

### Step 6 — Complete Transfer

After the required authorization and transaction conditions are satisfied, ownership is updated.

The blockchain records the transfer transaction.

---

### Step 7 — View Ownership History

Users can inspect the property's previous ownership records.

---

## 🧠 Smart Contract Responsibilities

The smart contract can manage:

* Property registration
* Property IDs
* Property ownership
* Ownership transfers
* Property status
* Ownership history
* Document hashes or references
* Access control
* Transfer events

Example conceptual functions:

```solidity id="n0c5hl"
registerProperty()
transferProperty()
getProperty()
getOwner()
getOwnershipHistory()
verifyProperty()
updatePropertyStatus()
```

The exact functions depend on the implementation.

---

## 📊 Property Lifecycle

```text id="xj9qgb"
┌────────────────────┐
│ Property Created   │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ Property Verified  │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ Blockchain Record  │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ Current Ownership  │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ Transfer Requested │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ Transfer Approved  │
└──────────┬─────────┘
           ↓
┌────────────────────┐
│ New Ownership      │
└────────────────────┘
```

---

## 🔐 Security Features

The smart contract should implement appropriate security mechanisms such as:

* Role-based access control
* Ownership verification
* Authorized property registration
* Transfer authorization
* Duplicate property-ID prevention
* Input validation
* Event logging
* Protection against unauthorized administrative actions

Smart contracts should be thoroughly tested and independently audited before being used for real property transactions.

---

## 🧪 Testing

The project should test all important functions.

Example test cases:

```text id="6e9jlf"
✓ Contract deployment
✓ Property registration
✓ Unique property ID
✓ Property ownership
✓ Property lookup
✓ Ownership transfer
✓ Unauthorized transfer rejection
✓ Ownership history
✓ Property verification
✓ Invalid property rejection
✓ Duplicate property rejection
✓ Access-control validation
✓ Property status updates
```

Run tests:

```bash id="z0o1nb"
npx hardhat test
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash id="gbr6pf"
git clone <YOUR-REPOSITORY-URL>
cd blockchain-land-registry
```

### 2. Install Dependencies

```bash id="2x7nq3"
npm install
```

### 3. Compile Smart Contracts

```bash id="5ry8oc"
npx hardhat compile
```

### 4. Run Tests

```bash id="u8xg5p"
npx hardhat test
```

### 5. Start Local Blockchain

```bash id="7b6c4x"
npx hardhat node
```

Keep this terminal open.

### 6. Deploy Smart Contract

Open another terminal:

```bash id="9n3x5v"
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address.

---

## 🌐 Frontend Setup

Navigate to the frontend:

```bash id="v7q1z4"
cd frontend
```

Install dependencies:

```bash id="8p4m2k"
npm install
```

Start the development server:

```bash id="f0v5nd"
npm run dev
```

The application will normally be available at:

```text id="z1l7ar"
http://localhost:5173
```

---

## 🦊 MetaMask Setup

For local development:

1. Install MetaMask.
2. Add the local Hardhat network.
3. Use the RPC endpoint provided by Hardhat.
4. Import a development account generated by Hardhat.
5. Connect MetaMask to the frontend.
6. Make sure the selected network matches the deployed smart contract.

**Never use real private keys or real funds for local development.**

---

## 🖥️ Frontend Pages
<img width="1366" height="768" alt="Screenshot 2026-08-23 154708" src="https://github.com/user-attachments/assets/0c046358-c38f-467c-a113-eb453cab7103" />
<img width="1366" height="768" alt="Screenshot 2026-08-23 154750" src="https://github.com/user-attachments/assets/0c44a8da-9eb5-4a5a-b2b7-2d3f0886df48" />
<img width="1366" height="768" alt="Screenshot 2026-08-23 154759" src="https://github.com/user-attachments/assets/b64460b6-b932-4579-9507-033b6f18c467" />
<img width="1366" height="768" alt="Screenshot 2026-08-23 154829" src="https://github.com/user-attachments/assets/655f716e-09ab-478c-9535-86073d4a8a2a" />

### 🏠 Dashboard

Display:

* Total properties
* Verified properties
* Recent transfers
* Connected wallet
* Properties owned by the user

### 🏡 Property Registration

Authorized users can enter:

* Property ID
* Property address
* Property type
* Area
* Document reference
* Owner information

### 🔍 Property Search

Users can search by:

* Property ID
* Owner address
* Registration number

### 📜 Property Details

Display:

* Property ID
* Current owner
* Property type
* Area
* Location
* Registration status
* Registration transaction
* Ownership history

### 🔄 Transfer Property

Allow an authorized owner to:

* Enter new owner address
* Review property details
* Confirm transfer
* Submit blockchain transaction

### 📊 Ownership History

Display:

```text id="t8m4zx"
Property: PROP-1001

Owner A
   ↓
Owner B
   ↓
Owner C

Current Owner: Owner C
```

---

## 📈 Example Dashboard

```text id="7qg7gc"
========================================
       LAND REGISTRY DASHBOARD
========================================

Total Properties       1,250
Verified Properties    1,180
Pending Transfers         24
Completed Transfers      846

My Properties              5
========================================
```

Actual values should be retrieved from the smart contract or application backend rather than hard-coded.

---

## 🌟 Advantages

### Transparency

Property ownership records can be independently verified on the blockchain.

### Immutability

Blockchain records are designed to be resistant to unauthorized modification.

### Traceability

Ownership transfers can be tracked through blockchain transactions.

### Reduced Fraud Risk

A properly designed registry can make unauthorized alteration of registered records more difficult.

### Faster Verification

Users can retrieve property information without relying exclusively on paper records.

### Auditability

Property transfers and administrative actions can generate blockchain events.

---

## ⚠️ Important Limitations and Disclaimer

This project is an **educational blockchain prototype**.

Recording property ownership on a blockchain does not automatically make that record legally valid or recognized by a government land authority.

Real-world deployment would require:

* Government authorization
* Legal recognition
* Identity verification
* Property-title verification
* Regulatory compliance
* Secure document management
* Privacy protection
* Dispute-resolution mechanisms
* Integration with existing land-record systems

Do not use this prototype as a replacement for official land-registration systems or legal property records.

---

## 🔮 Future Enhancements

Possible future improvements include:

* Government authority integration
* Digital identity verification
* KYC integration
* Property document verification
* IPFS document storage
* Digital signatures
* GIS/map integration
* Property valuation
* Mortgage records
* Property tax integration
* Multi-signature property transfers
* Dispute management
* NFT-based property certificates
* Mobile application
* Multi-chain support
* Layer-2 deployment
* Automated legal-document generation

---

## 🤝 Contributing

Contributions are welcome.

```bash id="g7a3d4"
git checkout -b feature/new-feature
git add .
git commit -m "Add new land registry feature"
git push origin feature/new-feature
```

Then create a pull request.

---

## 📄 License

This project is provided for educational and research purposes.

You may add an appropriate open-source license such as MIT depending on your project requirements.

---

## 👨‍💻 Author

**Blockchain-Based Land Registry and Property Ownership**

A decentralized application demonstrating blockchain-based property registration, ownership tracking, property verification, and transparent ownership transfers.

---

## ⭐ Project Vision

> **"Create a transparent and tamper-resistant digital land registry where property ownership and transfer history can be securely recorded and independently verified using blockchain technology."**

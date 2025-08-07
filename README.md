
## Create Aptos Dapp Boilerplate Template

The Boilerplate template provides a starter dapp with all necessary dapp infrastructure and a simple wallet info implementation, transfer APT and a simple message board functionality to send and read a message on chain.

## Read the Boilerplate template docs

To get started with the Boilerplate template and learn more about the template functionality and usage, head over to the [Boilerplate template docs](https://learn.aptoslabs.com/en/dapp-templates/boilerplate-template)

## The Boilerplate template provides:

- **Folder structure** - A pre-made dapp folder structure with a `frontend` and `contract` folders.
- **Dapp infrastructure** - All required dependencies a dapp needs to start building on the Aptos network.
- **Wallet Info implementation** - Pre-made `WalletInfo` components to demonstrate how one can use to read a connected Wallet info.
- **Transfer APT implementation** - Pre-made `transfer` components to send APT to an address.
- **Message board functionality implementation** - Pre-made `message` components to send and read a message on chain
# 🛡️ Digital Identity - Self-Sovereign Identity Management

![Aptos](https://img.shields.io/badge/Aptos-Blockchain-blue)
![Move](https://img.shields.io/badge/Move-Smart_Contract-green)
![React](https://img.shields.io/badge/React-Frontend-61dafb)
![License](https://img.shields.io/badge/License-MIT-yellow)

A self-sovereign identity management application built on the Aptos blockchain using Move language and React. Users can create, manage, and verify their digital identities without relying on centralized authorities.

## ✨ Features

✅ **Self-Sovereign Identity Creation** - Complete user control over identity data  
✅ **Reputation Scoring** - Blockchain-based trust score calculation  
✅ **Privacy Controls** - Public/Private profile visibility settings  
✅ **Glassmorphism UI Design** - Modern, immersive interface  
✅ **Petra Wallet Integration** - Secure wallet connectivity  
✅ **Real-time Dashboard** - Interactive stats and verification progress  
✅ **Responsive Design** - Mobile and desktop support

## 🧰 Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Smart Contracts:** Move Language (Aptos)  
**Wallet:** Petra Wallet Integration  
**Blockchain:** Aptos Network

## 🛠 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/digital-identity.git
cd digital-identity

# Install dependencies
npm install

# Compile smart contract
cd contract
aptos move compile

# Deploy smart contract (update address in constants.ts)
aptos move publish --named-addresses digital_identity=YOUR_ADDRESS

# Start development server
cd ..
npm run dev
```

## 📦 Smart Contract

**Contract Address:** `YOUR_DEPLOYED_ADDRESS_HERE`

### Core Functions

- `create_identity()` - Create new digital identity
- `update_identity()` - Update identity information
- `add_verification()` - Add verification credentials
- `get_identity_profile()` - Retrieve identity data

## future scope

✅ **Multi-Type Verification System** - Email, Phone, Government ID, Biometric, Social Media

### Verification Types & Points

- Email Verification: +10 points
- Phone Verification: +15 points
- Government ID: +25 points
- Biometric: +40 points
- Social Media: +20 points

## 🚀 Usage

1. **Connect Wallet** - Connect your Petra wallet
2. **Create Identity** - Fill out the multi-step identity creation form
3. **Add Verifications** - Complete various verification types to build reputation
4. **Manage Profile** - Update information and privacy settings
5. **Track Progress** - Monitor verification status and reputation score

## 🔮 Future Scope

- Advanced biometric integration
- Cross-chain identity portability
- Enterprise verification solutions
- Zero-knowledge proof integration
- Mobile app development
## Transaction Screenshot
<img width="1894" height="938" alt="Screenshot 2025-08-07 090335" src="https://github.com/user-attachments/assets/647e7b4f-715d-4757-8f96-1e64711c7dd4" />

## "Visual Overview of Dapp Interface Screenshots"
<img width="1890" height="834" alt="image" src="https://github.com/user-attachments/assets/c932d84f-820d-417a-bee5-a62e23d47752" />
<img width="1880" height="904" alt="image" src="https://github.com/user-attachments/assets/05451e70-8652-4894-8f93-f6ca5ecbfefe" />
<img width="1887" height="834" alt="image" src="https://github.com/user-attachments/assets/b86b163b-2f28-431a-995c-20c67a3e5f96" />


## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- **Aptos Labs** - Blockchain platform and Move language
- **Petra Wallet Team** - Wallet integration
- **React Community** - Frontend framework
- **Open Source Community** - Collaborative development

## 👤 Author

**Your Name**  B Hema Swarup improvised by AI
## To connect with me in any other platforms click here to checkout my social media platforms
GitHub: [@Swarup-git-hub](https://github.com/Swarup-git-hub)

---

⭐ **Star this repository if you found it helpful!**

## What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run dev` - a command to run the frontend locally
- `npm run deploy` - a command to deploy the dapp to Vercel

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.

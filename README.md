# ImpactBridge 🌉

## Connecting Local Visionaries with Global Opportunity

![Project Logo/Flow](impact_bridge_userflow_v1.png)

### 🎯 Core Concept

ImpactBridge is a platform that connects impact-driven businesses with a supportive ecosystem of investors/mentors. Our mission is to create an inclusive, globally interconnected support network for entrepreneurship, transcending traditional funding marketplaces.

### 🚀 Platform Vision

We believe every local business has global potential. ImpactBridge bridges the gap between community-driven ventures and worldwide opportunities by providing:

- 🤝 Direct Relationship Building
- 💡 Strategic Guidance
- 💰 Funding Pathways
- 🌍 Global Market Access

### 📦 Minimum Viable Product (MVP) Scope

Our 48-hour hackathon MVP focuses on core functionality to validate the platform's core matching concept:

#### Key Features
- 👤 User Authentication (Signup/Login)
- 🏢 Business Profile Creation
- 🔍 Investor Directory
- 📄 Pitch Deck Upload
- 🤲 "Express Interest" Matching System

### 🛠 Technology Stack

#### Backend
- **Language**: Go (Golang)
- **Database**: PostgreSQL/SQLite
- **Authentication**: JWT

#### Frontend
- **Framework**: React
- **State Management**: Context API
- **Routing**: React Router

### 🗂 Project Structure

```
impactbridge/
├── backend/           # Go backend services
│   ├── cmd/           # Application entry points
│   ├── internal/      # Core business logic
│   └── pkg/           # Shared utilities
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
└── README.md
```

### 🚦 Getting Started

#### Prerequisites
- Go 1.16+
- Node.js 14+
- PostgreSQL/SQLite

#### Installation

1. Clone the repository
```bash
git clone https://github.com/Philip38-hub/impact-bridge.git
cd impact-bridge
```

2. Setup Backend
```bash
cd backend
go mod download
go run cmd/server/main.go
```

3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

### 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

### 🌟 Roadmap

- [ ] Enhance Matching Algorithm
- [ ] Implement Advanced Analytics
- [ ] Build Mobile Companion App
- [ ] Integrate More Service Providers

### 💡 Vision Statement

ImpactBridge isn't just a platform—it's a movement. We believe that by connecting local authenticity with global opportunity, we can create a more equitable, sustainable entrepreneurial ecosystem.

### Project Goals

- To connect impact-driven businesses with investors, mentors, and service providers.
- To create a globally interconnected support network for entrepreneurship.
- To bridge the gap between local ventures and global opportunities.
- To provide a platform for direct relationship building, strategic guidance, funding pathways, and global market access.

---

**Made with ❤️ by Impact Innovators**

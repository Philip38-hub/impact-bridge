# Impact Bridge

A web platform connecting startups with potential investors, facilitating the funding process for innovative projects.

## Features

- User Authentication (Startup & Investor)
- Personalized Dashboards
- Startup Listings
- Investor Profiles
- Real-time Messaging (for Startups)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/impact-bridge.git
cd impact-bridge
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Backend (.env in /backend):
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/impact-bridge
JWT_SECRET=your_jwt_secret_here
```

Frontend (.env in /frontend):
```env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Running the Application

1. Start MongoDB:
```bash
sudo systemctl start mongod
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
impact-bridge/
├── backend/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── server.js       # Server configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── assets/     # Static assets
│   │   └── App.jsx     # Main application component
│   └── index.html      # HTML entry point
└── README.md
```

## Dependencies

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

### Frontend
- react
- react-router-dom
- @mui/material
- axios
- @emotion/styled
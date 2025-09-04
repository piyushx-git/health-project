# HealthLock App

A secure healthcare application with authentication and encryption features.

## Features

- User authentication (login/register)
- Secure patient dashboard
- Route protection
- Encryption utilities for sensitive data
- Modern React architecture

## Project Structure

```
healthlock-app/
├── public/
│   └── index.html                 # Main HTML template
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js          # Login component
│   │   │   └── Register.js       # Registration component
│   │   ├── Dashboard/
│   │   │   └── PatientDashboard.js # Main dashboard
│   │   └── Layout/
│   │       ├── Header.js         # Header with logout
│   │       └── ProtectedRoute.js # Route protection
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   ├── utils/
│   │   ├── auth.js              # Auth utilities
│   │   └── encryption.js        # Encryption utilities
│   ├── App.js                   # Main app component
│   ├── App.css                  # Global styles
│   └── index.js                 # App entry point
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used

- React 18
- React Router DOM
- CryptoJS for encryption
- Context API for state management

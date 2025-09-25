# Task Manager Frontend

This is the frontend application for the Task Manager built with React, Redux, and Tailwind CSS.

## Project Structure

```
├── public/           # Static files
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # Reusable React components
│   │   ├── Layout/ # Layout components
│   │   ├── Tasks/  # Task-related components
│   │   └── UI/     # UI components
│   ├── pages/      # Page components
│   ├── routes/     # Route configurations
│   ├── services/   # API service functions
│   ├── store/      # Redux store and slices
│   └── utils/      # Utility functions
├── App.jsx         # Root component
├── index.js        # Entry point
└── tailwind.config.js # Tailwind CSS configuration
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## Features

- User authentication (Login/Register)
- Role-based routing (Admin/User dashboards)
- Task management interface
- Comment system
- Responsive design with Tailwind CSS
- Redux state management
- Protected routes

## Pages

- Landing Page
- Login
- Register
- User Dashboard
- Admin Dashboard

## Technologies Used

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios for API calls
- JWT for authentication

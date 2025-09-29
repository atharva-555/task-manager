# Task Manager Application

A full-stack task management application built with React and Node.js that enables efficient task tracking and collaboration between administrators and users.

## 🌟 Features

- **User Authentication & Authorization**
  - Secure login and registration
  - Role-based access control (Admin/User roles)
  - JWT-based authentication with HTTP-only cookies

- **Task Management**
  - Create, update, and delete tasks
  - Filter and sort tasks
  - Task status tracking
  - Task assignment capabilities
  - Recurrence settings for recurring tasks

- **Comments & Collaboration**
  - Nested comments on tasks
  - Real-time updates
  - User mentions and notifications

- **Dashboard & Analytics**
  - Task completion statistics
  - Progress tracking
  - User activity monitoring

## 🛠️ Tech Stack

### Frontend
- React.js with Redux Toolkit
- Tailwind CSS for styling
- Axios for API communication
- React Router for navigation

### Backend
- Node.js & Express.js
- MySQL with Sequelize ORM
- JWT for authentication
- CORS enabled for security

## 🏗️ Project Structure

```
task-manager/
├── frontend/           # React frontend application
│   └── README.md      # Detailed frontend documentation
├── backend/           # Node.js backend server
│   └── README.md      # Detailed backend documentation
└── README.md         # This file (Project overview)
```

## 📝 Documentation

- For frontend-specific details, please refer to [Frontend Documentation](./frontend/README.md)
- For backend-specific details, please refer to [Backend Documentation](./backend/README.md)

## 🚀 Live Demo - (https://task-manager-appx.vercel.app)

## ✨ Key Features in Detail

### Admin Features
- User management
- Global task oversight
- System statistics and analytics
- Task assignment

### User Features
- Personal task management
- Task filtering and sorting
- Comment and collaborate
- Track personal progress

### Security Features
- Secure password hashing
- Protected API endpoints
- Role-based route protection
- HTTP-only cookies for JWT

## 🔄 Application Flow

1. **Authentication**
   - Users register/login
   - JWT tokens issued
   - Role-based access granted

2. **Task Management**
   - Create/Edit tasks
   - Assign tasks (Admin)
   - Track progress
   - Add comments

3. **Dashboard**
   - View statistics
   - Monitor progress
   - Manage assignments

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop browsers
- Tablets
- Mobile devices

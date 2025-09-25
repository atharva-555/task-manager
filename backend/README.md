# Task Manager Backend

This is the backend service for the Task Manager application built with Node.js, Express, and Sequelize ORM.

## Project Structure

```
├── migrations/         # Database migration files
├── src/
│   ├── config/        # Database and other configuration files
│   ├── constants/     # Application constants and enums
│   ├── controllers/   # Request handlers and Business Logic
│   ├── middleware/    # Custom middleware functions
│   ├── models/        # Sequelize models
│   ├── routes/        # API route definitions
│   └── utils/         # Utility functions
├── server.js          # Application entry point
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```env
   DB_HOST=db_host
   DB_USER=db_user
   DB_PASSWORD=db_password
   DB_NAME=task_manager_db
   JWT_SECRET=JWT_SECRET_
   TOKEN_EXPIRY_TIME=604800000
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

3. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  ```json
  // Request Body
  {
    "username": "string",
    "email": "string",
    "password": "string",
  }
  ```

- `POST /auth/login` - Login user
  ```json
  // Request Body
  {
    "email": "string",
    "password": "string"
  }
  ```

- `POST /auth/logout` - Logout user
  - Requires Authorization header with JWT token

- `GET /auth/getAllUsers` - Get all users
  - Requires Authorization header with JWT token
  - Admin access only

### Tasks
- `GET /task/getAllTasks` - Get all tasks
  - Requires Authorization header with JWT token

- `POST /task/createTask` - Create a new task
  ```json
  // Request Body
  {
    "title": "string",
    "description": "string",
    "dueDate": "2023-12-31",
    "status": "open | completed | in-progress",
    "recurrence":"none | daily | weekly | monthly",
    "assignedTo": "userId"
  }
  ```

- `GET /task/getTasksByFilter` - Get tasks by filter
   Parameters that can be passed in body:
    - status
    - assignedTo
    - isDeleted
    - startDate: "YYYY-MM-DD"
    - endDate: "YYYY-MM-DD"

- `GET /task/getTaskById/:id` - Get task by id
  - URL Parameter: id (task ID)

- `PUT /task/updateTask/:id` - Update a task
  - URL Parameter: id (task ID)
  ```json
  // Request Body 
 {
    "title": "string",
    "description": "string",
    "dueDate": "2023-12-31",
    "status": "open | completed | in-progress",
    "recurrence":"none | daily | weekly | monthly",
    "assignedTo": "userId"
  }
  ```

- `DELETE /task/deleteTask/:id` - Delete a task
  - URL Parameter: id (task ID)

### Comments
- `GET /comment/getCommentByTask?taskId=6` - Get comments for a task
  - Query Parameter: taskId

- `POST /comment/addComment` - Add a comment
  ```json
  // Request Body
  {
    "taskId": id,
    "text": "string"
  }
  ```

- `POST /comment/addComment` - Add a comment reply
  ```json
  // Request Body
  {
    "taskId": id,
    "text": "string",
    "parentId": id
  }
  ```

- `DELETE /comment/deleteComment` - Delete a comment
  ```json
  // Request Body
  {
    "commentId": id
  }
  ```

## Features

- User authentication and authorization
- Role-based access control (Admin, User)
- Task management with CRUD operations
- Nested comments system
- Input validation
- Error handling middleware
- Database migrations

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt for password hashing
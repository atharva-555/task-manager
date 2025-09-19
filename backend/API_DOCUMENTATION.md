# Task Manager API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
All protected endpoints require a JWT token sent via HTTP-only cookie named `jwt`.

## Response Format
All responses follow this structure:
```json
{
  "success": true/false,
  "data": {}, // Response data
  "message": "Success message",
  "error": "Error message" // Only present on errors
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules:**
- `name`: Required, 1-255 characters
- `email`: Required, valid email format, max 255 characters, unique
- `password`: Required, min 6 characters, must contain 1 number and 1 special character

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "userID": 1
}
```

**Error Responses:**
- `400`: Validation errors or email already exists
- `500`: Server error

---

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Validation errors
- `401`: Invalid credentials or user not found
- `500`: Server error

**Note:** JWT token is also set as HTTP-only cookie

---

### POST /auth/logout
Logout user and clear authentication cookie.

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

## Task Management Endpoints

### POST /task/createTask
Create a new task. Requires authentication.

**Headers:**
```
Cookie: jwt=<token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "open",
  "dueDate": "2024-12-31",
  "assignedTo": 2,
  "recurrence": "none"
}
```

**Field Descriptions:**
- `title`: Required, 3-255 characters
- `description`: Optional, text description
- `status`: Required, one of: "open", "in-progress", "completed"
- `dueDate`: Optional, format: YYYY-MM-DD
- `assignedTo`: Optional, user ID (admin only, otherwise assigned to current user)
- `recurrence`: Optional, one of: "none", "daily", "weekly", "monthly"

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "taskId": 1
}
```

**Error Responses:**
- `400`: Validation errors or assignee not found
- `401`: Authentication required
- `403`: Insufficient permissions
- `500`: Server error

---

### GET /task/getAllTasks
Retrieve all tasks. Admins see all tasks, users see only their assigned tasks.

**Headers:**
```
Cookie: jwt=<token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "open",
    "dueDate": "2024-12-31",
    "createdBy": 1,
    "assignedTo": 2,
    "isDeleted": false,
    "recurrence": "none",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### GET /task/getTasksByFilter
Filter tasks by various criteria. **Note: Currently uses GET with body - should be changed to POST**

**Headers:**
```
Cookie: jwt=<token>
```

**Request Body:**
```json
{
  "status": "open",
  "dueDate": "2024-12-31",
  "dueDateBefore": "2024-12-31",
  "dueDateAfter": "2024-01-01",
  "assignedTo": 2
}
```

**Field Descriptions:**
- `status`: Filter by task status
- `dueDate`: Filter by exact due date
- `dueDateBefore`: Filter tasks due before this date
- `dueDateAfter`: Filter tasks due after this date
- `assignedTo`: Filter by assigned user ID (admin only)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    // ... other task fields
  }
]
```

---

### GET /task/getTaskById/:id
Retrieve a specific task by ID.

**Headers:**
```
Cookie: jwt=<token>
```

**URL Parameters:**
- `id`: Task ID (integer)

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "open",
  "dueDate": "2024-12-31",
  "createdBy": 1,
  "assignedTo": 2,
  "isDeleted": false,
  "recurrence": "none",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404`: Task not found
- `403`: Unauthorized to view this task

---

### PUT /task/updateTask/:id
Update an existing task.

**Headers:**
```
Cookie: jwt=<token>
```

**URL Parameters:**
- `id`: Task ID (integer)

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "2024-12-31",
  "assignedTo": 3,
  "recurrence": "weekly"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Updated task title",
  // ... updated task fields
}
```

**Error Responses:**
- `400`: Validation errors or assignee not found
- `403`: Unauthorized to update this task
- `404`: Task not found

---

### DELETE /task/deleteTask/:id
Soft delete a task (admin only).

**Headers:**
```
Cookie: jwt=<token>
```

**URL Parameters:**
- `id`: Task ID (integer)

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- `403`: Admin access required
- `404`: Task not found

## Comment Endpoints

### POST /comment/addComment
Add a comment or reply to a task.

**Headers:**
```
Cookie: jwt=<token>
```

**Request Body:**
```json
{
  "taskId": 1,
  "text": "This is a comment on the task",
  "parentId": null // Optional: ID of parent comment for replies
}
```

**Field Descriptions:**
- `taskId`: Required, ID of the task to comment on
- `text`: Required, comment text
- `parentId`: Optional, parent comment ID for nested replies

**Success Response (201):**
```json
{
  "id": 1,
  "taskId": 1,
  "userId": 2,
  "text": "This is a comment on the task",
  "parentId": null,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400`: Missing text or invalid task/parent comment
- `403`: Unauthorized to comment on this task
- `404`: Task or parent comment not found

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Validation errors or malformed request |
| 401 | Unauthorized - Authentication required or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

## Data Models

### User
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user", // "user" or "admin"
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Task
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "open", // "open", "in-progress", "completed"
  "dueDate": "2024-12-31",
  "createdBy": 1,
  "assignedTo": 2,
  "isDeleted": false,
  "recurrence": "none", // "none", "daily", "weekly", "monthly"
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Comment
```json
{
  "id": 1,
  "taskId": 1,
  "userId": 2,
  "text": "Comment text",
  "parentId": null, // null for top-level comments, ID for replies
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Rate Limiting
Currently not implemented. Recommended to add rate limiting for production use.

## CORS
Currently not configured. Add CORS middleware for frontend integration.

## Environment Variables
Required environment variables:
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: JWT signing secret
- `TOKEN_EXPIRY_TIME`: Token expiration time (e.g., "24h")
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
# Tasks API with Role-Based Access Control

A RESTful API for managing tasks with user authentication and role-based access control. Built with Node.js, Express, MongoDB, and JWT authentication.

## Overview

This API provides a complete task management system where users can:
- Register and authenticate using JWT tokens
- Create, read, update, and delete tasks
- Search tasks by title
- View task statistics (total, completed, and pending tasks)

The API implements Role-Based Access Control (RBAC) to ensure users can only access their own tasks. All operations require authentication via JWT bearer tokens.

### Key Features
- **User Authentication**: Register and login with bcrypt password hashing
- **JWT Security**: Token-based authentication with 1-hour expiration
- **Task Management**: Full CRUD operations for tasks
- **Search Functionality**: Search tasks by title (case-insensitive)
- **Statistics**: Get insights on task completion status
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **API Documentation**: Interactive Swagger UI at `/api-docs`

---

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tasks-rbac
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Configuration Details:**
- `PORT`: The port on which the server will run (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens (use a strong, random string)
- `NODE_ENV`: Environment mode (development/production)

### 4. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
node src/index.js
```

The server will start at `http://localhost:3000`

---

## API Documentation

Interactive API documentation is available at:
```
http://localhost:3000/api-docs
```

This provides a Swagger UI where you can test all endpoints directly.

---

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
```

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "username": "john_doe"
  },
  "message": "User registered with username john_doe"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Username and password are required"
}
```

---

#### Login User
```
POST /api/auth/login
```

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Error Response (400/404):**
```json
{
  "success": false,
  "message": "Invalid Credentials"
}
```

---

### Task Endpoints

**Authorization Required:** All task endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Create Task
```
POST /api/tasks
```

**Request:**
```json
{
  "title": "Complete project report",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "Complete project report",
    "completed": false,
    "user": "65a0fe789f8c01234567890b",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task created successfully"
}
```

---

#### Get All Tasks
```
GET /api/tasks
```

**Optional Query Parameters:**
- `title`: Search tasks by title (case-insensitive)

**Example Request:**
```
GET /api/tasks?title=learn
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a0fe789f8c01234567890a",
      "title": "Learn Node.js",
      "completed": false,
      "user": "65a0fe789f8c01234567890b",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a0fe789f8c01234567890c",
      "title": "Learn MongoDB",
      "completed": true,
      "user": "65a0fe789f8c01234567890b",
      "createdAt": "2024-01-14T08:15:00.000Z",
      "updatedAt": "2024-01-15T09:45:00.000Z"
    }
  ],
  "message": "Tasks retrieved successfully"
}
```

---

#### Get Single Task
```
GET /api/tasks/:id
```

**Example Request:**
```
GET /api/tasks/65a0fe789f8c01234567890a
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "Complete project report",
    "completed": false,
    "user": "65a0fe789f8c01234567890b",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task retrieved successfully"
}
```

---

#### Update Task
```
PUT /api/tasks/:id
```

**Request:**
```json
{
  "title": "Complete project report - UPDATED",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "Complete project report - UPDATED",
    "completed": true,
    "user": "65a0fe789f8c01234567890b",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  "message": "Task updated successfully"
}
```

---

#### Delete Task
```
DELETE /api/tasks/:id
```

**Example Request:**
```
DELETE /api/tasks/65a0fe789f8c01234567890a
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0fe789f8c01234567890a",
    "title": "Complete project report",
    "completed": true,
    "user": "65a0fe789f8c01234567890b",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  "message": "Task deleted successfully"
}
```

---

#### Get Task Statistics
```
GET /api/tasks/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalTasks": 10,
    "completedTasks": 6,
    "pendingTasks": 4
  },
  "message": "Stats retrieved successfully"
}
```

---

## Testing with Postman

A Postman collection is included in `postman_collection.json`. Import it into Postman to test all endpoints:

1. Open Postman
2. Click **Import** → Select `postman_collection.json`
3. Use the provided endpoints to test the API

### Quick Testing Steps:
1. **Register** a new user using the `/api/auth/register` endpoint
2. **Login** to get a JWT token using `/api/auth/login`
3. Copy the token and add it to the Authorization header for task endpoints
4. Test CRUD operations on tasks

---

## Project Structure

```
backend/
├── src/
│   ├── index.js                 # Application entry point
│   ├── config/
│   │   ├── dbConnect.js         # MongoDB connection setup
│   │   └── swagger.js           # Swagger documentation config
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD operations
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification middleware
│   │   ├── constants.js         # HTTP status constants
│   │   └── errorHandler.js      # Global error handling
│   ├── models/
│   │   ├── userModel.js         # User schema
│   │   └── taskModel.js         # Task schema
│   └── routes/
│       ├── authRoutes.js        # Authentication routes
│       └── taskRoutes.js        # Task routes
├── package.json
├── .env                         # Environment variables (create this file)
└── README.md                    # This file
```

---

## Dependencies

- **express** (^5.1.0): Web framework for Node.js
- **mongoose** (^8.16.4): MongoDB object modeling
- **jsonwebtoken** (^9.0.2): JWT token generation and verification
- **bcryptjs** (^3.0.2): Password hashing
- **dotenv** (^17.2.0): Environment variable management
- **swagger-jsdoc** (^6.2.8): Swagger documentation generator
- **swagger-ui-express** (^5.0.1): Interactive API documentation UI

---

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Resource created
- `400`: Bad request / validation error
- `401`: Unauthorized
- `404`: Resource not found
- `500`: Server error

---

## Security Considerations

1. **JWT Tokens**: Tokens expire after 1 hour for security
2. **Password Hashing**: Bcryptjs with salt rounds of 10
3. **CORS**: Configured to accept requests from all origins (customize in production)
4. **Authentication**: All task endpoints require valid JWT token
5. **Data Isolation**: Users can only access their own tasks (RBAC)

---

## Development

### Run in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Available Scripts
- `npm run dev`: Start development server with auto-reload
- `npm test`: Run tests (not configured yet)

---

## Troubleshooting

### Server won't start
- Ensure MongoDB is running and connection string is correct in `.env`
- Make sure port 3000 is not already in use

### Authentication errors
- Verify JWT_SECRET is set in `.env`
- Check that the token is included in the Authorization header for protected routes
- Ensure token hasn't expired (tokens expire after 1 hour)

### Database connection issues
- Verify MongoDB URI in `.env`
- Check MongoDB is running locally or cloud connection is active
- Ensure network access is allowed (for cloud MongoDB)

---

## License

ISC

---

## Support

For issues or questions, please check the Swagger documentation at `/api-docs` or review the project structure for more details.

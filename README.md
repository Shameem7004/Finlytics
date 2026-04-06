# Finance Data Processing and Access Control Backend

## Objective

This backend is a practical implementation of a finance dashboard system. It is designed to demonstrate backend thinking around API design, data modeling, business logic, validation, and access control.

The codebase is intentionally structured to stay clear, maintainable, and easy to evaluate. The focus is not on unnecessary complexity, but on showing how a backend can reliably process financial data and enforce role-based permissions.

This project demonstrates how a real-world backend system can handle financial data securely, enforce access control, and generate analytics efficiently.

## What this project covers

The application supports:

- User registration and login
- Role-based access control for Admin, Analyst, and Viewer users
- User management, including active/inactive status and role updates
- Financial record creation, listing, updating, and soft deletion
- Filtering, pagination, and sorting for record queries
- Dashboard summary endpoints for analytics and reporting
- Input validation and consistent API error responses

## Project Structure

```text
backend/
├── prisma/
│   ├── migrations/
│   └── models/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── dev/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validation/
└── .env
```

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM with the PostgreSQL adapter
- JWT for authentication
- Joi for request validation
- bcrypt for password hashing

## Architecture

The project follows a layered backend structure:

Route -> Controller -> Service -> Database

### Layer responsibilities

- Routes define the API surface and attach middleware
- Controllers handle request and response flow
- Services contain business logic and database operations
- Prisma handles structured CRUD access
- Raw SQL is used for dashboard aggregation queries

## Key Design Decision

### Hybrid Prisma + Raw SQL

- Prisma is used for standard CRUD operations
- Raw SQL is used for analytics queries such as SUM, GROUP BY, and DATE_TRUNC

This gives a practical balance of:

- faster development for standard data operations
- efficient reporting for dashboard endpoints
- cleaner separation between transactional and analytical logic

## Data Model

### User

Each user has:

- name
- email
- password
- role
- isActive status
- timestamps

Role values used in the codebase:

- ADMIN
- ANALYST
- VIEWER

### Record

Each financial record stores:

- amount
- type, either INCOME or EXPENSE
- category
- date
- optional description
- soft delete flag
- createdBy reference to the user

### Relationship design

- One user can own many records
- A record belongs to one user
- Records are soft deleted using the isDeleted flag instead of being physically removed

## Access Control

Role-based access control is enforced through middleware.

### Permissions implemented

- ADMIN can create, update, and delete records
- ADMIN can manage users, including role and active status changes
- ADMIN, ANALYST, and VIEWER can access dashboard endpoints
- ANALYST can view records and dashboard insights
- VIEWER can only view allowed data

### Middleware flow

For protected routes, the request typically flows through:

authenticate -> authorizeRoles -> controller

This keeps authorization logic centralized and reusable.

## Authentication

Authentication is JWT-based.

- A token is issued after successful login
- Protected requests must send Authorization: Bearer <token>
- The middleware verifies the token and attaches the decoded user to req.user

Passwords are hashed with bcrypt before storage.

## Validation and Error Handling

Request validation is handled with Joi schemas.

### Validation coverage

- User registration validation
- Login validation
- Password change validation
- User update validation
- Record creation validation
- Record update validation

### Error handling approach

- Invalid input returns a 400 response
- Unauthorized requests return 401
- Forbidden requests return 403
- Missing resources return 404 where appropriate
- Unexpected failures return a 500 response

The API responses use a consistent structure with success and message fields.

## Dashboard and Analytics

The dashboard layer is designed for summary-level reporting rather than only CRUD.

### Implemented summary endpoints

- Total income
- Total expense
- Net balance
- Category-wise breakdown
- Monthly trends
- Recent activity

These are computed using raw SQL through Prisma for efficient aggregation.

## Record Features

The record service supports:

- Creating records
- Fetching all records
- Fetching a single record by id
- Updating records
- Soft deleting records
- Filtering by type, category, and date range
- Pagination and sorting for list queries

## User Management Features

The user service supports:

- Fetching all users with pagination, sorting, and search
- Fetching a single user by id
- Viewing the current authenticated profile
- Updating a user's role or active status
- Deactivating a user
- Changing password for the current user

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Users

- GET /api/users
- GET /api/users/:id
- GET /api/users/me
- PATCH /api/users/:id
- PATCH /api/users/change-password
- DELETE /api/users/:id

### Records

- POST /api/records
- GET /api/records
- GET /api/records/:id
- PATCH /api/records/:id
- DELETE /api/records/:id

### Dashboard

- GET /api/dashboard/summary
- GET /api/dashboard/categories
- GET /api/dashboard/trends
- GET /api/dashboard/recent

### Development test routes

- GET /api/test/admin
- GET /api/test/analyst
- GET /api/test/viewer

## Sample API Response

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 5000,
    "type": "INCOME",
    "category": "Salary"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Example filtering

```http
GET /api/records?type=INCOME&category=Salary&startDate=2025-01-01&endDate=2025-02-01&page=1&size=10&sortBy=date&sortOrder=desc
```

## Setup

### Prerequisites

- Node.js installed
- PostgreSQL available
- Environment variables configured in backend/.env

### Install and run

```bash
cd backend
npm install
npx prisma migrate dev --schema ./prisma
npx prisma generate --schema ./prisma
npm run dev
```

## Environment variables

Required environment variables:

- PORT
- DATABASE_URL
- JWT_SECRET_KEY

The application loads environment variables from the backend root, so keeping a single .env file in the backend folder is the simplest setup.

## Security Considerations

- Passwords are hashed using bcrypt
- JWT is used for stateless authentication
- Protected routes enforce authentication and role-based authorization
- Input validation helps prevent malformed or unexpected data

## Future Improvements

- Redis caching for dashboard endpoints
- Rate limiting for API protection
- Unit and integration tests
- API documentation using Swagger
- Docker containerization

## Assumptions and design choices

- Admin is the only role allowed to modify financial records
- All authenticated roles may access dashboard summaries unless restricted by middleware
- Soft delete is used to preserve record history
- PostgreSQL is used because the data is relational and aggregation-heavy
- Prisma is used for CRUD operations while raw SQL is used for reporting queries

## Notes for evaluation

This project is meant to show backend design quality rather than production hardening. The code demonstrates:

- separation of concerns
- role-based authorization
- request validation
- data integrity
- summary analytics
- clear API structure

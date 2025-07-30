# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (.NET 9)
```bash
# Build the solution
dotnet build

# Run tests
dotnet test

# Run the API server (from src/VBTasks.API directory)
cd src/VBTasks.API
dotnet run
# API runs on http://localhost:5038
# Swagger docs available at http://localhost:5038/swagger
```

### Frontend (Angular 20)
```bash
# Install dependencies (from vb-tasks-ui directory)
cd vb-tasks-ui
npm install

# Start development server
npm start
# Runs on http://localhost:4200

# Build for production
npm run build

# Run tests
npm test
```

### Full Application Build
```bash
# Build Angular and copy to API wwwroot
./build-spa.sh  # On Linux/Mac
# or
build-spa.bat   # On Windows
```

## Architecture Overview

### Backend - Onion Architecture
The backend follows Onion/Clean Architecture with clear separation of concerns:

- **VBTasks.Domain**: Core entities (TaskItem, User, Group) and repository interfaces. No external dependencies.
- **VBTasks.Application**: DTOs and service interfaces (kept separate from Business layer for flexibility).
- **VBTasks.Business**: Business logic implementation, service classes that orchestrate operations.
- **VBTasks.Infrastructure**: JSON file repositories, file system services, external concerns.
- **VBTasks.API**: Web API controllers, middleware, hosting configuration.

Key patterns:
- Repository pattern for data access abstraction
- DTOs for API contracts
- Dependency injection throughout
- JSON file storage with file locking for concurrent access

### Frontend - Angular Standalone Components
The frontend uses Angular 20 with standalone components and feature-based organization:

- **core/**: Singleton services (auth, HTTP), models, interceptors, guards
- **features/**: Feature modules (auth, dashboard, tasks) with lazy loading
- **shared/**: Reusable UI components (badges, spinners, empty states)
- **state/**: NgRx store configuration (partial implementation)

Key patterns:
- State services using BehaviorSubject for simple state management
- HTTP interceptors for auth token injection and error handling
- PrimeNG component library for UI
- Reactive forms and RxJS operators

## Data Storage

All data is stored in JSON files under `src/VBTasks.API/Data/`:
- `users.json`: User accounts with BCrypt hashed passwords
- `tasks.json`: Task items with assignments
- `groups.json`: Groups with member lists

The JsonFileService handles file locking to prevent concurrent write issues.

## Authentication Flow

1. User logs in with email/password at `/auth/login`
2. API validates credentials against users.json
3. JWT token generated containing userId and role claims
4. Token stored in localStorage by Angular
5. Auth interceptor adds token to all API requests
6. API validates token on protected endpoints

## Key API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/tasks` - Get paginated tasks (supports filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/users` - Get all users
- `GET /api/groups` - Get all groups

## Test Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@vbtasks.com | 123456 | Admin |
| john.doe@vbtasks.com | 123456 | Developer |
| jane.smith@vbtasks.com | 123456 | Developer |

## Important Implementation Notes

1. **No Database**: Uses JSON files with file locking. Not suitable for production scale.
2. **JWT in localStorage**: Vulnerable to XSS. Consider httpOnly cookies for production.
3. **No Refresh Tokens**: Tokens expire after 7 days with no renewal mechanism.
4. **Incomplete Features**: Task CRUD UI is placeholder only, NgRx partially implemented.
5. **CORS Configuration**: Only allows localhost:4200/4201 origins.
6. **Static File Serving**: API serves Angular build from wwwroot for production deployment.
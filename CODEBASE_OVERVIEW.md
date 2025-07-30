# VB-Tasks Codebase Overview

## Quick Reference for Interviewers

This document provides a high-level overview of the VB-Tasks application architecture and key implementation details to help interviewers navigate the codebase during technical interviews.

---

## Technology Stack

### Backend (.NET 9)
- **Architecture**: Onion Architecture (Clean Architecture)
- **API**: RESTful Web API with JWT authentication
- **Storage**: JSON files (no database)
- **Key Libraries**: 
  - BCrypt.Net for password hashing
  - System.IdentityModel.Tokens.Jwt for JWT

### Frontend (Angular 20)
- **Architecture**: Standalone components with lazy loading
- **State Management**: NgRx (Redux pattern)
- **UI Library**: PrimeNG v20
- **Styling**: SCSS
- **Key Features**: Signals, RxJS, Reactive Forms

---

## Project Structure

### Backend Structure
```
src/
├── VBTasks.Domain/          # Core business logic (no dependencies)
│   ├── Entities/           # TaskItem, User, Group
│   ├── Enums/             # TaskStatus, Priority, AssigneeType
│   └── Interfaces/        # Repository contracts
│
├── VBTasks.Application/     # Business logic implementation
│   ├── DTOs/              # Data Transfer Objects
│   ├── Interfaces/        # Service contracts
│   └── Services/          # Business services
│
├── VBTasks.Infrastructure/  # External concerns
│   ├── Repositories/      # JSON file repositories
│   └── Services/          # File system services
│
└── VBTasks.API/            # Web API layer
    ├── Controllers/       # REST endpoints
    ├── Middleware/        # Error handling
    └── Data/             # JSON data files
```

### Frontend Structure
```
vb-tasks-ui/src/app/
├── core/                   # Singleton services, models
│   ├── models/           # TypeScript interfaces
│   ├── services/         # HTTP services
│   ├── interceptors/     # Auth & error interceptors
│   └── guards/           # Route guards
│
├── features/              # Feature modules
│   ├── auth/            # Login functionality
│   ├── dashboard/       # Dashboard component
│   └── tasks/           # Task management (incomplete)
│
├── shared/               # Reusable components
│   └── components/      # UI components
│
└── state/               # NgRx state management
    ├── auth/           # Authentication state
    ├── tasks/          # Tasks state (partial)
    └── users/          # Users state (partial)
```

---

## Key Design Decisions

### 1. Authentication Flow
- JWT tokens stored in localStorage
- Auth interceptor adds token to all requests
- Token contains user ID and role claims
- No refresh token implementation

### 2. Data Storage
- JSON files used instead of database
- File locking for concurrent access
- Each entity type has its own file
- No transaction support

### 3. State Management
- NgRx for global application state
- Component state for UI-only concerns
- Effects handle side effects
- Entity adapter for normalized state

### 4. API Design
- RESTful conventions
- DTOs for all requests/responses
- Consistent error response format
- Pagination support built-in

---

## Key Files to Reference

### Authentication
- **Backend**: `src/VBTasks.API/Controllers/AuthController.cs`
- **Frontend**: `src/app/features/auth/login/login.component.ts`
- **State**: `src/app/state/auth/auth.effects.ts`
- **Service**: `src/app/core/services/auth.service.ts`

### Task Management
- **Backend**: `src/VBTasks.API/Controllers/TasksController.cs`
- **Service**: `src/VBTasks.Application/Services/TaskService.cs`
- **Repository**: `src/VBTasks.Infrastructure/Repositories/TaskRepository.cs`
- **Frontend**: `src/app/features/tasks/task-list/task-list.component.ts` (placeholder)

### Data Models
- **Backend DTOs**: `src/VBTasks.Application/DTOs/TaskDto.cs`
- **Frontend Models**: `src/app/core/models/task.model.ts`
- **Domain Entities**: `src/VBTasks.Domain/Entities/TaskItem.cs`

### State Management
- **Store Config**: `src/app/state/app.state.ts`
- **Auth State**: `src/app/state/auth/`
- **App Config**: `src/app/app.config.ts`

---

## Current Implementation Status

### ✅ Completed
- Full authentication system
- Dashboard with statistics
- Shared UI components
- Basic routing structure
- API endpoints for all entities
- JSON file storage

### 🚧 Partially Implemented
- Task list component (placeholder only)
- Task state management (structure only)
- User/Group features (backend only)

### ❌ Not Implemented
- Task CRUD UI
- Task filtering/search
- Task assignment UI
- Real-time updates
- File uploads
- Unit tests

---

## Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Angular   │     │   NgRx      │     │  PrimeNG    │
│    App      │────▶│   Store     │     │ Components  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │
       │ HTTP               │ Effects
       ▼                    ▼
┌─────────────┐     ┌─────────────┐
│  .NET API   │     │   Auth      │
│ Controllers │────▶│ Middleware  │
└─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Application │────▶│   Domain    │
│  Services   │     │  Entities   │
└─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│Infrastructure│───▶│ JSON Files  │
│ Repositories│     │  Storage    │
└─────────────┘     └─────────────┘
```

---

## Common Pitfalls & Limitations

### Security Considerations
1. JWT stored in localStorage (XSS vulnerable)
2. No rate limiting implemented
3. File paths not fully sanitized
4. CORS allows localhost only

### Performance Issues
1. No caching mechanism
2. Full file read for every operation
3. No pagination on file system
4. Large JSON files will be slow

### Scalability Limits
1. File locking bottleneck
2. No horizontal scaling possible
3. Search is O(n) complexity
4. No real-time capabilities

### Missing Features
1. No audit logging
2. No soft deletes
3. No file attachments
4. No email notifications
5. No password reset
6. No user registration UI

---

## Testing Credentials

### Users
- **Admin**: admin@vbtasks.com / 123456
- **Developer**: john.doe@vbtasks.com / 123456
- **Developer**: jane.smith@vbtasks.com / 123456

### Sample Data
- 3 tasks in various states
- 2 groups with members
- Tasks have assignments

---

## Interview Tips

### When Discussing Architecture
- Focus on trade-offs made
- Ask about scaling solutions
- Discuss migration paths

### When Reviewing Code
- Look for patterns used
- Check error handling
- Assess type safety

### Common Topics to Explore
- Why JSON files vs database?
- How to handle concurrent updates?
- Security improvements needed?
- Performance optimization ideas?
- Testing strategy?

---

## Red Flags in Answers

1. **Over-engineering**: Suggesting complex solutions for simple problems
2. **Security ignorance**: Not mentioning XSS, CSRF, or injection attacks
3. **No trade-off thinking**: Only seeing one solution
4. **Lack of practical experience**: Theoretical answers only
5. **Poor communication**: Can't explain technical decisions clearly

---

## Quick Command Reference

### Backend
```bash
cd src/VBTasks.API
dotnet run              # Start API on http://localhost:5038
```

### Frontend
```bash
cd vb-tasks-ui
npm install            # Install dependencies
npm start              # Start dev server on http://localhost:4200
npm run build          # Build for production
```

### Data Location
- Users: `src/VBTasks.API/Data/users.json`
- Tasks: `src/VBTasks.API/Data/tasks.json`
- Groups: `src/VBTasks.API/Data/groups.json`
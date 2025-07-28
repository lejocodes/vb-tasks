# VB-Tasks - Task Management System

## Overview

VB-Tasks is a task management application built with Angular 20 and .NET 9. This project demonstrates modern web development practices including clean architecture, state management, and component-based UI design.

## Technology Stack

### Backend
- **.NET 9** - Web API with Clean Architecture
- **JWT Authentication** - Secure token-based auth
- **JSON Storage** - File-based data persistence
- **BCrypt** - Password hashing

### Frontend
- **Angular 20** - Standalone components
- **NgRx** - State management
- **PrimeNG** - UI component library
- **RxJS** - Reactive programming
- **TypeScript** - Type safety

## Prerequisites

- Node.js (v18 or higher)
- .NET 9 SDK
- Git
- A code editor (VS Code recommended)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vb-tasks
```

### 2. Backend Setup

Navigate to the API project:
```bash
cd src/VBTasks.API
```

Restore dependencies and run:
```bash
dotnet restore
dotnet run
```

The API will start at `http://localhost:5038`

You can view the API documentation at `http://localhost:5038/swagger`

### 3. Frontend Setup

In a new terminal, navigate to the Angular project:
```bash
cd vb-tasks-ui
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:4200`

## Test Credentials

Use these credentials to log in:

| Email | Password | Role |
|-------|----------|------|
| admin@vbtasks.com | 123456 | Admin |
| john.doe@vbtasks.com | 123456 | Developer |
| jane.smith@vbtasks.com | 123456 | Developer |

## Project Structure

### Backend (`/src`)
```
VBTasks.Domain/       - Core business entities and interfaces
VBTasks.Application/  - Business logic and DTOs  
VBTasks.Infrastructure/ - Data access and external services
VBTasks.API/         - Web API controllers and middleware
```

### Frontend (`/vb-tasks-ui`)
```
src/app/
  core/       - Services, models, guards, interceptors
  features/   - Feature modules (auth, dashboard, tasks)
  shared/     - Reusable components
  state/      - NgRx store configuration
```

## Available Scripts

### Backend
- `dotnet build` - Build the solution
- `dotnet test` - Run tests
- `dotnet run` - Start the API

### Frontend
- `npm start` - Start dev server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint the code

## Features Implemented

### Authentication
- JWT-based authentication
- Login/logout functionality
- Protected routes
- Token interceptor

### Dashboard
- Task statistics
- My tasks view
- Quick navigation

### UI Components
- Status badges
- Priority indicators
- Loading spinners
- Empty states

## Technical Interview Instructions

During your technical interview, you'll be asked to:

1. **Review the codebase** - Familiarize yourself with the project structure
2. **Answer conceptual questions** - Demonstrate your understanding of the architecture and implementation
3. **Discuss improvements** - Share your thoughts on what could be enhanced
4. **Solve hypothetical problems** - Work through scenarios with the interviewer

### Areas to Focus On

1. **Architecture**
   - Understand the Onion Architecture pattern
   - Know why each layer exists
   - Be able to trace a request through the system

2. **Angular Concepts**
   - Standalone components
   - Dependency injection
   - RxJS and observables
   - NgRx state management

3. **Security**
   - JWT authentication flow
   - Where tokens are stored
   - Potential vulnerabilities

4. **Data Flow**
   - How data moves from UI to database
   - State management patterns
   - Error handling

### Tips for Success

- Take time to explore the codebase before the interview
- Run the application and try different features
- Think about trade-offs in the design decisions
- Be prepared to discuss what you would do differently
- Ask clarifying questions during the interview

## Common Issues

### Backend won't start
- Ensure you have .NET 9 SDK installed
- Check if port 5038 is available
- Run from the `src/VBTasks.API` directory

### Frontend won't start
- Ensure Node.js v18+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 4200 is available

### Can't log in
- Ensure the backend is running
- Check the browser console for errors
- Verify you're using the correct credentials

## Architecture Overview

### Backend Architecture
The backend follows Clean Architecture principles:
- **Domain Layer**: Contains business entities and interfaces (no dependencies)
- **Application Layer**: Contains business logic and use cases
- **Infrastructure Layer**: Implements data access and external services
- **API Layer**: Handles HTTP requests and responses

### Frontend Architecture
The frontend uses a feature-based structure:
- **Core Module**: Singleton services and application-wide functionality
- **Feature Modules**: Self-contained features (auth, tasks, etc.)
- **Shared Module**: Reusable components and utilities
- **State Management**: Centralized state using NgRx

## Next Steps

1. Explore the codebase structure
2. Run the application locally
3. Try logging in with different users
4. Review the API endpoints in Swagger
5. Examine the state management flow
6. Think about potential improvements

Good luck with your interview!
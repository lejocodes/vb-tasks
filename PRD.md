# VB-Tasks Product Requirements Document (PRD)

## 1. Executive Summary

### 1.1 Purpose
VB-Tasks is a simplified task management system designed as a technical assessment tool for evaluating mid-senior developer candidates. The application demonstrates proficiency in Angular 20 and .NET 9 development with clean architecture principles.

### 1.2 Goals
- Create a functional CRUD application showcasing modern development practices
- Provide a realistic codebase for candidate evaluation
- Test full-stack development skills including state management, API design, and UI implementation

### 1.3 Success Criteria
- Complete CRUD operations for task management
- Clean separation of concerns using Onion Architecture
- Proper state management with NgRx
- JSON-based data persistence
- Basic authentication system

## 2. Technical Requirements

### 2.1 Technology Stack
- **Frontend**: Angular 20 with standalone components, Signals, RxJS, NgRx
- **UI Component Library**: PrimeNG for rich UI components
- **Backend**: .NET 9 Web API with Onion Architecture
- **Storage**: JSON files (no database required)
- **Authentication**: JWT tokens
- **Build Tools**: Angular CLI, .NET CLI

### 2.2 Development Constraints
- No external database (use JSON files)
- No real-time features (no SignalR)
- Minimal external dependencies
- Focus on code quality over feature richness

## 3. Functional Requirements

### 3.1 Core Entities

#### Task
- **Fields**: Id, Title, Description, Status, Priority, DueDate, CreatedBy, CreatedAt, UpdatedAt, Assignments, Tags
- **Status Values**: New, InProgress, Review, Blocked, Completed
- **Priority Values**: Low, Medium, High, Critical

#### User
- **Fields**: Id, Email, Name, PasswordHash, Role
- **Roles**: Admin, Developer, Guest

#### Group
- **Fields**: Id, Name, Description, Members

### 3.2 Features

#### Authentication (P0)
- User login with email/password
- JWT token generation
- Protected routes
- Logout functionality

#### Task Management (P0)
- Create new task
- View task list
- View task details
- Update task
- Delete task
- Filter tasks by status, assignee, priority
- Search tasks by title/description

#### User Management (P1)
- View user list
- Basic user profile

#### Group Management (P1)
- View group list
- View group members

#### Assignment System (P0)
- Assign task to user
- Assign task to group
- View my tasks
- View group tasks

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load time < 3 seconds
- API response time < 500ms
- Support 100+ tasks without degradation

### 4.2 Security
- Secure password storage (bcrypt)
- JWT token expiration
- Input validation
- CORS configuration

### 4.3 Code Quality
- Clean Architecture principles
- SOLID principles
- Consistent coding style
- Meaningful variable/function names
- No code comments unless absolutely necessary

### 4.4 User Experience
- Responsive design (desktop focus)
- Clear error messages
- Loading indicators
- Intuitive navigation

## 5. System Architecture

### 5.1 Backend Structure
```
VBTasks.Domain/
├── Entities/
├── Enums/
└── Interfaces/

VBTasks.Application/
├── DTOs/
├── Services/
├── Validators/
└── Interfaces/

VBTasks.Infrastructure/
├── Repositories/
├── Services/
└── Data/

VBTasks.API/
├── Controllers/
├── Middleware/
└── Program.cs
```

### 5.2 Frontend Structure
```
src/app/
├── core/
├── features/
├── shared/
├── state/
└── app.component.ts
```

### 5.3 Data Flow
1. User interacts with Angular UI
2. UI dispatches NgRx action
3. Effect calls Angular service
4. Service makes HTTP request to .NET API
5. API controller validates request
6. Application service processes business logic
7. Repository reads/writes JSON file
8. Response flows back through layers

## 6. API Specification

### 6.1 Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `POST /api/tasks/{id}/assign` - Assign task

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user

#### Groups
- `GET /api/groups` - Get all groups

### 6.2 Request/Response Format
- Content-Type: application/json
- Authentication: Bearer token in Authorization header
- Error responses follow consistent format

## 7. UI/UX Requirements

### 7.1 Pages

#### Login Page
- Email/password fields
- Login button
- Error message display
- Link to register (if needed)

#### Dashboard Page
- Summary statistics (tasks by status)
- My tasks section
- Recent activity
- Quick create task button

#### Task List Page
- Task cards/table view
- Filter controls (status, assignee, priority)
- Search box
- Create task button
- Sort options (date, priority, status)
- Bulk selection for operations

#### Task Form Page (Create/Edit)
- Title field (required)
- Description textarea
- Status dropdown
- Priority dropdown
- Due date picker
- Assignee selector (user/group)
- Tags input
- Save/Cancel buttons
- Delete button (edit mode only)

#### Task Detail Page
- All task information display
- Edit button
- Delete button
- Comments section
- Assignment history
- Back to list navigation

### 7.2 Components

#### Shared Components (using PrimeNG)
- Status badge (using p-tag with severity)
- Priority indicator (using p-badge with icons)
- User selector (using p-dropdown with filter)
- Group selector (using p-dropdown with filter)
- Date picker (using p-calendar)
- Loading spinner (using p-progressSpinner)
- Confirmation dialog (using p-confirmDialog)
- Toast notifications (using p-toast)
- Empty state component (custom with PrimeNG styling)
- Error state component (custom with PrimeNG styling)
- Data tables (using p-table with sorting, filtering, pagination)
- Form controls (using PrimeNG form components)

## 8. Implementation Plan

### Phase 1: Project Setup (Day 1) ✅
1. Create .NET solution structure ✅
2. Create Angular project ✅
3. Configure build scripts ✅
4. Set up version control

### Phase 2: Backend Core (Days 2-3) ✅
1. Define domain entities ✅
2. Create DTOs and mappings ✅
3. Implement JSON repositories ✅
4. Build service layer ✅
5. Create API controllers ✅
6. Add authentication ✅

### Phase 3: Frontend Core (Days 4-5) [IN PROGRESS]
1. Set up NgRx store [IN PROGRESS]
2. Create models and services
3. Implement authentication flow
4. Build routing structure

### Phase 4: Feature Implementation (Days 6-8)
1. Task CRUD operations
2. User and group features
3. Assignment functionality
4. Filtering and search

### Phase 5: Testing & Polish (Days 9-10)
1. Unit tests (critical paths)
2. Integration tests (API)
3. Error handling
4. UI polish
5. Performance optimization

### Phase 6: Assessment Preparation (Day 11)
1. Create base branch with working app
2. Create fix/build-errors branch
3. Create fix/runtime-bugs branch
4. Create feature branch template
5. Write assessment instructions

## 9. Testing Requirements

### 9.1 Unit Tests
- Service layer methods
- Repository operations
- NgRx reducers
- Component logic

### 9.2 Integration Tests
- API endpoint testing
- Authentication flow
- JSON file operations

### 9.3 Manual Testing
- CRUD operations
- Filter combinations
- Error scenarios
- Cross-browser testing

## 10. Deliverables

### 10.1 Code Deliverables
- Complete source code
- README with setup instructions
- Sample JSON data files
- Assessment branch scenarios

### 10.2 Documentation
- API documentation
- Architecture overview
- Assessment evaluation rubric
- Known issues/limitations

## 11. Success Metrics

### 11.1 Technical Metrics
- All CRUD operations functional
- Clean architecture maintained
- No critical bugs
- Build succeeds without warnings

### 11.2 Assessment Metrics
- Clear separation of skill levels
- Reasonable time to complete
- Multiple evaluation points
- Realistic scenarios

## 12. Progress Tracking

### Completed ✅
#### Backend (.NET 9)
- ✅ Solution structure with 4 projects (Domain, Application, Infrastructure, API)
- ✅ Domain layer:
  - Entities: TaskItem, User, Group with proper value objects
  - Interfaces: IRepository, ITaskRepository, IUserRepository, IGroupRepository
  - Enums: TaskStatus, Priority, AssigneeType
- ✅ Application layer:
  - DTOs: TaskDto, UserDto, GroupDto, LoginDto, RegisterDto, etc.
  - Services: TaskService, UserService, GroupService, AuthService
  - Interfaces for all services
- ✅ Infrastructure layer:
  - JSON file storage implementation
  - Generic JsonRepository base class
  - Specific repositories for Task, User, and Group
- ✅ API layer:
  - RESTful controllers with JWT authorization
  - Error handling middleware
  - CORS configuration for Angular app
  - Swagger/OpenAPI documentation
  - JWT authentication with secure token generation
- ✅ Sample data files (users.json, tasks.json, groups.json)

#### Frontend (Angular 20)
- ✅ Angular project created with:
  - Routing enabled
  - SCSS styling
  - Standalone components configuration
- ✅ NgRx packages installed (@ngrx/store, effects, entity, store-devtools)
- ✅ Project structure created (core, features, shared, state folders)
- ✅ Environment configuration for API URL
- ✅ TypeScript models matching backend DTOs
- ✅ HTTP services (Auth, Task, User, Group)
- ✅ HTTP interceptors (Auth, Error)
- ✅ AuthGuard for protected routes
- ✅ NgRx store architecture:
  - Auth state with actions, reducers, effects, selectors
  - Basic state structure for tasks, users, groups
- ✅ Authentication feature:
  - Login page with form validation
  - NgRx integration for auth flow
- ✅ Basic routing with lazy loading
- ✅ Layout component with navigation

### In Progress 🚧
- Implementing task management features with PrimeNG components

### Completed Recently 🎉
- ✅ PrimeNG installed and configured with Lara theme
- ✅ Shared UI components created:
  - Status badge component (using p-tag)
  - Priority badge component (using p-tag with icons)
  - Loading spinner component (using p-progressSpinner)
  - Empty state component
- ✅ Dashboard implemented with:
  - Task statistics cards
  - My tasks table with PrimeNG p-table
  - Navigation to task features
- ✅ Login page updated with PrimeNG components
- ✅ Layout/navigation updated with PrimeNG menubar

### Pending ⏳
#### Frontend Development
- Task Management Features:
  - Task list with p-table (sorting, filtering, pagination)
  - Task create/edit forms with PrimeNG form components
  - Task detail view
  - Bulk operations
- Dashboard Implementation:
  - Task statistics with charts
  - My tasks widget
  - Activity feed
- User and Group Features:
  - User list with p-table
  - Group list with p-table
  - User/Group selectors using p-dropdown
- UI Polish:
  - Toast notifications for user feedback
  - Loading states with p-progressSpinner
  - Confirmation dialogs for destructive actions
  - Responsive design improvements

#### Testing & Documentation
- Unit tests for critical paths
- API integration tests
- README with setup instructions
- API documentation

#### Assessment Preparation
- Create working main branch
- Branch 1: Build errors (TypeScript/C# compilation issues)
- Branch 2: Runtime bugs (state mutations, memory leaks)
- Branch 3: Feature implementation task
- Evaluation rubric and time guidelines
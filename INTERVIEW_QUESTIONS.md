# VB-Tasks Technical Interview Questions (Mid-Senior Level)

## Overview
These questions are designed for mid to senior-level developers (2+ years experience). Questions assess deep understanding of architecture, design patterns, and system thinking.

**Difficulty Levels:**
- 🟡 Mid-level (2-5 years) - Expects solid understanding and practical experience
- 🔴 Senior (5+ years) - Expects architectural thinking and leadership

---

## 1. Architecture & Design Patterns

### Question 1.1 🟡
**Q:** Looking at the backend structure, can you explain why we chose Onion Architecture for this project? What are the main benefits?

**Looking for:**
- Understanding of separation of concerns
- Domain-centric design
- Dependency inversion principle
- Testability benefits
- Independence from infrastructure

**Follow-up:** How would you add a SQL database to this architecture without breaking the design principles?

### Question 1.2 🟡
**Q:** Looking at `src/VBTasks.Infrastructure/Repositories/JsonRepository.cs`, explain how you would extend this generic repository to support optimistic concurrency control.

**Looking for:**
- Understanding of concurrency issues
- Version field/ETag implementation
- Conflict detection strategies
- Performance implications
- User experience considerations

**Follow-up:** How would you handle conflicts in a user-friendly way?

### Question 1.3 🔴
**Q:** Currently, we're using JSON files for storage. What are the trade-offs of this approach, and what challenges might we face as the application scales?

**Looking for:**
- Concurrency issues (file locking)
- Performance considerations
- ACID properties discussion
- Search/query limitations
- Migration path to a real database

### Question 1.4 🟡
**Q:** Explain the flow of a request from the Angular frontend to updating a task in the JSON file. Which layers does it pass through?

**Looking for:**
- HTTP request → Controller → Service → Repository → File system
- DTO transformations
- Validation points
- Error handling considerations

---

## 2. Angular & Frontend Architecture

### Question 2.1 🟡
**Q:** The application uses standalone components in Angular 20. How would you structure a large-scale application with 50+ components using this approach? What are the trade-offs versus modules?

**Looking for:**
- Component organization strategies
- Dependency management at scale
- Performance considerations
- Bundle size optimization
- Team collaboration patterns
- Migration strategies from modules

### Question 2.2 🟡
**Q:** Look at `src/app/features/auth/login/login.component.ts`. How is form validation being handled, and what would you do to improve the user experience?

**Looking for:**
- Reactive forms understanding
- Built-in validators
- Custom validators possibility
- Real-time validation feedback
- Accessibility considerations

### Question 2.3 🔴
**Q:** The application uses PrimeNG for UI components. What are the trade-offs of using a UI library versus building custom components?

**Looking for:**
- Development speed vs customization
- Bundle size considerations
- Consistency benefits
- Upgrade/maintenance challenges
- Accessibility out-of-the-box
- Theme customization options

### Question 2.4 🟡
**Q:** In `src/app/core/interceptors/auth.interceptor.ts`, explain how the auth interceptor works and what security considerations we should keep in mind.

**Looking for:**
- HTTP interceptor pattern
- Token attachment to requests
- Security headers
- Token storage concerns (localStorage vs memory)
- XSS prevention

### Question 2.5 🔴
**Q:** How would you create a component library from the shared components in this project that could be used across multiple applications? Consider versioning, theming, and documentation.

**Looking for:**
- NPM package structure
- Build process for libraries
- Semantic versioning strategy
- Theme customization approach
- Documentation (Storybook/similar)
- Breaking change management
- Tree-shaking support

---

## 3. State Management (NgRx)

### Question 3.1 🟡
**Q:** Why did we choose NgRx for state management instead of just using Angular services? What problems does it solve?

**Looking for:**
- Predictable state updates
- Time-travel debugging
- Separation of concerns
- Side effects management
- Performance (OnPush strategy)
- Team scalability

### Question 3.2 🔴
**Q:** In `src/app/state/auth/auth.effects.ts`, explain how the login effect works. What would happen if the API call fails?

**Looking for:**
- Effects pattern understanding
- RxJS operators (exhaustMap vs switchMap)
- Error handling with catchError
- Action dispatching flow
- Side effects isolation

### Question 3.3 🟡
**Q:** Look at the current state structure in `src/app/state/app.state.ts`. How would you handle optimistic updates for task creation?

**Looking for:**
- Optimistic UI pattern
- Temporary IDs
- Rollback on failure
- User experience benefits
- Potential race conditions

### Question 3.4 🟡
**Q:** In a large application, how would you prevent the NgRx store from becoming a "god object"? What patterns would you use to keep it maintainable?

**Looking for:**
- Feature state isolation
- Lazy loading of state
- State normalization
- Selector composition
- Facade pattern usage
- Testing strategies
- Performance monitoring

---

## 4. Backend & API Design

### Question 4.1 🟡
**Q:** In `src/VBTasks.API/Controllers/TasksController.cs`, all endpoints require authorization. How is this implemented and what happens to unauthorized requests?

**Looking for:**
- [Authorize] attribute understanding
- JWT Bearer authentication
- 401 vs 403 responses
- Claims-based authorization
- Middleware pipeline

### Question 4.2 🔴
**Q:** Looking at `src/VBTasks.Application/DTOs/TaskDto.cs`, why do we use DTOs instead of exposing domain entities directly?

**Looking for:**
- API contract stability
- Security (hiding internal fields)
- Validation at boundaries
- Performance (only needed data)
- Versioning considerations

### Question 4.3 🔴
**Q:** Design a migration strategy from the current JSON file storage to a distributed database system (e.g., PostgreSQL with read replicas). How would you ensure zero downtime?

**Looking for:**
- Phased migration approach
- Data consistency strategies
- Dual-write pattern
- Feature flags for cutover
- Rollback procedures
- Performance testing
- Monitoring and alerting

### Question 4.4 🔴
**Q:** How would you implement optimistic concurrency control for task updates in this system?

**Looking for:**
- Version fields/ETags
- Conflict detection
- Client retry strategies
- User experience considerations
- Distributed systems concepts

### Question 4.5 🟡
**Q:** What security vulnerabilities should we be concerned about in the current implementation?

**Looking for:**
- JWT storage in localStorage (XSS)
- CORS configuration
- Input validation
- SQL injection (even with JSON)
- Path traversal in file operations
- Rate limiting absence

---

## 5. Code Quality & Best Practices

### Question 5.1 🟡
**Q:** How would you implement end-to-end type safety from the database to the UI in this application? What tools and patterns would you use?

**Looking for:**
- Code generation from OpenAPI
- Shared type definitions
- Runtime validation (Zod/similar)
- Type guards implementation
- API contract testing
- Build-time type checking

### Question 5.2 🟡
**Q:** How would you add unit tests for `src/app/core/services/task.service.ts`? What would you test?

**Looking for:**
- HTTP testing module
- Mock HTTP responses
- Error scenarios
- Observable testing
- Parameter validation

### Question 5.3 🔴
**Q:** What's missing from the current error handling implementation that you would add for a production system?

**Looking for:**
- Centralized error logging
- User-friendly error messages
- Retry mechanisms
- Circuit breakers
- Correlation IDs
- Monitoring/alerting

### Question 5.4 🟡
**Q:** The application doesn't have any comments in the code. Is this good or bad practice? When should you add comments?

**Looking for:**
- Self-documenting code preference
- Comments for "why" not "what"
- API documentation needs
- Complex algorithm explanation
- Business rule documentation

---

## 6. Problem-Solving Scenarios

### Question 6.1 🟡
**Q:** How would you implement a comment system for tasks? Walk through your design decisions.

**Looking for:**
- Data model changes
- API endpoints design
- State management updates
- UI/UX considerations
- Real-time updates discussion
- Performance implications

### Question 6.2 🔴
**Q:** Design a notification system that alerts users when tasks assigned to them are updated. Consider both technical and UX aspects.

**Looking for:**
- Push notifications vs polling
- SignalR/WebSockets consideration
- Notification preferences
- Batching/throttling
- Offline handling
- Storage strategy

### Question 6.3 🟡
**Q:** How would you implement task templates (predefined tasks that users can quickly create)?

**Looking for:**
- Data model for templates
- UI for template management
- Sharing templates between users
- Versioning templates
- Category/tagging system

### Question 6.4 🔴
**Q:** If we needed to support 10,000+ tasks with real-time collaboration, what changes would you make to the architecture?

**Looking for:**
- Database migration (PostgreSQL/MongoDB)
- Caching strategy (Redis)
- Event sourcing/CQRS consideration
- WebSocket implementation
- Horizontal scaling
- Search infrastructure (Elasticsearch)

---

## 7. Debugging & Troubleshooting

### Question 7.1 🟡
**Q:** You're receiving reports of intermittent 401 errors in production. Walk me through your systematic debugging approach, including what monitoring you'd implement.

**Looking for:**
- Token expiration edge cases
- Clock skew issues
- Race conditions in token refresh
- Distributed tracing setup
- Error aggregation tools
- User session analytics
- Synthetic monitoring

### Question 7.2 🟡
**Q:** The application is running slowly when displaying the task list. What tools and techniques would you use to identify the performance bottleneck?

**Looking for:**
- Chrome DevTools Performance tab
- Angular DevTools
- Network waterfall analysis
- Bundle size analysis
- Change detection strategy
- API response time measurement

---

## Evaluation Tips for Interviewers

1. **Don't look for memorized answers** - Look for understanding of concepts
2. **Ask follow-up questions** - Dig deeper into their reasoning
3. **Present variations** - "What if we needed to support 1 million users?"
4. **Assess communication** - Can they explain technical concepts clearly?
5. **Look for trade-off thinking** - There's rarely one right answer
6. **Check for practical experience** - Have they faced similar challenges?

## Time Guidelines
- Junior role: 45-60 minutes (8-10 questions)
- Mid-level role: 60-75 minutes (10-12 questions)
- Senior role: 75-90 minutes (12-15 questions)

Remember to leave time for candidate questions at the end!
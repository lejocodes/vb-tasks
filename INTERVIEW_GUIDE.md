# VB-Tasks Interview Guide

This comprehensive guide consolidates all interview-related documentation for evaluating candidates using the VB-Tasks assessment.

## Table of Contents
1. [Overview](#overview)
2. [Interview Questions](#interview-questions)
3. [Evaluation Rubric](#evaluation-rubric)
4. [Interviewer Cheatsheet](#interviewer-cheatsheet)
5. [Sample Interview Flows](#sample-interview-flows)

---

## Overview

VB-Tasks is a task management application designed to assess mid-senior level developers across multiple competencies:
- Angular 20 and .NET 9 proficiency
- Clean architecture understanding
- Problem-solving abilities
- Code quality and best practices
- System design thinking

The assessment consists of:
1. Bug fixing exercises (30-45 minutes)
2. Feature implementation (45-60 minutes)
3. Architecture discussion (15-30 minutes)

---

## Interview Questions

### Technical Assessment Questions

#### 1. Bug Fixing (Branch: fix/runtime-bugs)
**Time: 30-45 minutes**

Present the candidate with the buggy branch and ask them to:
- Identify and fix runtime errors
- Debug state management issues
- Fix API integration problems
- Resolve UI rendering issues

**Key Evaluation Points:**
- Debugging methodology
- Use of browser dev tools
- Understanding of Angular lifecycle
- API troubleshooting skills

#### 2. Feature Implementation
**Time: 45-60 minutes**

Choose one of these features based on candidate level:

**Mid-Level: Task Comments Feature**
- Add a comments section to task detail page
- Implement comment CRUD operations
- Update the API and state management
- Style with PrimeNG components

**Senior-Level: Bulk Operations**
- Add checkbox selection to task list
- Implement bulk status update
- Add bulk delete with confirmation
- Handle errors gracefully

**Expert-Level: Real-time Notifications**
- Implement SignalR hub for real-time updates
- Show toast notifications for task changes
- Update UI automatically when tasks change
- Handle connection management

#### 3. Architecture & Design Questions

**State Management:**
- "We're using Signals instead of NgRx. What are the trade-offs?"
- "How would you optimize the state management for 10,000+ tasks?"
- "When would you recommend using NgRx over Signals?"

**API Design:**
- "How would you implement pagination in the current architecture?"
- "What's your approach to handling API versioning?"
- "How would you add caching to improve performance?"

**Security:**
- "What security vulnerabilities do you see in the current implementation?"
- "How would you implement proper authentication?"
- "What's your approach to handling sensitive data?"

**Testing:**
- "What would be your testing strategy for this application?"
- "How would you test the state management layer?"
- "What's your approach to E2E testing?"

### Code Review Questions

Present a code snippet and ask for improvements:

```typescript
// Example: Inefficient filtering
getTasks() {
  return this.http.get<Task[]>('/api/tasks').pipe(
    map(tasks => tasks.filter(t => t.status !== 'Completed')),
    map(tasks => tasks.filter(t => t.priority === 'High')),
    map(tasks => tasks.sort((a, b) => a.dueDate - b.dueDate))
  );
}
```

Ask candidate to:
- Identify performance issues
- Suggest improvements
- Discuss alternative approaches

### Behavioral Questions

1. "Tell me about a time you had to refactor a large codebase."
2. "How do you approach learning new technologies?"
3. "Describe a challenging bug you've fixed recently."
4. "How do you balance code quality with delivery deadlines?"

---

## Evaluation Rubric

### Scoring System
Rate each area on a scale of 1-5:
- 5: Exceptional (Expert level)
- 4: Strong (Senior level)
- 3: Competent (Mid-senior level)
- 2: Developing (Junior-mid level)
- 1: Needs improvement (Junior level)

### Technical Skills Assessment

#### Angular Proficiency (25%)
- **5**: Masters signals, advanced RxJS, performance optimization
- **4**: Strong component architecture, good state management
- **3**: Solid understanding of basics, can implement features
- **2**: Knows fundamentals but struggles with complex scenarios
- **1**: Limited Angular experience

#### .NET/C# Proficiency (25%)
- **5**: Expert in clean architecture, advanced patterns
- **4**: Strong API design, good use of SOLID principles
- **3**: Can implement CRUD operations, basic patterns
- **2**: Understands basics but limited experience
- **1**: Minimal .NET knowledge

#### Problem Solving (20%)
- **5**: Quickly identifies root causes, elegant solutions
- **4**: Good debugging skills, solid problem analysis
- **3**: Can solve problems with some guidance
- **2**: Struggles with complex issues
- **1**: Needs significant help

#### Code Quality (15%)
- **5**: Exceptional clean code, great naming, perfect structure
- **4**: Very readable code, good practices
- **3**: Generally clean, some minor issues
- **2**: Inconsistent quality, several issues
- **1**: Poor code organization

#### Communication (15%)
- **5**: Excellent technical communication, teaches concepts
- **4**: Clear explanations, good questions
- **3**: Communicates adequately
- **2**: Some communication challenges
- **1**: Significant communication issues

### Overall Recommendations
- **20-25 points**: Strong hire - Senior/Staff level
- **15-19 points**: Hire - Mid-senior level
- **12-14 points**: Consider - May need mentoring
- **Below 12**: Not recommended for senior positions

---

## Interviewer Cheatsheet

### Pre-Interview Setup
1. Ensure candidate has:
   - Node.js 18+
   - .NET 9 SDK
   - VS Code or preferred IDE
   - Git installed

2. Share the repository link 10 minutes before interview

3. Have these branches ready:
   - `main` - Working application
   - `fix/runtime-bugs` - Bug fixing exercise
   - `feature/starter` - Clean branch for new features

### Common Issues & Solutions

**Issue: Can't run the application**
- Check Node/npm versions
- Ensure `npm install` completed
- Verify .NET SDK version
- Check if ports 4200/5038 are free

**Issue: API not connecting**
- Ensure both frontend and backend are running
- Check proxy.conf.json configuration
- Verify CORS settings

**Issue: Build errors**
- Clear node_modules and reinstall
- Check for TypeScript version conflicts
- Ensure all required packages are installed

### Key Files to Review

**State Management:**
- `/src/app/core/services/*-state.service.ts`
- Signal-based state with computed values

**API Integration:**
- `/src/app/core/services/*.service.ts`
- HTTP service implementations

**Components:**
- `/src/app/features/tasks/`
- Task list, form, and detail components

**Backend:**
- `/src/VBTasks.API/Controllers/`
- `/src/VBTasks.Business/Services/`

### Time Management Tips
- 5 min: Introduction and setup
- 10 min: Code walkthrough
- 30-45 min: Bug fixing
- 45-60 min: Feature implementation
- 15 min: Architecture discussion
- 10 min: Questions and wrap-up

---

## Sample Interview Flows

### Flow 1: Mid-Level Developer (2 hours)

**0:00-0:10 - Introduction**
- Welcome and introductions
- Explain the assessment structure
- Ensure development environment is ready

**0:10-0:20 - Application Overview**
- Walk through the running application
- Explain the architecture briefly
- Show key features

**0:20-0:50 - Bug Fixing Exercise**
- Switch to `fix/runtime-bugs` branch
- Have candidate identify and fix:
  - Task list not loading (API endpoint issue)
  - Create task form validation not working
  - Filter state not persisting
- Observe debugging approach

**0:50-1:35 - Feature Implementation**
- Implement task comments feature:
  - Add Comment model and DTOs
  - Create comment service endpoints
  - Add UI to task detail page
  - Style with PrimeNG

**1:35-1:50 - Code Review**
- Review their implementation
- Discuss alternative approaches
- Ask about testing strategy

**1:50-2:00 - Q&A**
- Answer candidate questions
- Discuss their experience
- Next steps

### Flow 2: Senior Developer (2.5 hours)

**0:00-0:10 - Introduction**
- Brief introductions
- High-level architecture overview

**0:10-0:40 - Bug Fixing (Advanced)**
- More complex bugs including:
  - Memory leaks in subscriptions
  - Race conditions in state updates
  - Performance issues with large datasets

**0:40-1:40 - Feature Implementation**
- Implement bulk operations:
  - Selection state management
  - Bulk API endpoints
  - Progress indicators
  - Error handling and rollback

**1:40-2:00 - System Design**
- Discuss scaling to 100k users
- Database migration strategy
- Microservices considerations
- Performance optimization

**2:00-2:20 - Architecture Deep Dive**
- State management patterns
- Clean architecture principles
- Testing strategies
- CI/CD pipeline design

**2:20-2:30 - Cultural Fit**
- Team collaboration
- Mentoring experience
- Learning approach

### Flow 3: Quick Assessment (1 hour)

**0:00-0:05 - Quick Setup**
- Verify environment ready
- Quick application demo

**0:05-0:25 - Focused Bug Fix**
- Fix 2-3 specific bugs
- Evaluate debugging speed

**0:25-0:50 - Mini Feature**
- Implement task filtering
- Basic error handling
- Simple UI updates

**0:50-1:00 - Technical Discussion**
- Architecture understanding
- Best practices
- Quick Q&A

### Interview Red Flags
- Unable to debug basic issues
- No questions about requirements
- Ignores error handling
- Poor code organization
- Can't explain their decisions
- Dismissive of current architecture
- No testing considerations

### Green Flags
- Asks clarifying questions
- Considers edge cases
- Writes clean, readable code
- Good debugging methodology
- Thinks about performance
- Considers security implications
- Discusses testing approach
- Good communication skills

---

## Post-Interview Assessment

### Immediate Evaluation (within 30 minutes)
1. Complete the scoring rubric
2. Note specific examples of strengths/weaknesses
3. Document any concerns
4. Make initial recommendation

### Key Questions to Answer
1. Can this person work independently?
2. Will they raise the bar for the team?
3. Do they demonstrate growth potential?
4. Are there any skill gaps that concern you?
5. How well did they communicate?

### Writing the Assessment

**Strong Hire Example:**
"Candidate demonstrated excellent debugging skills, quickly identifying the root cause of the filter state issue by using Redux DevTools effectively. Implemented the comments feature with clean separation of concerns, proper error handling, and thoughtful UI/UX. 

During architecture discussion, showed deep understanding of trade-offs between different state management approaches and proposed pragmatic solutions for scaling. Communication was clear throughout, asking good clarifying questions.

Recommended for Senior Developer position."

**Not Recommended Example:**
"Candidate struggled with basic debugging, taking 40 minutes to identify a simple API endpoint issue. The feature implementation was incomplete, lacking error handling and proper state updates. 

Limited understanding of Angular signals and couldn't explain when to use different state management approaches. Would need significant mentoring to be effective in a senior role.

Not recommended for senior positions, could consider for mid-level with strong mentoring."

---

## Appendix: Technical Details

### Architecture Overview
- **Backend**: Onion Architecture with 3 layers
  - API Layer: Controllers, middleware
  - Business Layer: Services, DTOs, entities
  - Infrastructure Layer: Repositories, JSON storage

- **Frontend**: Feature-based structure
  - Core: Models, services, guards
  - Features: Lazy-loaded modules
  - Shared: Common components
  - State: Signal-based state management

### Key Technologies
- Angular 20 with standalone components
- .NET 9 Web API
- Signals for state management
- PrimeNG for UI components
- JSON file storage
- JWT authentication (removed - no auth required)

### Common Gotchas
1. The app uses signals, not NgRx (despite some old references)
2. No database - everything is JSON files
3. Authentication is not implemented (by design)
4. Some DTOs might be over-engineered for the current needs
5. The architecture is intentionally more complex than needed for assessment purposes

---

This guide should be used as a framework, adapting the interview flow based on the candidate's experience level and the specific role requirements.
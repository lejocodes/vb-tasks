# Sample Interview Flows for Different Roles

## Overview
These are tested interview flows optimized for different role types. Each flow is designed for a 75-90 minute interview with mid-senior candidates.

---

## Flow 1: Full-Stack Developer (Balanced)

### Time Allocation
- Introduction & Setup: 10 mins
- Architecture Overview: 15 mins
- Backend Deep Dive: 25 mins
- Frontend Deep Dive: 25 mins
- System Design: 10 mins
- Q&A: 5 mins

### Question Sequence

#### 1. Warm-up (10 mins)
```
"I see you've worked with both Angular and .NET. What stood out to you 
about this codebase compared to projects you've worked on?"
```

#### 2. Architecture (15 mins)
- **Q1.1**: *"Can you walk me through the backend architecture and explain why Onion Architecture was chosen?"*
- **Q1.4**: *"Trace a request from the UI to update a task through all the layers"*

#### 3. Backend Focus (25 mins)
Navigate to `src/VBTasks.API/Controllers/TasksController.cs`
- **Q4.1**: *"How is authorization implemented here? What would you add for production?"*

Navigate to `src/VBTasks.Infrastructure/Repositories/JsonRepository.cs`
- **Q1.2**: *"How would you add optimistic concurrency control to this repository?"*

Navigate to `src/VBTasks.Application/Services/TaskService.cs`
- **Q4.5**: *"What security vulnerabilities do you see in the current implementation?"*

#### 4. Frontend Focus (25 mins)
Navigate to `src/app/state/auth/auth.effects.ts`
- **Q3.2**: *"Walk through this authentication flow. What happens if the API fails?"*

Navigate to `src/app/features/dashboard/dashboard.component.ts`
- **Q7.2**: *"This component is slow with many tasks. How would you optimize it?"*

Navigate to `src/app/core/interceptors/auth.interceptor.ts`
- **Q2.4**: *"What security improvements would you make to token handling?"*

#### 5. System Design (10 mins)
- **Q6.4**: *"How would you architect this for 10,000+ concurrent users?"*

#### 6. Wrap-up (5 mins)
*"What would be your top 3 priorities if you joined the team tomorrow?"*

### Evaluation Focus
- Balance of frontend/backend knowledge
- Understanding of full request lifecycle
- Security awareness
- Scalability thinking

---

## Flow 2: Frontend Specialist

### Time Allocation
- Introduction & Setup: 10 mins
- Architecture Overview: 10 mins
- Frontend Deep Dive: 35 mins
- UI/UX Problem Solving: 20 mins
- Performance & Optimization: 10 mins
- Q&A: 5 mins

### Question Sequence

#### 1. Warm-up (10 mins)
```
"I noticed you have experience with [framework]. How does Angular's 
approach compare, based on what you've seen here?"
```

#### 2. Architecture Overview (10 mins)
- **Q2.1**: *"How would you structure a large-scale app with 50+ components using standalone components?"*

#### 3. State Management Deep Dive (20 mins)
Navigate to `src/app/state/`
- **Q3.1**: *"Why NgRx over simpler solutions? When is it overkill?"*
- **Q3.4**: *"How do you prevent the store from becoming a god object?"*

Navigate to `src/app/state/auth/auth.effects.ts`
- **Q3.3**: *"How would you implement optimistic updates for task creation?"*

#### 4. Component Architecture (15 mins)
Navigate to `src/app/shared/components/`
- **Q2.5**: *"How would you turn these into a reusable component library?"*

Navigate to `src/app/features/dashboard/dashboard.component.ts`
- **Q2.3**: *"What are the trade-offs of using PrimeNG vs custom components?"*

#### 5. Performance & Security (20 mins)
- **Q7.2**: *"Walk through optimizing the dashboard for 10k+ tasks"*
- **Q5.1**: *"How would you implement end-to-end type safety?"*
- **Q7.1**: *"Debug intermittent 401 errors in production"*

#### 6. UI/UX Problem (10 mins)
- **Q6.1**: *"Design a real-time commenting system for tasks"*

#### 7. Wrap-up (5 mins)
*"What modern Angular features would you introduce to this codebase?"*

### Evaluation Focus
- Deep Angular knowledge
- State management expertise
- Performance optimization skills
- Component design thinking
- Modern frontend practices

---

## Flow 3: Backend Specialist

### Time Allocation
- Introduction & Setup: 10 mins
- Architecture Overview: 15 mins
- Backend Deep Dive: 35 mins
- System Design: 20 mins
- DevOps & Security: 10 mins
- Q&A: 5 mins

### Question Sequence

#### 1. Warm-up (10 mins)
```
"What's your take on using JSON files for storage in this application? 
When does it make sense?"
```

#### 2. Architecture Deep Dive (15 mins)
- **Q1.1**: *"Explain the Onion Architecture benefits you see here"*
- **Q1.3**: *"What are the trade-offs of JSON storage at scale?"*

#### 3. API & Services (20 mins)
Navigate to `src/VBTasks.API/`
- **Q4.2**: *"Why use DTOs instead of domain entities in APIs?"*
- **Q4.4**: *"Implement optimistic concurrency for task updates"*

Navigate to `src/VBTasks.Infrastructure/`
- **Q4.3**: *"Design zero-downtime migration to PostgreSQL"*

#### 4. Security & Performance (15 mins)
- **Q4.5**: *"What security vulnerabilities need addressing?"*
- **Q5.3**: *"What's missing for production-ready error handling?"*

#### 5. System Design (20 mins)
- **Q6.2**: *"Design a notification system for task updates"*
- **Q6.4**: *"How would you handle 10,000+ concurrent users?"*

#### 6. DevOps Considerations (10 mins)
*"How would you containerize this app and set up CI/CD?"*

#### 7. Wrap-up (5 mins)
*"What patterns from your experience would improve this codebase?"*

### Evaluation Focus
- Deep .NET knowledge
- Database design skills
- API design expertise
- Security mindset
- DevOps awareness

---

## Flow 4: Tech Lead / Architect

### Time Allocation
- Introduction & Setup: 10 mins
- Architecture Review: 20 mins
- Technical Decision Making: 25 mins
- Team & Process: 15 mins
- Strategic Thinking: 15 mins
- Q&A: 5 mins

### Question Sequence

#### 1. Warm-up (10 mins)
```
"As a tech lead, what's your first impression of this codebase? 
What would you want to know about the team and requirements?"
```

#### 2. Architecture Analysis (20 mins)
- **Q1.1**: *"Critique the architecture. What would you change and why?"*
- **Q1.3**: *"When would you migrate from JSON to a database? How would you decide?"*
- **Q5.4**: *"The code has no comments. What's your philosophy on documentation?"*

#### 3. Technical Leadership (25 mins)
Navigate through various layers while discussing:
- *"How would you ensure consistency across a team of 6 developers?"*
- *"What technical debt do you see? How would you prioritize it?"*
- *"How would you handle the transition to microservices if needed?"*

#### 4. System Design & Strategy (15 mins)
- **Q6.4**: *"Present a 6-month roadmap to handle 100x growth"*
- **Q4.3**: *"Design the migration strategy with business continuity"*

#### 5. Team & Process (15 mins)
- *"How would you improve the development workflow?"*
- *"What metrics would you track for this application?"*
- *"How would you handle a junior developer struggling with NgRx?"*

#### 6. Wrap-up (5 mins)
*"What's one architectural decision here you'd defend, and one you'd change?"*

### Evaluation Focus
- Architectural thinking
- Technical decision making
- Leadership qualities
- Communication skills
- Strategic planning
- Mentorship approach

---

## General Tips for All Flows

### Adjusting Difficulty

**If candidate is struggling:**
- Provide more context: *"Let me show you the relevant file..."*
- Simplify questions: *"Let's just focus on the authentication part"*
- Move to their strength areas

**If candidate is excelling:**
- Add constraints: *"Now consider we have GDPR requirements"*
- Increase scale: *"What if we had 50 million tasks?"*
- Ask for multiple solutions: *"What are three different approaches?"*

### Time Management

**Running Over Time:**
- Skip UI/UX questions (usually least critical)
- Combine related questions
- Ask for brief answers: *"Give me the high-level approach"*

**Running Under Time:**
- Dive deeper into their strong areas
- Add scenario variations
- Ask about their past experiences

### Taking Notes

For each question, note:
1. **Understanding** - Did they grasp the question?
2. **Approach** - How did they think through it?
3. **Depth** - Surface level or deep insight?
4. **Communication** - Clear explanation?
5. **Red/Green Flags** - Specific examples

### Common Follow-ups

Always have these ready:
- *"What trade-offs are you considering?"*
- *"How would you test this?"*
- *"What could go wrong?"*
- *"How would you monitor this in production?"*
- *"What would you do differently?"*

---

## Post-Interview Scoring Guide

### Strong Performance Indicators
- References specific code without prompting
- Identifies issues and suggests fixes
- Considers multiple stakeholders
- Thinks about maintenance and scaling
- Asks clarifying questions

### Weak Performance Indicators
- Generic answers without specifics
- Only one solution to problems
- No consideration of trade-offs
- Can't explain their reasoning
- Defensive about current implementation

### Role-Specific Minimums

**Full-Stack**: Must show competence in both frontend and backend
**Frontend**: Must excel in component design and state management  
**Backend**: Must demonstrate API design and data layer expertise
**Tech Lead**: Must show architectural thinking and leadership

Remember: The goal is to have a technical discussion, not a quiz. The best interviews feel collaborative and leave both parties energized.
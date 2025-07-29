# VB-Tasks Interview Guide for Team Members

## Overview
This guide provides step-by-step instructions for conducting technical interviews using the VB-Tasks codebase. It's designed to ensure consistency across all interviewers and maximize the effectiveness of our assessment process.

---

## Pre-Interview Preparation (Day Before)

### 1. Send Candidate Materials
Email the following to the candidate 24 hours before the interview:
```
Subject: Technical Interview Preparation - VB-Tasks Project

Hi [Candidate Name],

For your upcoming technical interview, we'll be discussing a task management application. Please:

1. Clone the repository: [repository-url]
2. Review the README.md for setup instructions
3. Spend 30-60 minutes exploring the codebase
4. Run the application locally if possible
5. Come prepared to discuss the architecture and implementation

We'll be having a technical discussion about the code - no live coding required.

See you on [date/time]!
```

### 2. Interviewer Preparation
- [ ] Review candidate's resume and note areas to probe
- [ ] Select 8-10 questions from INTERVIEW_QUESTIONS.md
- [ ] Test your local environment (in case screen sharing fails)
- [ ] Review CODEBASE_OVERVIEW.md for quick facts
- [ ] Prepare your evaluation form

---

## Interview Structure (75-90 minutes)

### Phase 1: Introduction & Setup (5-10 mins)
```
"Hi [Name], thanks for joining. Today we'll be discussing the VB-Tasks codebase you reviewed. 
We'll walk through the code together and I'll ask questions about various aspects. 
Feel free to reference the code as we talk. Any questions before we begin?"
```

**Verify Setup:**
- Can they access the code?
- Did they run it locally? (not required but good to know)
- Any initial observations?

### Phase 2: Architecture Walkthrough (10-15 mins)

Start with high-level architecture:
```
"Let's start by discussing the overall architecture. Can you walk me through how this 
application is structured, starting from the backend?"
```

**Key Points to Cover:**
- Backend layer separation
- Frontend structure
- Data flow between layers
- State management approach

**Good Follow-ups:**
- "What do you think about this architecture choice?"
- "What are the trade-offs here?"
- "How would this scale?"

### Phase 3: Technical Deep Dive (40-50 mins)

#### A. Backend Focus (20-25 mins)
Navigate to specific files while asking questions:

1. **Start with Domain Layer**
   - Open `src/VBTasks.Domain/Entities/TaskItem.cs`
   - *"What patterns do you see in the domain layer?"*

2. **Move to Application Layer**
   - Open `src/VBTasks.Application/Services/TaskService.cs`
   - *"How does this service handle business logic?"*

3. **Examine Infrastructure**
   - Open `src/VBTasks.Infrastructure/Repositories/JsonRepository.cs`
   - *"What are the limitations of this approach?"*

4. **API Layer**
   - Open `src/VBTasks.API/Controllers/TasksController.cs`
   - *"How is security handled here?"*

#### B. Frontend Focus (20-25 mins)

1. **State Management**
   - Open `src/app/state/auth/auth.effects.ts`
   - *"Walk me through this authentication flow"*

2. **Component Architecture**
   - Open `src/app/features/dashboard/dashboard.component.ts`
   - *"How would you improve this component?"*

3. **Services & Interceptors**
   - Open `src/app/core/interceptors/auth.interceptor.ts`
   - *"What security concerns should we consider?"*

### Phase 4: Problem Solving (15-20 mins)

Present a scenario based on their strengths:

**For Full-Stack:**
"How would you implement real-time notifications when tasks are assigned?"

**For Frontend-Heavy:**
"How would you optimize the dashboard for 10,000+ tasks?"

**For Backend-Heavy:**
"How would you migrate from JSON files to PostgreSQL?"

### Phase 5: Candidate Questions (10-15 mins)
```
"We've covered a lot. What questions do you have about the codebase, 
our tech stack, or engineering practices?"
```

### Phase 6: Closing (5 mins)
```
"Thanks for the great discussion. We'll be in touch within [timeframe]. 
Is there anything else you'd like to add?"
```

---

## Scoring & Evaluation

### During the Interview
- Use the evaluation rubric (EVALUATION_RUBRIC.md)
- Take notes on specific examples
- Mark scores immediately after each section

### Key Behaviors to Note

**Positive Indicators:**
- References specific code while answering
- Identifies issues without prompting
- Suggests practical improvements
- Asks clarifying questions
- Admits knowledge gaps gracefully

**Red Flags:**
- Can't explain basic patterns
- Makes incorrect assumptions
- Dismissive of current implementation
- No questions about context/requirements
- Overengineers simple problems

### Post-Interview (Immediately After)

1. **Complete Evaluation Form**
   - Fill out all sections while fresh
   - Include specific examples
   - Calculate weighted score

2. **Write Summary**
   - 3-4 strengths
   - 2-3 areas of concern
   - Overall recommendation

3. **Debrief with Team**
   - Share scores and observations
   - Discuss any concerns
   - Align on decision

---

## Common Scenarios & How to Handle

### Candidate Hasn't Reviewed Code
```
"No problem, let's do a quick tour together. I'll share my screen..."
```
Then do a 10-minute walkthrough before starting questions.

### Candidate Struggles with Questions
- Provide hints: *"Look at line 25 in this file"*
- Simplify: *"Let's start with just the authentication part"*
- Move on: *"Let's try a different area"*

### Technical Difficulties
- Have backup plan (use CodeSandbox, GitHub web)
- Focus on conceptual questions
- Extend time if needed

### Candidate Over-Explains
```
"That's a great explanation. In the interest of time, 
let's move to the next topic..."
```

### Candidate Under-Explains
- Ask for specifics: *"Can you give me an example?"*
- Probe deeper: *"What makes you say that?"*
- Request clarification: *"Help me understand your thinking"*

---

## Question Selection Strategy

### For Mid-Level Candidates (2-5 years)
**Core Questions (Must Ask):**
1. Architecture walkthrough
2. State management flow
3. Security considerations
4. Performance optimization
5. Testing approach

**Choose 3-4 from:**
- API design patterns
- Component optimization
- Error handling
- Database migration
- Feature implementation

### For Senior Candidates (5+ years)
**Core Questions (Must Ask):**
1. Architecture decisions & trade-offs
2. Scaling considerations
3. Security vulnerabilities
4. Team collaboration patterns
5. Technical debt management

**Choose 4-5 from:**
- System design scenarios
- Performance architecture
- Microservices migration
- Real-time features
- DevOps considerations

---

## Time Management Tips

### Pace Guidelines
- **Too Fast**: Candidate gives one-line answers
  - Action: Ask for elaboration, examples
  
- **Too Slow**: Spending 10+ mins on one question
  - Action: Politely interrupt and guide to next topic
  
- **Just Right**: 5-7 minutes per major topic
  - Mix of explanation and discussion

### Buffer Time
- Build in 10-15 minutes buffer
- Use for deeper dives on strong areas
- Allow for technical issues

---

## Remote Interview Best Practices

### Technical Setup
- [ ] Test screen sharing beforehand
- [ ] Have backup communication method
- [ ] Close unnecessary applications
- [ ] Good lighting and audio

### Engagement Techniques
- Ask them to share screen when discussing code
- Use specific file/line references
- Take breaks every 30 minutes
- Maintain conversational tone

### Building Rapport
- Start with casual conversation
- Acknowledge good insights
- Be patient with technical issues
- Show genuine interest in their ideas

---

## Post-Interview Process

### Same Day
1. Complete evaluation form
2. Upload notes to ATS
3. Send thank you email to candidate

### Within 24 Hours
1. Team debrief meeting
2. Final decision
3. Feedback preparation

### Within 48 Hours
1. Candidate communication
2. Next steps planning

---

## Quick Reference Card

### Must-Have Files Open:
- `TasksController.cs` - API patterns
- `auth.effects.ts` - State management
- `JsonRepository.cs` - Data layer
- `dashboard.component.ts` - UI patterns

### Key Technical Facts:
- .NET 9 with JWT auth
- Angular 20 with NgRx
- JSON file storage
- No real-time features
- PrimeNG UI library

### Interview Flow:
1. Intro (5 min)
2. Architecture (15 min)
3. Backend (25 min)
4. Frontend (25 min)
5. Scenarios (15 min)
6. Q&A (10 min)
7. Close (5 min)

---

## Remember

The goal is to assess:
1. **Technical competency** - Do they understand the code?
2. **Problem-solving** - Can they think through challenges?
3. **Communication** - Can they explain complex topics?
4. **Collaboration** - Would they work well with the team?
5. **Growth mindset** - Are they eager to learn?

Focus on discussion, not interrogation. The best interviews feel like technical conversations between colleagues.
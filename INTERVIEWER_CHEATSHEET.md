# VB-Tasks Interviewer Cheat Sheet

## Quick Setup (5 mins before interview)
- [ ] Open INTERVIEW_QUESTIONS.md
- [ ] Open candidate's resume  
- [ ] Have evaluation form ready
- [ ] Test screen sharing
- [ ] Open key files:
  - `TasksController.cs`
  - `auth.effects.ts`
  - `JsonRepository.cs`
  - `dashboard.component.ts`

---

## Interview Flow (75-90 mins)
1. **Intro** (5 min) - Build rapport, explain format
2. **Architecture** (15 min) - Start high-level  
3. **Backend** (25 min) - API → Service → Repository
4. **Frontend** (25 min) - Components → State → Services
5. **Scenarios** (15 min) - Based on their strength
6. **Q&A** (10 min) - Their questions
7. **Close** (5 min) - Next steps

---

## Key Technical Facts

### Architecture
- **Backend**: Onion Architecture (.NET 9)
- **Frontend**: Standalone Components (Angular 20)
- **State**: NgRx with effects
- **Storage**: JSON files (no DB)
- **Auth**: JWT in localStorage
- **UI**: PrimeNG components

### Important Limitations
- No real-time updates
- File locking for concurrency
- No caching layer
- No user registration UI
- Basic error handling

### Test Credentials
- admin@vbtasks.com / 123456
- john.doe@vbtasks.com / 123456

---

## Conversation Starters

### Architecture
*"I see we're using Onion Architecture here. Walk me through the layers..."*

### Performance  
*"The dashboard loads all tasks at once. How would you optimize this?"*

### Security
*"JWT tokens are in localStorage. What are the implications?"*

### Scalability
*"We're using JSON files. When would you migrate to a database?"*

---

## Common Candidate Mistakes

### 1. Over-Engineering
**Mistake**: Suggests microservices for everything  
**Guide**: *"What would be the simplest solution first?"*

### 2. Missing Security Issues
**Mistake**: Doesn't mention XSS with localStorage  
**Prompt**: *"What about browser-based attacks?"*

### 3. No Trade-off Thinking
**Mistake**: Only presents one solution  
**Ask**: *"What are the downsides of that approach?"*

### 4. Ignoring Requirements
**Mistake**: Suggests complex real-time features  
**Remind**: *"Remember, we need to keep it simple"*

---

## Quick Troubleshooting

### Can't Access Code
- Share your screen instead
- Use GitHub web interface
- Have backup questions ready

### Running Out of Time
- Skip detailed code reviews
- Focus on architecture/design
- Ask for brief answers

### Candidate Too Quiet
- Ask open-ended questions
- *"Tell me about a similar challenge you've faced"*
- *"What's your first impression of this code?"*

### Candidate Too Verbose
- *"Great point! Let's move to the next topic"*
- Set time expectations upfront
- Guide back to specific questions

---

## Key Files Reference

### Must Review
| File | Shows | Ask About |
|------|-------|-----------|
| `TasksController.cs` | API patterns, auth | Security, REST design |
| `auth.effects.ts` | NgRx flow | Side effects, error handling |
| `JsonRepository.cs` | Data access | Concurrency, scaling |
| `TaskService.cs` | Business logic | Validation, patterns |

### Good to Have
| File | Shows | Ask About |
|------|-------|-----------|
| `dashboard.component.ts` | Component design | Performance, UX |
| `auth.interceptor.ts` | HTTP handling | Token management |
| `app.state.ts` | State structure | Scaling state |

---

## Evaluation Quick Guide

### Architecture & Design (25%)
- **5**: Identifies patterns, suggests improvements
- **4**: Understands layers and flow
- **3**: Basic understanding
- **2**: Confused about structure

### Frontend/Backend (20% each)
- **5**: Expert knowledge, best practices
- **4**: Strong skills, good insights
- **3**: Competent, some gaps
- **2**: Limited experience

### Problem Solving (15%)
- **5**: Multiple solutions, clear trade-offs
- **4**: Good analysis, logical approach
- **3**: Solves with guidance
- **2**: Struggles with analysis

---

## Power Questions (When Time is Short)

### Architecture
*"What would you change about this architecture and why?"*

### Full-Stack
*"Trace a task update from UI to file system"*

### Performance
*"How would you handle 10,000 tasks?"*

### Security
*"What vulnerabilities do you see?"*

### Leadership
*"How would you improve team productivity here?"*

---

## Scoring Reminders

### Mid-Level (2-5 years)
- Expect 3.5-4.0 scores
- Should understand patterns
- Some architectural thinking
- Good problem solving

### Senior (5+ years)  
- Expect 4.0+ scores
- Deep pattern knowledge
- Strong trade-off analysis
- Leadership qualities

### Red Flags 🚩
- Can't explain basic concepts
- No questions about context
- Dismissive of code
- Over-confident without substance
- Poor communication

### Green Flags ✅
- Asks clarifying questions
- Identifies improvements
- Considers trade-offs
- References specific code
- Admits unknowns gracefully

---

## Post-Interview Checklist
- [ ] Complete scores while fresh
- [ ] Note specific examples
- [ ] Write 3 strengths, 2 concerns
- [ ] Make hire/no-hire decision
- [ ] Schedule debrief if needed

---

## Final Tips
1. **Be consistent** - Same approach for all candidates
2. **Take notes** - Specific examples matter
3. **Stay neutral** - Don't show approval/disapproval
4. **Time management** - Keep the pace moving
5. **Be human** - Technical skill + culture fit

Remember: We're assessing problem-solving and communication as much as technical knowledge!
# 📋 Interview Questions - Quick Reference Guide

## 🚀 Navigation Tips
1. **Use Ctrl+F** to search for specific topics
2. **Click table of contents** links to jump to sections
3. **Look for ⭐ Priority markers** for must-ask questions
4. **Use 📄 Full Answer** links to see detailed responses

---

## 📑 Quick Jump Menu

### By Technology
- [Angular Core](#angular-core-questions) | [Angular Advanced](#angular-advanced)
- [.NET Core](#net-core-questions) | [.NET Advanced](#net-advanced)
- [Azure Core](#azure-core-questions) | [Azure Advanced](#azure-advanced)
- [Raj - React to Angular](#raj-questions)

### By Topic
- [Architecture](#architecture) | [Performance](#performance) | [Security](#security)
- [Testing](#testing) | [DevOps](#devops) | [Best Practices](#best-practices)

---

## Angular Core Questions

### ⭐ 1. Change Detection
**Q:** Explain OnPush vs Default strategy?
- **Key Points:** Performance, immutability, trade-offs
- **Follow-up:** Debugging change detection issues
- [📄 Full Answer](#full-angular-1)

### ⭐ 2. State Management
**Q:** Compare NgRx, services, component state?
- **Key Points:** Complexity, team size, app scale
- **Follow-up:** Optimistic updates
- [📄 Full Answer](#full-angular-2)

### ⭐ 3. RxJS Operators
**Q:** Difference between switchMap, mergeMap, concatMap, exhaustMap?
- **Key Points:** Cancellation, use cases, performance
- **Follow-up:** Memory leak prevention
- [📄 Full Answer](#full-angular-3)

### 4. Performance
**Q:** How to optimize slow Angular app?
- **Key Points:** Profiling, OnPush, lazy loading, bundle size
- **Follow-up:** Production monitoring

### 5. Security
**Q:** Prevent XSS in Angular?
- **Key Points:** Built-in sanitization, CSP, best practices
- **Follow-up:** Content Security Policy

## Angular Advanced

### 6. Module Architecture
**Q:** Structure large-scale app with multiple teams?
- **Key Points:** Boundaries, lazy loading, Nx workspace

### 7. Testing Strategy
**Q:** Unit vs Integration vs E2E?
- **Key Points:** Testing pyramid, coverage, tools

### 8. Forms
**Q:** Template-driven vs Reactive forms?
- **Key Points:** Use cases, validation, complexity

---

## .NET Core Questions

### ⭐ 1. Dependency Injection
**Q:** Explain Transient, Scoped, Singleton?
- **Key Points:** Lifecycle, thread safety, memory
- **Follow-up:** Common pitfalls
- [📄 Full Answer](#full-net-1)

### ⭐ 2. Async/Await
**Q:** When to use ConfigureAwait(false)?
- **Key Points:** SynchronizationContext, ASP.NET Core
- **Follow-up:** Exception handling
- [📄 Full Answer](#full-net-2)

### ⭐ 3. Entity Framework
**Q:** Optimize slow EF query?
- **Key Points:** N+1, includes, AsNoTracking, indexes
- **Follow-up:** Raw SQL usage
- [📄 Full Answer](#full-net-3)

### 4. Memory Management
**Q:** How does GC work? Generations?
- **Key Points:** Gen 0/1/2, LOH, performance impact
- **Follow-up:** Diagnose memory leaks

### 5. Middleware
**Q:** Explain middleware pipeline?
- **Key Points:** Order matters, custom middleware
- **Follow-up:** Specific ordering examples

## .NET Advanced

### 6. Microservices
**Q:** Sync vs Async communication patterns?
- **Key Points:** HTTP/gRPC vs messaging, resilience

### 7. Authentication
**Q:** Compare cookies, JWT, OAuth?
- **Key Points:** Use cases, scalability, security

### 8. Performance
**Q:** Profiling tools and techniques?
- **Key Points:** Hot paths, benchmarking, memory

---

## Azure Core Questions

### ⭐ 1. Service Selection
**Q:** App Service vs AKS vs VMs?
- **Key Points:** PaaS/IaaS, management, cost, skills
- **Follow-up:** Decision factors
- [📄 Full Answer](#full-azure-1)

### ⭐ 2. Identity
**Q:** Managed Identity vs Service Principal?
- **Key Points:** Credential management, use cases
- **Follow-up:** Azure AD SSO
- [📄 Full Answer](#full-azure-2)

### ⭐ 3. Cost Optimization
**Q:** Reduce costs by 30%?
- **Key Points:** Reserved instances, right-sizing, monitoring
- **Follow-up:** Balance with performance
- [📄 Full Answer](#full-azure-3)

### 4. Storage
**Q:** SQL Database vs Cosmos DB vs Table Storage?
- **Key Points:** Use cases, consistency, scale, cost

### 5. High Availability
**Q:** Design DR strategy?
- **Key Points:** RTO/RPO, multi-region, testing

## Azure Advanced

### 6. Monitoring
**Q:** Implement observability for microservices?
- **Key Points:** App Insights, correlation, alerting

### 7. Networking
**Q:** VNet peering vs VPN gateway?
- **Key Points:** Performance, cost, use cases

### 8. Security
**Q:** Implement defense in depth?
- **Key Points:** Layers, Key Vault, RBAC

---

## Raj Questions

### ⭐ 1. Framework Philosophy
**Q:** React (library) vs Angular (framework)?
- **Key Points:** Flexibility vs structure, mindset shift
- [📄 Full Answer](#full-raj-1)

### ⭐ 2. Hook Translation
**Q:** useState/useEffect to Angular?
- **Key Points:** Lifecycle hooks, services, RxJS
- [📄 Full Answer](#full-raj-2)

### ⭐ 3. State Management
**Q:** Redux/Context to Angular?
- **Key Points:** NgRx similarity, services + RxJS

### 4. JSX to Templates
**Q:** Challenges moving from JSX?
- **Key Points:** Directives, syntax differences

### 5. TypeScript
**Q:** Comfort with strict typing?
- **Key Points:** Benefits, decorators, learning curve

### 6. Learning Path
**Q:** How to learn Angular effectively?
- **Key Points:** RxJS crucial, structured approach

---

## 🎯 Interview Strategy

### For 30-minute interview:
1. **5 min:** Introduction & experience
2. **20 min:** 4-5 core questions (marked with ⭐)
3. **5 min:** Candidate questions

### For 60-minute interview:
1. **10 min:** Introduction & experience
2. **40 min:** 8-10 questions (mix core + advanced)
3. **10 min:** Candidate questions & discussion

### Question Selection:
- **Junior-Mid:** Focus on core questions
- **Senior:** Mix of core + advanced
- **Architect:** Heavy on advanced + system design

---

## 📊 Quick Evaluation Matrix

| Area | Poor (1-2) | Good (3-4) | Excellent (5) |
|------|------------|------------|---------------|
| **Technical** | Struggles with basics | Solid understanding | Deep expertise |
| **Problem Solving** | No clear approach | Systematic thinking | Creative solutions |
| **Communication** | Unclear explanations | Clear & concise | Teaches concepts |
| **Experience** | Limited/theoretical | Some production | Extensive real-world |

---

## 💡 Interviewer Tips

### DO:
- Let them think out loud
- Ask "why" not just "what"
- Probe for real experience
- Give hints if stuck
- Note red flags

### DON'T:
- Rush through questions
- Accept vague answers
- Skip follow-ups
- Be confrontational
- Forget soft skills

---

# 📄 Detailed Answers Section

<details id="full-angular-1">
<summary>### Angular 1: Change Detection Full Answer</summary>

**Expected Answer:**
- Default: Checks entire component tree on any change
- OnPush: Only checks when @Input changes, events fire, or observables emit
- OnPush requires immutable data patterns
- Trade-offs: Performance gain vs complexity

**Look for:**
- Understanding of zone.js
- Knowledge of ChangeDetectorRef
- Real-world usage examples
</details>

<details id="full-angular-2">
<summary>### Angular 2: State Management Full Answer</summary>

**Expected Answer:**
- Component state: Simple, local only
- Services + BehaviorSubjects: Moderate sharing
- NgRx: Complex apps, time-travel debugging
- Choice factors: App size, team size, complexity

**Look for:**
- Understanding of trade-offs
- Experience with different approaches
- Knowledge of when to use each
</details>

<details id="full-net-1">
<summary>### .NET 1: Dependency Injection Full Answer</summary>

**Expected Answer:**
- Transient: New instance each time
- Scoped: One per request/scope
- Singleton: One for app lifetime
- Consider thread safety, memory impact

**Look for:**
- Clear understanding of lifecycles
- Awareness of captive dependencies
- Real-world examples
</details>

<details id="full-azure-1">
<summary>### Azure 1: Service Selection Full Answer</summary>

**Expected Answer:**
- App Service: PaaS, easy management
- AKS: Full Kubernetes, complex
- VMs: Full control, high overhead
- Consider cost, skills, requirements

**Look for:**
- Understanding of trade-offs
- Cost awareness
- Team skill considerations
</details>

---

## 🔗 Quick Links

- [Full Interview Guide (1600+ lines)](./interview-questions.md)
- [Evaluation Rubric](#-quick-evaluation-matrix)
- [Interview Strategy](#-interview-strategy)
- [Return to Top](#-interview-questions---quick-reference-guide)
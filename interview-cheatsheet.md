# 🎯 Interview Cheat Sheet - One Page Quick Reference

## 🔥 Top 5 Questions Per Technology

### Angular
1. **Change Detection:** OnPush vs Default → Performance vs Complexity
2. **RxJS Operators:** switchMap (cancel), mergeMap (parallel), concatMap (sequential)
3. **State Management:** Services < NgRx < Complex apps
4. **Performance:** Profiler → OnPush → Lazy Loading → Bundle Size
5. **Security:** Built-in sanitization, avoid bypassSecurityTrust

### .NET
1. **DI Scopes:** Transient (new), Scoped (per request), Singleton (one)
2. **Async:** ConfigureAwait(false) in libraries, not when need context
3. **EF Performance:** Check N+1, use includes, AsNoTracking
4. **Memory:** Gen 0→1→2, LOH >85KB, profile with dotMemory
5. **Middleware:** Order matters! Auth before Authorization

### Azure
1. **Services:** App Service (easy), AKS (K8s), VMs (control)
2. **Identity:** Managed Identity > Service Principal when possible
3. **Cost:** Reserved instances, right-size, auto-shutdown
4. **Storage:** SQL (relational), Cosmos (global), Table (simple)
5. **HA/DR:** RTO = downtime, RPO = data loss

### Raj (React → Angular)
1. **Philosophy:** Library → Framework, Flexible → Opinionated
2. **Hooks → Angular:** useState→properties, useEffect→lifecycle
3. **State:** Redux→NgRx, Context→Services+RxJS
4. **JSX → Templates:** *ngFor, *ngIf, pipes not inline functions
5. **Learning:** TypeScript → RxJS → DI → CLI

---

## 🚨 Red Flag Answers

❌ "I've never needed to..."
❌ "That's handled by the framework"
❌ No consideration of trade-offs
❌ Can't explain their code decisions
❌ No real-world examples

## ✅ Green Flag Answers

✓ "In my experience..."
✓ "The trade-off is..."
✓ "It depends on..."
✓ Mentions testing/security
✓ Asks clarifying questions

---

## 📊 Quick Scoring

**5 - Expert:** Teaches you something new
**4 - Senior:** Solid + independent
**3 - Mid:** Good basics + some guidance
**2 - Junior:** Understands + needs help
**1 - Entry:** Theory only

---

## ⏱️ Time Management

**30 min:** 5 intro + 20 technical (4-5 Qs) + 5 their Qs
**60 min:** 10 intro + 40 technical (8-10 Qs) + 10 their Qs

---

## 🎪 Interview Flow

1. **Warm up:** Tell me about your recent project
2. **Core:** Start with ⭐ marked questions
3. **Deep dive:** Follow-ups based on their strength
4. **Wrap up:** What questions do you have?

---

## 💭 Good Follow-ups

- "Can you give a real example?"
- "What would happen if...?"
- "How would you debug that?"
- "What are the trade-offs?"
- "When wouldn't you use that?"
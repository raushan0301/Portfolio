## Summary

**Problem**

• Fragmented campus data  
• No real-time faculty/classroom visibility  
• High time wasted navigating campus

**Solution**

• Live Firestore listeners for instant updates  
• Centralized faculty + classroom system  
• Role-based admin control

**Why it matters**

• Reduced average search time from 15 min → <2 min  
• Improved daily campus efficiency

---

## Engineering

**System Design**

Frontend  
• React (component-driven UI)  
• Google Maps API for navigation  
• Real-time Firestore listeners

Backend  
• Firebase Authentication (RBAC)  
• Firestore (optimized queries)  
• Cloud Functions for validation

**Key Engineering Decisions**

• Real-time sync without page refresh  
• Admin/User separation using RBAC  
• Scalable Firestore schema

---

## Impact

**Impact Metrics**

• 500+ active users across campus  
• 15 min → <2 min average search time  
• Real-time updates across devices  
• Scalable foundation for future modules

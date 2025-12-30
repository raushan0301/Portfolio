## Summary

**Problem**

• Difficult to interpret complex ML prediction data  
• Market insights are often fragmented and delayed  
• Lack of easy-to-use forecasting tools for retail users

**Solution**

• 10-day price predictions visualized via interactive charts  
• Real-time sentiment analysis and trend tracking  
• Clean, responsive dashboard for high-frequency data

**Why it matters**

• Simplifies complex Machine Learning outputs for users  
• Provides actionable insights with minimal latency  
• High-performance interface for financial decision making

---

## Engineering

**System Design**

Frontend  
• React and Vite for a fast, responsive single-page application  
• Recharts and custom SVG paths for data visualization  
• Dynamic filtering for symbol-based market searching

Backend  
• Supabase for real-time data storage and management  
• PostgreSQL for optimized time-series prediction queries  
• Secure data access through Row-Level Security (RLS)

**Key Engineering Decisions**

• Real-time fetching of market news and predictions  
• Optimized pagination for large financial datasets  
• Scalable architecture for future ML model integration

---

## Impact

**Impact Metrics**

• Visualizes 10-day forecasts across multiple assets  
• Real-time updates with zero perceived latency  
• 100% responsive design for mobile and desktop  
• Streamlined user workflow for market analysis

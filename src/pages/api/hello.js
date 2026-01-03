// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// When you CAN use Next.js for your entire backend
// Monolithic Simplicity: For startups and SaaS products, having the frontend and backend in one codebase (TypeScript throughout) speeds up development and reduces deployment overhead.
// Database Integration: You can connect directly to databases like PostgreSQL or MongoDB using ORMs like Prisma or Mongoose inside your Route Handlers.
// Authentication: Built-in tools like Auth.js or Clerk handle user sessions and security directly within the Next.js ecosystem.
// Serverless Efficiency: Route Handlers deploy as serverless functions (on platforms like Vercel), meaning they scale automatically with traffic. 
// When you should NOT use only Next.js (The "Limitations")
// While capable, there are specific scenarios where a dedicated backend (like Express, Go, or Rust) is better:
// Long-Running Tasks: Next.js Route Handlers (especially in serverless environments) have strict timeout limits (e.g., 15–30 seconds). They are not suitable for tasks like heavy video processing or long-running background jobs.
// Real-time Communication: Handling WebSockets (for live chat or real-time gaming) is difficult in Next.js because serverless functions are stateless and close after a response is sent.
// CPU-Intensive Work: If your backend needs to perform heavy math, AI processing, or image manipulation, a dedicated server allows for better resource management and doesn't block your frontend's rendering performance.
// Multi-Client Support: If you plan to build a mobile app (iOS/Android) alongside your web app, you might find it cleaner to have a standalone API that both platforms consume, rather than having the API tightly coupled to the web framework

// serverless would never scale for free lol
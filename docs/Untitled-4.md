Project Context:
- Building a relationship conflict resolution app
- Uses Google Gemini API for AI analysis
- React frontend, Node.js backend
- TypeScript/JavaScript stack
- Currently implementing core phase system and discussion features

Key Architecture Points:
1. Phase-based system (Initial → Discussion → Resolution)
2. Statement management for user discussions
3. AI-powered analysis of statements
4. Real-time user interaction

Core Principles:
- Single Responsibility Principle (SRP)
- Test-First Development
- Type Safety
- Small, focused interfaces (max 3 methods)
- Max 20 lines per function
- Clear separation of concerns

Current Focus:
- Implementing core interfaces
- Building phase management system
- Setting up statement validation
- Establishing error handling patterns

Project Structure:
/src
  /phase        - Phase management
  /state        - State management
  /validation   - Input validation
  /api          - API interfaces
  /components   - UI components
  /services     - Business logic
  /shared       - Shared types/utilities
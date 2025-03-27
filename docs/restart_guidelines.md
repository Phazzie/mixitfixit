# Comprehensive Project Restart Guidelines

## 🎯 Core Principles

1.  **Single Responsibility (HIGHEST PRIORITY)**

    - **Do:** Ensure each class, function, and file has one specific purpose.
    - **Don't:** Create "God classes" or functions that handle multiple responsibilities.
    - **Lesson Learned:** Mixing responsibilities leads to complex, hard-to-maintain code.

2.  **Interface-First Development**

    - **Do:** Define interfaces before implementing classes. Use small, focused interfaces (max 3 methods).
    - **Don't:** Create large, monolithic interfaces that force classes to implement unnecessary methods.
    - **Lesson Learned:** Clear interfaces promote decoupling and testability.

3.  **Test-Driven Development**

    - **Do:** Write failing tests before writing code. Use tests to drive the design and implementation.
    - **Don't:** Write tests as an afterthought.
    - **Lesson Learned:** TDD leads to better code coverage and a more robust application.

4.  **Explicit Error Handling**

    - **Do:** Define custom error classes for different scenarios. Implement a centralized error handling mechanism.
    - **Don't:** Use generic error handling or ignore errors.
    - **Lesson Learned:** Proper error handling improves the user experience and makes debugging easier.

5.  **Dependency Injection**

    - **Do:** Decouple components using dependency injection.
    - **Don't:** Create tightly coupled components that are difficult to test and reuse.
    - **Lesson Learned:** DI promotes modularity and testability.

## 🔧 Project Setup Files & Scripts

### Essential Files to Keep

1. **Setup Scripts**

   - `scripts/project_init.sh` - Main project structure initialization
   - `scripts/create_component.sh` - Component creation utility
   - `scripts/analyze_refactor.sh` - Project structure analysis

2. **Configuration Files**

   - `tsconfig.json` - TypeScript configuration
   - `package.json` - Project dependencies and scripts
   - `.eslintrc` - Linting rules
   - `.prettierrc` - Code formatting rules

3. **Core Directory Structure**
   ```
   src/
   ├── phase/
   ├── state/
   ├── api/
   ├── validation/
   ├── logging/
   ├── cache/
   ├── auth/
   ├── config/
   ├── shared/
   │   ├── types/
   │   ├── errors/
   │   ├── utils/
   │   └── constants/
   ├── services/
   │   └── ai/
   └── components/
   ```

### Setup Process

1. **Initial Setup**

   ```bash
   # Clone new repository
   git clone [new-repo-url]
   cd [project-directory]

   # Copy essential scripts
   mkdir -p scripts
   cp [old-project]/scripts/project_init.sh scripts/
   chmod +x scripts/project_init.sh

   # Initialize project structure
   ./scripts/project_init.sh
   ```

2. **Post-Setup Tasks**
   - Run `npm install` to install dependencies
   - Configure git hooks for linting/formatting
   - Set up CI/CD pipeline
   - Initialize test framework

### Utility Scripts Usage

1. **Creating New Components**

   ```bash
   npm run create:component [system] [component]
   # Example: npm run create:component phase PhaseManager
   ```

2. **Analyzing Project Structure**
   ```bash
   npm run analyze
   ```

### Directory Structure Conventions

1. **Core Systems**

   - Each system (phase, state, etc.) follows:
     ```
     system/
     ├── interfaces/
     ├── implementations/
     └── tests/
     ```

2. **Components**

   - Each component follows:
     ```
     ComponentName/
     ├── hooks/
     ├── tests/
     └── types/
     ```

3. **Services**
   - Each service follows:
     ```
     ServiceName/
     ├── implementations/
     ├── tests/
     ├── types.ts
     └── errors.ts
     ```

### Automation Guidelines

1. **Component Creation**

   - Always use `create:component` script
   - Ensures consistent structure
   - Automatically creates test files

2. **Code Generation**

   - Interface templates
   - Test templates
   - Error class templates

3. **Quality Checks**
   - Pre-commit hooks for linting
   - Automated test running
   - Type checking

## ✅ Implementation Guidelines

### 1. Project Structure

- **Do:** Organize the project into well-defined modules (e.g., `core`, `features`, `shared`, `api`).
- **Don't:** Create a flat or disorganized project structure.
- **Example:**

  ```
  /src
    /core          // Core domain logic
      /interfaces  // All interfaces (small and focused)
      /types      // Shared types
      /errors     // Custom errors (hierarchical)
    /features     // Feature modules
      /phase      // Phase management
      /analysis   // Analysis logic
      /navigation // Navigation management
    /shared       // Shared utilities
      /logging    // Centralized logging
      /validation // Shared validation logic
      /testing    // Test utilities and mocks
    /api          // API interaction layer
      /services   // API service implementations
      /models     // Data models for API requests/responses
    /config       // Configuration management
    /auth         // Authentication and authorization
    /cache        // Caching mechanisms
    /state        // State management
  ```

### 2. Interface Design

- **Do:** Create small, focused interfaces that define clear contracts.
- **Don't:** Create "God interfaces" with too many methods.
- **Example:**

  ```typescript
  // ✅ GOOD: Small, focused interface
  interface IAnalyzer {
    analyze(content: string): Promise<Analysis>;
    validate(analysis: Analysis): boolean;
    getMetadata(): AnalysisMetadata;
  }
  ```

### 3. Class Implementation

- **Do:** Implement classes that adhere to the Single Responsibility Principle.
- **Don't:** Create classes with mixed responsibilities.
- **Example:**

  ```typescript
  // ✅ GOOD: Single responsibility
  export class ContentAnalyzer implements IAnalyzer {
    constructor(
      private readonly validator: IValidator,
      private readonly logger: ILogger
    ) {}

    async analyze(content: string): Promise<Analysis> {
      this.logger.debug("Starting analysis", { content });
      await this.validator.validate(content);
      return this.processContent(content);
    }
  }
  ```

### 4. Error Handling

- **Custom Errors:**

  ```typescript
  // src/core/errors/BaseError.ts
  export abstract class BaseError extends Error {
    constructor(
      message: string,
      public readonly code: ErrorCode,
      public readonly details?: Record<string, unknown>
    ) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype); // Required for proper inheritance in ES5
      this.name = this.constructor.name; // Set the name for better identification
    }
  }

  // src/core/errors/ValidationError.ts
  export class ValidationError extends BaseError {
    constructor(
      message: string,
      public readonly field: string,
      public readonly value: unknown
    ) {
      super(message, ErrorCode.VALIDATION);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = this.constructor.name;
    }
  }

  // src/core/errors/ApiError.ts
  export class ApiError extends BaseError {
    constructor(
      message: string,
      public readonly apiCode: string // Specific API error code
    ) {
      super(message, ErrorCode.API);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = this.constructor.name;
    }
  }

  // src/core/errors/RateLimitError.ts
  export class RateLimitError extends ApiError {
    constructor(message: string) {
      super(message, "rate_limit"); // Use a specific API code
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = this.constructor.name;
    }
  }
  ```

- **Centralized Error Handling:**

  ```typescript
  // src/shared/logging/ErrorLogger.ts
  import { ILogger } from "./ILogger";

  export class ErrorLogger {
    constructor(private readonly logger: ILogger) {}

    logError(error: Error, context?: Record<string, unknown>): void {
      this.logger.error(error.message, {
        errorName: error.name,
        errorCode: (error as any).code, // Access custom error code if available
        stack: error.stack,
        ...context,
      });
    }
  }
  ```

- **Error Boundaries (React):**

  ```typescript
  // src/shared/errors/ErrorBoundary.tsx
  import React from "react";
  import { ILogger } from "../logging/ILogger";

  interface ErrorBoundaryProps {
    children: React.ReactNode;
    logger: ILogger;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
  }

  export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      // You can also log the error to an error reporting service
      this.props.logger.error("UI Error", { error, info });
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>; // Replace with a more user-friendly message
      }

      return this.props.children;
    }
  }
  ```

### 5. Dependency Injection

- **Constructor Injection:**

  ```typescript
  // ✅ GOOD: Constructor injection
  export class ContentAnalyzer implements IAnalyzer {
    constructor(
      private readonly validator: IValidator,
      private readonly logger: ILogger
    ) {}
  }
  ```

### 6. API Interaction

- **API Service Abstraction:**

  ```typescript
  // src/api/services/IApiService.ts
  export interface IApiService {
    fetchData<T>(endpoint: string, options?: RequestInit): Promise<T>;
    postData<T>(endpoint: string, data: any, options?: RequestInit): Promise<T>;
  }

  // src/api/services/GeminiApiService.ts
  export class GeminiApiService implements IApiService {
    constructor(private readonly apiKey: string) {}

    async fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
      // Implementation using fetch or axios
    }

    async postData<T>(
      endpoint: string,
      data: any,
      options?: RequestInit
    ): Promise<T> {
      // Implementation using fetch or axios
    }
  }
  ```

- **Data Transfer Objects (DTOs):**

  ```typescript
  // src/api/models/AnalysisRequest.ts
  export interface AnalysisRequest {
    statement1: string;
    statement2: string;
    options?: {
      depth: "detailed" | "summary";
    };
  }

  // src/api/models/AnalysisResponse.ts
  export interface AnalysisResponse {
    agreement: string;
    disagreement: string;
    fallacies: string[];
    suggestions: string[];
  }
  ```

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1)

1.  **Project Setup**

    - **Do:** Configure TypeScript with strict mode and correct `moduleResolution`.
    - **Do:** Set up a testing framework (Jest with React Testing Library).
    - **Do:** Configure linting rules (ESLint with recommended rules and Prettier integration).
    - **Do:** Set up a CI/CD pipeline (GitHub Actions or similar).

2.  **Core Interfaces**

    - **Do:** Define core interfaces like `IPhaseManager` and `ILogger`.

3.  **Base Classes**

    - **Do:** Create base classes for custom errors.

### Phase 2: Features (Week 2)

1.  **Core Features**

    - **Do:** Implement core features like phase management, analysis engine, and state management.

2.  **Testing Infrastructure**

    - **Do:** Create test factories to simplify testing.

### Phase 3: API Integration and Rate Limiting (Week 3)

1.  **API Service Implementation**

    - **Do:** Implement the API service using DTOs.

2.  **Rate Limiting**

    - **Do:** Implement rate limiting to prevent abuse of the AI service.

### Phase 4: UI and User Experience (Week 4)

1.  **Implement UI Components**

    - **Do:** Implement the UI using React components.

2.  **Implement Error Handling in UI**

    - **Do:** Use Error Boundaries to catch errors in the UI.

## ⚠️ Error Handling

- **Do:** Define custom error classes for different scenarios.
- **Do:** Implement a centralized error handling mechanism.
- **Do:** Use Error Boundaries in React to catch UI errors.

## 📊 Testing Strategy

1.  **Unit Tests**

    - **Do:** Write unit tests for all classes and functions.
    - **Example:** Test that the `ContentAnalyzer` validates content before analysis.

2.  **Integration Tests**

    - **Do:** Write integration tests to verify that different parts of the system work together.
    - **Example:** Test that the analysis workflow completes successfully.

3.  **End-to-End (E2E) Tests**

    - **Do:** Use a tool like Cypress or Playwright to write E2E tests.

## 🔍 Code Review Guidelines

1.  **Review Checklist**

    - **Do:** Ensure that the code adheres to the core principles (SRP, Interface-First, TDD, etc.).
    - **Do:** Check for code smells and potential performance issues.

2.  **Performance Considerations**

    - **Do:** Consider lazy loading, memory leaks, bundle size, and API call efficiency.

## 📈 Success Metrics

1.  **Code Quality**

    - **Goal:** 100% test coverage, zero TypeScript errors, all interfaces documented, low complexity score, no code smells.

2.  **Performance**

    - **Goal:** Fast test execution, small bundle size, fast load time, low memory usage.

3.  **Maintainability**

    - **Goal:** Clear dependency graph, no circular dependencies, consistent error handling, comprehensive logging.

## 🎯 Final Checklist

1.  **Architecture**

    - [ ] Interfaces defined
    - [ ] Error handling implemented
    - [ ] Logging configured
    - [ ] Tests written

2.  **Documentation**

    - [ ] README updated
    - [ ] API docs generated
    - [ ] Architecture diagram
    - [ ] Setup guide

3.  **Deployment**

    - [ ] CI/CD configured
    - [ ] Environment variables set
    - [ ] Monitoring setup
    - [ ] Backup strategy

## 🛠️ Addressing Specific Errors from `test failures.md`

1.  **"Cannot find module" Errors:**

    - **Do:** Review `tsconfig.json` and ensure that `moduleResolution` and `paths` are correctly configured.
    - **Do:** Verify that all `import` statements are correct and that the imported modules exist.
    - **Do:** Create missing type declarations (`.d.ts` files) for JavaScript modules without corresponding type declarations.

2.  **Type Errors:**

    - **Do:** Fix type mismatches and ensure that the `Result` type is correctly defined and used throughout the codebase.
    - **Do:** Use TypeScript's type checking features to identify and prevent type errors.

3.  **Implementation Errors:**

    - **Do:** Fix implementation errors and ensure that the code is working as intended.
    - **Do:** Use debugging tools and logging to identify and fix errors.

4.  **`ErrorMessageProvider.test.ts` Failure:**

    - **Do:** Implement the `isRecoverable` property in the `IErrorMessageProvider` interface and the `ErrorMessageProvider` class.

5.  **`NavigationManager` Errors:**

    - **Do:** Correct the constructor arguments and method names (use `navigateTo` instead of `navigate`).

By following these guidelines, you can create a robust and maintainable application that meets the needs of your users. Remember to focus on the architectural design, tooling and automation, SOLID principles, and addressing the specific errors highlighted in the `test failures.md` file.

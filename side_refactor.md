# Side Refactor: Plan B Implementation Guide

**Document Purpose:** This document is a comprehensive guide for implementing Plan B, a refactoring strategy designed to enhance the scalability, maintainability, and readability of the Relationship Resolver application. It includes a detailed checklist, a breakdown of prompts for AI assistance, and clear instructions for each step of the refactoring process.

**Overall Goal:** Successfully implement Plan B to transform the Relationship Resolver application into a more robust, scalable, and maintainable system using the Context API and custom hooks.

**Core Principles of Plan B:**

*   **Centralized State Management:** Utilize React's Context API to create a central data store, replacing prop drilling.
*   **Modularity and Reusability:** Employ custom hooks to encapsulate logic and data access, promoting code reuse.
*   **Separation of Concerns:** Separate data management, UI rendering, and business logic.
*   **Enhanced Readability:** Improve code clarity through simplified components and clear data flow.
* **SRP**: Each component should have one single responsibility.
* **DRY**: Remove code duplication.

**Why Break Down the Refactoring into Multiple Prompts?**

1.  **Clarity and Focus:** Smaller prompts help us stay focused on a single task, avoiding confusion.
2.  **Iterative Development:** We can review the results of each prompt, make adjustments, and iterate more effectively.
3.  **Reduced Error Rate:** Smaller, well-defined tasks lead to fewer errors.
4.  **Better Control:** You have more control over the process by working in small steps.
5. **Manage complexity**: Each step is easier to follow.

**I. Comprehensive Checklist:**

**A. Setup and Preparation (Laying the Groundwork for Plan B):**

1.  **Project Review and Planning:**
    *   [ ] Thoroughly review the existing `refactoring_guide.md` and this Plan B addendum.
    *   [ ] Analyze the current codebase to fully understand the existing architecture and areas ripe for improvement with Plan B.
    *   [ ] Review and understand the prompts provided in this document.
2.  **Branching Strategy (Isolating Plan B Changes):**
    *   [ ] Create a new Git branch specifically for the Plan B implementation (e.g., `plan-b-refactor`). This isolates Plan B from other potential changes.
3.  **Development Environment:**
    *   [ ] Ensure all developers involved have a fully functional development environment set up.
    *   [ ] Verify that all necessary testing dependencies are ready.

**B. Implementing the Core of Plan B:**

1.  **Context API Setup (Centralized Data Store):**
    *   [ ] Create a new directory `src/contexts` to house all Context-related files.
    *   [ ] Create the file `src/contexts/StatementsContext.js`.
        *   [ ] Define `StatementsContext`: The React Context that will hold all statement-related data.
            *   [ ] Use the prompt 1.1
        *   [ ] Create `StatementsProvider`: A component that will wrap the application and make the `StatementsContext` data accessible to all child components.
            *   [ ] Use the prompt 1.2
        *   [ ] Define the initial state for the statements.
             *   [ ] Use the prompt 1.3
        * [ ] Create the `useStatements` hook: A hook to access the `StatementsContext`.
            * [ ] Use the prompt 1.4
        * [ ] Create the `reducer` function: A function to handle the logic of the statements context.
            * [ ] Use the prompt 1.5
            * [ ] Implement the `addStatement` function in the reducer.
                * [ ] Use the prompt 1.6
    *   [ ] In `App.js`, wrap the application with the `StatementsProvider` to make the context available to all components.
2.  **Custom Hooks Creation (Modular Logic):**
    *   [ ] Create a new directory `src/hooks` to store all custom hooks.
    *   [ ] Create the file `src/hooks/useStatementsManager.js`:
        *   [ ] Implement `getStatements()`: A function to fetch the current statements from the `StatementsContext`.
            *   [ ] Use the prompt 2.2
        *   [ ] Implement `addStatement()`: A function to add a new statement to the `StatementsContext`.
             *   [ ] Use the prompt 2.3
        *   [ ] Ensure this hook uses `StatementsContext` to get and set data.
        * [ ] Create the base hook.
            * [ ] Use prompt 2.1
        * [ ] Add a test file for the hook.
    *   [ ] Create the file `src/hooks/useSummarizeStatements.js`:
        *   [ ] Implement `handleSummarizeClick()`: A function to trigger the AI summarization process.
             * [ ] Use the prompt 3.2
        *   [ ] Add variables `aiResponse` and `apiError` to manage the AI response and potential API errors.
            * [ ] Use the prompt 3.3
        *   [ ] Ensure this hook uses `StatementsContext`.
        * [ ] Create the base hook.
            * [ ] Use prompt 3.1
        * [ ] Add a test file for the hook.
    *   [ ] Create the file `src/hooks/useErrorHandler.js`:
        *   [ ] Implement `setError()`: A function to set an error state within the hook.
             * [ ] Use the prompt 4.2
        *   [ ] Implement a variable to store the error message.
             * [ ] Use the prompt 4.3
        * [ ] Create the base hook.
            * [ ] Use prompt 4.1
        * [ ] Add a test file for the hook.
3.  **Component Refactoring (Adapting to Plan B):**
    *   [ ] Identify all components that directly manage state or receive statement-related data through prop drilling.
        *   [ ] Analyze how each component currently handles statements and other data.
        *   [ ] Identify instances of prop drilling.
    *   [ ] Refactor each identified component:
        *   [ ] Remove direct state management: Eliminate any `useState` or similar calls that manage statement data.
            * [ ] Use the prompt 5.1
        *   [ ] Use the custom hooks: Replace previous data access methods with calls to `useStatementsManager`, `useSummarizeStatements`, or `useErrorHandler` as needed.
            * [ ] Use the prompt 5.2 and 5.3
        *   [ ] Use the `setError` function to handle and display errors.
        *   [ ] Eliminate prop drilling: Remove unnecessary props related to statements.
            * [ ] Use the prompt 5.5
        * [ ] Call the hooks functions.
            * [ ] Use the prompt 5.4
        *   [ ] Add a test file for the refactored component.
        * [ ] Adapt old test files.

**C. Testing to Ensure Plan B's Integrity:**

1.  **Unit Tests (Validating Plan B's Building Blocks):**
    *   [ ] Write comprehensive unit tests for all custom hooks (e.g., `useStatementsManager`, `useSummarizeStatements`, `useErrorHandler`).
        *   [ ] Test data access: Verify that the hooks correctly interact with `StatementsContext`.
        *   [ ] Test business logic: Ensure all functions within the hooks perform as expected.
        * [ ] Test all the edge cases.
        * [ ] Test the `useStatementsManager`.
            * [ ] Use the prompt 6.1
         * [ ] Test the `useSummarizeStatements`.
            * [ ] Use the prompt 6.2
         * [ ] Test the `useErrorHandler`.
            * [ ] Use the prompt 6.3
    * [ ] Write unit tests for the reducer.
        * [ ] Test all the functions.
    *   [ ] Write unit tests for each refactored component.
        *   [ ] Test component rendering: Verify that components render correctly when using the hooks.
        *   [ ] Test interactions: Ensure that components interact with the hooks as expected.
        * [ ] Make sure all the hooks functions are called.
        * [ ] Test all the edge cases.
        * [ ] Use the prompt 7.1
        * [ ] Adapt old tests.
            * [ ] Use the prompt 8.1
2.  **Integration Tests (Verifying Plan B's System-Level Functionality):**
    *   [ ] Write integration tests for key workflows (e.g., adding statements, summarizing statements).
    * [ ] Test components together.

**D. Documentation and Cleanup (Completing the Plan B Refactor):**

1.  **Code Comments (Making Plan B Clear):**
    *   [ ] Add detailed comments to all new and modified code, particularly around custom hooks, Context usage, and component refactoring.
        *   [ ] Explain the "why" behind the code: Document the purpose of each hook, function, and component change.
        *   [ ] Document complex logic: Add detailed comments to any particularly tricky or unintuitive logic.
        *   [ ] Document assumptions: Explicitly state any assumptions made about the data or application behavior.
        * [ ] Comment all the code.
        * [ ] Remove useless comments.
2.  **Documentation Updates (Reflecting the Plan B Changes):**
    *   [ ] Update the `refactoring_guide.md` with comprehensive details about Plan B and its implementation.
        * [ ] Add `useStatementsManager` details.
            * [ ] Use the prompt 9.1
        * [ ] Add `useSummarizeStatements` details.
            * [ ] Use the prompt 9.2
        * [ ] Add `useErrorHandler` details.
            * [ ] Use the prompt 9.3
    *   [ ] Update the `project_checklist.md` to include the tasks associated with Plan B and their completion status.
         * [ ] Use the prompt 10.1
    * [ ] Update the testing guide to include the new tests.
        * [ ] Use the prompt 11.1
    * [ ] Update all the documents if needed.

**II. Plan B Refactoring Prompts Guide**

This section outlines the prompts you can use to guide the AI assistant in helping you with the refactoring process.

**Prompt Breakdown**

The refactoring is divided into four main phases:

1.  **Phase 1: Setting up the Foundation (Context API and Custom Hooks)**
2.  **Phase 2: Refactoring Components**
3.  **Phase 3: Testing**
4.  **Phase 4: Documentation**

**Estimated Number of Prompts:** At least 26, potentially more depending on the number of components and old tests.

**Phase 1: Setting up the Foundation (Context API and Custom Hooks)**

**1. `StatementsContext.js` (Data Center)**

*   **Prompt 1.1 (Context):**
    *   **Prompt:** "Create a new file `src/contexts/StatementsContext.js`. This file should define the `StatementsContext` using React's `createContext`."
    *   **Purpose:** Creates the basic React Context.
*   **Prompt 1.2 (Provider):**
    *   **Prompt:** "In `src/contexts/StatementsContext.js`, create a `StatementsProvider` component. This component should wrap its children and make the context data available."
    *   **Purpose:** Creates the Context provider component.
*   **Prompt 1.3 (Initial State):**
    *   **Prompt:** "In `src/contexts/StatementsContext.js`, define the initial state for the statements. For now, it can be an empty array."
    *   **Purpose:** Sets up the initial data structure.
*   **Prompt 1.4 (hook):**
    *   **Prompt:** "In `src/contexts/StatementsContext.js`, create the `useStatements` hook to access the `StatementsContext`."
    * **Purpose:** Creates the hook.
*   **Prompt 1.5 (Reducer):**
    *   **Prompt:** "In `src/contexts/StatementsContext.js`, create a reducer to handle the logic of the `StatementsContext`."
    * **Purpose:** Creates the reducer.
*   **Prompt 1.6 (addStatement):**
    *   **Prompt:** "In `src/contexts/StatementsContext.js`, add to the reducer the function `addStatement` to add a new statement to the state."
    * **Purpose:** Add the function.

**2. `useStatementsManager.js` (Statements Helper)**

*   **Prompt 2.1 (Base Hook):**
    *   **Prompt:** "Create a new file `src/hooks/useStatementsManager.js`. This file should define the `useStatementsManager` hook."
    *   **Purpose:** Sets up the basic structure for the hook.
*   **Prompt 2.2 (getStatements):**
    *   **Prompt:** "In `src/hooks/useStatementsManager.js`, implement the `getStatements()` function. This function should use the `useStatements` hook to get the statements from `StatementsContext`."
    *   **Purpose:** Implements the function to get the statements.
*   **Prompt 2.3 (addStatement):**
    *   **Prompt:** "In `src/hooks/useStatementsManager.js`, implement the `addStatement()` function. This function should use the `useStatements` hook to add a new statement to the `StatementsContext`."
    *   **Purpose:** Implements the function to add new statements.

**3. `useSummarizeStatements.js` (AI Summary Helper)**

*   **Prompt 3.1 (Base Hook):**
    *   **Prompt:** "Create a new file `src/hooks/useSummarizeStatements.js`. This file should define the `useSummarizeStatements` hook."
    *   **Purpose:** Sets up the basic hook structure.
*   **Prompt 3.2 (handleSummarizeClick):**
    *   **Prompt:** "In `src/hooks/useSummarizeStatements.js`, implement the `handleSummarizeClick()` function. For now, just add a `console.log('Summarize clicked')` inside the function."
    *   **Purpose:** Implements the function to trigger AI summarization.
*   **Prompt 3.3 (Variables):**
    *   **Prompt:** "In `src/hooks/useSummarizeStatements.js`, add two variables: `aiResponse` and `apiError`."
    * **Purpose:** add the variables.

**4. `useErrorHandler.js` (Error Helper)**

*   **Prompt 4.1 (Base Hook):**
    *   **Prompt:** "Create a new file `src/hooks/useErrorHandler.js`. This file should define the `useErrorHandler` hook."
    *   **Purpose:** Sets up the basic structure for the error handling hook.
*   **Prompt 4.2 (setError):**
    *   **Prompt:** "In `src/hooks/useErrorHandler.js`, implement the `setError()` function. For now, just add a `console.log('setError')` inside the function."
    *   **Purpose:** Implements the function to set errors.
* **Prompt 4.3 (variable):**
    * **Prompt:** "In `src/hooks/useErrorHandler.js`, add a variable to store the error message."
    * **Purpose:** Add the variable.

**Phase 2: Refactoring Components**

**5. Component Refactoring (Example: `[Component Name]`):**

*   **Prompt 5.1 (Initial Refactor):**
    *   **Prompt:** "Refactor the `[Component Name]` component. Remove any direct state management related to statements."
    *   **Purpose:** Cleans up direct state management in the component.
*   **Prompt 5.2 (Add `useStatementsManager`):**
    *   **Prompt:** "In the `[Component Name]` component, import and use the `useStatementsManager` hook to get statements."
    *   **Purpose:** Introduces the hook to get data.
* **Prompt 5.3 (Add `useErrorHandler`):**
    *   **Prompt:** "In the `[Component Name]` component, import and use the `useErrorHandler` hook to set and display the errors."
    *   **Purpose:** Add error handling.
* **Prompt 5.4 (call functions):**
    * **Prompt:** "In the `[Component Name]` component, make sure all the functions of the hooks are called correctly."
    * **Purpose:** Call the hooks functions.
* **Prompt 5.5 (remove prop drilling):**
    * **Prompt:** "In the `[Component Name]` component, remove all the prop drilling."
    * **Purpose:** Remove prop drilling.
*   **Note:** We will have to create a set of prompts 5.1-5.5 for each component.

**Phase 3: Testing**

**6. Testing Custom Hooks**

* **Prompt 6.1 (test `useStatementsManager`):**
    * **Prompt:**  "Create a new test file for the `useStatementsManager` hook. In this test file add a test to check that it gets the statements correctly, and another to check that it adds a new statement correctly."
    *   **Purpose:** Test the hook.
* **Prompt 6.2 (test `useSummarizeStatements`):**
    * **Prompt:**  "Create a new test file for the `useSummarizeStatements` hook. In this test file, add a test to check that the `handleSummarizeClick` function is working."
    *   **Purpose:** Test the hook.
* **Prompt 6.3 (test `useErrorHandler`):**
    * **Prompt:**  "Create a new test file for the `useErrorHandler` hook. In this test file, add a test to check that the `setError` function is working."
    *   **Purpose:** Test the hook.

**7. Testing Components**

*   **Prompt 7.1 (test `[Component Name]`):**
    *   **Prompt:** "Create a new test file for the `[Component Name]` component. Test that it renders correctly, and make sure that all the hooks' functions are called."
    *   **Purpose:** Test the component.
    * **Note:** We will have to create a prompt 7.1 for each component.

**8. Refactor Old Test**

* **Prompt 8.1 (refactor `[Test Name]`):**
    * **Prompt:** "Refactor the `[test Name]` test file. Update all the code to adapt to the new code."
    * **Purpose**: Refactor the old test.
    * **Note**: We will have to create a prompt 8.1 for each old test.

**Phase 4: Documentation**

**9. Documenting Hooks:**

*   **Prompt 9.1 (document `useStatementsManager`):**
    *   **Prompt:** "Update the `refactoring_guide.md` file. Add a section that describes the purpose and usage of the `useStatementsManager` hook."
    *   **Purpose:** Document the hook.
*   **Prompt 9.2 (document `useSummarizeStatements`):**
    *   **Prompt:** "Update the `refactoring_guide.md` file. Add a section that describes the purpose and usage of the `useSummarizeStatements` hook."
    *   **Purpose:** Document the hook.
* **Prompt 9.3 (document `useErrorHandler`):**
    *   **Prompt:** "Update the `refactoring_guide.md` file. Add a section that describes the purpose and usage of the `useErrorHandler` hook."
    *   **Purpose:** Document the hook.

**10. Update checklist**

* **Prompt 10.1 (update `project_checklist`):**
    * **Prompt:** "Update the `project_checklist.md` file to include the completed and remaining Plan B tasks."
    * **Purpose:** Update the checklist.

**11. Update test guide**:

* **Prompt 11.1 (update `testing_guide`):**
    * **Prompt:** "Update the `testing_guide.md` file to include the new test files."
    * **Purpose:** Update the test guide.

**How to Use This Guide:**

1.  Start with the checklist in section I.
2.  For each item in the checklist, look for the corresponding prompt in section II.
3. Follow the prompts to work with the AI.
4. After each prompt, carefully review the code.
5. Adjust the prompt if necessary.
6. Once you're happy with the result, mark the item as completed in the checklist and move on to the next.

**Estimated Total Prompts:**

*   Context API & Hooks: 17 prompts
*   Component Refactoring: 5 prompts per component.
*   Testing: 4 prompts for the new hooks, and 1 for each component, and 1 for each old test.
*   Documentation: 3 + 1 + 1 prompts
*   **Total:** 26 + (6 x the number of components) + (number of old test)
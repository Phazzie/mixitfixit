# Refactoring Guide: Relationship Resolver Project

**[Link to Project Checklist](project_checklist.md)**

**[Link to Glossary](#glossary)**


## Introduction

This guide outlines the comprehensive plan for the refactoring and development of the Relationship Resolver project, following the World-Class Plan. Our goal is to build an exceptional application that helps resolve relationship conflicts effectively and intuitively. This guide details our current state, the principles guiding our refactoring efforts, our objectives, and a detailed plan with specific actions to enhance the codebase. We will also focus on value-first development, user feedback, and CI for testing.

## Guiding Principles

## Why Refactor?

Refactoring is a crucial step in the evolution of any software project. For the Relationship Resolver, refactoring is not just about improving the existing code, but about laying a solid foundation for future growth and innovation. Here are the primary reasons why we're embarking on this refactoring journey:

*   **Improve Code Quality:** Refactoring allows us to apply best practices to our codebase, resulting in code that is more readable, maintainable, and less error-prone.
*   **Enhance Maintainability:** By organizing our code into clear modules and following principles like SRP, DRY, and KISS, we'll make it much easier to modify and update the codebase in the future.
*   **Boost Performance:** Refactoring can help us identify and address performance bottlenecks, leading to a faster and more responsive application.
*   **Enable Future Feature Development:** A well-structured codebase makes it significantly easier to add new features and functionalities down the line.
* **Reduce bugs**: Refactoring, and testing allows us to find bugs, and have less errors.
* **Extensibility**: Refactoring allows us to make the code more extensible, so it's easier to add new features.
* **Testability**: Refactoring allows us to make the code more testable, so it's easier to test it.



## Examples

Here are some examples to illustrate the concepts:

*   **Single Responsibility Principle (SRP):** Instead of having a function that does multiple tasks, like saving to local storage and updating the UI, we break it into two functions.
*   **Don't Repeat Yourself (DRY):** If we find duplicate code, like validation logic in the frontend and backend, we create a shared module.
*   **Keep It Simple, Stupid (KISS):** If a function has a lot of if statements, we simplify it by breaking it into smaller functions.
*   **Modularity**: Instead of having all the code in one file, we create multiple files, like components, utils, etc, to break down the code.
* **Testing**: Instead of just hoping the code works, we create tests that check that the code works correctly.
* **Code review**: Instead of just hoping the code is correct, we review the code, to find errors, and improve quality.


## Guiding Principles

We will follow the World-Class Plan and its principles:

* **Contract-Driven Development**: We will use contracts to define the behavior of each module.
* **Prioritized Incremental Refactoring**: We will break down the code into logical modules, define contracts for those modules, and then refactor them one by one.
* **Value-First Development**: We will prioritize refactoring and testing areas that deliver the most immediate value to users.
* **Modularity**: We will develop the app in modules, making sure we separate the different responsibilities.
* **Readability**: We will make sure the code is readable, with the right naming and comments.
* **Comprehensive Testing**: We will implement extensive testing (unit, integration, end-to-end) from the start.
* **CI for Testing**: We will use CI to implement automated tests.
* **User Feedback**: We will get user feedback early and often.
* **Advanced Data Structures**: We will design our data structures to be very advanced.
* **Automated Code Analysis**: We will use tools to check the code.
* **Robust Error Handling**: We will use a robust error handling.
* **Performance Optimization**: We will try to optimize performance.

## 1. Current State Analysis
 
The Relationship Resolver project is in the mid-stages of development. It aims to create an MVP web application to help resolve relationship conflicts through user-inputted statements and AI-generated summaries.
 
**Key Components & Features:**

*   **Frontend (React):**
    *   UI for code generation.
    *   Text areas for user input.
    *   Submit buttons for each text area.
    *   Display area for submitted statements.
    *   "Summarize with AI" button.
    *  Code Generation
    * Local Storage
*   **Backend (Node.js/Express):**
    *   `/api/ai-summarize` endpoint.
    *   Integration with the Google Gemini API.
    *   POST request handling for user statements.
    *   JSON response with AI-generated summaries.
    * Dependency injection for gemini API.
*   **Data:**
    *   Temporary `localStorage` for data persistence.
*   **Development:** Google IDX

**Areas Needing Improvement:**

*   **Error Handling:** Incomplete; needs proper HTTP status codes, detailed error messages, and user-friendly feedback.
*   **Input Validation:** Lacking; needs data validation in both frontend and backend.
*   **Code Quality:**
    *   Potential violations of SRP, DRY, KISS principles.
    *   Readability issues (naming, indentation, commenting).
    *   Unclear modularity and separation of concerns.
    * Unsure extensibility.
*   **Testing:** No tests implemented, no CI.

## 2. Rationale for Deep Refactor

A deep refactor is essential to transition the project from a rapidly developed prototype to a robust, maintainable application.

**Key Reasons:**

*   **Rapid Development Compromises:** The initial focus on rapid development might have led to shortcuts that now hinder long-term maintainability.
*   **Project Guidelines:** The project aims to adhere to software development best practices:
    *   **Single Responsibility Principle (SRP):** Ensure each function, module, and component has a single, well-defined responsibility.
    *   **Don't Repeat Yourself (DRY):** Eliminate code duplication and promote code reuse.
    *   **Keep It Simple, Stupid (KISS):** Simplify overly complex code.
    *   **Modularity:** Organize the code into independent modules for better organization and maintainability.
    *   **Separation of Concerns:** Clearly separate UI, logic, and data handling.
    *   **Readability:** Improve code clarity through consistent indentation, meaningful names, and useful comments.
    *   **Extensibility:** Design the code to easily accommodate new features or changes in the future.
*   **Error Handling:** Enhance error handling to provide robustness and improve debugging.
*   **Input Validation:** Prevent issues caused by invalid data and ensure data integrity.
* **Testing**: to make sure there are no regressions and code works as intended.
* **Code review**: To make sure the code is correct, readable and maintainable.

## 3. Refactoring Objectives

Our primary goals are to:

*   **Elevate Code Quality:** Ensure we are using SRP, DRY, KISS, Modularity, Separation of Concerns, Readability, Extensibility, and contracts.
*   **Minimize Bugs:** Strengthen error handling and input validation to preemptively manage errors.
*   **Maximize Maintainability:** Craft code that is clear, concise, and easy to update or expand.
*   **Future-Proof the Application:** Set up the codebase for effortless integration of future features and enhancements.


## 4. Refactoring Plan

### Component Breakdown

#### Frontend (React)

*   **Action:** Review each component. Break down components that manage multiple UI elements or data processes into smaller, single-purpose components.
*   **Example:**
    *   **Original Location:** `frontend/App.js` might currently handle code generation, input areas, display of submissions, and the "Summarize" button.
    *   **New Location:** Create separate components: `CodeGenerator.js`, `InputArea.js`, `SubmissionDisplay.js`, `SummarizeButton.js`.
    *   **Broken References:** `App.js` will no longer directly render these elements. Imports in `App.js` will need to be changed.
    *   **Relinking Steps:**
        1.  Create the new component files.
        2.  Move the relevant JSX, state, and handler functions to the new files.
        3.  Update `App.js` to import and render these new components.
        4.  Ensure props are passed appropriately to maintain functionality.
    *   **Action:** Add a component for input validation errors.
    *   **Example:**
        * **Original Location:** error handling for text area inputs is located in `frontend/App.js`.
        * **New Location**: create `frontend/components/InputError.js` to display the error.
        * **Broken References**: `frontend/App.js` will no longer be rendering error messages.
        * **Relinking Steps:**
            1. create `frontend/components/InputError.js`.
            2. move error message rendering code to `frontend/components/InputError.js`
            3. import and render `frontend/components/InputError.js` in `frontend/App.js`.
            4. pass the necessary props to `frontend/components/InputError.js`
* **Action**: Create a component for displaying the summary.
    * **Original Location**: Summary is currently displayed in `frontend/App.js`.
    * **New Location**: Create `frontend/components/SummaryDisplay.js`.
    * **Broken References**:  `frontend/App.js` will no longer be rendering the summary.
    * **Relinking Steps**:
        1. create `frontend/components/SummaryDisplay.js`.
        2. move summary display code to `frontend/components/SummaryDisplay.js`.
        3. import and render `frontend/components/SummaryDisplay.js` in `frontend/App.js`.
        4. pass the necessary props to `frontend/components/SummaryDisplay.js`.
* **Action**: add a component for displaying all of the statements.
    * **Original Location**: statements are displayed in `frontend/App.js`
    * **New Location**: create `frontend/components/StatementDisplay.js`.
    * **Broken References**: `frontend/App.js` will no longer be rendering the statements.
    * **Relinking Steps**:
        1. create `frontend/components/StatementDisplay.js`.
        2. move statement display code to `frontend/components/StatementDisplay.js`.
        3. import and render `frontend/components/StatementDisplay.js` in `frontend/App.js`.
        4. pass the necessary props to `frontend/components/StatementDisplay.js`.

#### Backend (Node.js/Express)

*   **Action:** Review the backend code. Identify areas that can be grouped together, such as API related code, or database related code.
* **Example:**
    *   **Original Location:** API call to gemini might be in `backend/server.js`.
    * **Contract**: There should be a clear contract with the gemini API, so it can be changed if needed.
    *   **New Location:** Move the logic into a separate module `backend/geminiApi.js`.
    *   **Broken References:** `backend/server.js` will no longer directly make calls to the gemini API.
    *   **Relinking Steps:**
        1.  Create the new `geminiApi.js` module.
        2.  Move the Gemini API-related functions into it.
        3.  Update `backend/server.js` to import and use the functions from `geminiApi.js`.
* **Action:** Create a module for input validation.
    * **Original Location:** validation logic is currently in `backend/server.js`.
    * **Contract**: Create a contract for the validation functions, so it can be changed if needed.
    * **New Location:** create `backend/validation.js`.
    * **Broken References**: `backend/server.js` will no longer be doing validation logic.
    * **Relinking Steps:**
        1. Create `backend/validation.js`.
        2. move validation logic to `backend/validation.js`.
        3. import and use `backend/validation.js` in `backend/server.js`

### Function Decomposition

*   **Action:** Identify functions that are long or perform multiple tasks. Break them down into smaller functions, each with a single, well-defined responsibility (SRP).
*   **Example:**
    *   **Original Location:** `frontend/App.js` might have a function `handleSubmit` that handles both storing user input in `localStorage` and updating the UI.
    *   **New Location:** Create separate functions: `storeInput(code, user, text)` for storing the data, and `updateSubmissionDisplay()` for the UI.
    * **Contracts**: Both functions should have a contract.
    *   **Broken References:** The code that is calling `handleSubmit` will need to be modified to call `storeInput()` and `updateSubmissionDisplay()`
    *   **Relinking Steps:**
        1. Create the new `storeInput(code, user, text)` function.
        2. Move the storage code to this new function.
        3. Create the new `updateSubmissionDisplay()` function.
        4. move the UI code to this new function.
        5. update `handleSubmit` to call the new functions in the correct order.
*   **Action:** Do the same for the backend.
*   **Example:**
    * **Original Location:** `backend/server.js` might have a function that both handles the api request, and builds the request to send to gemini.
    * **New Location:** move the code responsible for building the gemini request to a new function, like `buildGeminiRequest()`.
    * **Contract**: This function should have a contract.
    * **Broken References:** the code that called the original function will now call both `buildGeminiRequest()` and the rest of the request logic.
    * **Relinking Steps:**
        1. create the new function.
        2. move the request logic to the new function.
        3. update the original function to call the new function, and use the output.

### Code Duplication

*   **Action:** Identify duplicated code across the project. Extract the common code into reusable functions or modules (DRY).
*   **Example:**
    *   **Original Location:** Similar code to validate input is in both the frontend and the backend.
    *   **New Location:** Create a `validation.js` file (or module) in both the frontend and backend. Move the validation functions to these new files.
    * **Contracts**: The validation functions should have a contract.
    *   **Broken References:** Files that had validation logic will no longer have it.
    *   **Relinking Steps:**
        1.  Create the `validation.js` files.
        2.  Move all the validation logic to this new files.
        3.  Import and use these functions where necessary, frontend and backend.

### Readability

*   **Action:** Apply consistent formatting, naming conventions, and commenting to improve code clarity.
*   **Naming:**
    *   Use descriptive names (e.g., `userStatements`, `apiSummary`, `generateRandomCode`).
    *   Use camelCase for variables and functions (e.g., `userInput`, `fetchSummary`).
    *   Use PascalCase for React components (e.g., `CodeGenerator`, `InputArea`).
*   **Indentation:**
    *   Use consistent indentation (e.g., 2 or 4 spaces) throughout the project.
*   **Commenting:**
    *   Add comments to explain complex logic, non-obvious code, or critical decisions.
    *  use JSDoc when commenting.
    *   Avoid redundant comments that simply state what the code is doing.

### Error Handling

*   **Action:** Implement robust error handling throughout the project.
*   **Backend:**
    *   Use appropriate HTTP status codes (e.g., 400 for bad requests, 500 for server errors).
    *   Return detailed error messages in the response body (JSON format).
    *   Handle Gemini API errors and network issues gracefully.
*   **Frontend:**
    *   Display user-friendly error messages for API failures.
    *   Handle local storage errors.
    *   Provide specific feedback for input validation issues.
    * Create a component that is responsible for handling and displaying all errors.

### Input Validation

*   **Action:** Create a centralized input validation module and integrate it throughout the project.
*   **Implementation:**
    *   Create a `validation.js` module in both frontend and backend.
    *   Include functions to validate different types of data (e.g., `isValidCode()`, `isValidStatement()`, `isStatementEmpty()`).
    *   Use these validation functions in appropriate places.

### Extensibility

* **Action**: Ensure the code is structured in a way that is easy to modify and extend.
* **Implementation**:
    *   Use good separation of concerns.
    * use components and modules.
    * use comments where needed.
    * Use meaningful names.
    * break down code into single purposed functions.

### Modularity

* **Action**: Ensure the code is organized in modules, and that the modules are used.
* **Implementation**:
    * break down code into different files.
    * import modules when needed.
    * ensure functions are in the correct modules.
    * group related code in the same module.

### Testing and Verification

*   **Action:** Implement tests to confirm the refactoring is correct and that the application functions as expected.
*   **Types of Tests:**
    *   **Unit Tests:** Test individual functions and components in isolation.
        *   **Example:** Test the `generateRandomCode()` function to ensure it generates codes of the correct length and format.
        * **Contract**: Make sure to test the function against the contract.
        *   **Example:** Test the `validateStatement()` function to ensure it correctly detects invalid input.
        * **Contract**: Make sure to test the function against the contract.
    *   **Integration Tests:** Test how components or modules work together.
        *   **Example:** Test the interaction between the `InputArea` component and the `localStorage` storage.
        *   **Example:** Test the interaction between the front end and the backend when posting data and receiving a summary.
*   **Checks**:
    * Make sure the application works the same as before the refactor.
    * Check the browser console for any errors.
    * Check the backend console for any errors.

### Bug Fixes

Fixing bugs effectively is critical for creating high-quality software. Here are some guidelines for bug fixes:

* **Understand the Bug:** Before attempting a fix, make sure you fully understand the bug. Try to reproduce it reliably.
* **Isolate the Problem:** Pinpoint the exact code section causing the issue.
* **Write a Test:** If possible, write a failing test that reproduces the bug. This will help ensure that the bug is truly fixed and won't reappear later.
* **Fix the Bug:** Make the necessary code changes to resolve the issue.
* **Run the Test:** Run the test you wrote (or an existing test) to confirm that the bug is fixed.
* **Test Thoroughly:** Don't rely solely on the test you wrote. Test the surrounding code and related features to ensure that the bug fix didn't create any new problems.
* **Document the Fix:** Add comments to the code explaining the bug and the fix. This will help others (and your future self) understand the history of the code.
* **Code Review:** Have another developer review your bug fix to ensure its correctness and quality.

### Code review

* **Have someone else review your code**: Have another person review your code, this person should check for:
    * Correctness.
    * Readability.
    * Comments.

## 5. Next Steps

After completing the deep refactor:

1.  **Comprehensive Code Review:** Conduct a thorough review of the entire codebase to catch any remaining issues.
2.  **Implement More Tests:** Expand the test suite to cover more cases.
3.  **Refine:** Go back and improve parts of the code that are still weak, or can be improved.
4.  **Address the remaining project checklist:** begin working on the checklist and adding the remaining features.
5.  **Monitor and Maintain:** Regularly review and update the code to prevent code quality issues from accumulating.

This guide provides a robust framework for refactoring the Relationship Resolver project. By following these steps, we can significantly improve the quality, maintainability, and extensibility of the codebase.

## Phases

### Phase 3: General Review and Cleanup / Tests in Progress

**Goals:**

*   **Improve Code Quality**: Make sure the code is more readable, maintainable, and modular.
*   **Implement CI for Testing**: Start using CI to run tests.
* **Prioritize key features**: Refactor the most important features.

**Tasks:**

*   **Prioritize key features**:
    *   Identify the most important features (steel-manning, locked statements).
    *   Refactor the steel-manning feature.
        * add unit tests for the steel-manning feature.
    *   Refactor the locked-statements feature.
        * Add unit tests for the locked-statements feature.
*   **DRY (Don't Repeat Yourself)**:
    *   Analyze the codebase for code duplication.
    *   Refactor duplicated code into reusable functions.
        * Add unit tests for the new functions.
*   **KISS (Keep It Simple, Stupid)**:
    *   Identify complex code sections.
    *   Simplify complex code sections.
        * Add unit tests for the simplified code.
*   **Modularity**:
    *   Identify code that can be split into modules.
    *   Split the code into modules.
        * Add tests to all the modules.
*   **Readability**:
    *   Ensure consistent formatting, naming, and commenting.
        * add unit tests for refactored code.
*   **Comments**:
    * Add comments where needed.
        * add unit tests for refactored code.
*   **SRP**:
    * Ensure all functions have a single responsability.
        * add unit tests for refactored code.
* **Implement CI for tests**:
    * Choose a CI service (e.g., GitHub Actions).
    * Configure the CI service to run unit tests on every push.

### Phase 4: Extensibility and advanced refactoring

**Goals:**

*   **Extensibility:** Set up the data structures to be very extensible.
*   **Data Access Layer:** Set up the data access layer.
*   **Supabase:** Add supabase.
* **Modular development**: Ensure all the code is modular.

**Tasks:**

*   **Create a data access layer**:
    *   Create a data access layer.
        * Add tests for functions in the data access layer.
*   **Design Data structures**:
    * Design the data structures.
    * Make sure they are being used correctly.
*   **Contract-driven development**:
    * Make sure all the code follows a contract.
*   **Advanced Data structures**:
    * Make sure the data structures are designed in the best way.
*   **Implement Supabase**:
    * Set up Supabase.
    * Integrate Supabase.
        * Add tests for Supabase integration.
* **Modular development**:
    * Make the app modular.

### Phase 5: Expanded Testing and quality check

**Goals:**

*   **Comprehensive Testing**: Implement unit, integration, and end-to-end tests.
* **Quality**: Ensure the quality of the code.

**Tasks:**
* **Prioritize key workflows**:
    * Focus testing in key workflows.
*   **Unit Tests**:
    * Finish all the unit tests.
*   **Integration Tests**:
    * Do integration tests to make sure all parts of the code work well.
*   **End to End Tests**:
    * Make sure all workflows work correctly.
*   **Automated Code Analysis**:
    * Add automated code analysis.
*   **Robust Error Handling**:
    * Implement a robust error handling.
*   **Performance optimization**:
    * Do performance optimizations.

### Phase 6: Database

**Goals:**

*   **Database:** Migrate all data to the database.

**Tasks:**

*   **Implement database**:
    *   Migrate all data to the database.

### Phase 7: Further Considerations (Post-MVP)

**Goals:**

*   **Deep Refactor:** Refactor parts of the code that are still bad.
* **New Features**: Implement new features.
* **User feedback**: Use user feedback to change the app.
* **User testing**: Do user testing.
* **Continuous Deployment**: Implement continuous deployment.

**Tasks:**

*   **Deep Refactor.**
*   **Advanced AI Integration.**
* **User testing**:
    * Do user testing.
* **User Feedback**:
    * Get user feedback.
    * Implement user feedback.
* **Implement CD (Optional)**:
    * Consider implementing CD.

## User feedback

* We will get user feedback as soon as possible.
* We will use user feedback to make changes to the app.
* We will focus on the user needs.

## Value First

* We will focus on value first, by implementing the features that will give more value to the users.
* We will add the features that are most needed first.
* We will try to deliver value as soon as possible.
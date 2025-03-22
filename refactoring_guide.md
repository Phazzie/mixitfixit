## Refactoring Guide

<!-- Link to the project checklist -->
[Link to the project checklist](project_checklist.md)
<!-- Link to the project guide -->
[Link to the project guide](projguid.md)

## Introduction
<!-- Introduction to the Refactoring Guide -->
This guide outlines the comprehensive plan for the refactoring and development of the Relationship Resolver project. [You can check more about the project in the project guide](projguid.md).
Our goal is to build an exceptional application that helps resolve relationship conflicts effectively and intuitively. This guide details our current state, the principles guiding our refactoring efforts, our objectives, and a detailed plan with specific actions to enhance the codebase.
<!-- Explanation of Phased Refactoring -->
We will use phased refactoring to refactor the code, to reduce the risk, and make it more manageable.

## Hooks
<!-- Section about Hooks -->
We have already implemented the basic features of the app, so now it's time to refactor.
This guide outlines the comprehensive plan for the refactoring and development of the Relationship Resolver project.
Our goal is to build an exceptional application that helps resolve relationship conflicts effectively and intuitively. This guide details our current state, the principles guiding our refactoring efforts, our objectives, and a detailed plan with specific actions to enhance the codebase.
<!-- Mention of Value-First Development, User Feedback, and CI -->
We will also focus on value-first development, user feedback, and CI for testing.


## Plan B
<!-- Section about Plan B -->
Plan B is the strategy we're employing for this refactor, and you can find a detailed breakdown in the [Plan B refactor guide](side_refactor.md).

We are implementing a refactor, using contexts and hooks. This is detailed in the [Plan B refactor guide](side_refactor.md)

## Plans
## Guiding Principles
## Why Refactor?
<!-- Section explaining why refactoring is necessary -->
Refactoring is a crucial step in the evolution of any software project. For the Relationship Resolver, refactoring is not just about improving the existing code, but about laying a solid foundation for future growth and innovation. Here are the primary reasons why we're embarking on this refactoring journey:

*   **Improve Code Quality:** Refactoring allows us to apply best practices to our codebase, resulting in code that is more readable, maintainable, and less error-prone. We are aiming for this principles:
    * Single Responsibility Principle (SRP)
    * [Testing](testing_guide.md)
    * Don't Repeat Yourself (DRY)
    * Keep It Simple, Stupid (KISS)
*   **Enhance Maintainability:** By organizing our code into clear modules and following principles like SRP, DRY, and KISS, we'll make it much easier to modify and update the codebase in the future.
*   **Boost Performance:** Refactoring can help us identify and address performance bottlenecks, leading to a faster and more responsive application.
*   **Enable Future Feature Development:** A well-structured codebase makes it significantly easier to add new features and functionalities down the line.
* **Reduce bugs**: Refactoring, and testing allows us to find bugs, and have less errors.
* **Extensibility**: Refactoring allows us to make the code more extensible, so it's easier to add new features.
* **Testability**: Refactoring allows us to make the code more testable, so it's easier to test it.

### Examples
<!-- Examples of refactoring concepts -->
This guide will use several examples to illustrate the concepts.
Here are some examples to illustrate the concepts:


*   **Single Responsibility Principle (SRP):** Instead of having a function that does multiple tasks, like saving to local storage and updating the UI, we break it into two functions.
    * We will create a test for each of the new functions.
*   **Don't Repeat Yourself (DRY):** If we find duplicate code, like validation logic in the frontend and backend, we create a shared module.
*   **Keep It Simple, Stupid (KISS):** If a function has a lot of if statements, we simplify it by breaking it into smaller functions.
*   **Modularity**: Instead of having all the code in one file, we create multiple files, like components, utils, etc, to break down the code.
* **Testing**: Instead of just hoping the code works, we create tests that check that the code works correctly.
* **Code review**: Instead of just hoping the code is correct, we review the code, to find errors, and improve quality.

## Refactoring principles

<!-- Refactoring principles -->
We will follow these principles:

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
### Hooks
<!-- Section about the Current State Analysis -->
<!-- Link to the Project Guide -->
You can find more details about the project in the [Project guide](projguid.md).
<!-- Analysis of useErrorHandler Hook -->

*   **`useErrorHandler`**: This hook provides a way to manage and handle errors within the application.
    * **Improved**: The hook now validates the input, making sure it is a `string` or `null`.
    *   **Function:**
        * **setError**: This function is used to set an error. It receives the error as a parameter, and makes sure it is a `string` or `null`.
            * **Validation**: The hook now includes input validation. It will only accept string or null values. If a non-string value is passed to the `setError` function, it will log a warning to the console and set a default error message ("Invalid error type received").
    *   **Variable:**
        * **error**: This variable holds the error message.
*   **`useStatementsManager`**: This hook is responsible for managing statements.
<!-- Analysis of useStatementsManager Hook -->
    * **Improved:**
        *   **addStatement**: The `addStatement` function now requires non-empty string values for `code`, `user`, and `text`. Invalid input will result in a warning being logged and the function returning early.
        * **getStatements**:  `getStatements` now takes an `setError` function as a parameter to handle potential errors during statement retrieval.
        * **Returns:** This hook returns an object with the `getStatements` and `addStatement` functions.
*   **`useSummarizeStatements`**: This hook is responsible for managing the AI summarization of the statements.
    * **Improved**:
<!-- Analysis of useSummarizeStatements Hook -->
        * The hook now validates the `getMostRecentStatement` parameter, ensuring it is a function, and checks if `code` is a non-empty string.
        * The `handleSummarizeClick` function now checks if `setIsSummarizing` is a function and will throw an error if it's not.
        * The `handleSummarizeClick` function will now catch errors inside it and update the `apiError` state.
        * **Returns**: This hook returns an object with the `aiResponse`, `apiError` and `handleSummarizeClick` properties.
        * **handleSummarizeClick**: This function takes a function called `setIsSummarizing` as a parameter. This function will be used to set the `isSummarizing` state variable, and it will throw an error if it is not a function.





<!-- Current State of the Project -->

The Relationship Resolver project has implemented the core features of the app, all of them are in a basic state, and will need to be refactored.
The next step is to refactor the code, and prepare it for the implementation of the remaining features.

We will start with a deep refactor, that will improve the code quality.

**Key Components & Features:**

<!-- Implemented Features -->
*   **Implemented Features:**
    *   **[Issue Proposal and Agreement](client/src/App.js):** Users can propose an issue, and the other user can accept, modify or reject it.
    *   **[Steel-Manning](client/src/App.js):** Users can restate the other users issue, and the other user can agree if it is correct.
    *   **[Statement Locking](client/src/App.js):** Once a user sends a statement, it is locked.
    *   **[Discussion](client/src/App.js):** Users can discuss in real time.
    *   **[Resolution](client/src/App.js):** Users can propose a resolution, and the other user can accept, modify or reject it.
    *   **[Summary](client/src/App.js):** Users can see a summary of the process.
    *   **[Basic Data Access Layer](client/src/data/dataManager.js):** The data access layer has been created, and it now manages all of the storage related actions.
    * **[Basic Contracts](client/src/data/dataContracts.js)**: The basic contracts have been created.
        * The contracts provide a definition of the functions in the data access layer.
    * **[Tests](client/src/data/dataManager.test.js)**: basic tests have been created.
*   **Basic Implementation:** All of the features have been implemented in a basic way. All of them need to be refactored.



<!-- Backend Details -->








*   **Backend (Node.js/Express):**
    *   `/api/ai-summarize` endpoint.
    *   Integration with the Google Gemini API.
    *   POST request handling for user statements.
    *   JSON response with AI-generated summaries.
    * Dependency injection for gemini API.
*   **Data:**
    *   Temporary `localStorage` for data persistence.
*   **Development:** Google IDX

<!-- Areas Needing Improvement -->
**Areas Needing Improvement and Implementation:**

*   **Error Handling:** Incomplete; needs proper HTTP status codes, detailed error messages, and user-friendly feedback.
*   **Input Validation:** Lacking; needs data validation in both frontend and backend.
*   **Code Quality:**
    *   Potential violations of SRP, DRY, KISS principles.
    *   Readability issues (naming, indentation, commenting).
    *   Unclear modularity and separation of concerns.
    * Unsure extensibility.

We will use phased refactoring to refactor the code, to reduce the risk, and make it more manageable.
<!-- Rationale for Deep Refactor -->
## 2. Rationale for Deep Refactor

<!-- Reasons for a Deep Refactor -->
A deep refactor is essential to transition the project from a rapidly developed prototype to a robust, maintainable application.

**Key Reasons:**

*   **Rapid Development Compromises:** The initial focus on rapid development might have led to shortcuts that now hinder long-term maintainability.
*   **Project Guidelines:** The project aims to adhere to software development best practices:
    *   **Single Responsibility Principle (SRP):** Ensure each function, module, and component has a single, well-defined responsibility.
    * **Steel manning**: Implement steel manning, to make sure the code follows the user experience and guidelines.
    *   **Don't Repeat Yourself (DRY):** Eliminate code duplication and promote code reuse.
    *   **Keep It Simple, Stupid (KISS):** Simplify overly complex code or logic.
    *   **Modularity:** Organize the code into independent modules for better organization and maintainability.
    *   **Separation of Concerns:** Clearly separate UI, logic, and data handling.
    *   **Readability:** Improve code clarity through consistent indentation, meaningful names, and useful comments.
    *   **Extensibility:** Design the code to easily accommodate new features or changes in the future.
*   **Error Handling:** Enhance error handling to provide robustness and improve debugging.
*   **Input Validation:** Prevent issues caused by invalid data and ensure data integrity.
* **Testing**: to make sure there are no regressions and code works as intended.
* **Data Access Layer**: To make sure we are following the correct practices.
* **Contract-Driven Development**: To make sure we are following the correct practices.
## 3. Refactoring Objectives


<!-- Refactoring Objectives -->
Our primary goals are to:

*   **Elevate Code Quality:** Ensure we are using SRP, DRY, KISS, Modularity, Separation of Concerns, Readability, Extensibility, and contracts.
*   **Minimize Bugs:** Strengthen error handling and input validation to preemptively manage errors.
*   **Maximize Maintainability:** Craft code that is clear, concise, and easy to update or expand.
*   **Future-Proof the Application:** Set up the codebase for effortless integration of future features and enhancements.

### Component Breakdown

<!-- Frontend Component Refactoring -->
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
            4. pass the necessary props to `frontend/components/InputError.js`.
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

<!-- Backend Component Refactoring -->
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
        2. Move validation logic to `backend/validation.js`.
        3. import and use `backend/validation.js` in `backend/server.js`

### Function Decomposition
<!-- Function Decomposition Section -->

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
<!-- Code Duplication Section -->

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
<!-- Readability Section -->

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
<!-- Error Handling Section -->

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
<!-- Input Validation Section -->

*   **Action:** Create a centralized input validation module and integrate it throughout the project.
*   **Implementation:**
    *   Create a `validation.js` module in both frontend and backend.
    *   Include functions to validate different types of data (e.g., `isValidCode()`, `isValidStatement()`, `isStatementEmpty()`).
    *   Use these validation functions in appropriate places.

### Extensibility
<!-- Extensibility Section -->

* **Action**: Ensure the code is structured in a way that is easy to modify, and extend.
* **Implementation**:
    *   Use good separation of concerns.
    * use components and modules.
    * use comments where needed.
    * Use meaningful names.
    * break down code into single purposed functions.

### Modularity
<!-- Modularity Section -->

* **Action**: Ensure the code is organized in modules, and that the modules are used.
* **Implementation**:
    * break down code into different files.
    * import modules when needed.
    * ensure functions are in the correct modules.
    * group related code in the same module.

### Testing and Verification

<!-- Testing Section -->
We will use the guide in [testing guide](testing_guide.md) to implement all the tests.



### Test Driven Development

<!-- Test Driven Development Section -->
We will be using test-driven development:

1. **Write a failing test**: We will write a failing test for each new feature or fix.
2. **Write the code**: We will write the code to pass the test.
3. **Refactor**: We will refactor the code, making sure it passes all the tests.
4. **Repeat**: We will repeat the process for each new feature or fix.
### 5. Next Steps

<!-- Next Steps Section -->
This guide provides a robust framework for refactoring the Relationship Resolver project. By following these steps, we can significantly improve the quality, maintainability, and extensibility of the codebase.

## Phases

<!-- Phases Section -->
We will refactor the code in phases. This is to reduce the risk and make it more manageable.
### Phase 3: General Review and Cleanup / Tests in Progress
**Goals**:
    We will work on this phase, once we implement all the features.
*   **Improve Code Quality**: Make sure the code is more readable, maintainable, and modular.
*   **Implement CI for Testing**: Start using CI to run tests.
* **Prioritize key features**: Refactor the most important features.

**Tasks:**
    *Make sure to follow the testing and development guidelines in this guide.
    *
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

<!-- Phase 4 Section -->
**Goals**(now out of scope, we will implement the code first):
We will work on this phase, once we implement all the features.

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

<!-- Phase 5 Section -->
**Goals**(now out of scope, we will implement the code first):
We will work on this phase, once we implement all the features and refactor the code.

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

<!-- Phase 6 Section -->
**Goals**(now out of scope, we will implement the code first):
We will work on this phase, once we implement all the features and refactor the code.

*   **Database:** Migrate all data to the database.

**Tasks:**

*   **Implement database**:
    *   Migrate all data to the database.

### Phase 7: Further Considerations (Post-MVP)

<!-- Phase 7 Section -->
**Goals**(now out of scope, we will implement the code first):
We will work on this phase, once we implement all the features and refactor the code.

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
<!-- User feedback Section -->
* We will use user feedback to make changes to the app.
* We will focus on the user needs.

## Value First

* We will focus on value first, by implementing the features that will give more value to the users.
* We will add the features that are most needed first.
<!-- Value first Section -->
* We will try to deliver value as soon as possible.
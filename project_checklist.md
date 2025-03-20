# Project Checklist

[Link to Refactoring Guide](refactoring_guide.md)

## Phase 3: Implement Missing Features (Estimated Time: 28 hours, Priority: High)

    -   [ ] **Implement Issue Proposal and Agreement** (Estimated time: 4 hours, Priority: High)
        -   [x] Implement UI elements.
        -   [x] Implement logic for handling Accept, Modify, Reject actions.
        -   [x] Ensure discussion cannot start until an issue is agreed upon.
        -   [x] verify that the code is commented.
        -   [x] commit changes
         -  [ ] Verify that the code is commented.
         -  [ ] Verify the changes were commited.
         -  [ ] Verify all the tests are passing.

         
    -   [ ] **Implement Basic Steel-Manning** (Estimated time: 4 hours, Priority: High)
        -   [x] Implement UI elements.
        -   [x] Implement logic for restating.
        -   [x] Implement logic for confirming understanding.
        - **Dependencies**: This must be done after implementing Issue Proposal and agreement.
          - [ ] verify that the code is commented.
          - [ ] commit changes
         -  - [ ] Verify that the code is commented.
         -  [ ] Verify the changes were commited.
         -  - [ ] Verify all the tests are passing.
    -   [ ] **Implement Basic Statement Locking** (Estimated time: 2 hours, Priority: High)
        -   [x] Modify UI to "lock" statements.
        -   [x] Implement code to prevent editing.
        -   [ ] verify that the code is commented.
        -   [ ] commit changes
         -  [ ] Verify that the code is commented.
         -  [ ] Verify the changes were commited.
         -  [ ] Verify all the tests are passing.

    - [ ] **Implement Basic Discussion Phase**. (Estimated time: 4 hours, Priority: High)
        - [ ] Create basic UI for real-time back-and-forth typing.
    - [ ] **Implement Basic Resolution Phase**. (Estimated time: 4 hours, Priority: High)
        - [ ] Implement UI elements.
        - [ ] Implement logic for handling Accept, Modify, Reject actions.
        - [ ] Implement logic to lock the resolution.
    - [ ] **Implement Basic Summary Phase**. (Estimated time: 4 hours, Priority: High)
        - [ ] Implement the UI for the summary.
        - [ ] Implement the logic to show the required data.
    -   [ ] **Create the basic Data Access Layer**. (Estimated time: 4 hours, Priority: High)
        -   [ ] Create a new module for data access.
        -   [ ] Move all storage-related code into this module.
    -   [ ] **Create basic contracts for the Data Access Layer**. (Estimated time: 2 hours, Priority: High)
        - [ ] Create the corresponding interface files.
        - [ ] Create unit tests to validate contracts.
       - **Verification steps**:
            - [ ] Verify that the code is commented. 
            - [ ] Verify the changes were commited.
            - [ ] Verify all the new features are implemented. 
            - [ ] Check all the tests are passing.


## Phase 3: General Review and Cleanup / Tests in Progress


**Phase 3 Objectives:** In this phase, we focus on improving the existing codebase by addressing fundamental code quality issues, such as code duplication, complexity, readability, and adherence to the Single Responsibility Principle (SRP). We will also implement the CI for tests. This phase will lay a solid foundation for future development.

    -   **[ ] Prioritize key features**: (Estimated time: 4 hours, Priority: High)
        -   [ ] Identify the most important features (steel-manning, locked statements, resolution). (Estimated time: 1 hour, Priority: High)
        - **Dependencies**: This must be done before refactoring.
        -   [ ] Refactor the steel-manning feature. (Estimated time: 1 hour, Priority: High) 
         - **Dependencies**: This must be done after implementing and identifying the features.
        -   [ ] Add unit tests for the steel-manning feature.
          - **Dependencies**: This must be done after refactoring.
        -   [ ] Refactor the locked-statements feature. (Estimated time: 1 hour, Priority: High)
         - **Dependencies**: This must be done after implementing and identifying the features.
        -   [ ] Add unit tests for the locked-statements feature.
          - **Dependencies**: This must be done after refactoring.
        - [ ] Refactor the resolution feature. (Estimated time: 1 hour, Priority: High)
         - [ ] Add unit tests for the resolution feature.
        - **Verification steps**:
             - [ ] Make sure all the prioritized features are correct.
             - [ ] Check that the refactor is done properly.
             - [ ] Check all the tests are passing.
             - [ ] Manually verify the features work as expected.
    -   **[ ] DRY (Don't Repeat Yourself)**: (Estimated time: 4 hours, Priority: High)
        -   [ ] Analyze the codebase for code duplication. (Estimated time: 1 hour, Priority: High)
         - **Dependencies**: This must be done before refactoring.
        -   [ ] Refactor duplicated code into reusable functions. (Estimated time: 2 hours, Priority: High)
         - **Dependencies**: This must be done after analyzing.
        -   [ ] Add unit tests for the new functions. (Estimated time: 1 hour, Priority: High)
        - **Verification steps**:
            - [ ] Verify that there is no code duplication.
            - [ ] Check that the functions are reusable.
            - [ ] Check all the tests are passing.
    -   **[ ] KISS (Keep It Simple, Stupid)**:
        -   [ ] Identify complex code sections.
        -   [ ] Simplify complex code sections.
        -   [ ] Add unit tests for the simplified code.
        - **Verification steps**:
            - [ ] Check that the code is simpler.
            - [ ] Verify the code still works correctly.
            - [ ] Check all the tests are passing.
    -   **[ ] Modularity**:
        -   [ ] Identify code that can be split into modules. (Estimated time: 1 hour, Priority: High)
         - **Dependencies**: This must be done before splitting.
        -   [ ] Split the code into modules. (Estimated time: 2 hours, Priority: High)
         - **Dependencies**: This must be done after identifying the modules.
        -   [ ] Add tests to all the modules. (Estimated time: 1 hour, Priority: High)
         - **Dependencies**: This must be done after splitting.
        - **Verification steps**:
            - [ ] Verify that the code is correctly split into modules.
            - [ ] Check that the code still works.
            - [ ] Verify all the tests are passing.
    -   **[ ] Readability**: (Estimated time: 2 hours, Priority: Medium)
        -   [ ] Review all files for consistent formatting. (Estimated time: 1 hour, Priority: Medium)
        -   [ ] Improve naming where needed. (Estimated time: 1 hour, Priority: Medium)
        - **Verification steps**:
            - [ ] Verify that the code follows consistent formatting.
            - [ ] Check all names are clear.
            - [ ] Code reviewed by another person.

    -   **[ ] SRP**: (Estimated time: 4 hours, Priority: Medium)
         -   [ ] Identify components or modules that have multiple responsibilities.
         -   [ ] Refactor to separate responsibilities into different components.
         - [ ] Add tests to all the new components.

         - **Verification steps**:
            - [ ] Check that the components have only one responsability.
            - [ ] Check that the code still works.
            - [ ] Verify all the tests are passing.
            - [ ] Code reviewed by another person.
    - **[ ] Implement CI for tests:** (Estimated time: 2 hours, Priority: High)
         - [ ] Choose a CI service (e.g., GitHub Actions). (Estimated time: 1 hour, Priority: High)
         - [ ] Configure the CI service to run unit tests on every push. (Estimated time: 1 hour, Priority: High)


## Phase 4: Extensibility and advanced refactoring

**Phase 4 Objectives:** In this phase, we will enhance the codebase to improve its ability to accommodate future features and modifications. This includes creating a data access layer, designing advanced data structures, implement contract-driven development, and preparing to integrate with Supabase.

-   **[ ] Create a data access layer**: (Estimated time: 6 hours, Priority: High)
        -   [ ] Create a new file for the data access layer. (Estimated time: 1 hour, Priority: High)
        -   [ ] Move all data access logic to the new file. (Estimated time: 2 hours, Priority: High)
         - **Dependencies**: This must be done before creating functions.
        -   [ ] Implement `loadStatements` function. (Estimated time: 1 hour, Priority: High)
        -   [ ] Implement `saveStatements` function. (Estimated time: 1 hour, Priority: High)
        -   [ ] Add unit tests for the data access layer functions.
        -   [ ] Add tests for the correct types.
        -   [ ] Add tests for the error handling.
        -   **Verification steps**:
             -   [ ] Check that all data access logic is moved.
             -   [ ] Verify that the functions are implemented correctly.
             -   [ ] Verify that the functions have the correct types.
             - [ ] Check all the tests are passing.
             - [ ] Code reviewed by another person.
 - **[ ] Design Data structures**: (Estimated time: 6 hours, Priority: Medium)
        - [ ] Identify all the different types of data.
          - **Dependencies**: This must be done before creating the data structures.
        - [ ] Create a data structure for each type.
        - [ ] Make sure they are correctly used.
        - [ ] Test the data structures.
        - **Verification steps**:
            - [ ] Check all the data types are correctly identified.
            - [ ] Verify all the data structures are correct.
            - [ ] Check all the data structures are being used.
            - [ ] Verify all the tests are passing.
            - [ ] Code reviewed by another person.
- **[ ] Contract-driven development**: (Estimated time: 5 hours, Priority: Medium)
        - [ ] Identify the different modules. (Estimated time: 1 hour, Priority: Medium)
         - **Dependencies**: This must be done before creating the contracts.
        - [ ] Create a contract for each module. (Estimated time: 2 hours, Priority: Medium)
         - **Dependencies**: This must be done after identifying the modules.
        - [ ] Ensure all code follows the contracts. (Estimated time: 2 hours, Priority: High)
         - **Dependencies**: This must be done after creating the contracts.
        - [ ] Test the contracts.
        - **Verification steps**:
            - [ ] Verify all the modules were identified.
            - [ ] Verify all the contracts are complete.
            - [ ] Verify all code follows the contracts.
            - [ ] Check all the tests are passing.

- **[ ] Advanced Data structures**:
    - [ ] Research advanced data structures. (Estimated time: 2 hours, Priority: Low)
     - **Dependencies**: This must be done before identifying.
    - [ ] Identify places to implement them. (Estimated time: 1 hours, Priority: Low)
     - **Dependencies**: This must be done before implementing.
    - [ ] Implement the data structures. (Estimated time: 2 hours, Priority: Medium)
    - [ ] Test the data structures. (Estimated time: 1 hour, Priority: Medium)
    - **Verification steps**:
        - [ ] Verify that the advanced data structures are correct.
        - [ ] Check that the code still works.
        - [ ] Verify all the tests are passing.

 -  **[ ] Implement Supabase**:
        -   [ ] Create a Supabase account.
         - **Dependencies**: This must be done before creating the project.
        -   [ ] Create a new project in Supabase.
          - **Dependencies**: This must be done before creating the tables.
        -   [ ] Create the tables needed.
          - **Dependencies**: This must be done before updating the code.
        -   [ ] Update the data access layer to use Supabase.
        -   [ ] Test the new data access layer.
        - **Verification steps**:
            - [ ] Verify the account and project are created.
            - [ ] Verify all the tables were created.
            - [ ] Check that the code still works.
            - [ ] Verify all the tests are passing.
  - **[ ] Modular development**:
       - [ ] Identify the different modules.
        - **Dependencies**: This must be done before separating the code.
       - [ ] Separate the code into modules.
        - **Dependencies**: This must be done after identifying the modules.
       - [ ] Test the modules.
       - **Verification steps**:
            - [ ] Verify that the modules are correctly defined.
            - [ ] Check the code is correctly separated into modules.
            - [ ] Verify the tests pass.
            - [ ] Code reviewed by another person.
        
## Phase 5: Expanded Testing and quality check
- **[ ] Prioritize key workflows**:
        - [ ] Identify the key workflows. (Estimated time: 1 hours, Priority: High)
        - **Dependencies**: This must be done before testing.
        - [ ] Test the key workflows. (Estimated time: 4 hours, Priority: High)
       - **Dependencies**: This must be done after identifying the workflows.
-   **[ ] Unit Tests**:
    - [ ] Add unit tests to all components. (Estimated time: 4 hours, Priority: High)
    - [ ] Add unit tests to all hooks. (Estimated time: 4 hours, Priority: High)
    - [ ] Add unit tests to all helper functions. (Estimated time: 4 hours, Priority: High)
     - **Verification steps**:
        - [ ] Verify that all components, hooks and functions are tested.
        - [ ] Check all the tests pass.
        - [ ] Check for test coverage.
-   **[ ] Integration Tests**:
    - [ ] Create tests to check all the components work together. (Estimated time: 4 hours, Priority: High)
    - [ ] Test the data flow. (Estimated time: 4 hours, Priority: High)
    - **Verification steps**:
        - [ ] Check all the tests pass.
        - [ ] Verify all the components are working together.
-   **[ ] End to End Tests**:
    - [ ] Test all the workflows. (Estimated time: 4 hours, Priority: High)
    - **Verification steps**:
        - [ ] Check all the tests pass.
        - [ ] Verify all the workflows are tested.
 - **[ ] Automated Code Analysis**:
    - [ ] Choose an automated code analysis tool. (Estimated time: 1 hours, Priority: High)
     - **Dependencies**: This must be done before configuring.
    - [ ] Configure the tool. (Estimated time: 1 hours, Priority: High)
     - **Dependencies**: This must be done before running.
    - [ ] Run the tool. (Estimated time: 1 hours, Priority: High)
     - **Dependencies**: This must be done before fixing.
    - [ ] Fix the reported issues. (Estimated time: 2 hours, Priority: High)
      - **Verification steps**:
            - [ ] Verify the tool is configured.
            - [ ] Check that the issues were fixed.
            - [ ] Code reviewed by another person.
 - **[ ] Robust Error Handling**:
     - **Dependencies**: This must be done before implementing.
     - [ ] Implement robust error handling. (Estimated time: 2 hours, Priority: Medium)
     - **Dependencies**: This must be done before testing.
     - [ ] Test the error handling. (Estimated time: 2 hours, Priority: Medium)
      - **Verification steps**:
            - [ ] Verify the error handling is robust.
            - [ ] Check the error handling covers all types of errors.
            - [ ] Check all the tests pass.
            - [ ] Code reviewed by another person.
- **[ ] Performance optimization**:
    - [ ] Profile the app. (Estimated time: 2 hours, Priority: Low)
     - **Dependencies**: This must be done before identifying.
    - [ ] Identify performance bottlenecks. (Estimated time: 2 hours, Priority: Low)
    - [ ] Optimize the bottlenecks. (Estimated time: 4 hours, Priority: Medium)
     - **Dependencies**: This must be done after identifying.
    - [ ] Test the changes. (Estimated time: 2 hours, Priority: Medium)

## Phase 6: Database
 - **[ ] Implement database**:
     - [ ] Migrate all data to the database.
     - **Verification steps**:
        - [ ] Check all the data was migrated.
        - [ ] Manually verify the data is correct in the database.
        - [ ] Verify the app still works with the database.

## Phase 7: Further Considerations (Post-MVP)
**Phase 7 Objectives:** In this phase, we focus on refining the app further after the core features are complete. This includes a deep refactor, exploring advanced AI integration, and gathering user feedback to make informed improvements.

## Phase 7: Further Considerations (Post-MVP)
- **[ ] Deep Refactor**:
     - [ ] Refactor the whole project. (Estimated time: 16 hours, Priority: Low)
    - **Verification steps**:
        - [ ] Code reviewed by another person.
- **[ ] Advanced AI Integration**: (Estimated time: 12 hours, Priority: Low)
    - [ ] Research AI integrations. (Estimated time: 4 hours, Priority: Low)
    - [ ] Implement AI integrations. (Estimated time: 8 hours, Priority: Low)
       - **Verification steps**:
         - [ ] Check the AI integration is working.
        - [ ] Check all the tests pass.
        - [ ] Code reviewed by another person.
- **[ ] User testing**:
   - [ ] Make a user test.
   - [ ] Test the app with users.
   - [ ] Get user feedback.
    - **Verification steps**:
     - [ ] Verify the user test is created.
     - [ ] Make sure the app was tested with users.
     - [ ] Verify the user feedback was gathered.
- **[ ] User feedback**:
  - [ ] Analyze the user feedback.
  - [ ] Change the app based on the feedback. (Estimated time: 8 hours, Priority: High)
- **[ ] Implement CD (Optional)**:
     - [ ] Implement CI/CD.



# Done tasks

## Core MVP Features
-   [x] User Statements: Allow two users to submit statements.
-   [x] Gemini Summarization:  Send two statements to the Gemini API and display the response.
-   [x] Code Generation: Generate and display a shareable code for the session.
-   [x] Data Persistence: Store the statements in local storage, and load them when a user uses the generated code.
    -   [x] Summarize with AI Button: The button must be clickable, and send a request to the API.
    -   [x] Complete StatementDisplay: Implement logic to display submitted statements.

## Essential Refinements
-   [x] Basic Error Handling: Display user-friendly error messages for failed API calls or invalid data.
    -   [x] Improve Error Handling: Ensure all errors are handled.
    -   [x] Backend: Return errors with appropriate HTTP status codes.
    -   [x] Backend: Return errors with detailed error messages.
    -   [x] Frontend: Display user-friendly error messages.
    -   [x] Frontend: Display more specific error messages.

-   [x] Basic Input Validation: Prevent empty submissions.
    -   [x] Implement Frontend Input Validation: Use the `validateInput` function to prevent empty submissions.

## Refactoring Progress

 -   **Component Refactoring:**
        -   [x] Refactored `RandomCodeButton.js` to extract code generation logic.
            -   [x] Moved code generation logic to `codeUtils.js`.
            -   [x] Simplified `generateRandomCode` function.
            -   [x] Improved component readability.
            -   [x] Added a parameter to change the code length.
        -   [x] Analyze `CodeEntry.js`: Confirmed it's well-structured and follows SRP.
        -   [x] Analyze `StatementDisplay.js`: Identified opportunities to improve separation of concerns. -   [x] Investigate `useSummarization.js` and `useSummarizeStatements.js`: identified that they could be merged.
        -   [x] Review `useStatements.js` and `useStatementLoader.js`: identified that they could be improved.
        -   [x] merge useSummarization and useSummarizeStatements.
        -   [x] remove useSummarization.
        -   **StatementDisplay Refactor:**
            -   [x] Create `StatementList.js` to display the list of statements.
            -   [x] Create `AiResponse.js` to display the AI response.
            -   [x] Create `LoadingMessage.js`, `ErrorMessage.js` and `NoValuesMessage.js` to display those messages.
            -   [x] Extract Storage logic.
            -   [x] Update StatementDisplay. Remove redundant comments.
        -   **Hooks Refactor:**
            -   [x] Create `useStorageManager.js`
            -   [x] Refactor `useStatementLoader.js`
            -   [x] Refactor `useStatements.js`
 - [x] Update Checklist
  - [x] Update the checklist after each set of tasks.


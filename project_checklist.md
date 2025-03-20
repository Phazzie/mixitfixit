# Project Checklist

## Core MVP Features
-   [x] User Statements: Allow two users to submit statements.
-   [x] Gemini Summarization:  Send two statements to the Gemini API and display the response.
-   [x] Code Generation: Generate and display a shareable code for the session.
-   [x] Data Persistence: Store the statements in local storage, and load them when a user uses the generated code.
    - [x] Summarize with AI Button: The button must be clickable, and send a request to the API.
    - [x] Complete StatementDisplay: Implement logic to display submitted statements.

## Essential Refinements

-   [x] Basic Error Handling: Display user-friendly error messages for failed API calls or invalid data.
    - [x] Improve Error Handling: Ensure all errors are handled.
    - [x] Backend: Return errors with appropriate HTTP status codes.
    - [x] Backend: Return errors with detailed error messages.
    - [x] Frontend: Display user-friendly error messages.
    - [x] Frontend: Display more specific error messages.

    
-   [x] Basic Input Validation: Prevent empty submissions.
    - [x] Implement Frontend Input Validation: Use the `validateInput` function to prevent empty submissions.

## Code Quality
-   [x] Refactor Components: Ensure clear separation between components and modules.
    - [x] Break down overloaded components into smaller, more focused components.
    - [x] Identify components that can be refactored.
    - [x] Refactor components.
-   [ ] Modularity: Ensure clear separation between components and modules.
-   [ ] Readability: Use consistent formatting and meaningful names.
-   [ ] SRP: Ensure each module/component has a single responsibility.
-   [ ] DRY: Refactor to remove duplicate code.
-   [ ] KISS: Keep it simple.
- [ ] Extensibility: Design code to allow adding new features easily.
- [ ] Comments: Add comments to complex code sections.

## Refactoring Progress

-   **Component Refactoring:**
    -   [x] Refactored `RandomCodeButton.js` to extract code generation logic.
        -   [x] Moved code generation logic to `codeUtils.js`.
        -   [x] Simplified `generateRandomCode` function.
        -   [x] Improved component readability.
        - [x] Added a parameter to change the code length.
    -   [ ] Analyze `CodeEntry.js`: Confirmed it's well-structured and follows SRP. 
    -   [x] Analyze `StatementDisplay.js`: Identified opportunities to improve separation of concerns.    -   [x] Investigate `useSummarization.js` and `useSummarizeStatements.js`: identified that they could be merged.
    -   [x] Review `useStatements.js` and `useStatementLoader.js`: identified that they could be improved.
    -   [x] merge useSummarization and useSummarizeStatements.
    -   [x] remove useSummarization.
    - [ ] Investigate `useStatementLoader.js` and `useStatements.js`: identified that they could be improved.
    -   **StatementDisplay Refactor:**
        - [x] Create `StatementList.js` to display the list of statements.
        - [x] Create `AiResponse.js` to display the AI response.
        - [x] Create `LoadingMessage.js`, `ErrorMessage.js` and `NoValuesMessage.js` to display those messages.
        - [x] Extract Storage logic.
        - [x] Update StatementDisplay. Remove redundant comments.
    -   **Hooks Refactor:**
        - [x] Create `useStorageManager.js`
        - [x] Refactor `useStatementLoader.js`
        - [x] Refactor `useStatements.js`

## Detailed Refactoring Plan

**Phase 1: `StatementDisplay.js` Refactor**

1.  **Create Smaller Components:**
    *   [ ] Create `StatementList.js` to display the list of statements.
    *   [ ] Create `AiResponse.js` to display the AI response. 
    *   [ ] Create `LoadingMessage.js`, `ErrorMessage.js` and `NoValuesMessage.js` to display those messages.
2. **Extract Storage logic**:
    * [ ] Create a function to get the statements from local storage. 
3.  **Update `StatementDisplay.js`:**
    *   [ ] Import and use the new components.
    *   [ ] Use the new function to get the statements. 
4.  **Remove Redundant Comments:** Review and remove any overly verbose or unnecessary comments in `StatementDisplay.js`.
5.  **Update checklist:** Add to the `Refactoring Progress` section.

**Phase 2: Hooks Review**

1.  **Investigate `useSummarization.js` and `useSummarizeStatements.js`:**
    *   [ ] Read both files and identify differences.
    *   [ ] Determine if they can be merged into a single hook.  
2.  **Review `useStatements.js` and `useStatementLoader.js`:**
    *   [ ] Read both files and identify how they are used.
    *   [ ] Determine if their responsibilities are clear.
    *   [ ] Identify ways of improving them.
3. **Update checklist**: Add to the `Refactoring Progress` section.

**Phase 3: General Review and Cleanup**

1.  **Readability:**
    *   [ ] Review all files for consistent formatting.
    *   [ ] Improve naming where needed.
2.  **DRY:**
    *   [ ] Look for any other instances of duplicate code.
    *   [ ] Refactor to remove duplication.
3.  **KISS:**
    *   [ ] Identify areas where code can be simplified.
4.  **Extensibility:**
    *   [ ] Consider how easy it would be to add new features.
    *   [ ] Refactor if necessary to improve extensibility.
5.  **Comments:**
    *   [ ] Add comments to complex sections that are not currently well-documented.
6. **Update checklist**: Add to the `Refactoring Progress` section.

## Future Considerations (Post-MVP)

-   [ ] Comprehensive Testing (unit, integration, etc.).
- [ ] Deep Refactor.
## Other

- [x] Update Checklist
  - [x] Update the checklist after each set of tasks.


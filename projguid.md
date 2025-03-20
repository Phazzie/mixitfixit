# Relationship Resolver - MVP Project Plan (Google IDX)

## Project Goal & Overview

This project aims to create a *Minimum Viable Product (MVP)* for a web application that facilitates constructive discussions between two individuals experiencing a relationship conflict. The core functionality is to allow users to input their perspectives on a shared issue and then leverage the Google Gemini API to provide a summary of the discussion. This initial version prioritizes rapid development and simplicity over advanced features. We'll be using Google IDX as our development environment.

## Key Decisions & Architecture

*   **Frontend:** React (single component initially, with consideration for future modularity)
*   **Backend:** Node.js/Express (single API endpoint initially: `/api/ai-summarize`, with consideration for future endpoints)
*   **"Database":** `localStorage` (TEMPORARY - for rapid prototyping ONLY)
*   **AI:** Google Gemini API (using the `generativelanguage` client and `gemini-2.0-flash` model)
*   **Authentication:** None for this MVP (a simple, shared, generated code will be used for accessing a discussion)
*   **Interaction:** Turn-based (not real-time)

## Project Guidelines & Best Practices

These guidelines combine project requirements with explanations of how software development best practices apply:

**Initial Setup:**

1.  **Google IDX:** We will use Google IDX as our development environment.
2.  **Temporary `localStorage` (KISS, YAGNI):** We will use `localStorage` for data persistence during the MVP phase. This is temporary, and we will consider a more robust solution later.
3.  **No Authentication (for MVP):** We will not implement user authentication for the MVP to keep it simple.
4. **API Keys:** You will need to set up API keys for gemini. this is done in the .env file.

**Code Quality & Maintainability:**

1.  **Single Responsibility Principle (SRP):** Each module, component, or function should have a single, well-defined responsibility.
2.  **Don't Repeat Yourself (DRY):** Avoid duplicating code. Extract common logic into reusable functions or modules.
3.  **Keep It Simple, Stupid (KISS):** Favor simplicity in design and implementation.
4.  **Modularity:** Organize code into well-defined, independent modules or components.
5.  **Separation of Concerns:** Clearly separate different responsibilities, such as UI, logic, and data handling.
6.  **Readability:** Write clean, easy-to-understand code.
    *   **Clear Naming:** Use descriptive and meaningful names for variables, functions, and modules. Comments are encouraged for very important variable names, or method names.
    *   **Consistent Indentation:** Maintain consistent indentation throughout the codebase.
7.  **Extensibility:** Design the code to be easily extended with new features or modified in the future.

**Other:**

1.  **Simplicity:** Prioritize simplicity in all aspects of the project. Rapid Development is a requirement of simplicity.
2. **Basic Error Handling:** Display error messages if API calls fail, or local storage is full.
3. **Input Validation:** Ensure the proper input of the user before doing any logic.
4. **DRY (Don't Repeat Yourself):** Avoid duplicated code.

## Prompts for IDX AI Coding Agent

**Instructions:** Use these prompts *sequentially* with the IDX AI. Paste each prompt *one at a time* into the IDX AI chat. *Review the generated code carefully* after each step. Be prepared to *iterate* and refine the prompts based on the AI's responses.

---

**Prompt 1: Project Setup**

List the available templates that support nodeJS and React. Create a new workspace using a template that includes a general JavaScript setup. Ensure a clear separation of the frontend and backend code in the project structure by creating `frontend/` and `backend/` folders. Also, explain how to configure API keys for the Gemini API in IDX.

---

**Prompt 2: Backend (API Endpoint & Gemini Integration)**

Create a Node.js/Express backend with a single API endpoint: /api/ai-summarize. Design this backend with consideration for future extensions. This endpoint should:

*   Accept a POST request with a JSON body containing `user1Statement` and `user2Statement` (both strings).
*   Use the Google Gemini API (generativelanguage client, gemini-2.0-flash model) to summarize these statements.
*   Return a JSON response with the key `aiResponse` containing the summary.
*   Include basic error handling: return appropriate HTTP status codes AND error messages.
* Use dependency injection when loading the gemini API.

Prioritize simplicity and guide the implementation towards best practices like Single Responsibility Principle and Dependency Inversion.

---

**Prompt 3A: Frontend (UI Structure)**

Create the basic structure of the React component with placeholders for the elements. Include the following elements, and make sure to separate the code into modules using imports:

*   Button: Generates a random 6-character alphanumeric code.
*   Display: Shows the generated code.
*   Two Text Areas: Labeled "Participant 1" and "Participant 2".
*   Submit Buttons: a submit button next to each text area.
* Display: area that will show all submitted statements.
*  "Summarize with AI" Button:

The UI does not need to be fully functional at this stage.

---
**Prompt 3B: Frontend (Random Code)**

Add the functionality to generate a random 6-character alphanumeric code and display it on the screen. Store this code in localStorage.

---

**Prompt 3C: Frontend (Text Area & Submission)**

Add the text areas and the submit buttons. Each text area should have an adjacent submit button. When a user wants to submit text, they need to click the submit button next to the text area. The submit button will submit the text that was input in the adjacent text area. Store user input in localStorage using the generated code as the key. The stored data should be an array of objects: `[{user: "1", text: "text"}, {user: "2", text: "text"}, ...]`. Prevent empty submissions (basic input validation). If the input is invalid, display an error message near the corresponding text area or submit button. Handle local storage errors and if there is an error, notify the user.

---

**Prompt 3D: Frontend (Display Statements)**

Add the logic to display the submitted statements from localStorage. Show all submitted statements from localStorage (for the current code), clearly labeled.

---

**Prompt 3E: Frontend (Summarize Button)**

Add the "Summarize with AI" Button.

*   Disabled until both participants have submitted at least one statement.
*   On click: Send a POST request to /api/ai-summarize with the two most recent statements (one from each participant).
*   Display the `aiResponse` from the API.
*   Basic Error Handling: Display user-friendly error messages if API calls fail.

Anticipate what other components might be needed in the future (e.g., a conversation history component, a user profile component). Consider what other types of data might be stored or managed in the future (e.g., user information, timestamps, ratings).

---

**Prompt 4: Gemini Prompt (Review & Customization)**

Display the exact prompt being sent to the Gemini API in the backend code. Explain where this prompt is defined and how I could modify it later to experiment with different AI behaviors (e.g., identifying logical fallacies instead of just summarizing). Also, briefly explain which part of the code is responsible for calling the Gemini API.

---

**Prompt 5: Code Review and Best Practices**

Review all of the code that has been created. Suggest any improvements based on:

*   Single Responsibility Principle
*   Don't Repeat Yourself principles
*   Keep It Simple Stupid
*   Modularity: (Is the code organized into well-defined, independent modules or components?)
*   Separation of Concerns: (Are different responsibilities, such as UI, logic, and data handling, clearly separated?)
*   Extensibility: (How easy would it be to add new features or change the underlying implementation of certain parts of the application in the future?)
*   Readability best practices, including: consistent indentation, meaningful names, helpful comments. Add comments for important variable or method names.

Are there any functions or code blocks that are longer than necessary? Can they be broken down? Are there any code blocks that are repeated? Can DRY be aplied? Is the React code organized into components? Are props used effectively? Does the front end or back end code have clear modules? Are they properly being imported? How are errors being managed? Is there a better approach? Are comments present and useful? Or do they just describe the obvious? Refactor the code and include more comments.

This should be the complete set of prompts, incorporating all our discussions and the use of `gemini-2.0-flash`
w

# Codebase Audit Summary

## Status

This project is in the middle stages of development. A good amount of code has been produced and a good portion of the required features have been implemented. There is still a large portion of work to be done, but the project is well on its way.

## Key Areas for Improvement

### 1. Error handling

-   **Backend:** Implement proper HTTP status codes and detailed error messages. Handle Gemini API errors, network issues, and data format errors.
-   **Frontend:** Display user-friendly error messages for API failures and data validation issues.
- **Overall**: start adding more error handling, especially in areas that are already developed.

### 2. Input Validation

-   **Backend:** Implement data validation to ensure input data conforms to the expected format and requirements.
-   **Frontend:** Validate user input in the text areas and other fields to prevent empty or incorrect submissions.
- **Overall**: create a central module for input validation, and use it through out the project

### 3. Code Quality and Best Practices

-   **Single Responsibility Principle (SRP):** Review each module, component, and function to ensure they have a single, well-defined responsibility.
-   **Don't Repeat Yourself (DRY):** Identify and eliminate code duplication through refactoring.
-   **Keep It Simple, Stupid (KISS):** Simplify complex code segments. Aim for the most straightforward implementation possible.
-   **Readability:** Improve code readability through consistent indentation, meaningful names, and helpful comments.
-   **Extensibility:** Evaluate how easy it is to add new features or modify existing ones. Design the code to be more flexible.
- **Comments**: add comments throughout the code where needed, make sure they are useful.

### 4. Testing

- Implement unit tests to verify the functionality of individual components and modules.
- consider implementing other types of tests, such as integration tests.

### 5. Deep Refactor

- do a deep refactor of all of the code. Look at every component, function, and module.

## Checklist

### Project Setup

-   [x] Google IDX
-   [x] Frontend/Backend Separation
-   [ ] API Keys

### Backend

-   [x] `/api/ai-summarize` Endpoint
-   [x] POST Request (`user1`, `user2`)
-   [x] Gemini Integration
-   [ ] Error Handling (HTTP status, messages)
-   [ ] Gemini Prompt Review/Customization
-   [ ] Input Validation

### Frontend

-   [x] Basic UI Structure
-   [x] Random Code Generation
-   [x] Text Areas & Submission
-   [x] `localStorage` Integration
-   [x] Display Statements
-   [ ] "Summarize with AI" Button
-   [ ] Error Messages
- [ ] Input Validation

### Code Quality

-   [x] Modularity
-   [x] Separation of Concerns
-   [ ] SRP
-   [ ] DRY
-   [ ] KISS
-   [ ] Readability
-   [ ] Extensibility
- [ ] Comments

### Overall
- [x] Rapid Development
- [ ] Complete Feature Implementation
- [ ] Comprehensive Code Review
- [ ] Error Handling
- [ ] Testing
- [ ] Refactoring

## Next Steps

1.  Address Pending Items: Start working through the checklist.
2.  Focus on Error handling, and Input Validation: these items are key for preventing bugs.
3. Deep Refactor: Go through every file and do a deep refactor.
4. Testing: start implementing tests.
5. Comprehensive Code Review: Do a final, thorough code review.
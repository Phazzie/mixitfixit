# Project Guide: Relationship Resolver - World-Class Plan


## Relationship Resolver App: Full Process Overview
This is a step-by-step explanation of how the "Relationship Resolver" app will work from start to finish. This focuses purely on the user experience without technical details.

1. **Session Initialization**
    *   Both people log in to the app.
    *   The app creates a shared conversation space where both users can interact in real-time.
    *   The session is now open, but no conversation can start until the first issue is raised and agreed upon.
2. **Issue Proposal and Agreement**
    *   Person A proposes an issue for discussion (e.g., "I feel ignored when you're on your phone during dinner").
    *   Person B has three options:
        *   **Accept** – Accept the issue as stated.
        *   **Modify** – Edit the issue to reflect their understanding of the problem.
        *   **Reject** – Decline to discuss the issue (or suggest a new one).
    *   If modified, the issue is sent back to Person A for approval.
    *   The app will not allow the discussion to start until both parties have agreed on the wording of the issue.
    *   👉 **Example:**
        *   Person A: "I feel like you don’t listen to me when I’m talking."
        *   Person B: "I think it’s more that I’m distracted by stress, not that I’m ignoring you."
        *   Person A: "Okay, let’s frame it as ‘Feeling unheard due to distractions.’”
        *   ✅ Agreement reached → Discussion phase can begin.
3. **Steel-Manning Phase**
    *   Before you can share your side of the story, you have to explain the other person’s side accurately.
    *   Each person types out how they think the other person feels and what their position is.
    *   The app won’t allow the discussion to start until both people agree that the other person has accurately represented their perspective.
    *   👉 **Example:**
        *   Person A: "You feel like I’m distracted because of work stress and that I’m not deliberately ignoring you."
        *   Person B: "Yes, that’s accurate."
        *   Person B: "You feel like I’m prioritizing other things over listening to you."
        *   Person A: "Not quite. It’s not that you’re prioritizing other things—it’s that I feel like you don’t care."
        *   Person B adjusts their response → Person A approves.
        *   💡 **Why This Matters:** This ensures that both people understand each other’s position before moving forward.
4. **Statement Locking Phase**
    *   After mutual understanding is reached, each person writes their personal statement about the issue.
    *   Once submitted, the statements are locked—they cannot be edited.
    *   These locked statements become the "ground truth" for the discussion.
    *   👉 **Example:**
        *   Person A: "I feel unheard when you’re focused on your phone instead of listening to me."
        *   Person B: "I feel like I’m trying to manage stress, and I don’t mean to ignore you."
        *   🔒 Locked and ready for discussion.
5. **Discussion Phase**
    *   Once the statements are locked, the real discussion begins.
    *   Both people can type back and forth in real time.
    *   The AI steps in to help by:
        *   Suggesting clarifying questions.
        *   Pointing out misunderstandings or contradictions.
        *   Highlighting unhelpful language (like blaming or defensiveness).
    *   👉 **Example:**
        *   Person A: "You never listen to me!"
        *   AI: "Try rephrasing this as ‘I feel unheard when you’re distracted.’"
        *   Person B: "I’m not ignoring you!"
        *   AI: "Could you explain why you feel that way?"
        *   💡 The goal is to keep the conversation productive and focused.
6. **Resolution Phase**
    *   When the discussion has reached a point where a solution seems possible, either person can propose a resolution.
    *   The other person can:
        *   **Accept** – The resolution becomes official.
        *   **Modify** – Adjust the resolution and send it back for approval.
        *   **Reject** – Keep discussing.
    *   The app won’t allow the resolution to be finalized until both parties agree.
    *   👉 **Example:**
        *   Person A: "Can we agree to put our phones away during dinner?"
        *   Person B: "Yes, but maybe with exceptions for emergencies."
        *   Person A modifies the resolution to include the exception.
        *   ✅ Agreement reached → Resolution locked.
7. **Summary and Export Phase**
    *   Once a resolution is agreed upon, the app generates a summary of the session, including:
        *   The original issue.
        *   Each person’s locked statement.
        *   Key points from the discussion.
        *   The agreed-upon resolution.
    *   This summary is emailed to both users or made available as a downloadable document.
    *   👉 **Example:**
        *   Issue: Feeling unheard during dinner.
        *   Person A's Statement: Feels ignored when Person B is on their phone.
        *   Person B's Statement: Feels like phone use is a coping mechanism for stress.
        *   Resolution: Designate phone-free meals, with exceptions for emergencies.
        *   💡 This ensures both parties have a clear record of what was agreed upon.
8. **Session Closure**
    *   Once the resolution is accepted and the summary is saved, the session officially closes.
    *   Both parties can provide feedback on how helpful the session was.
    *   The app tracks whether the session was completed successfully or left unresolved.
    *   ✅ **Core Principles at Work**
        *   ⭐ **Steel-Manning:**
            *   You cannot explain your side until you’ve shown that you understand the other person’s side.
            *   Ensures both parties feel heard and understood before the conversation begins.
        *   ⭐ **Locked Statements:**
            *   Personal statements are locked to prevent revisionist history or "moving the goalposts."
            *   Maintains accountability and clarity.
        *   ⭐ **AI as a Mediator:**
            *   AI helps reframe aggressive or defensive language.
            *   AI points out contradictions and logical gaps.
            *   AI keeps the discussion focused and productive.
        *   ⭐ **Mutual Agreement:**
            *   No discussion begins until the issue is agreed upon.
            *   No resolution is final unless both parties accept it.
    *   🚀 **Summary**
        *   The app creates a structured space where two people can work through conflicts.
        *   Steel-manning ensures both sides feel heard and understood.
        *   Locked statements prevent misunderstanding or shifting narratives.
        *   AI guidance helps keep the conversation clear and respectful.
        *   The app generates a structured resolution that both people agree on.
        *   The process ends with a clear summary for future reference.

**[Link to Project Checklist](project_checklist.md)**

## Executive Summary

This document serves as the comprehensive guide for the Relationship Resolver project, a web application designed to facilitate constructive discussions between individuals in conflict. By leveraging AI (Google Gemini API) and a structured conversation format, the app helps users communicate more effectively and reach resolutions. This project employs a "World-Class" development approach, emphasizing exceptional code quality, advanced testing, and future-proofing. It also focuses on modularity, value-first development, user feedback, contracts, advanced data structures, automated code analysis, robust error handling, and performance optimization. The project is being developed by a small team and prioritizes simplicity, rapid development, and maintainability.

**Target Audience:** This document is intended for developers, testers, and project stakeholders involved in the development and maintenance of the Relationship Resolver application.
    
## Project Limitations, Risks, and Resources Needed

**Limitations:**
- Current team size is limited to two people.
- The project is currently using `localStorage`.
- The app is not using real time.
- The current app is an MVP, and doesn't have all the features.

**Risks:**
- Limited resources could make the development slower.
- The app could have bugs if it's not tested well.
- The app could be hard to extend if it's not done properly.

**Resources Needed:**
- IDX.
- Google Gemini API.

## Project Overview and Goals


**Vision:** This project aims to develop a web application that facilitates constructive discussions between individuals experiencing relationship conflict. We are not just building an MVP, we are going to build an exceptional app.

**Core Functionality:** The app will allow users to input their perspectives on a shared issue, engage in a structured conversation, and leverage AI (Google Gemini API) to provide insights and summaries.

**Goals:**

*   **Constructive Communication:** Enable users to communicate effectively and respectfully, even when in conflict.
*   **AI-Powered Insights:** Leverage AI to provide meaningful summaries, highlight key points, and guide users towards resolution.
*   **User-Friendly:** Create an intuitive and easy-to-use interface.
*   **High Quality Code:** Build a robust, maintainable, and extensible codebase.
*   **Value-First Development**: Prioritize the development of features that deliver the most value to users.
*   **Limitations**: Create a project that is simple, easy to mantain, and easy to extend.
*   **Resources**: Use only the needed resources, and avoid doing anything that is not needed.

## User Feedback

To ensure the app meets user needs, we will:

- **Early and Frequent Feedback**: Seek user feedback throughout the development process.
- **Testing**: Get users to test the app, to see if there are any problems.
- **Surveys**: Ask users for their feedback in surveys.
* **User feedback**: Get user feedback early, and adapt the app based on that feedback.
    
## World-Class Plan

### How to create a Pull Request

#### 1. Create a New Branch
*   Before making any changes, create a new branch from the `main` branch.
*   Name the branch descriptively, indicating the feature or bug fix you are working on (e.g., `feature/add-user-authentication`, `fix/login-bug`).
*   This keeps your changes isolated from the main codebase.

#### 2. Write the Code
*   Implement the necessary code changes for your feature or bug fix.
*   Make sure to follow all the project guidelines.

#### 3. Test the Code
*   Write unit tests to make sure your code works as expected.
*   Make sure all the current tests pass.

#### 4. Add Comments to the Code
*   Add clear and concise comments throughout your code to explain complex logic or non-obvious decisions.


*   **Exceptional Code Quality:** Writing clean, well-structured, and maintainable code.
*   **Advanced Testing:** Implementing comprehensive testing (unit, integration, end-to-end).
*   **Future-Proofing:** Designing for extensibility and future growth.
*   **Modularity**: The code will be organized into well-defined, independent modules or components.
*   **CI for Testing:** We will use Continuous Integration to automate our testing process, ensuring code quality and preventing bugs.
* **Value-First Development**: Prioritize the development of features that deliver the most value to users.
* **User feedback**: Get user feedback early, and adapt the app based on that feedback.

## Visual Aids (Modularity)

![Modularity Diagram](https://i.imgur.com/uRj21Tq.png)

## Glossary of Terms

*   **MVP:** Minimum Viable Product.
*   **CI**: Continuous Integration.
*   **CD**: Continuous Deployment.
*   **SRP**: Single Responsibility Principle.
*   **DRY**: Don't Repeat Yourself.
*   **Steel-Manning**: Steel-manning is the practice of restating someone else's argument in its strongest, most accurate form. It’s about ensuring that you fully understand and fairly represent the other person's perspective, even if you might disagree with it.
*   **Locked Statements**: Locked (or frozen) statements are inputs that, once submitted, become uneditable. This ensures the original sentiment and content remain intact for later reference and analysis.
*   **Resolution**: A resolution is a conclusive summary that encapsulates the discussion, identifies key issues and logical fallacies, and outlines agreed-upon steps or compromises.
*   **Prioritize Key Features**: Prioritizing key features means identifying and focusing on the functionalities that provide the highest user value and are critical to the core purpose of the app.
*   **KISS**: KISS is a design principle that promotes simplicity. It encourages developers to write straightforward code that is easy to understand and maintain.
*   **Modularity**: Modularity is the practice of dividing a system into distinct, independent modules that can be developed, tested, and maintained separately.
*   **Contract-Driven Development**: Contract-driven development (CDD) involves designing software around well-defined interfaces or contracts. These contracts specify how different parts of the system interact, ensuring that each module meets agreed-upon expectations.
*   **Data Access Layer**: The Data Access Layer (DAL) is a dedicated layer that handles all interactions with data storage systems, abstracting the details of data retrieval and manipulation from the rest of the application.
*   **Value-First Development**: Value-first development prioritizes features and changes that deliver the most tangible value to the end user, ensuring that the most important problems are addressed before less critical enhancements.






## Key Decisions & Architecture

*   **Frontend:** React (single component initially, with consideration for future modularity)
*   **Backend:** Node.js/Express (single API endpoint initially: `/api/ai-summarize`, with consideration for future endpoints)
*   **"Database":** `localStorage` (TEMPORARY - for rapid prototyping ONLY, will use Supabase)
*   **AI:** Google Gemini API (using the `generativelanguage` client and `gemini-2.0-flash` model)
*   **Authentication:** None for this MVP (a simple, shared, generated code will be used for accessing a discussion)
*   **Interaction:** Turn-based (not real-time)

## Development Principles & Best Practices

These guidelines combine project requirements with explanations of how software development best practices apply:

**Initial Setup:**

1.  **Google IDX:** We will use Google IDX as our development environment.
2.  **Temporary `localStorage` (KISS, YAGNI):** We will use `localStorage` for data persistence during the MVP phase. This is temporary, and we will consider a more robust solution later.
3.  **No Authentication (for MVP):** We will not implement user authentication for the MVP to keep it simple.
4. **API Keys:** You will need to set up API keys for gemini. this is done in the .env file.
4. **CI for testing**: We will use Continuous Integration to automate our testing process.

**Code Quality & Maintainability:**

1.  **Single Responsibility Principle (SRP):** Each module, component, or function should have a single, well-defined responsibility.
2.  **Don't Repeat Yourself (DRY):** Avoid duplicating code. Extract common logic into reusable functions or modules.
3.  **Keep It Simple, Stupid (KISS):** Favor simplicity in design and implementation.
4.  **Modularity**: Organize code into well-defined, independent modules or components.
5.  **Separation of Concerns**: Clearly separate different responsibilities, such as UI, logic, and data handling.
6.  **Readability:** Write clean, easy-to-understand code.
    *   **Clear Naming:** Use descriptive and meaningful names for variables, functions, and modules. Comments are encouraged for very important variable names, or method names.
    *   **Consistent Indentation:** Maintain consistent indentation throughout the codebase.
7.  **Extensibility:** Design the code to be easily extended with new features or modified in the future.

**Other:**

1.  **Simplicity:** Prioritize simplicity in all aspects of the project. Rapid Development is a requirement of simplicity.
2. **Basic Error Handling:** Display error messages if API calls fail, or local storage is full.
3. **Input Validation:** Ensure the proper input of the user before doing any logic.
4. **DRY (Don't Repeat Yourself):** Avoid duplicated code.
5. **Contracts**: Every module will have a contract, that will define what it does, what it expects, and what it guarantees.
6. **Value-First Development**: Prioritize refactoring and testing areas that deliver the most immediate value to users.
7. **User Feedback**: Actively seek user feedback during development.
8. **Advanced Data Structures**: Use advanced data structures.
9. **Automated Code Analysis**: Use tools to check the code.
10. **Robust error handling**: Implement robust error handling.
11. **Performance optimization**: Optimize the performance of the code.

## Phases

### Phase 3: General Review and Cleanup / Tests in Progress

**Goals:**
* Start cleaning up the codebase.
* Start adding tests.
* Start preparing for modularity.
* Prioritize key features.

**Key Tasks:**

*   **Prioritize key features**:
    *   Identify the most important features (steel-manning, locked statements).
    * Refactor them.
    * Add tests.
*   **DRY (Don't Repeat Yourself)**:
    *   Analyze the codebase for code duplication.
    *   Refactor duplicated code into reusable functions.
    * Add tests.
*   **KISS (Keep It Simple, Stupid)**:
    *   Identify complex code sections.
    *   Simplify complex code sections.
    * Add tests.
*   **Modularity**:
    *   Identify code that can be split into modules.
    * Split the code into modules.
    * Add tests to all the modules.
*   **Readability**:
    * Improve the readability of the code.
    * Add tests.
*   **Comments**:
    * Add comments where needed.
    * Add tests.
*   **SRP**:
    * Identify code that needs to follow the SRP.
    * Refactor the code to follow the SRP.
    * Add tests.
* **Implement CI for tests**:
    * Choose a CI service (e.g., GitHub Actions).
    * Configure the CI service to run tests on every push.

### Phase 4: Extensibility and Advanced Refactoring

**Goals:**
* Prepare the codebase for extensibility. 
* Implement advanced refactoring techniques.
* Implement a data access layer.
* Implement Supabase.

**Key Tasks:**

*   **Create a data access layer**:
    * Add tests.
*   **Design Data structures**:
    * Make sure they are being used correctly.
*   **Contract-driven development**:
    * Make sure all the code follows a contract.
    * Add tests.
*   **Advanced Data structures**:
    * Make sure the data structures are designed in the best way.
    * Add tests.
*   **Implement Supabase**:
    * Add tests.
* **Modular development**:
    * Make the app modular.
    * Add tests.

## Prompts for IDX AI Coding Agent

**Instructions:** Use these prompts *sequentially* with the IDX AI. Paste each prompt *one at a time* into the IDX AI chat. *Review the generated code carefully* after each step. Be prepared to *iterate* and refine the prompts based on the AI's responses.

---

### Prompt 1: Project Setup

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

## Version History

| Version | Date       | Changes                                                                      | Author |
| :------ | :--------- | :--------------------------------------------------------------------------- | :----- |
| 1.0     | 2024-03-11 | Initial Document Creation                                         | AI     |
| 1.1     | 2024-03-12 | Added Executive Summary, Target Audience, Visual Aids, Glossary, etc | AI     |
| 1.2     | 2024-03-12 | Added Project Limitations, Risks, and Resources Needed and how to get user feedback. | AI     |

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
-   [x] Input Validation

### Code Quality

-   [x] Modularity
-   [x] Separation of Concerns
-   [ ] SRP
-   [ ] DRY
-   [ ] KISS
-   [ ] Readability
-   [ ] Extensibility
- [ ] Comments
- [ ] Pull request in place.

### Contexts and Hooks

-   [x] `src/contexts/StatementsContext.js` creation
-   [x] `StatementsProvider` creation.
-   [x] Initial state in `StatementsContext`.
-   [x] `useStatements` hook.
-   [x] `statementsReducer`.
- [x] `addStatement` function.
- [x] `src/hooks/useStatementsManager.js` creation
- [x] `getStatements()` function.
- [x] `addStatement()` function.
- [ ] Pull request in place.

### Overall
- [x] Rapid Development
- [ ] Complete Feature Implementation
- [ ] Comprehensive Code Review
- [ ] Error Handling
- [ ] Testing
- [ ] Refactoring
- [x] `StatementsDisplay` component creation.
- [ ] All the components using the contexts and hooks.
- [ ] All the contexts and hooks are well tested.

### Next Steps

1.  Address Pending Items: Start working through the checklist.
2.  Focus on Error handling, and Input Validation: these items are key for preventing bugs.
3. Deep Refactor: Go through every file and do a deep refactor.
4. Testing: start implementing tests.
5. Comprehensive Code Review: Do a final, thorough code review.
6. **Pull Request:** Create a pull request with your changes.
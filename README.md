# MFE Banking Transaction

This project is a proof-of-concept for a Micro-Frontend (MFE) architecture using modern Angular features. It simulates a multi-step banking transaction process, orchestrated within a single Angular application.

The primary goal is to demonstrate a robust and scalable pattern for managing state and view navigation without relying on a traditional routing library, making it ideal for embedded MFE scenarios.

## Core Technologies

- **Angular 17+**: Utilizes the latest features from the Angular framework.
- **TypeScript**: For strict typing and improved code quality.
- **Angular Signals**: The core of the state management system. Signals provide a reactive and efficient way to manage application state, automatically tracking dependencies and updating the UI when data changes.
- **Angular Control Flow (`@switch`)**: Used for declarative and efficient conditional rendering of components based on the application's current state.

## Architecture

The application's architecture is designed to be simple, centralized, and reactive.

### 1. Orchestrator Service (`orchestrator.service.ts`)

This is the brain of the application. It is a root-level injectable service responsible for:
- **State Management**: It holds the application's state, including the current view (`currentView`) and the user's form data (`formData`), using Angular Signals.
- **Actions**: It exposes methods to modify the state, such as `navigateTo(view)`, `updateFormData(data)`, and `resetProcess()`. All state changes must go through this service.

### 2. View Management (`app.component.ts`)

The root component (`AppComponent`) is the main container. It does not contain business logic. Its only role is to:
- Inject the `OrchestratorService`.
- Use the new `@switch` control flow in its template to render the appropriate feature component based on the `currentView` signal from the orchestrator.

### 3. Feature Components (`/features`)

These are the individual "pages" or "steps" of the MFE (e.g., `StepOneComponent`, `StepTwoComponent`). They are responsible for:
- Displaying the UI for a specific step.
- Capturing user input.
- Calling the `OrchestratorService` to update the shared state and trigger navigation to the next view.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- [Angular CLI](https://github.com/angular/angular-cli)

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Development Server

Run the following command to start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
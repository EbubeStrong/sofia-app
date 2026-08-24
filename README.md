## Overview

Sofiamatics is a SaaS product designed to help transform healthcare delivery through innovative digital solutions. This repository contains the frontend codebase, built using **Next.js 15**, with various modern libraries and tools to enhance development, performance, and maintainability.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Setup Instructions](#setup-instructions)
3. [Branching Workflow](#branching-workflow)
4. [Libraries Used](#libraries-used)
5. [Development Guidelines](#development-guidelines)
6. [Bi-Weekly Release Process](#bi-weekly-release-process)
7. [Documentation](#documentation)
8. [Contributing](#contributing)

---

## Tech Stack

- **Framework**: Next.js 14
- **State Management**: React Hook Form, Context API, Zustand, Zod
- **UI Libraries**: antd
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Toast Notifications**: Sonner
- **Version Control**: Git, GitHub

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) (preferred) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sofiamatic/sofia-central.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sofia-central
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```
5. Open the app in your browser at `http://localhost:3000`.

## Branching Workflow

- All development work should be done in the `development` branch.
- New features should be developed in **feature branches**:
  - Create your feature branch out of `development`:
    ```bash
    git checkout dev
    git checkout -b feature/your-feature-name
    ```
  - Once completed, submit a PR to the `development` branch.
  - **Frontend**: PRs must be reviewed and approved by at least **one** engineer.
- We aim for **bi-weekly releases**. Only code that has been thoroughly tested (end-to-end) and confirmed to work will be merged into the `main` branch, which is currently deployed to the **staging environment**.

- **Note**: The `main` branch will be pointed to the staging environment for now.

## Libraries Used

The following libraries are integrated into the project. More will be added as the project grows, and documentation will be updated accordingly.

- **Axios**: HTTP client for making API requests.
- **Sonner**: Toast notifications for better user feedback.
- **Ant Design (AntD) / Material-UI (MUI) / ShadCN**: For building a flexible and accessible UI.
- **React Hook Form**: For managing form state.
- **Zod**: Schema validation and data parsing.
- **Context API**: Lightweight state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Styled Components**: For writing CSS within JavaScript and theming.
- **Zustand**: For global state management.

## Development Guidelines

- Follow best practices for **component-based development** using **React** and **Next.js**.
- Make sure to write clean, reusable, and maintainable code. Pay attention to performance optimizations.
- Follow the **DRY** (Don't Repeat Yourself) principle, especially for shared components and utility functions.
- Use **React Hook Form** and **Zod** for form handling and validation.
- Use **Sonner** for user notifications and feedback.

## Bi-Weekly Release Process

- **Release Frequency**: Twice per week
- Prior to a release, all code must be:

  1. Thoroughly tested (unit, integration, and end-to-end testing).
  2. Reviewed and approved by the team.
  3. Merged into the `main` branch for deployment to the staging environment.

  Releases will follow a structured QA process to ensure smooth deployments and functionality.

## Documentation

We emphasize thorough documentation from day one. All engineers must ensure that new features, libraries, configurations, and design decisions are documented within the repository and any associated Confluence pages (if applicable).

### Documenting Libraries and Tools

Every new library or tool integrated into the project must be documented:

- Its purpose and use case in the project.
- Example usage within the codebase.
- Instructions for future maintainers and developers.

## Contributing

1. Clone the repository and create your feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
3. Push to the branch:
   ```bash
   git push origin feat/your-feature-name
   ```
4. Submit a pull request to the `development` branch.

---

If you have any questions, feel free to reach out to the team leads or check the project documentation for further guidance.

<!--
file: docs/architecture.md
purpose: Document the project technical architecture, folder structure, and core modules.
responsibilities: Define the application layout, module descriptions, and data flow.
dependencies: None
-->

# Project Technical Architecture

This document describes the design and file structure of the AnticipaLead website download portal.

## Folder Structure Tree

Below is the directory layout of the project:

```
anticipalead-download-website/
├── assets/
├── docs/
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── decisions.md
│   ├── maintenance.md
│   ├── milestones.md
│   └── setup.md
├── index.html
├── download.html
├── package.json
├── README.md
└── src/
    ├── app.js
    └── core/
        ├── config.json
        ├── engine.js
        └── state.js
```

## Core Modules

The application is structured around a set of decoupled core modules:

*   **app.js (Orchestrator):** The main entry point of the application. It bootstraps the page, initializes state and UI controllers, and binds global DOM event listeners.
*   **core/state.js:** Tracks user selections, choices, and current interactive configuration. It manages state transitions and fires events to notify components when selections change.
*   **core/engine.js:** The logic layer responsible for fetching external materials, assembling game files, and generating downloadable .zip files using the JSZip library.
*   **core/config.json:** The declarative data model that maps user choices to their corresponding asset file paths. This separates business configurations from source code execution.

## Data Model & Configuration Schema

### State Object (User Decisions)

The application maintains a centralized state object representing the user's interactive choices. This object tracks four core decisions:

*   **Language:** The selected language for the game materials. Supported codes are:
    *   `de` (German)
    *   `en` (English)
    *   `fr` (French)
*   **Perspective:** The scenario viewpoint of the player. Supported codes are:
    *   `corp` (Corporate perspective, featuring changes)
    *   `gen` (General perspective, without specific corporate changes)
*   **Scenario:** The specific game scenario. Supported codes are `s1` through `s8`. This design is fully scalable to allow future scenario additions without changing the underlying architecture.
*   **Time Horizon:** The selected future timeline for the technology cards. Supported codes are:
    *   `s` (Short-term)
    *   `m` (Medium-term)
    *   `l` (Long-term)
    *   `all` (All time horizons)

### File Dependency Mapping

File paths are resolved dynamically based on the current state variables. The mapping rules are defined as follows:

*   **Canvas:** Depends on `[Language, Perspective]`.
*   **Name Tag:** Depends on `[Language, Perspective, Scenario]`.
*   **Player Card:** Depends on `[Language, Perspective]`.
*   **Audio:** Depends on `[Language, Scenario]`.
*   **Tech Cards:** Depends on `[Language, Time Horizon]`.
*   **Quickstart Guide:** Depends on `[Language]`.

The application will avoid hardcoded if/else logic for file selection. Instead, it will use string interpolation (e.g., canvas_{lang}_{perspective}.pdf) driven by a central JSON configuration.


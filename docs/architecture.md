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
    ├── css/
    │   └── input.css
    └── js/
        ├── app.js
        ├── ui.js
        ├── ui/
        │   └── icons.js
        └── core/
            ├── config.json
            ├── content.js
            ├── engine.js
            └── state.js
```

## Core Modules

The application is structured around a set of decoupled core modules:

*   **app.js (Orchestrator):** The main entry point of the application. It uses a lightweight page router (`if (page-download)`) to only boot interactive grids when necessary. It bootstraps the page, initializes state dynamically, and binds global DOM event listeners.
*   **ui.js (DOM Rendering):** Pure component layer. Exported functions accept destructured prop objects and return strictly defined template literals.
*   **ui/icons.js (Assets):** A library of exported SVG string constants to keep markup out of controller logic.
*   **core/content.js (Data Definitions):** Centralized static UI content (scenarios, perspectives, time horizons). This is the single source of truth from which the initial state is derived.
*   **core/state.js (Data Tracking):** Tracks user selections using an observer pattern.
*   **core/engine.js (Resolution Logic):** A pure function layer that cross-references the active state against `config.json` templates to yield an array of final download paths.
*   **core/config.json:** The declarative data model mapping user choices to their corresponding asset file paths.

## Data Model & Configuration Schema

### State Object (User Decisions)

The application maintains a centralized state object representing the user's interactive choices. This object tracks four core state variables:

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


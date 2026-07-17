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
│   ├── downloads/
│   └── output.css
├── docs/
│   ├── architecture.md
│   ├── maintenance.md
│   └── setup.md
├── about.html
├── index.html
├── download.html
├── faq.html
├── printing-guide.html
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
            ├── download.js
            ├── engine.js
            └── state.js
```

## Core Modules

The application is structured around a set of decoupled core modules:

*   **app.js (Orchestrator):** The main entry point of the application. It uses page routing (`page-download`, `page-faq`, `page-printing-guide`) to boot interactive UI elements when necessary. It coordinates state initialization, preset mode selection (`preset1`, `preset2`, `preset3`, `custom`), dynamic option filtering, collapsible FAQ accordions, and binds global DOM event listeners.
*   **ui.js (DOM Rendering):** Pure component layer. Exported functions accept prop objects and return strictly defined template literals for step cards, option badges, stepper controls, and review summaries.
*   **ui/icons.js (Assets):** A library of exported SVG string constants to keep markup clean and separated from controller logic.
*   **core/content.js (Data Definitions):** Centralized static UI content (scenarios, perspectives, time horizons, languages, preset modes, FAQs, and printing guides). This is the single source of truth from which options, metadata attributes (`isCustom`), and initial states are derived.
*   **core/state.js (Data Tracking):** Tracks user selections using an observer pattern (`subscribe`, `getState`, `setMode`, `setScenario`, etc.) and automatically synchronizes preset configurations when a preconfigured mode is selected.
*   **core/engine.js (Resolution Logic):** A pure function engine that evaluates state selections and option metadata (`isCustom`) against `config.json` rules to interpolate templates and apply dynamic inclusion (`conditions`, `conditionsAny`) or exclusion (`excludeConditions`) filters.
*   **core/config.json:** The declarative data model mapping user choices to their corresponding asset file paths with dynamic condition checking.

## Data Model & Configuration Schema

### State Object (User Decisions)

The application maintains a centralized state object (`state`) representing the user's interactive choices. This object tracks five core state variables:

*   **Mode:** The package selection workflow mode (`preset1`, `preset2`, `preset3`, or `custom`). Selecting a preset mode (`preset1` to `preset3`) preconfigures specific `perspective`, `timeHorizon`, and `scenario` values while hiding those configuration grids from the UI. Selecting `custom` reveals granular option selectors.
*   **Language:** The selected language for the game materials. Supported codes are:
    *   `de` (German)
    *   `en` (English)
*   **Perspective:** The scenario viewpoint of the player. Supported codes are:
    *   `corp` (Corporate perspective)
    *   `gen` (General perspective)
*   **Scenario:** The specific game scenario (`1` through `7`). Scenario `7` ("Use your own Scenario") carries the `isCustom: true` metadata flag.
*   **Time Horizon:** The selected future timeline for the technology cards. Supported codes are:
    *   `all` (All Time Horizons)
    *   `m` (Medium-term)
    *   `l` (Long-term)
    *   `own` (Own Technologies, carrying `isCustom: true`)

### File Dependency & Condition Mapping

File paths are resolved dynamically based on the current state variables and option metadata. The mapping rules defined in `config.json` are evaluated by `engine.js`:

*   **Canvas (`canvas1`, `canvas2`):** Depends on `[language, perspective]`.
*   **Name Tags (`nameTags`):** Depends on `[language, perspective, scenario]`.
*   **Player Cards (`playerCards`):** Depends on `[language, perspective]`.
*   **Audio (`audio`):** Depends on `[language, scenario]`. Excluded automatically via `excludeConditions: [{ "scenario.isCustom": true }]` whenever a custom scenario is active.
*   **Tech Cards (`techCards`):** Depends on `[language, timeHorizon]`.
*   **Quickstart Guide (`quickstartGuide`):** Depends on `[language]`.
*   **Custom Material Guide (`customGuide`):** Depends on `[language]`. Included dynamically via `conditionsAny: [{ "scenario.isCustom": true }, { "timeHorizon.isCustom": true }]` whenever a custom scenario (`Use your own Scenario`) or custom technology cards (`Own Technologies`) are selected.

The application avoids hardcoded `if/else` checks for individual scenario or time horizon IDs. Instead, it uses declarative template interpolation (`{language}`, `{scenario}`, `{perspective}`, `{timeHorizon}`) and dot-notation metadata lookups (`scenario.isCustom`, `timeHorizon.isCustom`) driven entirely by `config.json` and `content.js`.


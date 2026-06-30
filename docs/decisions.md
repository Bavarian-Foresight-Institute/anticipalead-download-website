# Decisions

*   Decision: Use Tailwind v4 CLI with an @config import in input.css to maintain the legacy v3 tailwind.config.js architecture.
    *   Reason: Keeps JS configuration separate from CSS while using the latest compiler.

*   Decision: Use CSS box-shadow (Tailwind ring-inset) instead of borders for active selection states.
    *   Reason: Prevents grid layout shifting caused by the box model geometry.

*   Decision: Extract all raw SVG strings into `src/ui/icons.js`.
    *   Reason: Keeps markup pollution out of the JavaScript controller logic and component functions, ensuring purity.

*   Decision: Component pure-functions in `ui.js` accept destructured props objects.
    *   Reason: Enhances readability and standardizes component signatures, avoiding excessive positional arguments.

*   Decision: Single `DOM` cache object populated during `init()`.
    *   Reason: Standardizes DOM querying, prevents scattered `document.getElementById` calls, and prevents unnecessary re-querying inside loops.

*   Decision: Implement lightweight page routing in `app.js` using `<body id="...">`.
    *   Reason: Prevents the intensive state initialization and interactive DOM binding from running on static pages like `index.html`.

*   Decision: Derive default state configuration from `content.js` upon initialization.
    *   Reason: Eliminates hardcoded data defaults in `state.js`, ensuring `content.js` remains the true single source of truth.

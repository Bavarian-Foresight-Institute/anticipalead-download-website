# Decisions

*   Decision: Adopt Tailwind v4 native CSS variable architecture via `@theme` in `input.css` and remove `tailwind.config.js` entirely.
    *   Reason: Aligns with Tailwind's modern engine design, keeping all design tokens centralized in a standard CSS syntax.

*   Decision: Split `src/` into explicit `css/` and `js/` subdirectories.
    *   Reason: Prevents file clutter in the root `src` directory and explicitly separates styling entries from logic components as the codebase scales.

*   Decision: Standardize layout spacing and padding entirely via global custom CSS variables (e.g. `--spacing-section`, `--spacing-small`).
    *   Reason: Ensures pixel-perfect consistency across multiple views without hardcoding raw dimension values in the markup.

*   Decision: Extract common design patterns (like cards and info boxes) into standard Tailwind `@utility` directives (e.g., `card-selectable`, `card-info`).
    *   Reason: Keeps the DOM templates DRY (Don't Repeat Yourself) and cleanly abstracts visually dense utility strings out of the Javascript rendering layer.

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

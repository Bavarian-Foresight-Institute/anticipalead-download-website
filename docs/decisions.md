# Decisions

*   Decision: Use Tailwind v4 CLI with an @config import in input.css to maintain the legacy v3 tailwind.config.js architecture.
    *   Reason: Keeps JS configuration separate from CSS while using the latest compiler.

*   Decision: Use CSS box-shadow (Tailwind ring-inset) instead of borders for active selection states.
    *   Reason: Prevents grid layout shifting caused by the box model geometry.

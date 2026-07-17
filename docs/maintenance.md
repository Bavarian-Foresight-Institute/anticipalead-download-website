<!--
file: docs/maintenance.md
purpose: Document the project maintenance procedures.
responsibilities: Guide maintainers on updating content, dependencies, and structure.
dependencies: None
-->

# Maintenance

This guide provides instructions for maintaining and updating the AnticipaLead download website.

## Updating Content & Presets

All static UI content and option definitions (`scenarios`, `perspectives`, `timeHorizons`, `languages`, `presetModes`, `faqData`, `printingGuideData`) are centralized in `src/js/core/content.js`.

### Adding or Modifying Presets (`presetModes`)
Preset modes allow users to quickly get started with preconfigured selections. To add or modify a preset:
1. Open `src/js/core/content.js` and locate `presetModes`.
2. Each entry defines:
   - `id`: Unique identifier (`preset1`, `preset2`, `preset3`, `custom`)
   - `title`, `description`, `badgeText`
   - `perspective`, `timeHorizon`, `scenario`: The exact state keys to preconfigure when selected.
3. For custom options (`Use your own Scenario` or `Own Technologies`), attach `isCustom: true` to the option definition inside `scenarios` or `timeHorizons`.

## Updating File Mappings & Dynamic Conditions

The declarative mapping between user selections and downloadable files is defined in `src/js/core/config.json`. `engine.js` automatically resolves template paths and evaluates condition rules without hardcoded option IDs.

### Adding Conditional Files or Exclusions
In `config.json`, each entry under `fileMappings` supports:
*   `dependencies`: Array of required state keys (`["language", "perspective"]`).
*   `template`: Blueprint string for URL interpolation (`canvases/canvas1_{language}_{perspective}.pdf`).
*   `conditions` / `conditionsAny`: Array of condition objects where all (`conditions`) or at least one (`conditionsAny`) must match.
*   `excludeConditions` / `excludeWhenAll`: Array of condition objects where any (`excludeConditions`) or all (`excludeWhenAll`) match to exclude the file.

### Dot-Notation Metadata Lookups
Instead of hardcoding IDs like `"scenario": "7"` in `config.json`, use option metadata lookups:
*   `{ "scenario.isCustom": true }`: Matches whenever the selected scenario object in `content.js` has `isCustom: true`.
*   `{ "timeHorizon.isCustom": true }`: Matches whenever the selected time horizon object has `isCustom: true`.

Example conditional mapping:
```json
"customGuide": {
  "dependencies": ["language"],
  "template": "guides/own_material_guide_{language}.pdf",
  "conditionsAny": [
    { "scenario.isCustom": true },
    { "timeHorizon.isCustom": true }
  ]
}
```

## CSS Changes

All styling uses Tailwind CSS (`v4+`). When adding new utility classes or badge themes (`input.css`), ensure the Tailwind watcher is running:
```bash
npm run watch:css
```

## Dependency Management

Periodically review and update dependencies in `package.json`. The primary dependencies are `@tailwindcss/cli` (`v4+`) and `jszip` (for client-side ZIP generation).
```bash
npm update
```

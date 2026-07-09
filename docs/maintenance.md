<!--
file: docs/maintenance.md
purpose: Document the project maintenance procedures.
responsibilities: Guide maintainers on updating content, dependencies, and structure.
dependencies: None
-->

# Maintenance

This guide provides instructions for maintaining and updating the AnticipaLead download website.

## Updating Content

The static UI content (scenarios, perspectives, time horizons) is centralized in `src/core/content.js`. To add or modify the available options, update the respective objects in this file.

## Updating File Mappings

The mapping between user choices and download files is defined in `src/core/config.json`. If new file combinations are introduced or file naming conventions change, update the string interpolation templates in this file.

## CSS Changes

All styling uses Tailwind CSS. When adding new classes to the HTML files or JavaScript templates, ensure that the Tailwind watcher is running (`npm run watch:css`) so the `assets/output.css` file is updated.

## Dependency Management

Periodically review and update dependencies in `package.json`. The primary dependencies are `tailwindcss` and `jszip` (used for generating local downloads).

```bash
npm update
```

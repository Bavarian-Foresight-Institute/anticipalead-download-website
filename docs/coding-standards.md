<!--
file: docs/coding-standards.md
purpose: Document the coding standards and practices for the project.
responsibilities: Outline files, JavaScript, modeling, and formatting constraints.
dependencies: None
-->

# Coding Standards and Engineering Practices

To maintain code quality and ease of collaboration, all development in this repository must conform to the following standards:

## File and Folder Naming

*   All file names and folder names must be written in lowercase with hyphen separators (kebab-case).
*   Example: `state-manager.js`, `brand-assets/`.

## JavaScript Standards

*   **Single Responsibility Principle:** Each function must perform one specific task. Keep functions focused and small.
*   **Descriptive Naming:** Function names must be explicit, verb-noun combinations that clearly explain the function's action.
*   **Documentation Headers:** Every function must be documented using clean JSDoc headers specifying:
    *   Purpose of the function.
    *   Parameters and their types.
    *   Return values and their types.
    *   Important implementation decisions or logic reasons.

## Configuration and Modeling

*   **No Hardcoded Arrays:** Hardcoded file lists or asset arrays inside JavaScript files are strictly banned.
*   **Configuration Models:** All files, resources, assets, and game relationships must live in declarative configuration models (such as JSON config files).

## Text and Character Constraints

*   **Standard Hyphens Only:** Standard hyphens (-) must be used exclusively. Do not use em-dashes or en-dashes anywhere in text or code files.
*   **Markdown Formatting:** All generated markdown files must use clean markdown formatting with clear, consistent headings.

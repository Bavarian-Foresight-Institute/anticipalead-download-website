<!--
file: docs/setup.md
purpose: Document the project setup and local development instructions.
responsibilities: Provide clear steps for onboarding new developers.
dependencies: package.json
-->

# Setup and Local Development

This guide outlines how to set up the AnticipaLead download website for local development.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bavarian-Foresight-Institute/anticipalead-download-website.git
   cd anticipalead-download-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

The project uses Tailwind CSS for styling. To compile the CSS during development:

```bash
npm run watch:css
```

To serve the static files locally, you can use any static file server. A common choice is `serve`:

```bash
npx serve .
```

Open your browser to the URL provided by `serve` (usually `http://localhost:3000` or `http://localhost:5000`).

## Build

To build the CSS for production:

```bash
npx @tailwindcss/cli -i ./src/css/input.css -o ./assets/output.css --minify
```

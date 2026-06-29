/**
 * file: src/app.js
 * purpose: Main entry point for the AnticipaLead website.
 * responsibilities: Initialize the application, bind DOM events, and coordinate between state and UI.
 * dependencies: src/core/state.js, src/core/engine.js, src/ui.js
 */

import { renderScenarioCard, renderVersionCard, renderSummaryRow } from './ui.js';

// Mock Data for Scenarios
const scenarios = [
    {
        id: 'A',
        title: 'AI in talent management',
        description: 'AI-driven hiring and performance evaluation. Ethics, accountability, and bias.',
        badgeText: 'HR & PEOPLE',
        badgeColorClass: 'bg-red-800'
    },
    {
        id: 'B',
        title: 'Predictive maintenance & workforce',
        description: 'AI in a factory setting. Job displacement, retraining, and leadership legitimacy.',
        badgeText: 'MANUFACTURING',
        badgeColorClass: 'bg-purple-700'
    },
    {
        id: 'C',
        title: 'Autonomous diagnostics',
        description: 'AI-assisted clinical decisions. Patient trust, data governance, accountability.',
        badgeText: 'HEALTHCARE',
        badgeColorClass: 'bg-blue-700'
    }
];

// Mock Data for Versions
const versions = [
    {
        title: 'Standard',
        description: 'Players keep their role throughout. Ideal for first-time groups or fewer than 7 players.',
        isRecommended: true
    },
    {
        title: 'With changes of perspective',
        description: 'Players switch roles between rounds. Requires exactly 7 players and double-sided printing.',
        isRecommended: false
    }
];

// Render Scenarios
const scenarioGrid = document.getElementById('scenario-grid');
if (scenarioGrid) {
    let scenariosHTML = '';
    scenarios.forEach(s => {
        scenariosHTML += renderScenarioCard(s.id, s.title, s.description, s.badgeText, s.badgeColorClass);
    });
    scenarioGrid.innerHTML = scenariosHTML;
}

// Render Versions
const versionGrid = document.getElementById('version-grid');
if (versionGrid) {
    let versionsHTML = '';
    versions.forEach(v => {
        versionsHTML += renderVersionCard(v.title, v.description, v.isRecommended);
    });
    versionGrid.innerHTML = versionsHTML;
}

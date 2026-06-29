/**
 * file: src/app.js
 * purpose: Main entry point for the AnticipaLead website.
 * responsibilities: Initialize the application, bind DOM events, and coordinate between state and UI.
 * dependencies: src/core/state.js, src/core/engine.js, src/ui.js
 */

import { getState, setScenario, setPerspective, setTimeHorizon, setLanguage, subscribe } from './core/state.js';
import { renderScenarioCard, renderPerspectiveCard, renderTimeHorizonCard, renderSummaryRow } from './ui.js';

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

// Mock Data for Perspectives
const perspectives = [
    {
        id: 'gen',
        title: 'General',
        description: 'Players keep their role throughout. Ideal for first-time groups or fewer than 7 players.',
        isRecommended: true
    },
    {
        id: 'corp',
        title: 'Corporate with changes',
        description: 'Players switch roles between rounds. Requires exactly 7 players and double-sided printing.',
        isRecommended: false
    }
];

// Mock Data for Time Horizons
const timeHorizons = [
    {
        id: 'all',
        title: 'All Time Horizons',
        description: 'Play with all available cards for a complete experience.'
    },
    {
        id: 's',
        title: 'Short-term',
        description: 'Focus on immediate technological impacts.'
    },
    {
        id: 'm',
        title: 'Medium-term',
        description: 'Explore emerging trends and their adoption.'
    },
    {
        id: 'l',
        title: 'Long-term',
        description: 'Analyze distant futures and paradigm shifts.'
    }
];

// DOM Elements
const viewConfigure = document.getElementById('view-configure');
const viewReview = document.getElementById('view-review');
const viewDownload = document.getElementById('view-download');
const scenarioGrid = document.getElementById('scenario-grid');
const perspectiveGrid = document.getElementById('perspective-grid');
const timeHorizonGrid = document.getElementById('time-horizon-grid');
const languageGrid = document.getElementById('language-grid');
const btnContinue = document.getElementById('btn-continue');
const btnBack = document.getElementById('btn-back');
const summaryTableBody = document.getElementById('summary-table-body');

/**
 * Switches the active view by toggling Tailwind's 'hidden' class.
 */
function switchView(viewId) {
    [viewConfigure, viewReview, viewDownload].forEach(view => {
        if (view) {
            if (view.id === viewId) {
                view.classList.remove('hidden');
            } else {
                view.classList.add('hidden');
            }
        }
    });
}

/**
 * Re-renders the UI components based on the current state.
 */
function renderUI(state) {
    // Render Scenarios
    if (scenarioGrid) {
        scenarioGrid.innerHTML = scenarios.map(s => 
            renderScenarioCard(s.id, s.title, s.description, s.badgeText, s.badgeColorClass, state.scenario === s.id)
        ).join('');
    }

    // Render Perspectives
    if (perspectiveGrid) {
        perspectiveGrid.innerHTML = perspectives.map(p => 
            renderPerspectiveCard(p.id, p.title, p.description, p.isRecommended, state.perspective === p.id)
        ).join('');
    }

    // Render Time Horizons
    if (timeHorizonGrid) {
        timeHorizonGrid.innerHTML = timeHorizons.map(t => 
            renderTimeHorizonCard(t.id, t.title, t.description, state.timeHorizon === t.id)
        ).join('');
    }

    // Render Languages
    if (languageGrid) {
        const langElements = languageGrid.querySelectorAll('[data-lang]');
        langElements.forEach(el => {
            const lang = el.getAttribute('data-lang');
            if (state.language === lang) {
                el.className = 'flex-1 bg-white rounded-lg ring-2 ring-inset ring-black shadow-sm p-4 text-center cursor-pointer font-medium hover:shadow transition-shadow duration-200';
            } else {
                el.className = 'flex-1 bg-white rounded-lg ring-1 ring-inset ring-gray-200 p-4 text-center cursor-pointer text-gray-500 hover:shadow transition-shadow duration-200';
            }
        });
    }
}

// Bind DOM Events
function bindEvents() {
    // Scenario selection delegation
    if (scenarioGrid) {
        scenarioGrid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-scenario]');
            if (card) {
                const scenarioId = card.getAttribute('data-scenario');
                setScenario(scenarioId);
            }
        });
    }

    // Perspective selection delegation
    if (perspectiveGrid) {
        perspectiveGrid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-perspective]');
            if (card) {
                const perspectiveId = card.getAttribute('data-perspective');
                setPerspective(perspectiveId);
            }
        });
    }

    // Time Horizon selection delegation
    if (timeHorizonGrid) {
        timeHorizonGrid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-time]');
            if (card) {
                const timeId = card.getAttribute('data-time');
                setTimeHorizon(timeId);
            }
        });
    }

    // Language selection delegation
    if (languageGrid) {
        languageGrid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-lang]');
            if (card) {
                const lang = card.getAttribute('data-lang');
                setLanguage(lang);
            }
        });
    }

    // Continue to Review button
    if (btnContinue) {
        btnContinue.addEventListener('click', () => {
            const state = getState();
            if (!state.scenario) {
                alert('Please choose a scenario before continuing.');
                return;
            }

            // Find full titles for display
            const selectedScenario = scenarios.find(s => s.id === state.scenario);
            const selectedPerspective = perspectives.find(p => p.id === state.perspective);
            const selectedTimeHorizon = timeHorizons.find(t => t.id === state.timeHorizon);
            const langMap = { 'de': 'Deutsch', 'en': 'English', 'fr': 'Français' };

            // Populate Summary Table
            if (summaryTableBody) {
                summaryTableBody.innerHTML = [
                    renderSummaryRow('Language', langMap[state.language] || state.language),
                    renderSummaryRow('Perspective', selectedPerspective.title),
                    renderSummaryRow('Scenario', `${selectedScenario.id} - ${selectedScenario.title}`),
                    renderSummaryRow('Time Horizon', selectedTimeHorizon.title),
                    renderSummaryRow('Players', '5-7 per group')
                ].join('');
            }

            switchView('view-review');
        });
    }

    // Back button in Review view
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            switchView('view-configure');
        });
    }
}

// Initialize Application
function init() {
    // Subscribe UI renderer to state changes
    subscribe(renderUI);

    // Initial Render
    renderUI(getState());

    // Bind Event Listeners
    bindEvents();

    // Set initial view
    switchView('view-configure');
}

// Start
init();

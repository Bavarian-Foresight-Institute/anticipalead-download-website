/**
 * file: src/app.js
 * purpose: Main entry point for the AnticipaLead website.
 * responsibilities: Initialize the application, bind DOM events, and coordinate between state and UI.
 * dependencies: src/core/state.js, src/core/engine.js, src/ui.js
 */

import { getState, setScenario, setPerspective, setTimeHorizon, setLanguage, subscribe } from './core/state.js';
import { renderScenarioCard, renderPerspectiveCard, renderTimeHorizonCard, renderLanguageCard, renderSummaryRow, renderStepper } from './ui.js';
import { scenarios, perspectives, timeHorizons, languages } from './core/content.js';



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
 * Purpose: Switch the active view in the application interface.
 * @param {string} viewId - The DOM ID of the view to display.
 * @returns {void}
 * Logic reason: Toggles Tailwind's 'hidden' class to ensure only one main view is visible at a time.
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

    const stepperContainer = document.getElementById('stepper-container');
    if (stepperContainer) {
        let step = 1;
        if (viewId === 'view-review') step = 2;
        if (viewId === 'view-download') step = 3;
        stepperContainer.innerHTML = renderStepper(step);
    }
}

/**
 * Purpose: Re-render the UI components based on the current state.
 * @param {Object} state - The current state object containing user selections.
 * @returns {void}
 * Logic reason: Maps through mock data and uses UI rendering functions to update the DOM based on state.
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
        languageGrid.innerHTML = languages.map(l => 
            renderLanguageCard(l.id, l.title, state.language === l.id)
        ).join('');
    }
}

/**
 * Purpose: Bind all DOM event listeners for the application.
 * @returns {void}
 * Logic reason: Uses event delegation on container grids to handle user selections efficiently.
 */
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
            const selectedLanguage = languages.find(l => l.id === state.language) || { title: state.language };

            // Populate Summary Table
            if (summaryTableBody) {
                summaryTableBody.innerHTML = [
                    renderSummaryRow('Language', selectedLanguage.title),
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

    // Edit button in Review view
    const btnEdit = document.getElementById('btn-edit');
    if (btnEdit) {
        btnEdit.addEventListener('click', () => {
            switchView('view-configure');
        });
    }

    // Confirm & Download button in Review view
    const btnConfirm = document.getElementById('btn-confirm');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            switchView('view-download');
        });
    }
}

/**
 * Purpose: Initialize the application on page load.
 * @returns {void}
 * Logic reason: Subscribes the UI to state changes, renders the initial view, and binds events to bootstrap the app.
 */
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

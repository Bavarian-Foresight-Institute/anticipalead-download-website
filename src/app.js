/**
 * file: src/app.js
 * purpose: Main entry point for the AnticipaLead website.
 * responsibilities: Initialize the application, bind DOM events, and coordinate between state and UI.
 * dependencies: src/core/state.js, src/core/engine.js, src/ui.js
 */

import { getState, setScenario, setPerspective, setTimeHorizon, setLanguage, subscribe, resetState } from './core/state.js';
import { renderScenarioCard, renderPerspectiveCard, renderTimeHorizonCard, renderLanguageCard, renderSummaryRow, renderStepper, NavButton, NavLink, PrimaryButton, SecondaryButton, DarkButton, SolidButton, OutlineButton, TextIconButton, TextIconLink } from './ui.js';
import { scenarios, perspectives, timeHorizons, languages } from './core/content.js';



// DOM Elements
const viewConfigure = document.getElementById('view-configure');
const viewReview = document.getElementById('view-review');
const viewDownload = document.getElementById('view-download');
const scenarioGrid = document.getElementById('scenario-grid');
const perspectiveGrid = document.getElementById('perspective-grid');
const timeHorizonGrid = document.getElementById('time-horizon-grid');
const languageGrid = document.getElementById('language-grid');
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
    const btnContinue = document.getElementById('btn-continue');
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
    const btnBack = document.getElementById('btn-back');
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

    // Download another scenario button
    const btnDownloadAnother = document.getElementById('btn-download-another');
    if (btnDownloadAnother) {
        btnDownloadAnother.addEventListener('click', () => {
            resetState();
            switchView('view-configure');
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

    // Inject index.html buttons
    const navLinksContainer = document.getElementById('nav-links-container');
    if (navLinksContainer) {
        navLinksContainer.innerHTML = [
            NavLink({ id: 'nav-about', text: 'About', href: '#' }),
            NavLink({ id: 'nav-research', text: 'Research', href: '#' }),
            NavLink({ id: 'nav-how-to-play', text: 'How to play', href: '#' })
        ].join('');
    }

    const navBtnContainer = document.getElementById('nav-btn-container');
    if (navBtnContainer) {
        navBtnContainer.innerHTML = NavButton({
            id: 'nav-download-btn',
            text: 'Download',
            href: 'download.html'
        });
    }

    const heroDownloadContainer = document.getElementById('hero-download-btn-container');
    if (heroDownloadContainer) {
        heroDownloadContainer.innerHTML = PrimaryButton({
            id: 'hero-download-btn',
            text: 'Get the game materials',
            href: 'download.html',
            icon: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`
        });
    }

    const heroVideoContainer = document.getElementById('hero-video-btn-container');
    if (heroVideoContainer) {
        heroVideoContainer.innerHTML = SecondaryButton({
            id: 'hero-video-btn',
            text: 'Watch the video guide',
            href: '#',
            icon: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        });
    }

    const bottomDownloadContainer = document.getElementById('bottom-download-btn-container');
    if (bottomDownloadContainer) {
        bottomDownloadContainer.innerHTML = DarkButton({
            id: 'bottom-download-btn',
            text: 'Start the download process',
            href: 'download.html',
            icon: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`
        });
    }

    // Inject download.html buttons
    const navBackContainer = document.getElementById('nav-back-container');
    if (navBackContainer) {
        navBackContainer.innerHTML = TextIconLink({
            id: 'nav-back-btn',
            text: 'Back to overview',
            href: 'index.html',
            icon: `<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>`
        });
    }

    const btnContinueContainer = document.getElementById('btn-continue-container');
    if (btnContinueContainer) {
        btnContinueContainer.innerHTML = SolidButton({
            id: 'btn-continue',
            text: 'Continue to review',
            iconEnd: `<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`
        });
    }

    const btnEditContainer = document.getElementById('btn-edit-container');
    if (btnEditContainer) {
        btnEditContainer.innerHTML = TextIconButton({
            id: 'btn-edit',
            text: 'Edit',
            icon: `<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`
        });
    }

    const btnBackContainer = document.getElementById('btn-back-container');
    if (btnBackContainer) {
        btnBackContainer.innerHTML = OutlineButton({
            id: 'btn-back',
            text: 'Back',
            icon: `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>`
        });
    }

    const btnConfirmContainer = document.getElementById('btn-confirm-container');
    if (btnConfirmContainer) {
        btnConfirmContainer.innerHTML = SolidButton({
            id: 'btn-confirm',
            text: 'Confirm & download',
            size: 'lg',
            icon: `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`
        });
    }

    const btnDownloadZipContainer = document.getElementById('btn-download-zip-container');
    if (btnDownloadZipContainer) {
        btnDownloadZipContainer.innerHTML = SolidButton({
            id: 'btn-download-zip',
            text: 'Download ZIP',
            size: 'xl',
            isFullWidth: true,
            icon: `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`,
            iconEnd: `<svg class="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>`
        });
    }

    const btnDownloadAnotherContainer = document.getElementById('btn-download-another-container');
    if (btnDownloadAnotherContainer) {
        btnDownloadAnotherContainer.innerHTML = OutlineButton({
            id: 'btn-download-another',
            text: 'Download another scenario',
            isFlexible: true,
            icon: `<svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>`
        });
    }

    const btnQuickstartContainer = document.getElementById('btn-quickstart-container');
    if (btnQuickstartContainer) {
        btnQuickstartContainer.innerHTML = OutlineButton({
            id: 'btn-quickstart',
            text: 'Quick-start guide',
            isFlexible: true,
            icon: `<svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253"></path></svg>`
        });
    }

    // Bind Event Listeners
    bindEvents();

    // Set initial view
    switchView('view-configure');
}

// Start
init();

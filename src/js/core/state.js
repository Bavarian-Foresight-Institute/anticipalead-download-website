/**
 * file: src/js/core/state.js
 * purpose: Centralized state manager for user selections.
 * responsibilities: Track user choices and notify listeners of state changes.
 * dependencies: src/js/core/content.js
 */

import { scenarios, perspectives, timeHorizons, languages } from './content.js';

/**
 * @type {Object}
 * Purpose: Defines the initial fallback state values.
 * Logic reason: Ensures that there is always a valid state to revert to or initialize from.
 */
let defaultState = {
    scenario: null,
    perspective: null,
    timeHorizon: null,
    language: null
};

// Current active state
let state = { ...defaultState };

// Array of subscriber callbacks
let listeners = [];

/**
 * Purpose: Initialize the state with dynamically provided defaults (e.g. from UI content).
 * @param {Object} defaults - Object containing default selections.
 * @returns {void}
 * Logic reason: Allows the application to bootstrap with the recommended default values without hardcoding them here.
 */
export function initState(defaults) {
    defaultState = { ...defaultState, ...defaults };
    state = { ...defaultState };
}

/**
 * Purpose: Retrieve a copy of the current state.
 * @returns {Object} A shallow copy of the state object.
 * Logic reason: Returns a copy to prevent direct mutation of the internal state.
 */
export function getState() {
    return { ...state };
}

/**
 * Purpose: Update the selected scenario in the state.
 * @param {string} id - The ID of the chosen scenario.
 * @returns {void}
 * Logic reason: Notifies listeners immediately after updating the state.
 */
export function setScenario(id) {
    if (scenarios.some(s => s.id === id)) {
        state.scenario = id;
        notifyListeners();
    } else {
        console.warn(`Invalid scenario ID: ${id}`);
    }
}

/**
 * Purpose: Update the selected perspective in the state.
 * @param {string} perspective - The chosen perspective ('corp' or 'gen').
 * @returns {void}
 * Logic reason: Validates the perspective before updating to prevent invalid states.
 */
export function setPerspective(perspective) {
    if (perspectives.some(p => p.id === perspective)) {
        state.perspective = perspective;
        notifyListeners();
    } else {
        console.warn(`Invalid perspective ID: ${perspective}`);
    }
}

/**
 * Purpose: Update the selected time horizon in the state.
 * @param {string} th - The chosen time horizon ('s', 'm', 'l', 'all').
 * @returns {void}
 * Logic reason: Validates the time horizon before updating to ensure only supported values are set.
 */
export function setTimeHorizon(th) {
    if (timeHorizons.some(t => t.id === th)) {
        state.timeHorizon = th;
        notifyListeners();
    } else {
        console.warn(`Invalid time horizon ID: ${th}`);
    }
}

/**
 * Purpose: Update the selected language in the state.
 * @param {string} lang - The chosen language ('de', 'en', 'fr').
 * @returns {void}
 * Logic reason: Validates the language against supported codes.
 */
export function setLanguage(lang) {
    if (languages.some(l => l.id === lang)) {
        state.language = lang;
        notifyListeners();
    } else {
        console.warn(`Invalid language ID: ${lang}`);
    }
}

/**
 * Purpose: Subscribe a callback function to state changes.
 * @param {Function} callback - The function to call when state updates.
 * @returns {void}
 * Logic reason: Enables decoupled components to react to state modifications.
 */
export function subscribe(callback) {
    listeners.push(callback);
    return () => {
        listeners = listeners.filter(cb => cb !== callback);
    };
}

/**
 * Purpose: Notify all subscribed listeners with the current state.
 * @returns {void}
 * Logic reason: Loops through and executes all stored callbacks to update UI components.
 */
function notifyListeners() {
    listeners.forEach(cb => cb(state));
}

/**
 * Purpose: Revert state to default values.
 * @returns {void}
 * Logic reason: Allows user to start over with a fresh configuration.
 */
export function resetState() {
    state = { ...defaultState };
    notifyListeners();
}

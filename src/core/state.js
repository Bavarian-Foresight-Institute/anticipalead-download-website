/**
 * file: src/core/state.js
 * purpose: Centralized state manager for user selections.
 * responsibilities: Track user choices and notify listeners of state changes.
 * dependencies: None
 */

const state = {
    scenario: null,
    perspective: 'gen',  // 'corp', 'gen'
    timeHorizon: 'all',  // 's', 'm', 'l', 'all'
    language: 'de'       // 'de', 'en', 'fr'
};

const listeners = [];

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
    if (typeof id === 'string') {
        state.scenario = id;
        notifyListeners();
    }
}

/**
 * Purpose: Update the selected perspective in the state.
 * @param {string} perspective - The chosen perspective ('corp' or 'gen').
 * @returns {void}
 * Logic reason: Validates the perspective before updating to prevent invalid states.
 */
export function setPerspective(perspective) {
    const validPerspectives = ['corp', 'gen'];
    if (validPerspectives.includes(perspective)) {
        state.perspective = perspective;
        notifyListeners();
    }
}

/**
 * Purpose: Update the selected time horizon in the state.
 * @param {string} th - The chosen time horizon ('s', 'm', 'l', 'all').
 * @returns {void}
 * Logic reason: Validates the time horizon before updating to ensure only supported values are set.
 */
export function setTimeHorizon(th) {
    const validTimeHorizons = ['s', 'm', 'l', 'all'];
    if (validTimeHorizons.includes(th)) {
        state.timeHorizon = th;
        notifyListeners();
    }
}

/**
 * Purpose: Update the selected language in the state.
 * @param {string} lang - The chosen language ('de', 'en', 'fr').
 * @returns {void}
 * Logic reason: Validates the language against supported codes.
 */
export function setLanguage(lang) {
    const validLangs = ['de', 'en', 'fr'];
    if (validLangs.includes(lang)) {
        state.language = lang;
        notifyListeners();
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
}

/**
 * Purpose: Notify all subscribed listeners with the current state.
 * @returns {void}
 * Logic reason: Loops through and executes all stored callbacks to update UI components.
 */
function notifyListeners() {
    listeners.forEach(cb => cb(state));
}

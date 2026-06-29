/**
 * file: src/core/state.js
 * purpose: Centralized state manager for user selections.
 */

const state = {
    scenario: null,
    perspective: 'gen',  // 'corp', 'gen'
    timeHorizon: 'all',  // 's', 'm', 'l', 'all'
    language: 'de'       // 'de', 'en', 'fr'
};

const listeners = [];

export function getState() {
    return { ...state };
}

export function setScenario(id) {
    if (typeof id === 'string') {
        state.scenario = id;
        notifyListeners();
    }
}

export function setPerspective(perspective) {
    const validPerspectives = ['corp', 'gen'];
    if (validPerspectives.includes(perspective)) {
        state.perspective = perspective;
        notifyListeners();
    }
}

export function setTimeHorizon(th) {
    const validTimeHorizons = ['s', 'm', 'l', 'all'];
    if (validTimeHorizons.includes(th)) {
        state.timeHorizon = th;
        notifyListeners();
    }
}

export function setLanguage(lang) {
    const validLangs = ['de', 'en', 'fr'];
    if (validLangs.includes(lang)) {
        state.language = lang;
        notifyListeners();
    }
}

export function subscribe(callback) {
    listeners.push(callback);
}

function notifyListeners() {
    listeners.forEach(cb => cb(state));
}

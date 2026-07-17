/**
 * file: src/js/core/engine.js
 * purpose: Core logic for resolving download paths based on state and dynamic conditions.
 * responsibilities: Interpolate file mappings, evaluate inclusion/exclusion conditions, and return an array of URLs.
 * dependencies: src/js/core/config.json, src/js/core/content.js
 */

import config from './config.json' with { type: 'json' };
import { scenarios, timeHorizons, perspectives, languages } from './content.js';

const BASE_PATH = './assets/downloads/';

/**
 * Purpose: Evaluates a single condition object against the current state and option metadata from content.js.
 * @param {Object} condObj - Key-value conditions to match (e.g. { "scenario": "7" } or { "scenario.isCustom": true }).
 * @param {Object} currentState - The application state.
 * @returns {boolean} True if all key-value pairs in the condition object match the current configuration or option metadata.
 * Logic reason: Supports both direct state properties and dot-notation option lookups to avoid hardcoding in engine.js.
 */
function evaluateConditionObject(condObj, currentState) {
    for (const condKey in condObj) {
        if (!Object.prototype.hasOwnProperty.call(condObj, condKey)) continue;
        const expected = condObj[condKey];
        let actual;

        if (condKey.includes('.')) {
            const [category, prop] = condKey.split('.');
            let selectedObj = null;
            if (category === 'scenario') {
                selectedObj = scenarios.find(s => s.id === currentState.scenario);
            } else if (category === 'timeHorizon') {
                selectedObj = timeHorizons.find(t => t.id === currentState.timeHorizon);
            } else if (category === 'perspective') {
                selectedObj = perspectives.find(p => p.id === currentState.perspective);
            } else if (category === 'language') {
                selectedObj = languages.find(l => l.id === currentState.language);
            }
            actual = selectedObj ? selectedObj[prop] : undefined;
        } else {
            actual = currentState[condKey];
        }

        if (Array.isArray(expected)) {
            if (!expected.includes(actual)) return false;
        } else {
            if (actual !== expected) return false;
        }
    }
    return true;
}

/**
 * Purpose: Resolves the list of files to download based on the provided state and mapping rules.
 * @param {Object} currentState - The current user configuration.
 * @returns {Array<string>} An array of fully resolved file paths.
 * Logic reason: Pure function that validates dependencies, evaluates AND/OR inclusion/exclusion rules, and interpolates strings.
 */
export function resolveDownloadList(currentState) {
    const fileMappings = config.fileMappings;
    const resolvedPaths = [];

    for (const key in fileMappings) {
        if (!Object.prototype.hasOwnProperty.call(fileMappings, key)) continue;

        const mapping = fileMappings[key];
        const dependencies = mapping.dependencies || [];
        let templateString = mapping.template;

        // 1. Validate Dependencies: skip if any required dependency is missing from state
        const isSatisfied = dependencies.every(dep => {
            const val = currentState[dep];
            return val !== null && val !== undefined && val !== '';
        });

        if (!isSatisfied) continue;

        // 2. Validate AND Conditions (`conditions` / `includeWhenAll`)
        if (mapping.conditions) {
            const condArray = Array.isArray(mapping.conditions) ? mapping.conditions : [mapping.conditions];
            const allMet = condArray.every(condObj => evaluateConditionObject(condObj, currentState));
            if (!allMet) continue;
        }

        // 3. Validate OR Conditions (`conditionsAny` / `includeWhenAny`)
        if (mapping.conditionsAny || mapping.includeWhenAny) {
            const anyArray = mapping.conditionsAny || mapping.includeWhenAny;
            if (Array.isArray(anyArray) && anyArray.length > 0) {
                const anyMet = anyArray.some(condObj => evaluateConditionObject(condObj, currentState));
                if (!anyMet) continue;
            }
        }

        // 4. Validate Exclusion OR Conditions (`excludeConditions` / `excludeWhenAny`)
        if (mapping.excludeConditions || mapping.excludeWhenAny || mapping.exclude) {
            const excludeVal = mapping.excludeConditions || mapping.excludeWhenAny || mapping.exclude;
            const excludeArray = Array.isArray(excludeVal) ? excludeVal : [excludeVal];
            const shouldExclude = excludeArray.some(condObj => evaluateConditionObject(condObj, currentState));
            if (shouldExclude) continue;
        }

        // 5. Validate Exclusion AND Conditions (`excludeWhenAll`)
        if (mapping.excludeWhenAll) {
            const excludeAllArray = Array.isArray(mapping.excludeWhenAll) ? mapping.excludeWhenAll : [mapping.excludeWhenAll];
            const shouldExcludeAll = excludeAllArray.every(condObj => evaluateConditionObject(condObj, currentState));
            if (shouldExcludeAll) continue;
        }

        // Interpolate Template
        templateString = templateString.replace(/{([^{}]+)}/g, (match, tokenKey) => {
            const val = currentState[tokenKey];
            if (val === undefined || val === null || val === '') {
                throw new Error(`Engine Error: Unresolved token '{${tokenKey}}' found in path blueprint.`);
            }
            return val;
        });

        // Prepend Base Path
        resolvedPaths.push(`${BASE_PATH}${templateString}`);
    }

    return resolvedPaths;
}


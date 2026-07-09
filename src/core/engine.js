/**
 * file: src/core/engine.js
 * purpose: Core logic for resolving download paths based on state.
 * responsibilities: Interpolate file mappings and return an array of URLs.
 * dependencies: src/core/config.json
 */

import config from './config.json' with { type: 'json' };

const BASE_PATH = './assets/downloads/';

/**
 * Purpose: Resolves the list of files to download based on the provided state.
 * @param {Object} currentState - The current user configuration.
 * @returns {Array<string>} An array of fully resolved file paths.
 * Logic reason: Pure function that validates dependencies and interpolates strings.
 */
export function resolveDownloadList(currentState) {
    const fileMappings = config.fileMappings;
    const resolvedPaths = [];

    for (const key in fileMappings) {
        if (!Object.prototype.hasOwnProperty.call(fileMappings, key)) continue;

        const mapping = fileMappings[key];
        const dependencies = mapping.dependencies;
        let templateString = mapping.template;

        // Validate Dependencies: skip if any required dependency is missing
        const isSatisfied = dependencies.every(dep => {
            const val = currentState[dep];
            return val !== null && val !== undefined && val !== '';
        });

        if (!isSatisfied) continue;

        // Interpolate Template
        templateString = templateString.replace(/{([^{}]+)}/g, (match, key) => {
            const val = currentState[key];
            if (val === undefined || val === null || val === '') {
                throw new Error(`Engine Error: Unresolved token '{${key}}' found in path blueprint.`);
            }
            return val;
        });

        // Prepend Base Path
        resolvedPaths.push(`${BASE_PATH}${templateString}`);
    }

    return resolvedPaths;
}

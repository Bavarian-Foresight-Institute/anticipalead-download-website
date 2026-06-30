/**
 * file: src/core/download.js
 * purpose: Orchestrates the generation of the final ZIP file.
 * responsibilities: Fetch resolved files, compress them, and trigger the browser download.
 * dependencies: src/core/engine.js, JSZip (global)
 */

import { resolveDownloadList } from './engine.js';

/**
 * Generates and downloads a flat zip file based on the current state.
 * Validates file existence on the server and aborts if missing.
 * @param {Object} currentState - The application state.
 */
export async function generateAndDownloadZip(currentState) {
    const filePaths = resolveDownloadList(currentState);
    const zip = new window.JSZip();
    const missingFiles = [];

    // Fetch and flatten logic
    for (const path of filePaths) {
        const response = await fetch(path);

        if (!response.ok) {
            const filename = path.split('/').pop();
            missingFiles.push(filename);
            continue;
        }

        const blob = await response.blob();
        const filename = path.split('/').pop();
        zip.file(filename, blob);
    }

    // Error throwing
    if (missingFiles.length > 0) {
        throw new Error(missingFiles.join(', '));
    }

    // Browser download trigger
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    
    const a = document.createElement('a');
    a.href = url;
    
    // Create a meaningful filename based on state
    const { scenario, perspective, timeHorizon, language } = currentState;
    const perspectiveTag = perspective === 'corp' ? 'Corporate' : 'General';
    a.download = `AnticipaLead_Scenario${scenario}_${perspectiveTag}_${language.toUpperCase()}.zip`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

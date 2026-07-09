/**
 * file: src/core/download.js
 * purpose: Orchestrates the generation of the final ZIP file.
 * responsibilities: Fetch resolved files, compress them, and trigger the browser download.
 * dependencies: src/core/engine.js, JSZip (global)
 */

import { resolveDownloadList } from './engine.js';

export function getDownloadFilename(currentState) {
    const { scenario, perspective, timeHorizon, language } = currentState;
    const perspectiveTag = perspective === 'corp' ? 'Corporate' : 'General';
    return `AnticipaLead_Scenario${scenario}_${perspectiveTag}_${language.toUpperCase()}.zip`;
}

export async function getEstimatedZipSize(currentState) {
    const filePaths = resolveDownloadList(currentState);
    let totalBytes = 0;
    let missingFiles = [];
    
    const promises = filePaths.map(async (path) => {
        try {
            const res = await fetch(path, { method: 'HEAD' });
            if (res.ok) {
                const size = parseInt(res.headers.get('content-length'), 10) || 0;
                totalBytes += size;
            } else {
                missingFiles.push(path);
            }
        } catch (e) {
            console.error('Failed to get size for', path);
            missingFiles.push(path);
        }
    });
    
    await Promise.all(promises);
    return { filesCount: filePaths.length, missingFiles, totalBytes };
}

/**
 * Generates and downloads a flat zip file based on the current state.
 * Validates file existence on the server and aborts if missing.
 * @param {Object} currentState - The application state.
 * @param {Function} [onProgress] - Callback for tracking fetch/zip progress.
 */
export async function generateAndDownloadZip(currentState, onProgress = () => {}) {
    const filePaths = resolveDownloadList(currentState);
    const zip = new window.JSZip();
    const missingFiles = [];

    let completed = 0;
    const total = filePaths.length;

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

        completed++;
        onProgress({ phase: 'fetching', completed, total });
    }

    // Error throwing
    if (missingFiles.length > 0) {
        throw new Error(missingFiles.join(', '));
    }

    // Browser download trigger
    const zipBlob = await zip.generateAsync(
        { type: 'blob' },
        (metadata) => onProgress({ phase: 'zipping', percent: metadata.percent.toFixed(0) })
    );
    const url = URL.createObjectURL(zipBlob);
    
    const a = document.createElement('a');
    a.href = url;
    
    a.download = getDownloadFilename(currentState);
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

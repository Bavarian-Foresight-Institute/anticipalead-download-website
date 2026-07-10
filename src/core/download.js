/**
 * file: src/core/download.js
 * purpose: Orchestrates the generation of the final ZIP file.
 * responsibilities: Fetch resolved files, compress them, and trigger the browser download.
 * dependencies: src/core/engine.js, JSZip (global)
 */

import { resolveDownloadList } from './engine.js';

const verifiedFilesCache = new Set(); // Cache verified files to avoid redundant network requests

/**
 * Purpose: Generate a formatted filename for the resulting ZIP file.
 * @param {Object} currentState - The application state object containing user selections.
 * @returns {string} The constructed ZIP filename.
 * Logic reason: Standardizes the naming convention so users can easily identify downloaded scenario packages.
 */
export function getDownloadFilename(currentState) {
    const { scenario, perspective, timeHorizon, language } = currentState;
    const perspectiveTag = perspective === 'corp' ? 'Corporate' : 'General';
    return `AnticipaLead_Scenario${scenario}_${perspectiveTag}_${timeHorizon}_${language.toUpperCase()}.zip`;
}

/**
 * Purpose: Fetch the sizes of all required files to provide a download estimate.
 * @param {Object} currentState - The application state.
 * @returns {Promise<{filesCount: number, missingFiles: Array<string>, totalBytes: number}>} Metadata about the download.
 * Logic reason: Enhances user experience by providing file size and warning about missing files *before* they click download.
 */
export async function getEstimatedZipSize(currentState) {
    const filePaths = resolveDownloadList(currentState);
    let totalBytes = 0;
    let missingFiles = [];
    
    // We map to promises and resolve them concurrently to minimize waiting time for the user.
    const promises = filePaths.map(async (path) => {
        try {
            // Use HEAD request to get headers without downloading the full file payload
            const res = await fetch(path, { method: 'HEAD' });
            if (res.ok) {
                const size = parseInt(res.headers.get('content-length'), 10) || 0;
                totalBytes += size;
                verifiedFilesCache.add(path); // Cache to speed up the actual download phase
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
 * Purpose: Generates and downloads a flat zip file containing all selected scenario assets.
 * @param {Object} currentState - The application state.
 * @param {Function} [onProgress] - Callback for tracking fetch/zip progress.
 * Logic reason: We validate file existence on the server first to avoid partial downloads or corrupted zip files.
 */
export async function generateAndDownloadZip(currentState, onProgress = () => {}) {
    const filePaths = resolveDownloadList(currentState);
    const zip = new window.JSZip();
    const missingFiles = [];

    // Pre-flight validation logic
    const pathsToVerify = filePaths.filter(path => !verifiedFilesCache.has(path));
    if (pathsToVerify.length > 0) {
        const verifyPromises = pathsToVerify.map(async (path) => {
            try {
                const res = await fetch(path, { method: 'HEAD' });
                if (res.ok) {
                    verifiedFilesCache.add(path);
                } else {
                    missingFiles.push(path.split('/').pop());
                }
            } catch (e) {
                missingFiles.push(path.split('/').pop());
            }
        });
        await Promise.all(verifyPromises);
    }

    if (missingFiles.length > 0) {
        throw new Error(missingFiles.join(', '));
    }

    let completed = 0;
    const total = filePaths.length;

    // Main fetch mapping
    const fetchPromises = filePaths.map(async (path) => {
        let response;
        try {
            response = await fetch(path);
        } catch (e) {
            throw new Error("NETWORK_OFFLINE");
        }

        if (!response.ok) {
            throw new Error(path.split('/').pop());
        }

        const blob = await response.blob();
        const filename = path.split('/').pop();
        zip.file(filename, blob);

        completed++;
        onProgress({ phase: 'fetching', completed, total });
    });

    await Promise.all(fetchPromises);

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

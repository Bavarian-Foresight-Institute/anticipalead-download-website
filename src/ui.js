/**
 * file: src/ui.js
 * purpose: DOM manipulation and template rendering layer.
 * responsibilities: Provide reusable rendering functions for UI components.
 * dependencies: None
 */

/**
 * Purpose: Render the HTML template for a scenario selection card.
 * @param {string} id - The ID of the scenario.
 * @param {string} title - The display title of the scenario.
 * @param {string} description - The description text.
 * @param {string} badgeText - The text for the top badge.
 * @param {string} badgeColorClass - The Tailwind CSS class for the badge color.
 * @param {boolean} [isSelected=false] - Whether this card is currently selected.
 * @returns {string} The HTML string for the scenario card.
 * Logic reason: Uses template literals to construct HTML dynamically with proper styling based on selection state.
 */

export function renderScenarioCard(id, title, description, badgeText, badgeColorClass, isSelected = false) {
    const ringClass = isSelected ? 'ring-2 ring-inset ring-black' : 'ring-1 ring-inset ring-gray-200';
    const dotClass = isSelected ? 'border-4 border-brand-red' : 'border border-gray-300';
    const textClass = isSelected ? 'text-black' : 'text-gray-300';

    return `
        <div data-scenario="${id}" class="bg-white interactive-base standard-shadow ${ringClass} p-5 cursor-pointer relative">
            <div class="${badgeColorClass} text-white text-xs font-bold px-2 py-1 inline-block rounded mb-3 pointer-events-none">${badgeText}</div>
            <div class="${textClass} font-bold text-xl mb-1 pointer-events-none">${id}</div>
            <h3 class="font-bold text-sm mb-2 pointer-events-none">${title}</h3>
            <p class="text-xs text-gray-500 mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
        </div>
    `;
}

/**
 * Purpose: Render the HTML template for a perspective selection card.
 * @param {string} id - The ID of the perspective ('corp' or 'gen').
 * @param {string} title - The display title.
 * @param {string} description - The description text.
 * @param {boolean} isRecommended - Whether to display the "Recommended" badge.
 * @param {boolean} [isSelected=false] - Whether this card is currently selected.
 * @returns {string} The HTML string for the perspective card.
 * Logic reason: Conditionally renders a recommendation badge and toggles selection styles.
 */
export function renderPerspectiveCard(id, title, description, isRecommended, isSelected = false) {
    const badgeHTML = isRecommended
        ? `<span class="bg-white ring-1 ring-inset ring-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none">Recommended</span>`
        : '';

    const ringClass = isSelected ? 'ring-2 ring-inset ring-black' : 'ring-1 ring-inset ring-gray-200';
    const dotClass = isSelected ? 'border-4 border-brand-red' : 'border border-gray-300';

    return `
        <div data-perspective="${id}" class="bg-white interactive-base standard-shadow ${ringClass} p-5 cursor-pointer relative">
            <div class="flex justify-between items-center mb-1 pointer-events-none">
                <h3 class="font-bold pointer-events-none">${title}</h3>
                ${badgeHTML}
            </div>
            <p class="text-sm ${isSelected ? 'text-gray-600' : 'text-gray-500'} mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
        </div>
    `;
}

/**
 * Purpose: Render the HTML template for a time horizon selection card.
 * @param {string} id - The ID of the time horizon.
 * @param {string} title - The display title.
 * @param {string} description - The description text.
 * @param {boolean} [isSelected=false] - Whether this card is currently selected.
 * @returns {string} The HTML string for the time horizon card.
 * Logic reason: Uses dynamic Tailwind classes to reflect the selected state.
 */
export function renderTimeHorizonCard(id, title, description, isSelected = false) {
    const ringClass = isSelected ? 'ring-2 ring-inset ring-black' : 'ring-1 ring-inset ring-gray-200';
    const dotClass = isSelected ? 'border-4 border-brand-red' : 'border border-gray-300';
    const textClass = isSelected ? 'text-black' : 'text-gray-400';

    return `
        <div data-time="${id}" class="bg-white interactive-base standard-shadow ${ringClass} p-5 cursor-pointer relative">
            <div class="${textClass} font-bold text-lg mb-1 pointer-events-none">${title}</div>
            <p class="text-xs text-gray-500 mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
        </div>
    `;
}

/**
 * Purpose: Render the HTML template for a language selection card.
 * @param {string} id - The language code (e.g. 'de').
 * @param {string} title - The display title (e.g. '🇩🇪 Deutsch').
 * @param {boolean} [isSelected=false] - Whether this card is currently selected.
 * @returns {string} The HTML string for the language card.
 */
export function renderLanguageCard(id, title, isSelected = false) {
    const ringClass = isSelected ? 'ring-2 ring-inset ring-black font-medium' : 'ring-1 ring-inset ring-gray-200 text-gray-500';

    return `
        <div data-lang="${id}" class="flex-1 bg-white interactive-base standard-shadow p-4 text-center cursor-pointer ${ringClass}">
            ${title}
        </div>
    `;
}

/**
 * Purpose: Render an HTML table row for the configuration summary.
 * @param {string} label - The label for the summary row.
 * @param {string} value - The value to display.
 * @returns {string} The HTML string for the table row.
 * Logic reason: Standardizes the rendering of key-value pairs in the review table.
 */
export function renderSummaryRow(label, value) {
    return `
        <tr>
            <td class="w-1/3 text-gray-500 text-sm py-2 align-top">${label}</td>
            <td class="w-2/3 font-medium text-sm py-2 align-top">${value}</td>
        </tr>
    `;
}

/**
 * Purpose: Render the dynamic stepper progress bar.
 * @param {number} currentStep - The current active step (1, 2, or 3).
 * @returns {string} The HTML string for the stepper.
 */
export function renderStepper(currentStep) {
    const steps = [
        { num: 1, label: 'Configure' },
        { num: 2, label: 'Review' },
        { num: 3, label: 'Download' }
    ];

    const getStepHtml = (stepNum, label) => {
        if (stepNum < currentStep) {
            // Completed: black background, checkmark, black text
            return `
            <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span class="ml-2 text-sm font-semibold text-brand-dark">${label}</span>
            </div>
            `;
        } else if (stepNum === currentStep) {
            // Active: red background, number, red text
            return `
            <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold">${stepNum}</div>
                <span class="ml-2 text-sm font-semibold text-brand-red">${label}</span>
            </div>
            `;
        } else {
            // Next: gray background, number, gray text
            return `
            <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">${stepNum}</div>
                <span class="ml-2 text-sm font-semibold text-gray-400">${label}</span>
            </div>
            `;
        }
    };

    return `
        <div class="max-w-3xl mx-auto px-6 flex items-center justify-center">
            ${getStepHtml(1, steps[0].label)}
            <div class="w-12 h-px ${currentStep > 1 ? 'bg-brand-dark' : 'bg-gray-300'} mx-4"></div>
            ${getStepHtml(2, steps[1].label)}
            <div class="w-12 h-px ${currentStep > 2 ? 'bg-brand-dark' : 'bg-gray-300'} mx-4"></div>
            ${getStepHtml(3, steps[2].label)}
        </div>
    `;
}

/**
 * Purpose: Render the navigation button.
 * @param {Object} props - Configuration object.
 */
export function NavButton({ id, text, href = '#', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base inline-flex items-center justify-center bg-white text-brand-dark px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors ${additionalClasses}">
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render a text link for the navigation bar.
 * @param {Object} props - Configuration object.
 */
export function NavLink({ id, text, href = '#', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base hover:text-gray-300 transition-colors ${additionalClasses}">
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render the primary CTA button (Red).
 * @param {Object} props - Configuration object.
 */
export function PrimaryButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base inline-flex items-center justify-center bg-brand-red text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition-colors ${additionalClasses}">
            ${icon}
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render the secondary CTA button (White).
 * @param {Object} props - Configuration object.
 */
export function SecondaryButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base inline-flex items-center justify-center bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors ${additionalClasses}">
            ${icon}
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render the dark CTA button.
 * @param {Object} props - Configuration object.
 */
export function DarkButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base inline-flex items-center justify-center bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors ${additionalClasses}">
            ${icon}
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render a Solid Action Button (e.g. Continue, Confirm).
 * @param {Object} props - Configuration object.
 */
export function SolidButton({ id, text, icon = '', iconEnd = '', size = 'md', isFullWidth = false }) {
    let sizeClasses = size === 'lg' ? 'px-8 py-3' : 'px-6 py-3';
    if (size === 'xl') sizeClasses = 'py-4';
    
    const widthClass = isFullWidth ? 'w-full' : '';

    return `
        <button id="${id}" class="bg-brand-dark text-white ${sizeClasses} ${widthClass} interactive-base font-semibold inline-flex items-center justify-center transition-colors">
            ${icon}
            ${text}
            ${iconEnd}
        </button>
    `;
}

/**
 * Purpose: Render an Outline Action Button (e.g. Back).
 * @param {Object} props - Configuration object.
 */
export function OutlineButton({ id, text, icon = '', isFlexible = false }) {
    const sizeClasses = isFlexible ? 'flex-1 py-3 text-sm' : 'px-6 py-3';

    return `
        <button id="${id}" class="bg-white border border-gray-200 text-gray-600 ${sizeClasses} interactive-base font-semibold hover:bg-gray-50 inline-flex items-center justify-center transition-colors">
            ${icon}
            ${text}
        </button>
    `;
}

/**
 * Purpose: Render a plain Text Icon Button (e.g. Edit).
 * @param {Object} props - Configuration object.
 */
export function TextIconButton({ id, text, icon = '' }) {
    return `
        <button id="${id}" class="text-brand-red text-sm font-semibold inline-flex items-center hover:underline transition-colors">
            ${icon}
            ${text}
        </button>
    `;
}

/**
 * Purpose: Render a plain Text Icon Link (e.g. Back to overview).
 * @param {Object} props - Configuration object.
 */
export function TextIconLink({ id, text, href = '#', icon = '' }) {
    return `
        <a id="${id}" href="${href}" class="text-sm font-medium text-gray-500 hover:text-brand-dark transition-colors inline-flex items-center">
            ${icon}
            ${text}
        </a>
    `;
}

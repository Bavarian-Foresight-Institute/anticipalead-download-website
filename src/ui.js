/**
 * file: src/ui.js
 * purpose: DOM manipulation and template rendering layer.
 * responsibilities: Provide reusable rendering functions for UI components.
 * dependencies: None
 */

import { IconCheckSm } from './ui/icons.js';

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

export function renderScenarioCard({ id, title, description, badgeText, badgeColorClass, isSelected = false }) {
    const ringClass = isSelected ? 'card-ring-selected' : 'card-ring';
    const dotClass = isSelected ? 'card-dot-selected' : 'card-dot';
    const headingClass = isSelected ? 'text-brand-darker' : 'text-gray-400';

    return `
        <div data-scenario="${id}" class="bg-white rounded interactive-base ${ringClass} p-5 cursor-pointer relative interactive-hover">
            <div class="${badgeColorClass} text-white text-preset-highlight-tag px-2 py-1 inline-block rounded mb-3 pointer-events-none">${badgeText}</div>
            <h3 class="${headingClass} text-preset-sub-heading mb-1 pointer-events-none"> ${id} ${title}</h3>
            <p class="text-gray-500 text-preset-card mb-cards pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-[16px] h-[16px] rounded-full ${dotClass} pointer-events-none"></div>
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
export function renderPerspectiveCard({ id, title, description, isRecommended, isSelected = false }) {
    const badgeHTML = isRecommended
        ? `<span class="bg-white ring-1 ring-inset ring-gray-200 text-gray-500 text-preset-highlight-tag px-2 py-1 rounded pointer-events-none">Recommended</span>`
        : '';

    const ringClass = isSelected ? 'card-ring-selected' : 'card-ring';
    const dotClass = isSelected ? 'card-dot-selected' : 'card-dot';
    const headingClass = isSelected ? 'text-brand-darker' : 'text-gray-400';

    return `
        <div data-perspective="${id}" class="bg-white rounded interactive-base ${ringClass} pt-cards pb-5 px-5 cursor-pointer relative interactive-hover">
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <h3 class="${headingClass} text-preset-sub-heading pointer-events-none">${title}</h3>
                ${badgeHTML}
            </div>
            <p class="text-gray-500 text-preset-card mb-cards pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-[16px] h-[16px] rounded-full ${dotClass} pointer-events-none"></div>
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
export function renderTimeHorizonCard({ id, title, description, isSelected = false }) {
    const ringClass = isSelected ? 'card-ring-selected' : 'card-ring';
    const dotClass = isSelected ? 'card-dot-selected' : 'card-dot';
    const headingClass = isSelected ? 'text-brand-darker' : 'text-gray-400';

    return `
        <div data-time="${id}" class="bg-white rounded interactive-base ${ringClass} pt-cards pb-5 px-5 cursor-pointer relative interactive-hover">
            <h3 class="${headingClass} text-preset-sub-heading mb-1 pointer-events-none">${title}</h3>
            <p class="text-gray-500 text-preset-card mb-cards pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-[16px] h-[16px] rounded-full ${dotClass} pointer-events-none"></div>
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
export function renderLanguageCard({ id, title, isSelected = false }) {
    const ringClass = isSelected ? 'card-ring-selected' : 'card-ring';
    const dotClass = isSelected ? 'card-dot-selected' : 'card-dot';
    const headingClass = isSelected ? 'text-brand-darker' : 'text-gray-400';

    return `
        <div data-lang="${id}" class="flex-1 bg-white rounded interactive-base relative py-cards pl-5 pr-12 text-left cursor-pointer ${ringClass} interactive-hover">
            <h3 class="${headingClass} text-preset-sub-heading pointer-events-none">${title}</h3>
            <div class="absolute bottom-5 right-5 w-[16px] h-[16px] rounded-full ${dotClass} pointer-events-none"></div>
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
            <td class="w-1/3 text-gray-500 text-preset-card py-2 align-top">${label}</td>
            <td class="w-2/3 text-preset-card py-2 align-top">${value}</td>
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
                <div class="w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center text-preset-normal">
                    ${IconCheckSm}
                </div>
                <span class="ml-2 text-preset-normal text-brand-dark">${label}</span>
            </div>
            `;
        } else if (stepNum === currentStep) {
            // Active: red background, number, red text
            return `
            <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-preset-normal">${stepNum}</div>
                <span class="ml-2 text-preset-normal text-brand-red">${label}</span>
            </div>
            `;
        } else {
            // Next: gray background, number, gray text
            return `
            <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-preset-normal">${stepNum}</div>
                <span class="ml-2 text-preset-normal text-gray-400">${label}</span>
            </div>
            `;
        }
    };

    return `
        <div class="w-full">
            <div class="max-w-3xl mx-auto w-full px-6 flex items-center justify-center">
                ${getStepHtml(1, steps[0].label)}
                <div class="w-12 h-px ${currentStep > 1 ? 'bg-brand-dark' : 'bg-gray-300'} mx-4"></div>
                ${getStepHtml(2, steps[1].label)}
                <div class="w-12 h-px ${currentStep > 2 ? 'bg-brand-dark' : 'bg-gray-300'} mx-4"></div>
                ${getStepHtml(3, steps[2].label)}
            </div>
        </div>
    `;
}

/**
 * Purpose: Render the navigation button.
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID of the button.
 * @param {string} props.text - Button label.
 * @param {string} [props.href='#'] - Link URL.
 * @param {string} [props.additionalClasses=''] - Extra classes to append.
 * @returns {string} The HTML string for the navigation button.
 */
/**
 * Internal helper to generate consistent button markup.
 */
function BaseButton({ tag = 'a', id, text, href = '#', icon = '', iconEnd = '', baseClasses = '', sizeClass = 'btn-medium', additionalClasses = '' }) {
    // Filter out extra spaces
    const commonClasses = `interactive-base rounded inline-flex items-center justify-center interactive-hover ${baseClasses} ${sizeClass} ${additionalClasses}`.replace(/\s+/g, ' ').trim();

    // Some buttons only have icon or iconEnd, wrap them to prevent empty spaces if possible, but JS templates easily handle empty strings.
    const innerContent = `
            ${icon}
            ${text}
            ${iconEnd}
    `.trim();

    if (tag === 'button') {
        return `
        <button id="${id}" class="${commonClasses}">
            ${innerContent}
        </button>
        `;
    }

    return `
        <a id="${id}" href="${href}" class="${commonClasses}">
            ${innerContent}
        </a>
    `;
}

/**
 * Purpose: Render a button for the navigation bar.
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID of the button.
 * @param {string} props.text - Button label.
 * @param {string} [props.href='#'] - Link URL.
 * @param {string} [props.additionalClasses=''] - Extra classes to append.
 * @returns {string} The HTML string for the navigation button.
 */
export function NavButton({ id, text, href = '#', additionalClasses = '' }) {
    return BaseButton({ tag: 'a', id, text, href, baseClasses: 'bg-white text-brand-dark hover:bg-brand-white-hover-dark', sizeClass: 'btn-medium', additionalClasses });
}

/**
 * Purpose: Render a text link for the navigation bar.
 * ...
 */
export function NavLink({ id, text, href = '#', additionalClasses = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base hover:text-gray-300 hover:underline py-2.5 ${additionalClasses}">
            ${text}
        </a>
    `;
}

/**
 * Purpose: Render the primary CTA button (Red).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.href='#'] - Link.
 * @param {string} [props.icon=''] - SVG icon string.
 * @param {string} [props.additionalClasses=''] - Extra classes.
 * @returns {string} The HTML string for the primary button.
 */
export function PrimaryButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return BaseButton({ tag: 'a', id, text, href, icon, baseClasses: 'bg-brand-red text-white hover:bg-brand-red-hover', sizeClass: 'btn-large', additionalClasses });
}

/**
 * Purpose: Render the secondary CTA button (White).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.href='#'] - Link.
 * @param {string} [props.icon=''] - SVG icon string.
 * @param {string} [props.additionalClasses=''] - Extra classes.
 * @returns {string} The HTML string for the secondary button.
 */
export function SecondaryButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return BaseButton({ tag: 'a', id, text, href, icon, baseClasses: 'bg-white text-brand-dark border border-gray-200 hover:bg-brand-white-hover-dark', sizeClass: 'btn-large', additionalClasses });
}

/**
 * Purpose: Render the dark CTA button.
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.href='#'] - Link.
 * @param {string} [props.icon=''] - SVG icon string.
 * @param {string} [props.additionalClasses=''] - Extra classes.
 * @returns {string} The HTML string for the dark button.
 */
export function DarkButton({ id, text, href = '#', icon = '', additionalClasses = '' }) {
    return BaseButton({ tag: 'a', id, text, href, icon, baseClasses: 'bg-brand-dark text-white hover:bg-brand-dark-hover', sizeClass: 'btn-medium', additionalClasses });
}

/**
 * Purpose: Render a Solid Action Button (e.g. Continue, Confirm).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.icon=''] - Start icon SVG string.
 * @param {string} [props.iconEnd=''] - End icon SVG string.
 * @param {string} [props.size='md'] - 'md', 'lg', or 'xl'.
 * @param {boolean} [props.isFullWidth=false] - Whether button takes full width.
 * @returns {string} The HTML string for the solid action button.
 */
export function SolidButton({ id, text, icon = '', iconEnd = '', size = 'md', isFullWidth = false }) {
    const sizeClasses = size === 'xl' || size === 'lg' ? 'btn-large' : 'btn-medium';
    const widthClass = isFullWidth ? 'w-full' : '';
    return BaseButton({ tag: 'button', id, text, icon, iconEnd, baseClasses: `bg-brand-dark text-white hover:bg-brand-dark-hover ${widthClass}`, sizeClass: sizeClasses });
}

/**
 * Purpose: Render an Outline Action Button (e.g. Back).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.icon=''] - SVG icon string.
 * @param {boolean} [props.isFlexible=false] - Whether button flexes to fill space.
 * @returns {string} The HTML string for the outline action button.
 */
export function OutlineButton({ id, text, icon = '', isFlexible = false }) {
    const sizeClasses = isFlexible ? 'flex-1 btn-medium' : 'btn-medium';
    return BaseButton({ tag: 'button', id, text, icon, baseClasses: 'bg-white border border-gray-200 text-gray-600 hover:bg-brand-white-hover', sizeClass: sizeClasses });
}

/**
 * Purpose: Render a plain Text Icon Button (e.g. Edit).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.icon=''] - SVG icon string.
 * @returns {string} The HTML string for the text icon button.
 */
export function TextIconButton({ id, text, icon = '' }) {
    return `
        <button id="${id}" class="interactive-base text-brand-red text-preset-normal inline-flex items-center hover:underline">
            ${icon}
            ${text}
        </button>
    `;
}

/**
 * Purpose: Render a plain Text Icon Link (e.g. Back to overview).
 * @param {Object} props - Configuration object.
 * @param {string} props.id - HTML ID.
 * @param {string} props.text - Label.
 * @param {string} [props.href='#'] - Link URL.
 * @param {string} [props.icon=''] - SVG icon string.
 * @returns {string} The HTML string for the text icon link.
 */
export function TextIconLink({ id, text, href = '#', icon = '' }) {
    return `
        <a id="${id}" href="${href}" class="interactive-base text-preset-normal text-gray-500 hover:text-brand-dark hover:underline inline-flex items-center py-2.5">
            ${icon}
            ${text}
        </a>
    `;
}

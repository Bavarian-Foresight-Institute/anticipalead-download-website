/**
 * file: src/core/content.js
 * purpose: Centralized static UI content definitions.
 * responsibilities: Export constants for scenarios, perspectives, time horizons, and languages.
 * dependencies: None
 */

/**
 * @type {Array<{id: string, title: string, description: string, badgeText: string, badgeColorClass: string}>}
 * Purpose: Defines the available game scenarios.
 */
export const scenarios = [
    {
        id: '1',
        title: 'AI in talent management',
        description: 'AI-driven hiring and performance evaluation. Ethics, accountability, and bias.',
        badgeText: 'HR & PEOPLE',
        badgeColorClass: 'bg-red-800'
    },
    {
        id: '2',
        title: 'Predictive maintenance & workforce',
        description: 'AI in a factory setting. Job displacement, retraining, and leadership legitimacy.',
        badgeText: 'MANUFACTURING',
        badgeColorClass: 'bg-purple-700'
    },
    {
        id: '3',
        title: 'Autonomous diagnostics',
        description: 'AI-assisted clinical decisions. Patient trust, data governance, accountability.',
        badgeText: 'HEALTHCARE',
        badgeColorClass: 'bg-blue-700'
    }
];

/**
 * @type {Array<{id: string, title: string, description: string, isRecommended: boolean}>}
 * Purpose: Defines the available player perspectives.
 */
export const perspectives = [
    {
        id: 'gen',
        title: 'General',
        description: 'Players keep their role throughout. Ideal for first-time groups or fewer than 7 players.',
        isRecommended: true
    },
    {
        id: 'corp',
        title: 'Corporate with changes',
        description: 'Players switch roles between rounds. Requires exactly 7 players and double-sided printing.',
        isRecommended: false
    }
];

/**
 * @type {Array<{id: string, title: string, description: string}>}
 * Purpose: Defines the available time horizons for technology cards.
 */
export const timeHorizons = [
    {
        id: 'all',
        title: 'All Time Horizons',
        description: 'Play with all available cards for a complete experience.'
    },
    {
        id: 's',
        title: 'Short-term',
        description: 'Focus on immediate technological impacts.'
    },
    {
        id: 'm',
        title: 'Medium-term',
        description: 'Explore emerging trends and their adoption.'
    },
    {
        id: 'l',
        title: 'Long-term',
        description: 'Analyze distant futures and paradigm shifts.'
    }
];

/**
 * @type {Array<{id: string, title: string}>}
 * Purpose: Defines the supported languages for the game materials.
 */
export const languages = [
    {
        id: 'de',
        title: '🇩🇪 Deutsch'
    },
    {
        id: 'en',
        title: '🇬🇧 English'
    },
    {
        id: 'fr',
        title: '🇫🇷 Français'
    }
];

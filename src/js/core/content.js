/**
 * file: src/js/core/content.js
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

/**
 * @type {Array<{num: string, title: string, description: string}>}
 * Purpose: Defines the steps for the 'How it works' section on the homepage.
 */
export const howItWorksSteps = [
    {
        num: '01',
        title: 'Choose your scenario',
        description: 'Pick from 8 scenarios spanning AI in HR, healthcare, manufacturing, logistics, and more. Each challenges a different leadership dilemma.'
    },
    {
        num: '02',
        title: 'Download and print',
        description: 'The assistant bundles exactly the files you need. Technology cards print at A4; canvases at A3.'
    },
    {
        num: '03',
        title: 'Set up the table',
        description: 'Arrange materials as shown in the quick start guide. The audio file replaces a human moderator entirely.'
    },
    {
        num: '04',
        title: 'Play and reflect',
        description: 'Work through Canvas 1, draw technology cards, and discuss on Canvas 2. Repeat rounds, then share results across groups.'
    }
];


/**
 * @type {Array<{id: string, title: string, description: string}>}
 * Purpose: Defines the package contents cards for the index page.
 */
export const packageContents = [
    {
        id: 'IconRoleCards',
        title: 'Role cards',
        description: 'Ethicist, Executor, Integrator, Analyst'
    },
    {
        id: 'IconCanvases',
        title: 'Canvases 1 and 2',
        description: 'A3 format - 1 copy per group'
    },
    {
        id: 'IconTechCards',
        title: 'Technology cards',
        description: 'Scenario specific - A4 cut outs'
    },
    {
        id: 'IconAudioGuide',
        title: 'Audio guide',
        description: 'Replaces an external moderator'
    },
    {
        id: 'IconAudioGuide',
        title: 'Audio guide',
        description: 'Replaces an external moderator'
    },
    {
        id: 'IconAudioGuide',
        title: 'Audio guide',
        description: 'Replaces an external moderator'
    }
];

/**
 * @type {Object}
 * Purpose: Defines the centralized footer text for all pages.
 */
export const footerContent = {
    institutions: 'Technische Hochschule Ingolstadt - Bayerisches Foresight-Institut - ETH Zürich',
    description: 'AnticipaLead is a research-based serious game for leadership education. Free for educational use.'
};

/**
 * @type {Array<{file: string, amount: string, format: string, info: string}>}
 * Purpose: Defines the rows for the printing guide table.
 */
export const printingGuideData = [
    {
        file: 'Role cards',
        amount: '1 per player',
        format: 'A4',
        info: {
            gen: 'Single-sided.',
            corp: 'Double-sided printing required for role changes.'
        }
    },
    {
        file: 'Canvases (1 & 2)',
        amount: '1 set per group',
        format: 'A3',
        info: 'Single-sided. Place in the center of the table.'
    },
    {
        file: 'Technology cards',
        amount: '1 set per group',
        format: 'A4',
        info: 'Cut out along the dashed lines after printing.'
    },
    {
        file: 'Name tags',
        amount: '1 per player',
        format: 'A4 / Labels',
    },
    {
        file: 'Corporate Specific File',
        amount: '1 per group',
        format: 'A4',
        versions: ['corp'], // Only shows up when "Corporate" tab is active
        info: 'Some text here.'
    }

];

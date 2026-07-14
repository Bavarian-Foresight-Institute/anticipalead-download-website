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
        id: 'corp',
        title: 'Corporate Version with Perspective Changes',
        description: 'Players take on new roles during the game helping them to see the issues from different points of view. This version is recommended in most cases.',
        isRecommended: true
    },
    {
        id: 'gen',
        title: 'General Version without Perspective Changes',
        description: 'Players retain their own perspective throughout the game.',
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
        description: 'This version contains the most comprehensive selection of technologies, offering the broadest range of strategic challenges.'
    },
    {
        id: 'm',
        title: 'Medium-term',
        description: 'This version focuses on technologies that are currently emerging or expected to become prominent in the medium-term future.'
    },
    {
        id: 'l',
        title: 'Long-term',
        description: 'This version explores technologies that are expected to have a significant impact on the distant future.'
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
        title: 'Choose your configuration',
        description: 'Configure the game to perfectly fit your needs by selecting a scenario, game version, time horizon and language.'
    },
    {
        num: '02',
        title: 'Download and print',
        description: 'The download assistant bundles all the necessary files for your version. Follow the printing guide to print the materials.'
    },
    {
        num: '03',
        title: 'Set up the table',
        description: 'Set up the table with the game materials as shown in the quick start guide.'
    },
    {
        num: '04',
        title: 'Start playing',
        description: 'Start playing and experience the future of leadership.'
    }
];


/**
 * @type {Array<{id: string, title: string, description: string}>}
 * Purpose: Defines the package contents cards for the index page.
 */
export const packageContents = [
    {
        id: 'IconCanvases',
        title: 'Game canvas',
        description: 'The game board containing all necessary instructions and space to write down your results'
    },
    {
        id: 'IconRoleCards',
        title: 'Role cards',
        description: 'Describe the roles of the players and serve as a place to take notes during the game'
    },
    {
        id: 'IconNameTags',
        title: 'Name tags',
        description: 'Table standups for each player containing a summary of the scenario'
    },
    {
        id: 'IconTechCards',
        title: 'Technology cards',
        description: 'Provide the technological context for your game'
    },
    {
        id: 'IconQuickstart',
        title: 'Quickstart guide',
        description: 'An overview of the setup and gameplay loop'
    },
    {
        id: 'IconAudioGuide',
        title: 'Scenario audio',
        description: 'An audio file to set the stage for the game'
    }
];

/**
 * @type {Object}
 * Purpose: Defines the centralized footer text for all pages.
 */
export const footerContent = {
    institutions: 'Bavarian Foresight-Institute - armasuisse - deftech',
    description: 'AnticipaLead is a research-based serious game for leadership education. AnticipaLead can be used freely in educational and commercial settings, but may not be resold or repackaged without permission from the authors.'
};

/**
 * @type {Array<{file: string, amount: string, format: string, info: string}>}
 * Purpose: Defines the rows for the printing guide table.
 */
export const printingGuideData = [
    {
        file: 'Canvas 1',
        amount: '1 per group',
        format: 'A3',
    },
    {
        file: 'Canvas 2',
        amount: '1 per group and round',
        format: 'A3',
        info: 'If you want to play multiple rounds, you will need one copy of Canvas Part 2 per round per group.'
    },
    {
        file: 'Role cards',
        amount: {
            gen: '1 copy per player',
            corp: '1 copy per group'
        },
        format: {
            gen: 'A4',
            corp: 'A4, double-sided'
        },
        info: {
            corp: 'If you play with less than 7 players, make sure the roles of Ethicist, Executor, Integrator, and Analyst are filled.'
        }
    },
    {
        file: 'Name tags',
        amount: {
            gen: '1 copy per player',
            corp: '1 copy per group'
        },
        format: 'A4',
        // versions: ['corp'], // Only shows up when "Corporate" tab is active
        info: 'Fold the paper in half along the long edge. This way the name tags will stand up on the table.'
    },
    {
        file: 'Technology cards',
        amount: '1 set per group',
        format: 'A4',
        info: 'The Technology Cards need to be cut out along the dashed lines before playing the game. If you wish to discuss a specific technology that is not in the cards, you do not need to print the cards.'
    },

    {
        file: 'Quickstart Guide',
        amount: '-',
        format: '-',
        info: 'The Quickstart Guide is not needed during the game itself, all steps are detailed on canvas 1 and 2. It can be used to get a first overview of the game and its setup.'
    },
    {
        file: 'Scenario Audio',
        amount: '-',
        format: 'Audio Playback Device',
        info: 'The scenario audio is used to immerse the players into the game, ensure that you have an audio playback device ready to play the audio file during the game.'
    }
];

/**
 * @type {Array<{question: string, answer: string}>}
 * Purpose: Defines the FAQ data.
 */
export const faqData = [
    {
        question: 'What is AnticipaLead?',
        answer: 'AnticipaLead is a scenario-based foresight serious game developed for leadership training. It helps teams of 4-7 players experience the future of leadership decisions in AI transformations.'
    },
    {
        question: 'How long does a game take?',
        answer: 'A standard session takes between 60 to 120 minutes, depending on the depth of the discussion.'
    },
    {
        question: 'Do we need a moderator?',
        answer: 'No, AnticipaLead is designed to be played without a moderator. The game materials, quickstart guide, and audio scenarios guide you through the process.'
    },
    {
        question: 'I have a different question',
        answer: 'Feel free to reach out to us directly! You can contact us via email at <a href="mailto:hello@anticipalead.com" class="text-brand-red font-medium hover:underline">hello@anticipalead.com</a> and we will be happy to assist you.'
    }
];

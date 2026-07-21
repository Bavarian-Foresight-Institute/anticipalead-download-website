/**
 * file: src/js/core/content.js
 * purpose: Centralized static UI content definitions.
 * responsibilities: Export constants for presets, scenarios, perspectives, time horizons, languages, FAQs, and printing guides.
 * dependencies: None
 */

/**
 * @type {Array<{id: string, title: string, description?: string, isCustom?: boolean, perspective?: string, timeHorizon?: string, scenario?: string}>}
 * Purpose: Defines the package configuration options (presets vs custom mode).
 * Note: You can easily add new preconfigured versions right here by adding a new object with an id, title, description, and exact parameter combination (perspective, timeHorizon, scenario). The UI and logic will dynamically render and apply any preset defined below!
 */

export const presetModes = [
    {
        id: 'preset1',
        title: 'Standard',
        description: 'Quick start for companies.',
        perspective: 'corp',
        timeHorizon: 'all',
        scenario: '1'
    },
    {
        id: 'preset2',
        title: 'Military',
        description: 'Quick start for military and government organizations.',
        perspective: 'gen',
        timeHorizon: 'all',
        scenario: '1'
    },
    {
        id: 'preset3',
        title: 'Own Context',
        description: 'Play the game with your own technologies and scenarios.',
        perspective: 'corp',
        timeHorizon: 'own',
        scenario: '7'
    },
    {
        id: 'custom',
        title: 'Configure yourself',
        description: 'Configure the game yourself to optimally fit your needs.',
        isCustom: true
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
 * @type {Array<{id: string, title: string, description: string, badgeText: string, badgeColorClass: string, isCustom?: boolean}>}
 * Purpose: Defines the available game scenarios.
 */
export const scenarios = [
    {
        id: '1',
        title: 'Sustainable Transformation',
        description: 'A highly ordered society prioritizing stability, resource preservation, and long term ecological balance over rapid growth.',
        badgeText: 'Generic',
        badgeColorClass: 'bg-badge-generic'
    },
    {
        id: '2',
        title: 'The Transparent Organization',
        description: 'A culture of absolute transparency where every corporate decision is public, forcing extreme accountability and rapid adaptability.',
        badgeText: 'Generic',
        badgeColorClass: 'bg-badge-generic'
    },
    {
        id: '3',
        title: 'The Era of Scarce Resources',
        description: 'A world defined by scarcity, where severe ecological and geopolitical strain enforces strict rationing.',
        badgeText: 'Generic',
        badgeColorClass: 'bg-badge-generic'
    },
    {
        id: '4',
        title: 'Servants of the Machines',
        description: 'A highly automated reality where relentless machine logic dictates the pace and humans serve merely as flexible gap fillers for algorithms.',
        badgeText: 'Corporate',
        badgeColorClass: 'bg-badge-corporate'
    },
    {
        id: '5',
        title: 'Pressure from Two Fronts',
        description: 'A volatile environment where leaders are caught between hybrid geopolitical threats abroad and extreme social polarization at home.',
        badgeText: 'Military',
        badgeColorClass: 'bg-badge-military'
    },
    {
        id: '6',
        title: 'Sovereignty on Demand',
        description: 'A fragmented landscape where strategic national autonomy is highly conditional and entirely dependent on private tech corporations and fragile global alliances.',
        badgeText: 'Military',
        badgeColorClass: 'bg-badge-military'
    },
    {
        id: '7',
        title: 'Use your own Scenario',
        description: 'Create and use your own scenario in the game.',
        badgeText: 'Custom',
        badgeColorClass: 'bg-badge-custom',
        isCustom: true
    }

];

/**
 * @type {Array<{id: string, title: string, description: string, isCustom?: boolean}>}
 * Purpose: Defines the available time horizons for technology cards.
 */
export const timeHorizons = [
    {
        id: 'curated',
        title: 'Curated technologies',
        description: 'Use our curated set of relevant technologies to get started quickly.'
    },
    {
        id: 'own',
        title: 'Own technologies',
        description: 'Create and use your own technology cards in the game.',
        isCustom: true
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
        description: 'Configure the game to perfectly fit your needs by selecting a game version, scenario and language.'
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
        info: 'The Technology Cards need to be cut out along the dashed lines before playing the game. To play with your own technologies, please refer to the own material guide bundled in your download.'
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
        info: 'The scenario audio is used to immerse the players into the game, ensure that you have an audio playback device ready to play the audio file during the game. If you play with your own scenario, please refer to the own material guide bundled in your download to create your own immersive audio.'
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
        answer: 'A standard session with 1 or two rounds takes between 60 to 120 minutes, depending on the depth of the discussion. Each additional round adds about 30-45 minutes to the session.'
    },
    {
        question: 'Do we need a moderator?',
        answer: 'No, AnticipaLead is designed to be played without a moderator. The game materials, quickstart guide, and audio scenarios guide you through the process.'
    },
    {
        question: 'How many players can play AnticipaLead?',
        answer: 'AnticipaLead is designed for teams of 4-7 players. If you are 8 or more, we recommend splitting your group into multiple groups and playing the game in parallel.'
    },
    {
        question: 'Is AnticipaLead free to use?',
        answer: 'Yes, AnticipaLead can be used freely in educational and commercial settings, but may not be resold or repackaged without permission from the authors.'
    },
    {
        question: 'Who is AnticipaLead for?',
        answer: 'AnticipaLead is designed for managers or leadership personnel from all backgrounds interested in exploring the future of leadership.'
    },
    {
        question: 'Why should I play AnticipaLead?',
        answer: 'AnticipaLead is a serious game that allows you to experience the future of leadership decisions. It is a fun and interactive way to learn about the potential impacts of uncertainty and new technologies on leadership and to develop your decision-making skills.'
    },
    {
        question: 'Why should I play AnticipaLead as a manager? Can\'t I just let my team play and get the insight from them?',
        answer: 'While you can gain valuable insights from your team\'s experience, experiencing the impacts of uncertainty and new technologies during the game yourself is the most effective way to develop the necessary skills to deal with similar situations in your everyday leadership.'
    },
    {
        question: 'Can I use AnticipaLead to explore my own scenarios or technologies?',
        answer: 'Yes, AnticipaLead is designed to be adaptable to your own needs. Feel free to adjust the game materials, scenarios and technologies to your specific context.'
    },
    {
        question: 'I have a different question',
        answer: 'Feel free to reach out to us directly! You can contact us via email at <a href="mailto:foresight@thi.de" class="text-brand-red font-medium hover:underline">foresight@thi.de</a> and we will be happy to assist you.'
    }
];

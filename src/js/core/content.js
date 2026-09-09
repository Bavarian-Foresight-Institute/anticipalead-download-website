/**
 * file: src/js/core/content.js
 * purpose: Centralized static UI content definitions.
 * responsibilities: Export constants for presets, scenarios, perspectives, time horizons, languages, FAQs, and printing guides.
 * dependencies: None
 */

/**
 * @type {string}
 * Purpose: Centralized link to the video guide (e.g. YouTube URL).
 * Update this variable in one place to change the video guide URL across the entire website.
 */
export const videoGuideUrl = '#';

/**
 * @type {Array<{id: string, title: string, description?: string, isCustom?: boolean, badgeText?: string, badgeColor?: string, perspective?: string, techCards?: string, scenario?: string}>}
 * Purpose: Defines the package configuration options (presets vs custom mode).
 * Note: You can easily add new preconfigured versions right here by adding a new object with an id, title, description, and exact parameter combination (perspective, techCards, scenario). The UI and logic will dynamically render and apply any preset defined below!
 */

export const presetModes = [
    {
        id: 'preset1',
        title: 'Standard',
        description: 'Pre-Set Technology Cards and Scenario, specifically designed for corporate and organizational entities. <br> <br> <i>For a quick-start of the game including all its features.</i>',
        badgeText: 'Quick Start',
        badgeColor: 'brand-red',
        perspective: 'with_roles',
        techCards: 'curated',
        scenario: '1'
    },
    {
        id: 'preset2',
        title: 'Military',
        description: 'Pre-Set Technology Cards and Scenario, specifically designed for military and governmental agencies. <br> <br> <i>For a quick-start of the game including all its features.</i>',
        badgeText: 'Quick Start',
        badgeColor: 'brand-red',
        perspective: 'no_roles',
        techCards: 'curated',
        scenario: '5'
    },
    {
        id: 'preset3',
        title: 'Own Context',
        description: 'You can play AnticipaLead with your own technologies and scenarios. This version includes a guide on how to integrate your own content into the game.',
        badgeText: 'DIY',
        badgeColor: 'gray-600',
        perspective: 'with_roles',
        techCards: 'own',
        scenario: '7'
    },
    {
        id: 'custom',
        title: 'Configure',
        description: 'Configure the game materials to optimally fit your needs.',
        badgeText: 'Custom',
        badgeColor: 'gray-600',
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
        id: 'with_roles',
        title: 'Version with Perspective Changes',
        description: 'This option is recommended to enjoy the full benefits of the game',
        isRecommended: false
    },
    {
        id: 'no_roles',
        title: 'Version without Perspective Changes',
        description: 'Players keep their organizational roles and perspective throughout the game.',
        isRecommended: false
    }
];

/**
 * @type {Array<{id: string, title: string, description: string, badgeText: string, badgeColor: string, isCustom?: boolean}>}
 * Purpose: Defines the available game scenarios.
 */
export const scenarios = [
    {
        id: '1',
        title: 'Servants of the Machines',
        description: 'A highly automated setting where relentless algorithms dictate the pace and humans serve as flexible gap fillers for algorithms.',
        badgeText: 'Corporate',
        badgeColor: 'badge-corporate'
    },
    {
        id: '2',
        title: 'In Balance',
        description: 'An organizational environment where everyday operations and decisions are strictly guided by a continuous balance of efficiency, ecological sustainability, and long term resilience.',
        badgeText: 'Generic',
        badgeColor: 'badge-generic'
    },
    {
        id: '3',
        title: 'The Transparent Organization',
        description: 'A corporate culture where absolute openness is a prerequisite for legitimacy, creating a constant tension between public accountability and the capacity to take operational risks.',
        badgeText: 'Generic',
        badgeColor: 'badge-generic'
    },
    {
        id: '4',
        title: 'The Art of Distribution',
        description: 'A society defined by material scarcity, requiring strict prioritization and the careful allocation of limited resources to maintain critical infrastructure.',
        badgeText: 'Generic',
        badgeColor: 'badge-generic'
    },
    {
        id: '5',
        title: 'The Limits of Delegation',
        description: 'A fast paced setting where leadership must continuously define boundaries between autonomous machine execution and essential human oversight.',
        badgeText: 'Military',
        badgeColor: 'badge-military'
    },
    {
        id: '6',
        title: 'Conflicting Realities',
        description: 'A volatile operational context characterized by overwhelming amounts of unverified information, unstable alliances, and the necessity to make decisions under extreme uncertainty.',
        badgeText: 'Military',
        badgeColor: 'badge-military'
    },
    {
        id: '7',
        title: 'Use your own Scenario',
        description: 'Play AnticipaLead using your own context. The download includes a guide on how to prepare and use your own scenario in the game.',
        badgeText: 'Custom',
        badgeColor: 'badge-custom',
        isCustom: true
    }

];

/**
 * @type {Array<{id: string, title: string, description: string, isCustom?: boolean}>}
 * Purpose: Defines the available tech cards options.
 */
export const techCards = [
    {
        id: 'curated',
        title: 'Curated Technologies',
        description: 'We offer a curated set of technology cards. From this set, you can choose the technologies you want to play with, either randomly or intentionally.'
    },
    {
        id: 'own',
        title: 'Own Technologies',
        description: 'Create and use your own technology cards in the game. The download will include blank technology cards and a guide on how to prepare them for the game.',
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
        title: 'Get your game materials',
        description: 'Click <a href="./download.html" class="text-brand-red font-medium hover:underline">"Get the game materials"</a> to get started with a preconfigured version, or customise the game to fit your needs.'
    },
    {
        num: '02',
        title: 'Download and print',
        description: 'The download assistant bundles all files required for your selected version. Follow the <a href="./printing-guide.html" class="text-brand-red font-medium hover:underline">printing guide</a> to prepare the materials.'
    },
    {
        num: '03',
        title: 'Set up the table',
        description: `Arrange the game materials as shown in the <strong class="font-bold">Quickstart Guide</strong> and the <a href="${videoGuideUrl}" target="_blank" rel="noopener noreferrer" class="text-brand-red font-medium hover:underline">Video Guide</a> provided.`
    },
    {
        num: '04',
        title: 'Start playing',
        description: 'Follow the instructions on the game canvases and begin exploring the future of leadership.'
    }
];


/**
 * @type {Array<{id: string, title: string, description: string}>}
 * Purpose: Defines the package contents cards for the index page.
 */
export const packageContents = [
    {
        id: 'IconCanvases',
        title: 'Game Canvas',
        description: 'Guides players through the setup and discussion while providing space to document the results.'
    },
    {
        id: 'IconRoleCards',
        title: 'Role Cards',
        description: 'Assign different leadership perspectives and provide guidance on how to approach the discussion.'
    },
    {
        id: 'IconNameTags',
        title: 'Name Tags',
        description: 'Table stand-ups for each player containing key information about the selected scenario.'
    },
    {
        id: 'IconTechCards',
        title: 'Technology Cards',
        description: 'Introduce an emerging technology and provide the starting point for each discussion round.'
    },
    {
        id: 'IconQuickstart',
        title: 'Quickstart Guide',
        description: 'Provides an overview of the game setup and gameplay process.'
    },
    {
        id: 'IconAudioGuide',
        title: 'Scenario Audio',
        description: 'Immerses players in the selected future scenario at the beginning of the game.'
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
        info: 'Optionally, you can print the canvas twice so it is easier to read when players sit at opposite sides of the table (only one copy needs to be filled out).'
    },
    {
        file: 'Canvas 2',
        amount: '1 per group and round',
        format: 'A3',
        info: 'If you want to play multiple rounds, you will need one copy of Canvas 2 per round per group. Optionally, you can print the canvas twice per round so it is easier to read when players sit at opposite sides of the table (only one copy needs to be filled out).'
    },
    {
        file: 'Role cards',
        amount: {
            no_roles: '1 copy per player',
            with_roles: '1 copy per group'
        },
        format: {
            no_roles: 'A4',
            with_roles: 'A4, double-sided'
        },
        info: {
            with_roles: 'If you play with less than 7 players, make sure the roles of Ethicist, Executor, Integrator, and Analyst are filled.'
        }
    },
    {
        file: 'Name tags',
        amount: {
            no_roles: '1 copy per player',
            with_roles: '1 copy per group'
        },
        format: 'A4',
        // versions: ['with_roles'], // Only shows up when "Corporate" tab is active
        info: 'Fold the paper in half along the long edge so that the name tags stand upright on the table.'
    },
    {
        file: 'Technology cards',
        amount: '1 set per group',
        format: 'A4',
        info: 'Cut out the technology cards along the dashed lines before playing. To use your own technologies, please refer to the guide for creating your own materials included in your download.'
    },

    {
        file: 'Quickstart Guide',
        amount: '-',
        format: '-',
        info: 'The Quickstart Guide is not required during the game itself, as all steps are explained on Canvases 1 and 2. It provides an initial overview of the game and its setup.'
    },
    {
        file: 'Scenario Audio',
        amount: '-',
        format: 'Audio Playback Device',
        info: 'The scenario audio immerses players in the future scenario. Make sure you have an audio playback device ready before starting the game. If you are using your own scenario, please refer to the guide included in your download for instructions on creating your own immersive audio.'
    }
];

/**
 * @type {Array<{question: string, answer: string}>}
 * Purpose: Defines the FAQ data.
 */
export const faqData = [
    {
        question: 'What is AnticipaLead?',
        answer: 'AnticipaLead is a scenario-based foresight serious game that lets teams rehearse leadership decisions in possible futures shaped by emerging technologies.'
    },
    {
        question: 'How long does a game take?',
        answer: 'A standard session with one or two rounds takes between 60 to 120 minutes, depending on the depth of the discussion. Each additional round adds about 30-45 minutes to the session.'
    },
    {
        question: 'Do we need a moderator?',
        answer: 'Not necessarily. AnticipaLead is designed to be played independently, with the game materials, Quickstart Guide and audio scenarios guiding you through the process. If you prefer a facilitated format, you can also contact the <a href="https://www.thi.de/en/research/bavarian-foresight-institute/" target="_blank" rel="noopener noreferrer" class="text-brand-red font-medium hover:underline">Bavarian Foresight-Institute</a> for a guided session.'
    },
    {
        question: 'How many players can play AnticipaLead?',
        answer: 'AnticipaLead is designed for groups of at least four players, with 4-7 participants recommended per group. Larger groups can simply split into several teams and play in parallel.'
    },
    {
        question: 'Is AnticipaLead free to use?',
        answer: 'Yes. AnticipaLead can be used freely in educational and commercial organisational settings. The materials may not be resold, repackaged or distributed as a separate commercial product without permission from the authors.'
    },
    {
        question: 'Who is AnticipaLead for?',
        answer: 'AnticipaLead is designed for leaders, managers, decision-makers and teams who want to explore how emerging technologies and uncertain futures could affect their leadership and decision-making practice.'
    },
    {
        question: 'Why should I play AnticipaLead?',
        answer: 'AnticipaLead allows you to test decisions before change becomes urgent. The game makes technological implications, conflicting priorities and different leadership perspectives tangible in an interactive future scenario.'
    },
    {
        question: 'Why should I play AnticipaLead as a manager? Can\'t I just let my team play and get the insights from them?',
        answer: 'AnticipaLead is designed primarily for leaders and decision-makers, although playing as a team can be equally valuable. Participating yourself allows you to experience uncertainty and competing perspectives directly, while also revealing how your own assumptions influence decisions.'
    },
    {
        question: 'Can I use AnticipaLead to explore my own scenarios or technologies?',
        answer: 'Yes. AnticipaLead is designed to be adapted to your context. You can integrate your own technologies and scenarios, including scenarios developed with the <a href="https://atelierdesfuturs.org/anticipatech/" target="_blank" rel="noopener noreferrer" class="text-brand-red font-medium hover:underline">Scenario Game / AnticipaTech</a>, using the provided adaptation guide.'
    },
    {
        question: 'I have a different question',
        answer: 'Feel free to contact us at <a href="mailto:foresight@thi.de" class="text-brand-red font-medium hover:underline">foresight@thi.de</a>. We will be happy to help.'
    }
];

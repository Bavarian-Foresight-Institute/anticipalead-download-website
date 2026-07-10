/**
 * file: src/js/app.js
 * purpose: Main entry point for the AnticipaLead website.
 * responsibilities: Initialize the application, bind DOM events, and coordinate between state and UI.
 * dependencies: src/js/core/state.js, src/js/core/engine.js, src/js/ui.js
 */

import { getState, setScenario, setPerspective, setTimeHorizon, setLanguage, subscribe, resetState, initState } from './core/state.js';
import { renderFooterContent, renderPackageContentCard, renderHowItWorksStep, renderScenarioCard, renderPerspectiveCard, renderTimeHorizonCard, renderLanguageCard, renderSummaryRow, renderStepper, NavButton, NavLink, PrimaryButton, SecondaryButton, DarkButton, SolidButton, OutlineButton, TextIconButton, TextIconLink, renderPrintingGuideCards } from './ui.js';
import { IconRoleCards, IconCanvases, IconTechCards, IconAudioGuide, IconDownloadLg, IconVideoLg, IconArrowLeftSm, IconArrowRightSm, IconEditSm, IconArrowLeftMd, IconDownloadSm, IconVideoSm, IconSpinner, IconCheckmarkDark, IconPlusSm, IconPrinterSm, IconInfoSm, IconUsersSm, IconClockSm, IconBriefcaseSm, IconTranslateSm } from './ui/icons.js';
import { footerContent, packageContents, howItWorksSteps, scenarios, perspectives, timeHorizons, languages, printingGuideData } from './core/content.js';
import { generateAndDownloadZip, getEstimatedZipSize, getDownloadFilename } from './core/download.js';

// DOM Elements Cache
// Purpose: Store references to DOM nodes to avoid redundant queries during rendering.
const DOM = {};

// ID used to handle race conditions in asynchronous file size estimations
let estimationRequestId = 0;

/**
 * Purpose: Query and store references to all relevant DOM elements.
 * @returns {void}
 * Logic reason: Caching DOM nodes improves performance by preventing multiple reflows or querySelector calls when the UI updates.
 */
function cacheDOM() {
    DOM.viewConfigure = document.getElementById('view-configure');
    DOM.viewReview = document.getElementById('view-review');
    DOM.viewDownload = document.getElementById('view-download');
    DOM.howItWorksContainer = document.getElementById('how-it-works-container');
    DOM.scenarioGrid = document.getElementById('scenario-grid');
    DOM.perspectiveGrid = document.getElementById('perspective-grid');
    DOM.timeHorizonGrid = document.getElementById('time-horizon-grid');
    DOM.languageGrid = document.getElementById('language-grid');
    DOM.summaryTableBody = document.getElementById('summary-table-body');
    DOM.stepperContainer = document.getElementById('stepper-container');

    DOM.navLinksContainer = document.getElementById('nav-links-container');
    DOM.navBtnContainer = document.getElementById('nav-btn-container');
    DOM.heroDownloadContainer = document.getElementById('hero-download-btn-container');
    DOM.heroVideoContainer = document.getElementById('hero-video-btn-container');
    DOM.bottomDownloadContainer = document.getElementById('bottom-download-btn-container');
    DOM.packageContentsContainer = document.getElementById('package-contents-container');
    DOM.navBackContainer = document.getElementById('nav-back-container');
    DOM.btnContinueContainer = document.getElementById('btn-continue-container');
    DOM.btnEditContainer = document.getElementById('btn-edit-container');
    DOM.btnBackContainer = document.getElementById('btn-back-container');
    DOM.btnDownloadContainer = document.getElementById('btn-download-container');
    DOM.stepperContainer = document.getElementById('stepper-container');
    DOM.footerContainer = document.getElementById('footer-content-container');
    DOM.btnConfirmContainer = document.getElementById('btn-confirm-container');
    DOM.downloadProgressContainer = document.getElementById('download-progress-container');
    DOM.btnDownloadAnotherContainer = document.getElementById('btn-download-another-container');
    DOM.btnQuickstartContainer = document.getElementById('btn-quickstart-container');
    DOM.btnPrintingGuideContainer = document.getElementById('btn-printing-guide-container');
    DOM.btnDownloadAgainContainer = document.getElementById('btn-download-again-container');

    DOM.downloadFilename = document.getElementById('download-filename');
    DOM.downloadInfo = document.getElementById('download-info');
    DOM.iconInfoContainer = document.getElementById('icon-info-container');
    DOM.iconUsersContainer = document.getElementById('icon-users-container');
    DOM.iconClockContainer = document.getElementById('icon-clock-container');
    DOM.iconBriefcaseContainer = document.getElementById('icon-briefcase-container');
    DOM.iconTranslateContainer = document.getElementById('icon-translate-container');

    DOM.printingGuideTableContainer = document.getElementById('printing-guide-table-container');
    DOM.printingGuideTabsContainer = document.getElementById('printing-guide-tabs-container');

    // Dynamically injected buttons (re-cached after injection)
    DOM.btnContinue = document.getElementById('btn-continue');
    DOM.btnBack = document.getElementById('btn-back');
    DOM.btnEdit = document.getElementById('btn-edit');
    DOM.btnConfirm = document.getElementById('btn-confirm');
    DOM.btnDownloadAnother = document.getElementById('btn-download-another');
    DOM.btnDownloadAgain = document.getElementById('btn-download-again');
}

/**
 * Purpose: Switch the active view in the application interface.
 * @param {string} viewId - The DOM ID of the view to display.
 * @returns {void}
 * Logic reason: Toggles Tailwind's 'hidden' class to ensure only one main view is visible at a time.
 */
function switchView(viewId) {
    [DOM.viewConfigure, DOM.viewReview, DOM.viewDownload].forEach(view => {
        if (view) {
            if (view.id === viewId) {
                view.classList.remove('hidden');
            } else {
                view.classList.add('hidden');
            }
        }
    });

    if (DOM.stepperContainer) {
        let step = 1;
        if (viewId === 'view-review') step = 2;
        if (viewId === 'view-download') step = 3;
        DOM.stepperContainer.innerHTML = renderStepper(step);
    }

    // Always scroll to top when changing views
    window.scrollTo(0, 0);
}

/**
 * Purpose: Re-render the UI components based on the current state.
 * @param {Object} state - The current state object containing user selections.
 * @returns {void}
 * Logic reason: Maps through mock data and uses UI rendering functions to update the DOM based on state.
 */
function renderUI(state) {
    // Render Scenarios
    if (DOM.scenarioGrid) {
        DOM.scenarioGrid.innerHTML = scenarios.map(s =>
            renderScenarioCard({ ...s, isSelected: state.scenario === s.id })
        ).join('');
    }

    // Render Perspectives
    if (DOM.perspectiveGrid) {
        DOM.perspectiveGrid.innerHTML = perspectives.map(p =>
            renderPerspectiveCard({ ...p, isSelected: state.perspective === p.id })
        ).join('');
    }

    // Render Time Horizons
    if (DOM.timeHorizonGrid) {
        DOM.timeHorizonGrid.innerHTML = timeHorizons.map(t =>
            renderTimeHorizonCard({ ...t, isSelected: state.timeHorizon === t.id })
        ).join('');
    }

    // Render Languages
    if (DOM.languageGrid) {
        DOM.languageGrid.innerHTML = languages.map(l =>
            renderLanguageCard({ ...l, isSelected: state.language === l.id })
        ).join('');
    }

    // Update Printing Guide Button href
    const btnPrintingGuide = document.getElementById('btn-printing-guide');
    if (btnPrintingGuide) {
        const perspective = state.perspective || 'gen';
        btnPrintingGuide.setAttribute('href', `./printing-guide.html#perspective=${perspective}`);
    }

    // Update Header Printing Guide Link
    const navPrintingGuide = document.getElementById('nav-printing-guide');
    if (navPrintingGuide) {
        const perspective = state.perspective || 'gen';
        navPrintingGuide.setAttribute('href', `./printing-guide.html#perspective=${perspective}`);
    }
}

/**
 * Purpose: Bind all DOM event listeners for the application.
 * @returns {void}
 * Logic reason: Uses event delegation on container grids to handle user selections efficiently.
 */
function bindEvents() {
    // Scenario selection delegation
    if (DOM.scenarioGrid) {
        DOM.scenarioGrid.addEventListener('mousedown', (e) => {
            const card = e.target.closest('[data-scenario]');
            if (card) {
                const scenarioId = card.getAttribute('data-scenario');
                setScenario(scenarioId);
            }
        });
    }

    // Perspective selection delegation
    if (DOM.perspectiveGrid) {
        DOM.perspectiveGrid.addEventListener('mousedown', (e) => {
            const card = e.target.closest('[data-perspective]');
            if (card) {
                const perspectiveId = card.getAttribute('data-perspective');
                setPerspective(perspectiveId);
            }
        });
    }

    // Time Horizon selection delegation
    if (DOM.timeHorizonGrid) {
        DOM.timeHorizonGrid.addEventListener('mousedown', (e) => {
            const card = e.target.closest('[data-time]');
            if (card) {
                const timeId = card.getAttribute('data-time');
                setTimeHorizon(timeId);
            }
        });
    }

    // Language selection delegation
    if (DOM.languageGrid) {
        DOM.languageGrid.addEventListener('mousedown', (e) => {
            const card = e.target.closest('[data-lang]');
            if (card) {
                const lang = card.getAttribute('data-lang');
                setLanguage(lang);
            }
        });
    }

    // Continue to Review button
    if (DOM.btnContinue) {
        DOM.btnContinue.addEventListener('mousedown', () => {
            const state = getState();

            // Find full titles for display
            const selectedScenario = scenarios.find(s => s.id === state.scenario);
            const selectedPerspective = perspectives.find(p => p.id === state.perspective);
            const selectedTimeHorizon = timeHorizons.find(t => t.id === state.timeHorizon);
            const selectedLanguage = languages.find(l => l.id === state.language) || { title: state.language };

            // Populate Summary Table
            if (DOM.summaryTableBody) {
                DOM.summaryTableBody.innerHTML = [
                    renderSummaryRow('Language', selectedLanguage.title),
                    renderSummaryRow('Perspective', selectedPerspective.title),
                    renderSummaryRow('Scenario', `${selectedScenario.id} - ${selectedScenario.title}`),
                    renderSummaryRow('Time Horizon', selectedTimeHorizon.title)
                ].join('');
            }

            if (DOM.downloadFilename && DOM.downloadInfo) {
                DOM.downloadFilename.innerHTML = getDownloadFilename(state);
                DOM.downloadInfo.innerHTML = `Calculating file size...`;

                const currentRequestId = ++estimationRequestId;

                getEstimatedZipSize(state).then(({ filesCount, missingFiles, totalBytes }) => {
                    if (currentRequestId === estimationRequestId) {
                        if (missingFiles.length > 0) {
                            DOM.downloadInfo.innerHTML = `<span class="text-brand-red text-preset-card">Warning: ${missingFiles.length} of ${filesCount} files are missing on the server!</span>`;
                        } else {
                            const mb = (totalBytes / (1024 * 1024)).toFixed(1);
                            DOM.downloadInfo.innerHTML = `${filesCount} files - ${mb} MB - Scenario ${selectedScenario.id} - ${selectedPerspective.title} - ${selectedTimeHorizon.title} - ${selectedLanguage.title}`;
                        }
                    }
                });
            }

            switchView('view-review');
        });
    }

    // Back button in Review view
    if (DOM.btnBack) {
        DOM.btnBack.addEventListener('mousedown', () => {
            switchView('view-configure');
        });
    }

    // Edit button in Review view
    if (DOM.btnEdit) {
        DOM.btnEdit.addEventListener('mousedown', () => {
            switchView('view-configure');
        });
    }

    // Define reusable download execution logic
    const executeDownload = async () => {
        if (!DOM.downloadProgressContainer) return;

        DOM.downloadProgressContainer.innerHTML = `<div class="flex justify-center items-center text-preset-button-main text-brand-dark">${IconSpinner} Starting download...</div>`;

        const handleProgress = ({ phase, completed, total, percent }) => {
            if (phase === 'fetching') {
                DOM.downloadProgressContainer.innerHTML = `<div class="flex justify-center items-center text-preset-button-main text-brand-dark">${IconSpinner} Fetching ${completed} / ${total}...</div>`;
            } else if (phase === 'zipping') {
                DOM.downloadProgressContainer.innerHTML = `<div class="flex justify-center items-center text-preset-button-main text-brand-dark">${IconSpinner} Compressing ${percent}%...</div>`;
            }
        };

        try {
            await generateAndDownloadZip(getState(), handleProgress);
            DOM.downloadProgressContainer.innerHTML = `<div class="flex justify-center items-center text-preset-button-main text-brand-dark">${IconCheckmarkDark} Download complete</div>`;
        } catch (error) {
            if (error.message === "NETWORK_OFFLINE") {
                alert("A network error occurred. Please check your internet connection and try again.");
            } else {
                alert(`The following files are missing on the server:\n${error.message}\n\nPlease contact the website administrator for assistance.`);
            }
            DOM.downloadProgressContainer.innerHTML = `<div class="flex justify-center items-center text-preset-button-main text-brand-red">Download failed. Please try again.</div>`;
        }
    };

    // Confirm & Download button in Review view
    if (DOM.btnConfirm) {
        DOM.btnConfirm.addEventListener('mousedown', () => {
            switchView('view-download');
            executeDownload();
        });
    }

    // Download another scenario button
    if (DOM.btnDownloadAnother) {
        DOM.btnDownloadAnother.addEventListener('mousedown', () => {
            resetState();
            switchView('view-configure');
        });
    }

    // Download again button
    if (DOM.btnDownloadAgain) {
        DOM.btnDownloadAgain.addEventListener('mousedown', () => {
            executeDownload();
        });
    }
}

/**
 * Purpose: Initialize the application on page load.
 * @returns {void}
 * Logic reason: Subscribes the UI to state changes, renders the initial view, and binds events to bootstrap the app.
 */
function init() {
    cacheDOM();

    const isDownloadPage = document.getElementById('page-download') !== null;
    const isIndexPage = document.getElementById('page-index') !== null;
    const isPrintingGuidePage = document.getElementById('page-printing-guide') !== null;
    const isAboutPage = document.getElementById('page-about') !== null;

    // Inject common buttons
    if (DOM.navLinksContainer) {
        DOM.navLinksContainer.innerHTML = [
            NavLink({ id: 'nav-about', text: 'About', href: './about.html' }),
            NavLink({ id: 'nav-printing-guide', text: 'Printing guide', href: './printing-guide.html' })
        ].join('');
    }

    if (DOM.navBtnContainer) {
        DOM.navBtnContainer.innerHTML = NavButton({
            id: 'nav-download-btn',
            text: 'Download',
            href: './download.html'
        });
    }

    // Always render footer if container exists
    if (DOM.footerContainer) {
        DOM.footerContainer.innerHTML = renderFooterContent({
            ...footerContent,
            titleClass: isIndexPage ? '' : 'text-brand-dark'
        });
    }

    // Inject raw standalone SVG icons
    if (DOM.iconInfoContainer) DOM.iconInfoContainer.innerHTML = IconInfoSm;
    if (DOM.iconUsersContainer) DOM.iconUsersContainer.innerHTML = IconUsersSm;
    if (DOM.iconClockContainer) DOM.iconClockContainer.innerHTML = IconClockSm;
    if (DOM.iconBriefcaseContainer) DOM.iconBriefcaseContainer.innerHTML = IconBriefcaseSm;
    if (DOM.iconTranslateContainer) DOM.iconTranslateContainer.innerHTML = IconTranslateSm;

    if (isIndexPage) {
        if (DOM.packageContentsContainer) {
            const packageContentIcons = {
                IconRoleCards,
                IconCanvases,
                IconTechCards,
                IconAudioGuide
            };
            DOM.packageContentsContainer.innerHTML = packageContents.map(card =>
                renderPackageContentCard({
                    ...card,
                    icon: packageContentIcons[card.id]
                })
            ).join('');
        }

        if (DOM.howItWorksContainer) {
            DOM.howItWorksContainer.innerHTML = howItWorksSteps.map((step, index) =>
                renderHowItWorksStep({
                    ...step,
                    isLast: index === howItWorksSteps.length - 1
                })
            ).join('');
        }
        if (DOM.heroDownloadContainer) {
            DOM.heroDownloadContainer.innerHTML = PrimaryButton({
                id: 'hero-download-btn',
                text: 'Get the game materials',
                href: './download.html',
                icon: IconDownloadLg
            });
        }

        if (DOM.heroVideoContainer) {
            DOM.heroVideoContainer.innerHTML = SecondaryButton({
                id: 'hero-video-btn',
                text: 'Watch the video guide',
                href: '#',
                icon: IconVideoLg
            });
        }

        if (DOM.bottomDownloadContainer) {
            DOM.bottomDownloadContainer.innerHTML = DarkButton({
                id: 'bottom-download-btn',
                text: 'Start the download process',
                href: './download.html',
                icon: IconDownloadSm
            });
        }
    }

    if (isDownloadPage) {
        // Derive initial defaults from content.js
        const defaultPerspective = perspectives.find(p => p.isRecommended)?.id || perspectives[0].id;
        const defaultTimeHorizon = timeHorizons[0].id;
        const defaultLanguage = languages[0].id;
        const defaultScenario = scenarios[0].id;

        initState({
            scenario: defaultScenario,
            perspective: defaultPerspective,
            timeHorizon: defaultTimeHorizon,
            language: defaultLanguage
        });

        // Subscribe UI renderer to state changes
        subscribe(renderUI);

        // Inject download.html buttons
        if (DOM.navBackContainer) {
            DOM.navBackContainer.innerHTML = TextIconLink({
                id: 'nav-back-btn',
                text: 'Back to overview',
                href: './index.html',
                icon: IconArrowLeftSm
            });
        }

        if (DOM.btnContinueContainer) {
            DOM.btnContinueContainer.innerHTML = SolidButton({
                id: 'btn-continue',
                text: 'Continue to review',
                iconEnd: IconArrowRightSm
            });
        }

        if (DOM.btnEditContainer) {
            DOM.btnEditContainer.innerHTML = TextIconButton({
                id: 'btn-edit',
                text: 'Edit',
                icon: IconEditSm
            });
        }

        if (DOM.btnBackContainer) {
            DOM.btnBackContainer.innerHTML = OutlineButton({
                id: 'btn-back',
                text: 'Back',
                icon: IconArrowLeftMd
            });
        }

        if (DOM.btnConfirmContainer) {
            DOM.btnConfirmContainer.innerHTML = SolidButton({
                id: 'btn-confirm',
                text: 'Confirm & download',
                icon: IconDownloadSm
            });
        }

        if (DOM.btnDownloadAnotherContainer) {
            DOM.btnDownloadAnotherContainer.innerHTML = OutlineButton({
                id: 'btn-download-another',
                text: 'Assemble new',
                isFlexible: true,
                icon: IconPlusSm
            });
        }

        if (DOM.btnQuickstartContainer) {
            DOM.btnQuickstartContainer.innerHTML = OutlineButton({
                id: 'btn-quickstart',
                text: 'Quick start video',
                isFlexible: true,
                icon: IconVideoSm
            });
        }

        if (DOM.btnPrintingGuideContainer) {
            DOM.btnPrintingGuideContainer.innerHTML = OutlineButton({
                id: 'btn-printing-guide',
                text: 'Printing guide',
                href: `./printing-guide.html#perspective=${getState().perspective || 'gen'}`,
                isFlexible: true,
                icon: IconPrinterSm
            });
        }

        if (DOM.btnDownloadAgainContainer) {
            DOM.btnDownloadAgainContainer.innerHTML = SolidButton({
                id: 'btn-download-again',
                text: 'Download again',
                icon: IconDownloadSm
            });
        }

        // Refresh cache to pick up dynamically injected buttons
        cacheDOM();

        // Bind Event Listeners
        bindEvents();

        // Set initial view
        switchView('view-configure');

        // Initial Render
        renderUI(getState());
    }

    if (isPrintingGuidePage || isAboutPage) {
        if (DOM.navBackContainer) {
            DOM.navBackContainer.innerHTML = TextIconLink({
                id: 'nav-back-btn',
                text: 'Back to overview',
                href: './index.html',
                icon: IconArrowLeftMd
            });
        }
    }

    if (isPrintingGuidePage) {
        // Robustly determine version by checking the full URL string directly
        // Hashes (#) are preserved by the browser across server redirects, unlike query params (?)
        let printingGuideVersion = 'corp'; // Default
        if (window.location.href.includes('perspective=corp')) {
            printingGuideVersion = 'corp';
        } else if (window.location.href.includes('perspective=gen')) {
            printingGuideVersion = 'gen';
        }

        function renderPrintingGuide() {
            if (DOM.printingGuideTabsContainer) {
                DOM.printingGuideTabsContainer.innerHTML = `
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-small w-full">
                        ${renderLanguageCard({ id: 'corp', title: 'Corporate with changes', isSelected: printingGuideVersion === 'corp' })}
                        ${renderLanguageCard({ id: 'gen', title: 'Generic', isSelected: printingGuideVersion === 'gen' })}
                    </div>
                `;
            }

            if (DOM.printingGuideTableContainer) {
                DOM.printingGuideTableContainer.innerHTML = renderPrintingGuideCards(printingGuideData, printingGuideVersion);
            }
        }

        // Bind event delegation for the tabs container once
        if (DOM.printingGuideTabsContainer) {
            DOM.printingGuideTabsContainer.addEventListener('mousedown', (e) => {
                const card = e.target.closest('.card-selectable');
                if (card) {
                    printingGuideVersion = card.dataset.lang;
                    renderPrintingGuide();
                }
            });
        }

        renderPrintingGuide();
    }
}

// Start
init();

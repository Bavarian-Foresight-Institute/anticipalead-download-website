/**
 * file: src/ui.js
 * purpose: DOM manipulation and template rendering layer.
 */

export function renderScenarioCard(id, title, description, badgeText, badgeColorClass) {
    return `
        <div class="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors cursor-pointer relative">
            <div class="${badgeColorClass} text-white text-xs font-bold px-2 py-1 inline-block rounded mb-3">${badgeText}</div>
            <div class="text-gray-300 font-bold text-xl mb-1">${id}</div>
            <h3 class="font-bold text-sm mb-2">${title}</h3>
            <p class="text-xs text-gray-500 mb-4">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full border border-gray-300"></div>
        </div>
    `;
}

export function renderVersionCard(title, description, isRecommended) {
    const badgeHTML = isRecommended 
        ? `<span class="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Recommended</span>`
        : '';
        
    return `
        <div class="bg-white rounded-xl border border-gray-200 p-5 flex items-start hover:border-gray-300 transition-colors cursor-pointer">
            <div class="mt-1 w-4 h-4 rounded-full border border-gray-300 shrink-0 mr-4"></div>
            <div class="grow">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold">${title}</h3>
                    ${badgeHTML}
                </div>
                <p class="text-sm text-gray-500">${description}</p>
            </div>
        </div>
    `;
}

export function renderSummaryRow(label, value) {
    return `
        <tr>
            <td class="w-1/3 text-gray-500 text-sm py-2 align-top">${label}</td>
            <td class="w-2/3 font-medium text-sm py-2 align-top">${value}</td>
        </tr>
    `;
}

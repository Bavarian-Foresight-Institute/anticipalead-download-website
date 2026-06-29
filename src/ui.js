/**
 * file: src/ui.js
 * purpose: DOM manipulation and template rendering layer.
 */

export function renderScenarioCard(id, title, description, badgeText, badgeColorClass, isSelected = false) {
    const ringClass = isSelected ? 'ring-2 ring-inset ring-black shadow-sm' : 'ring-1 ring-inset ring-gray-200';
    const dotClass = isSelected ? 'border-4 border-brand-red' : 'border border-gray-300';
    const textClass = isSelected ? 'text-black' : 'text-gray-300';
    
    return `
        <div data-scenario="${id}" class="bg-white rounded-xl ${ringClass} p-5 hover:shadow transition-shadow duration-200 cursor-pointer relative">
            <div class="${badgeColorClass} text-white text-xs font-bold px-2 py-1 inline-block rounded mb-3 pointer-events-none">${badgeText}</div>
            <div class="${textClass} font-bold text-xl mb-1 pointer-events-none">${id}</div>
            <h3 class="font-bold text-sm mb-2 pointer-events-none">${title}</h3>
            <p class="text-xs text-gray-500 mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
        </div>
    `;
}

export function renderPerspectiveCard(id, title, description, isRecommended, isSelected = false) {
    const badgeHTML = isRecommended 
        ? `<span class="bg-white ring-1 ring-inset ring-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none">Recommended</span>`
        : '';
        
    const ringClass = isSelected 
        ? 'ring-2 ring-inset ring-black shadow-sm'
        : 'ring-1 ring-inset ring-gray-200';
        
    const dotClass = isSelected 
        ? 'border-4 border-brand-red' 
        : 'border border-gray-300';

    return `
        <div data-perspective="${id}" class="bg-white rounded-xl ${ringClass} p-5 hover:shadow transition-shadow duration-200 cursor-pointer relative">
            <div class="flex justify-between items-center mb-1 pointer-events-none">
                <h3 class="font-bold pointer-events-none">${title}</h3>
                ${badgeHTML}
            </div>
            <p class="text-sm ${isSelected ? 'text-gray-600' : 'text-gray-500'} mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
        </div>
    `;
}

export function renderTimeHorizonCard(id, title, description, isSelected = false) {
    const ringClass = isSelected ? 'ring-2 ring-inset ring-black shadow-sm' : 'ring-1 ring-inset ring-gray-200';
    const dotClass = isSelected ? 'border-4 border-brand-red' : 'border border-gray-300';
    const textClass = isSelected ? 'text-black' : 'text-gray-400';
    
    return `
        <div data-time="${id}" class="bg-white rounded-xl ${ringClass} p-5 hover:shadow transition-shadow duration-200 cursor-pointer relative">
            <div class="${textClass} font-bold text-lg mb-1 pointer-events-none">${title}</div>
            <p class="text-xs text-gray-500 mb-4 pointer-events-none">${description}</p>
            <div class="absolute bottom-5 right-5 w-4 h-4 rounded-full ${dotClass} pointer-events-none"></div>
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

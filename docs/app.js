const state = {
    allIcons: [],
    filteredIcons: [],
    currentStyle: 'stroke-rounded',
    searchQuery: '',
    page: 0,
    itemsPerPage: 100,
    isLoading: false,
    hasMore: true
};

const elements = {
    grid: document.getElementById('icon-grid'),
    styleSelector: document.getElementById('style-selector'),
    searchInput: document.getElementById('search'),
    totalCount: document.getElementById('total-count'),
    resultsCount: document.getElementById('results-count'),
    spinner: document.querySelector('.spinner'),
    trigger: document.getElementById('loading-trigger'),
    modal: document.getElementById('modal'),
    modalClose: document.getElementById('modal-close'),
    modalPreview: document.getElementById('modal-preview'),
    modalTitle: document.getElementById('modal-title'),
    codeReact: document.getElementById('code-react'),
    codeSvg: document.getElementById('code-svg'),
    toast: document.getElementById('toast'),
    copyBtns: document.querySelectorAll('.copy-btn')
};

// Intersection Observer for Infinite Scrolling
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && state.hasMore && !state.isLoading) {
        loadMoreIcons();
    }
}, { rootMargin: '200px' });

observer.observe(elements.trigger);

// Initialize
async function init() {
    await fetchIcons(state.currentStyle);
    setupEventListeners();
}

// Fetch Data
async function fetchIcons(styleId) {
    state.isLoading = true;
    elements.spinner.classList.add('active');
    
    try {
        const res = await fetch(`data/${styleId}.json`);
        const data = await res.json();
        
        state.allIcons = data;
        elements.totalCount.textContent = data.length.toLocaleString() + '+';
        
        applyFilters();
    } catch (err) {
        console.error('Failed to load icons:', err);
        elements.resultsCount.textContent = 'Failed to load icon data.';
    } finally {
        state.isLoading = false;
        elements.spinner.classList.remove('active');
    }
}

// Apply Search Filter
function applyFilters() {
    const query = state.searchQuery.toLowerCase().trim();
    
    if (!query) {
        state.filteredIcons = state.allIcons;
    } else {
        state.filteredIcons = state.allIcons.filter(icon => {
            return icon.name.toLowerCase().includes(query) || 
                   icon.originalName.toLowerCase().includes(query) ||
                   icon.tags.some(t => t.toLowerCase().includes(query));
        });
    }

    elements.resultsCount.textContent = `Showing ${state.filteredIcons.length} icons`;
    
    // Reset pagination
    state.page = 0;
    state.hasMore = true;
    elements.grid.innerHTML = '';
    
    loadMoreIcons();
}

// Render Chunk
function loadMoreIcons() {
    if (!state.hasMore || state.isLoading) return;
    
    const start = state.page * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const chunk = state.filteredIcons.slice(start, end);
    
    if (chunk.length === 0) {
        state.hasMore = false;
        return;
    }

    const fragment = document.createDocumentFragment();

    chunk.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'icon-card';
        card.innerHTML = `
            <div class="icon-wrapper">${icon.svg}</div>
            <div class="icon-name">${icon.name}</div>
        `;
        
        card.addEventListener('click', () => openModal(icon));
        fragment.appendChild(card);
    });

    elements.grid.appendChild(fragment);
    
    state.page++;
    if (end >= state.filteredIcons.length) {
        state.hasMore = false;
    }
}

// Modal & Copy
function openModal(icon) {
    elements.modalTitle.textContent = icon.name;
    elements.modalPreview.innerHTML = icon.svg;
    
    // Generate React import code
    const isDefaultStyle = state.currentStyle === 'stroke-rounded';
    const importPath = isDefaultStyle ? '@dga-icons/react' : `@dga-icons/react/${state.currentStyle}`;
    elements.codeReact.textContent = `import { ${icon.name} } from '${importPath}';\n\n<${icon.name} size={24} />`;
    
    // Show Raw SVG
    elements.codeSvg.textContent = icon.svg;
    
    elements.modal.classList.add('active');
}

function closeModal() {
    elements.modal.classList.remove('active');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        elements.toast.classList.add('show');
        setTimeout(() => elements.toast.classList.remove('show'), 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Event Listeners
function setupEventListeners() {
    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        applyFilters();
    });

    elements.styleSelector.addEventListener('change', (e) => {
        state.currentStyle = e.target.value;
        fetchIcons(state.currentStyle);
    });

    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });

    elements.copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const code = document.getElementById(targetId).textContent;
            copyToClipboard(code);
        });
    });
}

// Start
init();

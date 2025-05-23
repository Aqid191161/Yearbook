// DOM Elements
const searchInput = document.querySelector('.search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const profileCards = document.querySelectorAll('.profile-card');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

// Dark mode functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Update icon
    const icon = document.querySelector('.dark-mode-toggle i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize dark mode
function initDarkMode() {
    // Check if dark mode preference is stored
    const storedDarkMode = localStorage.getItem('darkMode');
    
    // If no preference is stored, default to dark mode
    if (storedDarkMode === null) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
        const icon = document.querySelector('.dark-mode-toggle i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Use stored preference
        const isDark = storedDarkMode === 'true';
        if (isDark) {
            document.documentElement.classList.add('dark');
            const icon = document.querySelector('.dark-mode-toggle i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('p').textContent.toLowerCase();
        const isVisible = name.includes(searchTerm) || role.includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
}

// Filter functionality
function handleFilter(event) {
    const category = event.target.dataset.category;
    const profileCards = document.querySelectorAll('.profile-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-500', 'text-white');
            btn.classList.remove('border-2', 'border-gray-200');
        } else {
            btn.classList.remove('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-500', 'text-white');
            btn.classList.add('border-2', 'border-gray-200');
        }
    });
    
    // Filter cards
    profileCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initDarkMode();
    
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Search input
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
});

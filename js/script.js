const HOME_PRODUCTS = [
    {
        name: "Obsidian Corduroy Sectional",
        category: "Sofas",
        collection: "Minimalist Core",
        material: "Fabric",
        room: "Living Room",
        price: "RM 1,299",
        image: "assets/images/sofa-2d.png",
        url: "product-detail/product-detail.html"
    },
    {
        name: "Walnut & Steel Executive Desk",
        category: "Tables",
        collection: "Summer 2026",
        material: "Wood",
        room: "Office",
        price: "RM 850",
        image: "assets/images/desk-2d.jpg",
        url: "product-detail/product-detail-2.html"
    },
    {
        name: "Azure Velvet Lounge Chair",
        category: "Chairs",
        collection: "Minimalist Core",
        material: "Fabric",
        room: "Living Room",
        price: "RM 599",
        image: "assets/images/chair-2d.png",
        url: "product-detail/product-detail-3.html"
    }
];

const HOME_SEARCH_DEFAULTS = {
    category: "What to look for?",
    collection: "Select collection",
    material: "Select material"
};

function getHomeSearchFilters() {
    const fields = document.querySelectorAll(".search-bar .search-field");
    const [categoryField, collectionField, materialField] = fields;

    const category = categoryField.querySelector(".custom-select-trigger").textContent.trim();
    const collection = collectionField.querySelector(".custom-select-trigger").textContent.trim();
    const material = materialField.querySelector(".custom-select-trigger").textContent.trim();

    return {
        category: category === HOME_SEARCH_DEFAULTS.category ? null : category,
        collection: collection === HOME_SEARCH_DEFAULTS.collection ? null : collection,
        material: material === HOME_SEARCH_DEFAULTS.material ? null : material
    };
}

function filterHomeProducts(filters) {
    return HOME_PRODUCTS.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.collection && product.collection !== filters.collection) return false;
        if (filters.material && product.material !== filters.material) return false;
        return true;
    });
}

function renderHomeSearchResults(products) {
    const resultsSection = document.getElementById("home-search-results");
    const resultsGrid = document.getElementById("home-product-grid");
    const resultsCount = document.getElementById("home-results-count");
    const noResults = document.getElementById("home-no-results");

    if (!resultsSection || !resultsGrid || !resultsCount || !noResults) return;

    resultsSection.hidden = false;
    resultsCount.textContent = `Showing ${products.length} result${products.length === 1 ? "" : "s"}`;
    noResults.hidden = products.length > 0;

    resultsGrid.innerHTML = products.map(product => `
        <div class="card">
            <a href="${product.url}"><img src="${product.image}" alt="${product.name}"></a>
            <div class="card-info">
                <div>
                    <h3>${product.name}</h3>
                    <p class="subtitle">${product.room}</p>
                </div>
                <p class="price">${product.price}</p>
            </div>
        </div>
    `).join("");

    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupHomeSearch() {
    const searchBtn = document.getElementById("home-search-btn");
    if (!searchBtn) return;

    searchBtn.addEventListener("click", () => {
        const filters = getHomeSearchFilters();
        const products = filterHomeProducts(filters);
        renderHomeSearchResults(products);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Custom Dropdowns
    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        const select = wrapper.querySelector('.custom-select');
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const options = wrapper.querySelectorAll('.custom-option');

        // Toggle dropdown open/close when clicking the trigger
        trigger.addEventListener('click', function() {
            // Close any other open dropdowns first
            document.querySelectorAll('.custom-select').forEach(s => {
                if (s !== select) s.classList.remove('open');
            });
            select.classList.toggle('open');
        });

        // Change text when an option is selected
        options.forEach(option => {
            option.addEventListener('click', function() {
                trigger.textContent = this.textContent; // Update text
                select.classList.remove('open'); // Close menu
            });
        });
    });

    // Close dropdowns if the user clicks anywhere outside of them
    window.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select').forEach(s => {
                s.classList.remove('open');
            });
        }
    });

    const launchArBtn = document.getElementById("launch-ar");
    const closeArBtn = document.getElementById("close-ar");
    const arContainer = document.getElementById("ar-container");
    const audioNarration = document.getElementById("product-audio");

    if (launchArBtn) {
        launchArBtn.addEventListener("click", () => {
            arContainer.style.display = "block";
            // Play audio narration with a clear purpose to describe the product when AR launches
            if(audioNarration) audioNarration.play(); 
        });
    }

    if (closeArBtn) {
        closeArBtn.addEventListener("click", () => {
            arContainer.style.display = "none";
            if(audioNarration) audioNarration.pause();
        });
    }

    setupHomeSearch();
});
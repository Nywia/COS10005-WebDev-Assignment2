//#region ================== Helpers & Configuration ==================

// ================== RegEx Patterns ==================
// Add more patterns here later if we ever need to validate things like postcodes or specific names
const usernamePattern = /^[A-Za-z0-9_]{5,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const registerPhonePattern = /^[0-9]{8,15}$/;
const reservationPhonePattern = /^[0-9]{10,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/;
const cardPattern = /^([0-9]{15}|[0-9]{16})$/; // Amex 15 and Visa 16 handled together

// ================== Helpers ==================
// So I don't need to keep typing the same things over and over again.
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// A clean little wrapper for event listeners to avoid annoying null errors if the element isn't on the page
const on = (element, event, handler) => {
    if (element) element.addEventListener(event, handler);
};

// ================== Redirect Helpers ==================
// Uses localStorage to temporarily hold the user's choice across page loads, 
// allowing the reservation form to auto-select the chosen restaurant.
// Also encodes the data into the url because localStorage doesn't work properly
// when testing locally using file:// 
const redirectWithRestaurant = (restaurantName) => {
    localStorage.setItem("selectedRestaurant", restaurantName);
    window.location.href = `reservation.html?restaurant=${encodeURIComponent(restaurantName)}`;
};

const redirectToBill = (restaurantName) => {
    localStorage.setItem("selectedRestaurant", restaurantName);
    window.location.href = `bill.html?restaurant=${encodeURIComponent(restaurantName)}`;
};

// ================== Dynamic Error Display ==================
// Injects a visually cooler error box than the ugly alert notification  
// and scrolling it into view so the user immediately notices
const displayErrors = (errors, event, formElement) => {
    let errorContainer = formElement.querySelector(".error-box");

    // Create the error box if it doesn't exist yet
    if (!errorContainer) {
        errorContainer = document.createElement("div");
        errorContainer.className = "error-box";
        formElement.prepend(errorContainer);
    }

    if (errors.length === 0) {
        // Hide it if everything is good to go
        errorContainer.style.display = "none";
    } else {
        // Stop the form from submitting!
        event.preventDefault();
        errorContainer.innerHTML = `<strong>Please fix the following errors:</strong><ul>${errors.map(error => `<li>${error}</li>`).join("")}</ul>`;
        errorContainer.style.display = "block";
        errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

//#endregion 


//#region ================== Data Processing (Mock Database) ==================

// ================== Shared Restaurant Data ==================
// Basically a mock database to keep content consistent across all pages without needing to make changes for every page every time something needs to be changed 
const restaurants = [
    {
        name: "Ristorante Uno",
        cuisine: "Italian",
        image: "Design/images/restaurant1.png",
        dishes: [
            { name: "Margherita Pizza", price: 18 },
            { name: "Spaghetti Carbonara", price: 22 },
            { name: "Fettuccine Alfredo", price: 20 },
            { name: "Lasagna Classica", price: 24 },
            { name: "Risotto al Funghi", price: 23 },
            { name: "Bruschetta Toast", price: 11 },
            { name: "Minestrone Soup", price: 10 },
            { name: "Tiramisu Dessert", price: 12 }
        ],
        deposit: 10,
        priceRange: "$20 - $45",
        description: "This establishment offers traditional Italian meals prepared with fresh ingredients. The venue features a classic dining setup suitable for family gatherings and casual dinners. Customers can select from a range of pasta dishes, wood-fired pizzas, and classic desserts. Standard seating is available daily, and booking in advance is highly recommended for weekend evenings.",
        diet: "vegetarian",
        budget: "medium",
        purpose: "casual"
    },
    {
        name: "Restaurant Deux",
        cuisine: "French",
        image: "Design/images/restaurant2.png",
        dishes: [
            { name: "Steak Frites", price: 35 },
            { name: "Coq au Vin", price: 29 },
            { name: "Escargots de Bourgogne", price: 18 },
            { name: "Foie Gras Terrine", price: 26 },
            { name: "Crème Brûlée", price: 12 }
        ],
        deposit: 25,
        priceRange: "$40 - $90",
        description: "A fine dining option focusing on traditional French culinary techniques. The menu includes classic options like steak, seafood, and rich desserts. The environment is formal and well-suited for special occasions, couples, and professional business dinners. High-quality ingredients are utilized across all dishes, and an extensive beverage list is provided for guests.",
        diet: "none",
        budget: "high",
        purpose: "date"
    },
    {
        name: "Restaurante Tres",
        cuisine: "Spanish",
        image: "Design/images/restaurant3.png",
        dishes: [
            { name: "Seafood Paella", price: 28 },
            { name: "Garlic Prawns Tapas", price: 14 },
            { name: "Patatas Bravas", price: 10 },
            { name: "Jamón Ibérico Platter", price: 22 },
            { name: "Calamari a la Romana", price: 13 },
            { name: "Tortilla Española", price: 9 },
            { name: "Croquetas de Jamón", price: 11 },
            { name: "Pimientos de Padrón", price: 12 },
            { name: "Churros con Chocolate", price: 9 }
        ],
        deposit: 15,
        priceRange: "$25 - $60",
        description: "This venue serves a variety of traditional Spanish tapas and sharing platters. It provides a lively atmosphere that accommodates both small and large dining groups easily. The menu highlights regional seafood variations, rice dishes, and traditional finger foods. It represents an excellent option for sharing meals among friends, family members, or traveling tourists.",
        diet: "pescatarian",
        budget: "medium",
        purpose: "night-out"
    },
    {
        name: "Restaurant Vier",
        cuisine: "German",
        image: "Design/images/restaurant1.png",
        dishes: [
            { name: "Chicken Schnitzel", price: 24 },
            { name: "Bratwurst Platter", price: 19 },
            { name: "Apple Strudel", price: 10 }
        ],
        deposit: 10,
        priceRange: "$20 - $50",
        description: "A casual dining spot offering hearty German meals and classic comfort food options. The interior uses simple wood styling to replicate a traditional European tavern layout. Portions are large and designed to satisfy general dining requirements. Families and tourist groups frequently visit this location due to the relaxed environment and straightforward menu options.",
        diet: "none",
        budget: "medium",
        purpose: "casual"
    },
    {
        name: "Restaurante Cinco",
        cuisine: "Mexican",
        image: "Design/images/restaurant5.png",
        dishes: [
            { name: "Beef Tacos Trio", price: 16 },
            { name: "Chicken Enchiladas", price: 19 },
            { name: "Loaded Nachos Sharing", price: 15 },
            { name: "Pork Carnitas Burrito", price: 17 },
            { name: "Guacamole and Chips", price: 11 },
            { name: "Churros Basket", price: 8 }
        ],
        deposit: 0,
        priceRange: "$15 - $35",
        description: "This establishment offers fast, vibrant Mexican street food options. No upfront deposit is required to secure a table, making it a highly accessible choice for casual dining. The menu consists of customizable tacos, burritos, and shared appetizers. The bright decor makes it appealing to younger crowds, students, and professionals seeking quick lunch options.",
        diet: "gluten-free",
        budget: "low",
        purpose: "solo"
    },
    {
        name: "Ristorante Sei",
        cuisine: "Italian Seafood",
        image: "Design/images/restaurant6.png",
        dishes: [
            { name: "Lobster Ravioli", price: 32 },
            { name: "Grilled Seafood Platter", price: 45 },
            { name: "Calamari Fritti", price: 19 },
            { name: "Oysters Rockefeller", price: 28 },
            { name: "Panettone Bread Pudding", price: 14 }
        ],
        deposit: 30,
        priceRange: "$50 - $110",
        description: "A premium dining establishment focusing heavily on upscale Italian seafood recipes. Fresh catches are prepared daily by the culinary team, ensuring premium standards. The venue overlooks scenic views, creating a premium atmosphere tailored for formal events, romantic dates, and corporate dinners. Premium pricing applies, and reservations must be completed well in advance.",
        diet: "pescatarian",
        budget: "high",
        purpose: "celebration"
    },
    {
        name: "Izakaya Shichi",
        cuisine: "Japanese",
        image: "Design/images/restaurant7.png",
        dishes: [
            { name: "Tonkotsu Ramen Bowl", price: 21 },
            { name: "Salmon Sashimi Platter", price: 26 },
            { name: "Chicken Yakitori Skewers", price: 13 },
            { name: "Takoyaki Octopus Balls", price: 11 },
            { name: "Agedashi Tofu", price: 9 },
            { name: "Pork Gyoza Dumplings", price: 12 },
            { name: "Edamame with Sea Salt", price: 7 },
            { name: "Vegetable Tempura", price: 14 },
            { name: "Tuna Tataki", price: 18 },
            { name: "Karaage Chicken", price: 12 },
            { name: "Matcha Mochi Ice Cream", price: 9 }
        ],
        deposit: 15,
        priceRange: "$30 - $65",
        description: "This dynamic establishment provides authentic Japanese pub food and freshly prepared sushi. The venue features traditional low seating and a vibrant open kitchen where chefs grill skewers over charcoal. Customers can enjoy an array of small plates, shared noodle bowls, and imported green teas. It is a highly popular destination for casual evening social gatherings.",
        diet: "keto",
        budget: "medium",
        purpose: "night-out"
    },
    {
        name: "Estiatorio Okto",
        cuisine: "Greek",
        image: "Design/images/restaurant8.png",
        dishes: [
            { name: "Traditional Moussaka", price: 25 },
            { name: "Charcoal Grilled Octopus", price: 34 },
            { name: "Greek Salad with Feta", price: 16 },
            { name: "Spanakopita Pastry", price: 12 },
            { name: "Tzatziki with Pita", price: 8 },
            { name: "Galaktoboureko Dessert", price: 11 }
        ],
        deposit: 20,
        priceRange: "$35 - $75",
        description: "A bright and airy coastal destination highlighting traditional Greek Mediterranean recipes. The interior design utilizes classic white and blue tones to replicate an authentic island tavern vibe. The menu emphasizes fresh seafood, slow-roasted meats, and locally sourced olive oils. It serves as an excellent setting for romantic dinner dates and lively weekend celebrations.",
        diet: "vegetarian",
        budget: "high",
        purpose: "brunch"
    },
    {
        name: "Can Ting Jiu",
        cuisine: "Chinese",
        image: "Design/images/restaurant9.png",
        dishes: [
            { name: "Peking Duck Sharing Set", price: 58 },
            { name: "Steamed Xiao Long Bao", price: 14 },
            { name: "Spicy Mapo Tofu", price: 18 },
            { name: "Kung Pao Chicken", price: 22 },
            { name: "Beef Fried Noodles", price: 19 },
            { name: "Har Gow Shrimp Dumplings", price: 13 },
            { name: "Siu Mai Pork Dumplings", price: 12 },
            { name: "Spring Rolls Veggie", price: 9 },
            { name: "General Tso Chicken", price: 21 },
            { name: "Sweet and Sour Pork", price: 20 },
            { name: "Wonton Soup", price: 11 },
            { name: "Mango Pomelo Sago", price: 10 }
        ],
        deposit: 0,
        priceRange: "$20 - $55",
        description: "This spacious venue offers a comprehensive selection of regional Chinese classic dishes and dim sum. Large round tables featuring lazy Susans make this space perfectly optimized for large family events. The culinary team focuses on robust aromatic spices, handmade noodles, and sweet glazed barbecue meats. Walk-ins are welcomed, though weekend dim sum hours get busy quickly.",
        diet: "halal",
        budget: "medium",
        purpose: "family"
    },
    {
        name: "Dhaba Das",
        cuisine: "Indian",
        image: "Design/images/restaurant10.png",
        dishes: [
            { name: "Aromatic Butter Chicken", price: 23 },
            { name: "Paneer Tikka Masala", price: 21 },
            { name: "Garlic Naan Basket", price: 7 },
            { name: "Samosa Chaat", price: 11 },
            { name: "Lamb Rogan Josh", price: 25 },
            { name: "Dal Makhani", price: 18 },
            { name: "Gulab Jamun Trio", price: 9 }
        ],
        deposit: 10,
        priceRange: "$25 - $50",
        description: "An aromatic dining experience featuring rich Northern and Southern Indian culinary staples. The colorful dining room boasts authentic cultural art and comfortable booth options for small groups. Guests can order from a diverse menu that accommodates spicy preferences, creamy curries, and tandoori items. It is highly regarded by working professionals looking for corporate lunch spots.",
        diet: "vegan",
        budget: "medium",
        purpose: "business"
    },
    {
        name: "Sikdang Sibil",
        cuisine: "Korean BBQ",
        image: "Design/images/restaurant11.png",
        dishes: [
            { name: "Wagyu Beef Bulgogi", price: 38 },
            { name: "Pork Belly BBQ Combo", price: 34 },
            { name: "Kimchi Fried Rice", price: 17 },
            { name: "Japchae Glass Noodles", price: 19 },
            { name: "Seafood Scallion Pancake", price: 21 },
            { name: "Tteokbokki Spicy Cakes", price: 15 },
            { name: "Silken Tofu Stew", price: 18 },
            { name: "Sweet Hotteok Pancake", price: 11 }
        ],
        deposit: 25,
        priceRange: "$40 - $85",
        description: "An interactive culinary hub showcasing premium Korean barbecue choices built directly into table grills. The sleek, modern environment includes advanced exhaust systems to ensure a comfortable dining layout. Diners can select varied combos of high-grade meats, fermented side dishes, and spicy stews. This lively destination remains a prime choice for energetic corporate groups.",
        diet: "keto",
        budget: "high",
        purpose: "celebration"
    },
    {
        name: "Ran Ahan Sip-Song",
        cuisine: "Thai",
        image: "Design/images/restaurant12.png",
        dishes: [
            { name: "Classic Pad Thai Boran", price: 16 },
            { name: "Spicy Tom Yum Goong", price: 22 },
            { name: "Green Papaya Salad", price: 14 },
            { name: "Massaman Beef Curry", price: 24 },
            { name: "Chicken Satay Skewers", price: 12 },
            { name: "Pineapple Fried Rice", price: 18 },
            { name: "Vegetable Spring Rolls", price: 9 },
            { name: "Garlic Pepper Prawns", price: 25 },
            { name: "Red Curry with Duck", price: 23 },
            { name: "Mango Sticky Rice", price: 10 }
        ],
        deposit: 0,
        priceRange: "$15 - $40",
        description: "A relaxed and affordable eatery serving up spicy, sweet, and sour traditional Thai street foods. The casual environment uses minimalist furniture to maximize open seating for fast customer turnover. The kitchen utilizes authentic imported herbs like lemongrass and galangal to deliver high-quality flavors. It stands as a perfect quick-stop budget restaurant for local university students.",
        diet: "gluten-free",
        budget: "low",
        purpose: "solo"
    }
];

// ================== Dynamic Select Data ==================
// Pulls unique values directly from the mock database instead of hardcoding form options everywhere
// Filters out "none" so it doesn't display as a dedicated option
const uniqueDiets = [...new Set(restaurants.map(r => r.diet))].filter(d => d !== "none");
const uniquePurposes = [...new Set(restaurants.map(r => r.purpose))].filter(p => p !== "none");

// Capitalize the values to look nicer in the UI dropdowns

// Capitalize the values to look nicer in the UI dropdowns
const formatOptionLabel = (value) => { return value.charAt(0).toUpperCase() + value.slice(1); };

//#endregion


//#region ================== Global UI Elements ==================

// ================== Navigation ==================
// Handle mobile hamburger menu toggling
const navToggleBtn = $("#navToggle");
const mainNav = $("#mainNav");

on(navToggleBtn, "click", () => mainNav.classList.toggle("open"));

// ================== Global Select Buttons ==================
// Uses event delegation on the document to catch clicks on any '.select-btn', 
// ensuring dynamically injected buttons (like those on the recommendations page) still function properly
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("select-btn") && !event.target.closest("#results")) {
        event.preventDefault();
        redirectWithRestaurant(event.target.dataset.name);
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("bill-btn")) {
        event.preventDefault();
        redirectToBill(event.target.dataset.name);
    }
});

//#endregion


//#region ================== Page: Restaurants ==================

// ================== Dynamic Restaurant Page ==================
const restaurantContainer = $("#restaurant-container");

if (restaurantContainer) {
    // Injects standard HTML structures based on our cool mock database to prevent hardcoding errors
    restaurantContainer.innerHTML = restaurants.map(restaurant => `
        <article class="restaurant-card">
            <div class="restaurant-card-content">
                <h2>${restaurant.name}</h2>
                <img src="${restaurant.image}" alt="${restaurant.name} image" style="margin-bottom: 15px;">
                
                <div class="card-details-grid">
                    <div class="detail-box">
                        <span class="detail-label">Cuisine</span>
                        <span class="detail-value">${restaurant.cuisine}</span>
                    </div>
                    <div class="detail-box">
                        <span class="detail-label">Dietary</span>
                        <span class="detail-value">${formatOptionLabel(restaurant.diet)}</span>
                    </div>
                    <div class="detail-box">
                        <span class="detail-label">Price Range</span>
                        <span class="detail-value">${restaurant.priceRange}</span>
                    </div>
                    <div class="detail-box">
                        <span class="detail-label">Deposit</span>
                        <span class="detail-value">$${restaurant.deposit}</span>
                    </div>
                </div>

                <p style="margin-top: 5px;"><strong>Signature Dishes:</strong></p>
                <ul style="margin-top: 5px;">
                    ${restaurant.dishes
                        .slice(0, 2)
                        .map(dish => `<li>${dish.name} - $${dish.price}</li>`)
                        .join("")}
                </ul>
                
                <p>${restaurant.description}</p>
                
                <div class="card-buttons">
                    <button type="button" class="bill-btn" data-name="${restaurant.name}">
                        Calculate Bill
                    </button>
                    <button type="button" class="select-btn" data-name="${restaurant.name}">
                        Book this
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

//#endregion


//#region ================== Page: Recommendations ==================

// ================== Dynamic Form Options ==================
// Populate all select menus using the database
const registerDietSelect = $(".register-form #diet");
const recommendDietSelect = $(".recommendation-form #diet");
const recommendPurposeSelect = $(".recommendation-form #purpose");

// Loop to generate options
const populateDropdown = (selectElement, dataArray) => {
    if (!selectElement) return;
    // Sets a clear placeholder-style option acting as the "None" state
    selectElement.innerHTML = `<option value="">Any / No Preference</option>`;
    dataArray.forEach(item => {
        selectElement.appendChild(new Option(formatOptionLabel(item), item));
    });
};

populateDropdown(registerDietSelect, uniqueDiets);
populateDropdown(recommendDietSelect, uniqueDiets);
populateDropdown(recommendPurposeSelect, uniquePurposes);

// ================== Dynamic Recommendation Page ==================
const recommendationForm = $(".recommendation-form form");
const resultsContainer = $("#results");

if (recommendationForm && resultsContainer) {
    
    // Ensure UI consistency whether showing random picks or search results
    const renderRecommendations = (restaurantList, headingHtml = "", showReasons = false) => {
        if (restaurantList.length > 0) {
            let html = headingHtml;

            html += restaurantList.map(restaurant => `
                <article class="recommendation-card">
                    <img src="${restaurant.image}" alt="${restaurant.name} image">

                    <div class="recommendation-card-content">
                        <h3>${restaurant.name}</h3>
                        <div class="card-details-grid">
                            <div class="detail-box">
                                <span class="detail-label">Cuisine</span>
                                <span class="detail-value">${restaurant.cuisine}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-label">Dietary</span>
                                <span class="detail-value">${formatOptionLabel(restaurant.diet)}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-label">Purpose</span>
                                <span class="detail-value">${formatOptionLabel(restaurant.purpose)}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-label">Price Range</span>
                                <span class="detail-value">${restaurant.priceRange}</span>
                            </div>
                        </div>
                        ${
                            showReasons && restaurant.matches
                            ? `<p><strong>Matched:</strong> ${restaurant.matches.join(", ")}</p>`
                            : ""
                        }
                        <div class="card-buttons">
                            <button type="button" class="bill-btn" data-name="${restaurant.name}">
                                Calculate Bill
                            </button>
                            <button type="button" class="select-btn" data-name="${restaurant.name}">
                                Book this
                            </button>
                        </div>
                    </div>
                </article>
            `).join("");
            resultsContainer.innerHTML = html;
        } else {
            resultsContainer.innerHTML = `
                <div class="recommendation-card">
                    <h3>No Match Found</h3>
                    <p>Try broadening your search criteria.</p>
                </div>`;
        }
    };

    // Copy the data so original isn't affected
    // Then provide 3 random picks for suggestions right when the page loads
    const randomRestaurants = [...restaurants]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
    renderRecommendations(randomRestaurants, `<div class="results-heading"><h3>Today's Random Picks:</h3></div>`);

    on(recommendationForm, "submit", (event) => {
        event.preventDefault();

        const diet = $("#diet").value;
        const purpose = $("#purpose").value;
        
        // Grab the new min and max inputs
        const minBudgetStr = $("#min-budget").value;
        const maxBudgetStr = $("#max-budget").value;
        const minBudget = minBudgetStr ? parseInt(minBudgetStr, 10) : null;
        const maxBudget = maxBudgetStr ? parseInt(maxBudgetStr, 10) : null;

        // Require all selected fields to match for a perfect recommendation
        const exactMatches = restaurants.filter(r => {
            // Extract the numbers from the "$20 - $45" string using regex to actually compare them properly
            const prices = r.priceRange.match(/\d+/g);
            const rMin = parseInt(prices[0], 10);
            const rMax = parseInt(prices[1], 10);

            const matchesDiet = !diet || r.diet === diet;
            const matchesPurpose = !purpose || r.purpose === purpose;

            let matchesBudget = true;
            // The restaurant's lowest/highest price must be higher/lower user's min/max budget
            if (minBudget !== null && rMin <= minBudget) matchesBudget = false;
            if (maxBudget !== null && rMax >= maxBudget) matchesBudget = false;

            return matchesDiet && matchesPurpose && matchesBudget;
        });
        
        let finalResults = exactMatches;
        let heading = `<div class="results-heading"><h3>Your Matches:</h3></div>`;

        // Fallback scoring system: if no exact match exists, rank options by how many criteria they meet, basically a fuzzy search
        // This ensures the user always gets a helpful suggestion rather than a dead end
        if (exactMatches.length === 0) {
            finalResults = restaurants.map(restaurant => {
                let score = 0;
                const matches = [];
                
                const prices = restaurant.priceRange.match(/\d+/g);
                const rMin = parseInt(prices[0], 10);
                const rMax = parseInt(prices[1], 10);

                if (diet && restaurant.diet === diet) {
                    score++;
                    matches.push("Diet");
                }

                if (purpose && restaurant.purpose === purpose) {
                    score++;
                    matches.push("Purpose");
                }

                let matchesBudget = true;
                if (minBudget !== null && rMin <= minBudget) matchesBudget = false;
                if (maxBudget !== null && rMax >= maxBudget) matchesBudget = false;

                if ((minBudget !== null || maxBudget !== null) && matchesBudget) {
                    score++;
                    matches.push("Budget");
                }

                return { ...restaurant, score, matches };
            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score);

            heading = `
                <div class="results-heading">
                    <h3>No exact matches, but here are some suggestions:</h3>
                </div>
            `;
            renderRecommendations(finalResults, heading, true);
        } else {
            renderRecommendations(finalResults, heading);
        }
    });

    // Local event delegation just for the results container
    on(resultsContainer, "click", (event) => {
        if (event.target.classList.contains("select-btn")) {
            event.preventDefault();
            redirectWithRestaurant(event.target.dataset.name);
        }
        if (event.target.classList.contains("bill-btn")) {
            event.preventDefault();
            redirectToBill(event.target.dataset.name);
        }
    });
}

//#endregion


//#region ================== Page: User Forms (Register & Reservation) ==================

// ================== Reservation Form ==================
const reservationForm = $(".reservation-form form");

if (reservationForm) {
    const voucherSection = $("#voucher-section");
    const cardSection = $("#card-section");
    const emailInput = $("#email");
    const billingEmail = $("#billing-email");
    const sameEmail = $("#same-email");
    const restaurantField = $("#restaurant");
    const depositField = $("#deposit");

    // Hide payment fields on initial load until a method is selected
    voucherSection.style.display = "none";
    cardSection.style.display = "none";

    // Populate options based on database, preventing (my) hardcoded errors
    restaurantField.innerHTML = `<option value="">Select Restaurant</option>`;
    restaurants.forEach(r => restaurantField.appendChild(new Option(r.name, r.name)));

    // Automatically update the readonly deposit field when a restaurant is chosen
    const updateDepositValue = () => {
        const selectedRestaurant = restaurants.find(r => r.name === restaurantField.value);
        depositField.value = selectedRestaurant ? `$${selectedRestaurant.deposit.toFixed(2)}` : "$0.00";
    };
    on(restaurantField, "change", updateDepositValue);

    // Check localStorage to pre-fill the restaurant if the user navigated here from a recommendation
    const params = new URLSearchParams(window.location.search);
    const selectedRestaurant = params.get("restaurant") || localStorage.getItem("selectedRestaurant");
    if (selectedRestaurant) {
        restaurantField.value = selectedRestaurant;
        updateDepositValue();
    }

    // Enforce a minimum booking window (2 hours from now) to prevent past bookings
    const now = new Date();
    now.setHours(now.getHours() + 2);
    const adjustedDate = now.toISOString().split("T")[0];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    $("#date").min = now;
    $("#date").value = adjustedDate;
    $("#time").value = `${hours}:${minutes}`;

    // Dynamically toggle required fields based on payment method 
    // to ensure the user only submits relevant payment data
    $$('input[name="payment"]').forEach(option => {
        on(option, "change", (event) => {
            const isVoucher = event.target.value === "voucher";
            voucherSection.style.display = isVoucher ? "block" : "none";
            cardSection.style.display = isVoucher ? "none" : "block";
            $("#voucher").required = isVoucher;
            $("#card").required = !isVoucher;
        });
    });

    // Lock and sync the billing email field if it matches the contact email
    const syncBillingEmail = () => {
        billingEmail.value = sameEmail.checked ? emailInput.value : "";
        billingEmail.readOnly = sameEmail.checked;
    };
    on(sameEmail, "change", syncBillingEmail);
    on(emailInput, "input", () => { if (sameEmail.checked) syncBillingEmail(); });

    on(reservationForm, "submit", (event) => {
        const errors = [];
        const fullname = $("#fname").value.trim();
        const email = emailInput.value;
        const phone = $("#phone").value;
        const restaurant = restaurantField.value;
        const date = $("#date").value;
        const time = $("#time").value;
        const people = $("#people").value;
        const payment = $('input[name="payment"]:checked');
        const card = $("#card").value;
        const today = new Date().toISOString().split("T")[0];

        // Run all the validations and check if user screwed up somewhere
        if (fullname === "") errors.push("Full name is required.");
        if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
        if (!reservationPhonePattern.test(phone)) errors.push("Phone number must contain at least 10 digits.");
        if (!restaurant) errors.push("Please select a restaurant.");
        if (!date) errors.push("Please select a reservation date.");
        else if (date < today) errors.push("Reservation date cannot be in the past.");
        if (!time) errors.push("Please select a reservation time.");
        if (Number(people) <= 0) errors.push("Number of people must be greater than 0.");

        if (!payment) {
            errors.push("Please select a deposit payment method.");
        } else if (payment.value === "online" && !cardPattern.test(card)) {
            errors.push("Invalid credit card format. Please enter 15 or 16 digits.");
        }

        displayErrors(errors, event, reservationForm);
    });
}

// ================== Register Form ==================
const registerForm = $(".register-form form");

if (registerForm) {
    on(registerForm, "submit", (event) => {
        const errors = [];
        const username = $("#username").value;
        const email = $("#email").value;
        const phone = $("#phone").value;
        const password = $("#password").value;
        const confirmPassword = $("#confirm-password").value;
        const gender = $('input[name="gender"]:checked');
        const diet = $("#diet").value;
        const country = $("#country").value;

        if (!usernamePattern.test(username)) errors.push("Username must be at least 5 characters.");
        if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
        if (!registerPhonePattern.test(phone)) errors.push("Phone number must contain 8 to 15 digits.");
        if (!passwordPattern.test(password)) errors.push("Password must be 10+ characters with upper, lower, number, and special character.");
        if (password !== confirmPassword) errors.push("Passwords do not match.");
        if (!gender) errors.push("Please select a gender.");
        if (!diet) errors.push("Please select dietary preferences.");
        if (!country) errors.push("Please select a country/region.");

        displayErrors(errors, event, registerForm);
    });
}

//#endregion


//#region ================== Page: Bill Calculator ==================

// ================== Bill Calculator ==================
const restaurantSelect = $("#calc-restaurant");
const totalInput = $("#calc-total");
const dishList = $("#dish-list");
const reserveBtn = $("#bill-reserve-btn");

if (restaurantSelect && totalInput && dishList) {
    restaurantSelect.innerHTML = `<option value="">Select Restaurant</option>`;
    restaurants.forEach(r => restaurantSelect.appendChild(new Option(r.name, r.name)));

    const updateTotal = () => {
        let total = 0;
        // Loop through all inputs and sum up (quantity * price)
        $$(".dish-quantity").forEach(input => {
            const quantity = Number(input.value) || 0;
            const price = Number(input.dataset.price);
            total += quantity * price;
        });
        totalInput.value = `$${total.toFixed(2)}`;
    };

    on(restaurantSelect, "change", (event) => {
        dishList.innerHTML = "";
        const selectedRestaurant = restaurants.find(r => r.name === event.target.value);

        if (!selectedRestaurant) {
            reserveBtn.style.display = "none";
            updateTotal();
            return;
        }

        reserveBtn.style.display = "block";
        reserveBtn.dataset.name = selectedRestaurant.name;

        // Render the dishes out so the user can punch in numbers
        dishList.innerHTML = selectedRestaurant.dishes.map(dish => `
            <div class="dish-card">
                <img src="${selectedRestaurant.image}" alt="${dish.name}">
                <div class="dish-card-content">
                    <div class="dish-header">
                        <h3>${dish.name}</h3>
                        <p class="dish-price">$${dish.price}</p>
                    </div>
                    <div class="dish-controls">
                        <button type="button" class="minus-btn">-</button>
                        <input 
                            type="number"
                            class="dish-quantity"
                            data-price="${dish.price}"
                            value="0"
                            min="0"
                        >
                        <button type="button" class="plus-btn">+</button>
                    </div>
                </div>
            </div>
        `).join("");

        updateTotal();
    });

    // Check if we arrived here by clicking a 'Calculate Bill' button elsewhere
    const billParams = new URLSearchParams(window.location.search);
    const selectedRestaurant =
        billParams.get("restaurant") ||
        localStorage.getItem("selectedRestaurant");

    if (selectedRestaurant) {
        restaurantSelect.value = selectedRestaurant;
        // Manually trigger the change event to populate the dishes
        restaurantSelect.dispatchEvent(new Event("change"));
    }

    on(reserveBtn, "click", () => { redirectWithRestaurant(reserveBtn.dataset.name); });

    // Handle the cool +/- buttons for dish quantities
    on(dishList, "click", (event) => {
        const input = event.target.parentElement?.querySelector(".dish-quantity");
        if (!input) return;

        let value = Number(input.value);

        if (event.target.classList.contains("plus-btn")) {
            value++;
        }

        if (event.target.classList.contains("minus-btn")) {
            value = Math.max(0, value - 1); // Prevent negative food!
        }

        input.value = value;
        updateTotal();
    });

    // Just in case they type the number in manually instead of using buttons
    on(dishList, "input", (event) => {
        if (event.target.classList.contains("dish-quantity")) {
            updateTotal();
        }
    });
}

//#endregion
// ================== RegEx Patterns ==================
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

const on = (element, event, handler) => {
    if (element) element.addEventListener(event, handler);
};

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
            { name: "Spaghetti Carbonara2", price: 23 },
            { name: "Spaghetti Carbonara3", price: 24 },
            { name: "Spaghetti Carbonara4", price: 25 },
            { name: "Spaghetti Carbonara5", price: 26 },
            { name: "Spaghetti Carbonara6", price: 27 },
            { name: "Spaghetti Carbonara6", price: 27 },
            { name: "Spaghetti Carbonara6", price: 27 },
            { name: "Spaghetti Carbonara6", price: 27 },
            { name: "Spaghetti Carbonara6", price: 27 },
        ],
        deposit: 10,
        priceRange: "$20 - $45",
        description: "This establishment offers traditional Italian meals prepared with fresh ingredients. The venue features a classic dining setup suitable for family gatherings and casual dinners. Customers can select from a range of pasta dishes, wood-fired pizzas, and classic desserts. Standard seating is available daily, and booking in advance is highly recommended for weekend evenings.",
        diet: "none",
        budget: "medium",
        purpose: "family"
    },

    {
        name: "Restaurant Deux",
        cuisine: "French",
        image: "Design/images/restaurant2.png",
        dishes: [
            { name: "Steak Frites", price: 35 },
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
            { name: "Garlic Prawns Tapas", price: 14 }
        ],
        deposit: 15,
        priceRange: "$25 - $60",
        description: "This venue serves a variety of traditional Spanish tapas and sharing platters. It provides a lively atmosphere that accommodates both small and large dining groups easily. The menu highlights regional seafood variations, rice dishes, and traditional finger foods. It represents an excellent option for sharing meals among friends, family members, or traveling tourists.",
        diet: "none",
        budget: "medium",
        purpose: "family"
    },

    {
        name: "Restaurant Vier",
        cuisine: "German",
        image: "Design/images/restaurant1.png",
        dishes: [
            { name: "Chicken Schnitzel", price: 24 },
            { name: "Apple Strudel", price: 10 }
        ],
        deposit: 10,
        priceRange: "$20 - $50",
        description: "A casual dining spot offering hearty German meals and classic comfort food options. The interior uses simple wood styling to replicate a traditional European tavern layout. Portions are large and designed to satisfy general dining requirements. Families and tourist groups frequently visit this location due to the relaxed environment and straightforward menu options.",
        diet: "vegan",
        budget: "medium",
        purpose: "family"
    },

    {
        name: "Restaurante Cinco",
        cuisine: "Mexican",
        image: "Design/images/restaurant5.png",
        dishes: [
            { name: "Beef Tacos Trio", price: 16 },
            { name: "Chicken Enchiladas", price: 19 }
        ],
        deposit: 0,
        priceRange: "$15 - $35",
        description: "This establishment offers fast, vibrant Mexican street food options. No upfront deposit is required to secure a table, making it a highly accessible choice for casual dining. The menu consists of customizable tacos, burritos, and shared appetizers. The bright decor makes it appealing to younger crowds, students, and professionals seeking quick lunch options.",
        diet: "halal",
        budget: "low",
        purpose: "business"
    },

    {
        name: "Ristorante Sei",
        cuisine: "Italian Seafood",
        image: "Design/images/restaurant6.png",
        dishes: [
            { name: "Lobster Ravioli", price: 32 },
            { name: "Grilled Seafood Platter", price: 45 }
        ],
        deposit: 30,
        priceRange: "$50 - $110",
        description: "A premium dining establishment focusing heavily on upscale Italian seafood recipes. Fresh catches are prepared daily by the culinary team, ensuring premium standards. The venue overlooks scenic views, creating a premium atmosphere tailored for formal events, romantic dates, and corporate dinners. Premium pricing applies, and reservations must be completed well in advance.",
        diet: "none",
        budget: "high",
        purpose: "business"
    }
];

// ================== Dynamic Select Data ==================
// Pulls unique values directly from the mock database instead of hardcoding form options everywhere
const uniqueDiets = [...new Set(restaurants.map(r => r.diet))];
const uniquePurposes = [...new Set(restaurants.map(r => r.purpose))];

// Captalize the values to look nicer
const formatOptionLabel = (value) => {return value.charAt(0).toUpperCase() + value.slice(1);};

// ================== Dynamic Error Display ==================
// Injects a visually cooler error box than the ugly alert notification  
// and scrolling it into view so the user immediately notices
const displayErrors = (errors, event, formElement) => {
    let errorContainer = formElement.querySelector(".error-box");

    if (!errorContainer) {
        errorContainer = document.createElement("div");
        errorContainer.className = "error-box";
        formElement.prepend(errorContainer);
    }

    if (errors.length === 0) {
        errorContainer.style.display = "none";
    } else {
        event.preventDefault();
        errorContainer.innerHTML = `<strong>Please fix the following errors:</strong><ul>${errors.map(error => `<li>${error}</li>`).join("")}</ul>`;
        errorContainer.style.display = "block";
        errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

// ================== Navigation ==================
// Handle mobile hamburger menu toggling
const navToggleBtn = $("#navToggle");
const mainNav = $("#mainNav");

on(navToggleBtn, "click", () => mainNav.classList.toggle("open"));

// ================== Redirect Helper ==================
// Uses localStorage to temporarily hold the user's choice across page loads, 
// allowing the reservation form to auto-select the chosen restaurant
// also encodes the data into the url because localStorage doesn't work properly
// when testing locally using file:// 
const redirectWithRestaurant = (restaurantName) => {
    localStorage.setItem("selectedRestaurant", restaurantName);
    window.location.href = `reservation.html?restaurant=${encodeURIComponent(restaurantName)}`;
};

// ================== Dynamic Restaurant Page ==================
const restaurantContainer = $("#restaurant-container");

if (restaurantContainer) {
    // Injects standard HTML structures based on our cool mock database to prevent hardcoding errors
    restaurantContainer.innerHTML = restaurants.map(restaurant => `
        <article class="restaurant-card">
            <h2>${restaurant.name}</h2>
            <img src="${restaurant.image}" alt="${restaurant.name} image">
            <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
            <p><strong>Signature Dishes:</strong></p>
            <ul>
                ${restaurant.dishes.map(dish => `<li>${dish.name} - $${dish.price}</li>`).join("")}
            </ul>
            <p><strong>Deposit:</strong> $${restaurant.deposit}</p>
            <p><strong>Price Range:</strong> ${restaurant.priceRange} per person</p>
            <p>${restaurant.description}</p>
            <button type="button" class="select-btn" data-name="${restaurant.name}">Book this</button>
        </article>
    `).join("");
}

// ================== Dynamic Form Options ==================
// Populate all select menus using the database
const registerDietSelect = $(".register-form #diet");
const recommendDietSelect = $(".recommendation-form #diet");
const recommendPurposeSelect = $(".recommendation-form #purpose");

// Register diets
if (registerDietSelect) {
    registerDietSelect.innerHTML = `<option value="">Select Option</option>`;

    uniqueDiets.forEach(diet => {
        registerDietSelect.appendChild(
            new Option(formatOptionLabel(diet), diet)
        );
    });
}

// Recommendation diets
if (recommendDietSelect) {
    recommendDietSelect.innerHTML = `<option value="">Select Option</option>`;

    uniqueDiets.forEach(diet => {
        recommendDietSelect.appendChild(
            new Option(formatOptionLabel(diet), diet)
        );
    });
}

// Recommendation purposes
if (recommendPurposeSelect) {
    recommendPurposeSelect.innerHTML = `<option value="">Select Option</option>`;

    uniquePurposes.forEach(purpose => {
        recommendPurposeSelect.appendChild(
            new Option(formatOptionLabel(purpose), purpose)
        );
    });
}

// ================== Dynamic Recommendation Page ==================
const recommendationForm = $(".recommendation-form form");
const resultsContainer = $("#results");

if (recommendationForm && resultsContainer) {
    
    // Ensure UI consistency whether showing random picks or search results
    const renderRecommendations = (restaurantList, headingHtml = "", showReasons = false) => {
        if (restaurantList.length > 0) {
            let html = headingHtml;

            html += restaurantList.map(restaurant => `
                <div class="recommendation-card">
                    <h3>${restaurant.name}</h3>
                    <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
                    <p><strong>Diet:</strong> ${formatOptionLabel(restaurant.diet)}</p>
                    <p><strong>Purpose:</strong> ${formatOptionLabel(restaurant.purpose)}</p>
                    <p><strong>Price Range:</strong> ${restaurant.priceRange}</p>
                    ${
                        showReasons && restaurant.matches
                        ? `<p><strong>Matched:</strong> ${restaurant.matches.join(", ")}</p>`
                        : ""
                    }
                    <button type="button" class="select-btn" data-name="${restaurant.name}">Select</button>
                </div>
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
    // Then provide 3 random picks for suggestions
    const randomRestaurants = [...restaurants]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
    renderRecommendations(randomRestaurants,
        `<div class="results-heading"><h3>Today's Random Picks:</h3></div>`
    );

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
            // Extract the numbers from the "$20 - $45" string using regex
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

    on(resultsContainer, "click", (event) => {
        if (event.target.classList.contains("select-btn")) {
            event.preventDefault();
            redirectWithRestaurant(event.target.dataset.name);
        }
    });
}

// ================== Global Select Buttons ==================
// Uses event delegation on the document to catch clicks on any '.select-btn', 
// ensuring dynamically injected buttons still function properly
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("select-btn") && !event.target.closest("#results")) {
        event.preventDefault();
        redirectWithRestaurant(event.target.dataset.name);
    }
});

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

    // Enforce a minimum booking window (2 hours from now) to prevent immediate or past bookings
    const now = new Date();
    now.setHours(now.getHours() + 2);
    const adjustedDate = now.toISOString().split("T")[0];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    $("#date").value = adjustedDate;
    $("#date").min = adjustedDate;
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

// ================== Bill Calculator ==================
const restaurantSelect = $("#calc-restaurant");
const totalInput = $("#calc-total");
const dishList = $("#dish-list");

if (restaurantSelect && totalInput && dishList) {
    restaurantSelect.innerHTML = `<option value="">Select Restaurant</option>`;
    restaurants.forEach(r => restaurantSelect.appendChild(new Option(r.name, r.name)));

    const updateTotal = () => {
        let total = 0;
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
            updateTotal();
            return;
        }

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

    on(dishList, "click", (event) => {
        const input = event.target.parentElement?.querySelector(".dish-quantity");
        if (!input) return;

        let value = Number(input.value);

        if (event.target.classList.contains("plus-btn")) {
            value++;
        }

        if (event.target.classList.contains("minus-btn")) {
            value = Math.max(0, value - 1);
        }

        input.value = value;
        updateTotal();
    });

    on(dishList, "input", (event) => {
        if (event.target.classList.contains("dish-quantity")) {
            updateTotal();
        }
    });
}
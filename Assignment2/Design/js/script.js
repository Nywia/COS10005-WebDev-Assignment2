// ================== RegEx Patterns ==================
const usernamePattern = /^[A-Za-z0-9_]{5,}$/;
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const phonePattern = /^[0-9]{10,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/;
const cardPattern = /^([0-9]{15}|[0-9]{16})$/;

// ================== Helpers ==================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const on = (element, event, handler) => {
    if (element) element.addEventListener(event, handler);
};

const displayErrors = (errors, event) => {
    if (errors.length === 0) return;
    event.preventDefault();
    alert(errors.join("\n"));
};

const redirectWithRestaurant = (restaurantName) => {
    localStorage.setItem("selectedRestaurant", restaurantName);
    window.location.href = `reservations.html?restaurant=${encodeURIComponent(restaurantName)}`;
};

// ================== Navigation ==================
const navToggleBtn = $("#navToggle");
const mainNav = $("#mainNav");

on(navToggleBtn, "click", () => mainNav.classList.toggle("open"));

// ================== Register Form ==================
const registerForm = $(".register-form form");

on(registerForm, "submit", (event) => {
    const errors = [];
    const username = $("#username").value;
    const email = $("#email").value;
    const phone = $("#phone").value;
    const password = $("#password").value;
    const confirmPassword = $("#confirm-password").value;
    const gender = $('input[name="gender"]:checked');

    if (!usernamePattern.test(username)) errors.push("Invalid username.");
    if (!emailPattern.test(email)) errors.push("Invalid email.");
    if (!phonePattern.test(phone)) errors.push("Invalid phone.");
    if (!passwordPattern.test(password)) errors.push("Invalid password.");
    if (password !== confirmPassword) errors.push("Passwords do not match.");
    if (!gender) errors.push("Select gender.");

    displayErrors(errors, event);
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

    const depositRules = {
        "Ristorante Uno": "$10.00",
        "Restaurant Deux": "$25.00",
        "Restaurante Tres": "$15.00",
        "Restaurant Vier": "$10.00",
        "Restaurante Cinco": "$0.00",
        "Ristorante Sei": "$30.00"
    };

    const updateDepositValue = () => {
        const selected = restaurantField.value;
        depositField.value = depositRules[selected] || "$0.00";
    };

    on(restaurantField, "change", updateDepositValue);

    // Auto-select restaurant
    const params = new URLSearchParams(window.location.search);
    const selectedRestaurant = 
        params.get("restaurant") || localStorage.getItem("selectedRestaurant");
    
    if (restaurantField && selectedRestaurant) {
        restaurantField.value = selectedRestaurant;
        updateDepositValue();
    }

    // Payment method toggles
    $$('input[name="payment"]').forEach(option => {
        on(option, "change", (e) => {
            voucherSection.style.display = e.target.value === "voucher" ? "block" : "none";
            cardSection.style.display = e.target.value === "online" ? "block" : "none";
        });
    });

    // Email syncing helper
    const syncBillingEmail = () => {
        billingEmail.value = sameEmail.checked ? emailInput.value : "";
        billingEmail.disabled = sameEmail.checked;
    };

    on(sameEmail, "change", syncBillingEmail);
    on(emailInput, "input", () => { if (sameEmail.checked) syncBillingEmail(); });

    on(reservationForm, "submit", (event) => {
        const errors = [];
        const fullname = $("#fname").value.trim();
        const email = emailInput.value;
        const phone = $("#phone").value;
        const date = $("#date").value;
        const people = $("#people").value;
        const payment = $('input[name="payment"]:checked');
        const card = $("#card").value;
        const today = new Date().toISOString().split("T")[0];

        if (fullname === "") errors.push("Full name required.");
        if (!emailPattern.test(email)) errors.push("Invalid email.");
        if (!phonePattern.test(phone)) errors.push("Invalid phone.");
        if (date < today) errors.push("Invalid date.");
        if (people <= 0) errors.push("People must be above 0.");
        if (!payment) errors.push("Select payment method.");
        if (payment?.value === "online" && !cardPattern.test(card)) errors.push("Invalid card.");

        displayErrors(errors, event);
    });
}

// ================== Recommendation Page ==================
const recommendationForm = $(".recommendation-form form");
const resultsContainer = $("#results");

if (recommendationForm && resultsContainer) {
    const restaurants = [
        { name: "Ristorante Uno", cuisine: "Italian", price: "$20 - $45", diet: "none", budget: "medium", purpose: "family" },
        { name: "Restaurant Deux", cuisine: "French", price: "$40 - $90", diet: "none", budget: "high", purpose: "date" },
        { name: "Restaurante Tres", cuisine: "Spanish", price: "$25 - $60", diet: "none", budget: "medium", purpose: "family" },
        { name: "Restaurant Vier", cuisine: "German", price: "$20 - $50", diet: "vegan", budget: "medium", purpose: "family" },
        { name: "Restaurante Cinco", cuisine: "Mexican", price: "$15 - $35", diet: "halal", budget: "low", purpose: "business" },
        { name: "Ristorante Sei", cuisine: "Italian Seafood", price: "$50 - $110", diet: "none", budget: "high", purpose: "business" }
    ];

    // Read elements embedded from static structure if necessary
    const staticCards = $$(".recommendation-card");

    on(recommendationForm, "submit", (event) => {
        event.preventDefault();

        const diet = $("#diet").value;
        const budget = $("#budget").value;
        const purpose = $("#purpose").value;

        const matches = restaurants.filter(restaurant =>
            (!diet || restaurant.diet === diet) &&
            (!budget || restaurant.budget === budget) &&
            (!purpose || restaurant.purpose === purpose)
        );

        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(restaurant => `
                <div class="recommendation-card">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.cuisine}</p>
                    <p>Price Range: ${restaurant.price}</p>
                    <button class="select-btn" data-name="${restaurant.name}">Select</button>
                </div>
            `).join("");
        } else {
            resultsContainer.innerHTML = `
                <div class="recommendation-card">
                    <h3>No Match Found</h3>
                </div>`;
        }
    });

    // Event Delegation for dynamically created buttons 
    on(resultsContainer, "click", (event) => {
        if (event.target.classList.contains("select-btn")) {
            event.preventDefault();
            redirectWithRestaurant(event.target.dataset.name);
        }
    });
}

// ================== Global Recommendation Buttons ==================
$$(".select-btn:not(#results .select-btn)").forEach(btn => {
    on(btn, "click", (event) => {
        event.preventDefault();
        redirectWithRestaurant(event.currentTarget.dataset.name);
    });
});

// ================== Bill Calculator ==================
const restaurantSelect = $("#calc-restaurant");
const dishSelect = $("#calc-dish");
const peopleInput = $("#calc-people");
const totalInput = $("#calc-total");

if (restaurantSelect && dishSelect && peopleInput && totalInput) {
    const restaurantData = {
        "Ristorante Uno": [{ dish: "Margherita Pizza", price: 18 }, { dish: "Spaghetti Carbonara", price: 22 }],
        "Restaurant Deux": [{ dish: "Steak Frites", price: 35 }, { dish: "Crème Brûlée", price: 12 }],
        "Restaurante Tres": [{ dish: "Seafood Paella", price: 28 }, { dish: "Garlic Prawns Tapas", price: 14 }],
        "Restaurant Vier": [{ dish: "Chicken Schnitzel", price: 24 }, { dish: "Apple Strudel", price: 10 }],
        "Restaurante Cinco": [{ dish: "Beef Tacos Trio", price: 16 }, { dish: "Chicken Enchiladas", price: 19 }],
        "Ristorante Sei": [{ dish: "Lobster Ravioli", price: 32 }, { dish: "Grilled Seafood Platter", price: 45 }]
    };

    // Load restaurants
    for (const restaurant in restaurantData) {
        restaurantSelect.appendChild(new Option(restaurant, restaurant));
    }

    // Update total helper
    const updateTotal = () => {
        const price = Number(dishSelect.value) || 0;
        const people = Number(peopleInput.value) || 0;
        totalInput.value = `$${price * people}`;
    };

    // Load dishes on restaurant change
    on(restaurantSelect, "change", (e) => {
        dishSelect.innerHTML = '<option value="">Select Dish</option>';
        const dishes = restaurantData[e.target.value] || [];

        dishes.forEach(item => {
            dishSelect.appendChild(new Option(`${item.dish} - $${item.price}`, item.price));
        });
        updateTotal();
    });

    on(dishSelect, "change", updateTotal);
    on(peopleInput, "input", updateTotal);
}
// ================== RegEx Patterns ==================
const usernamePattern = /^[A-Za-z0-9_]{5,}$/;
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const phonePattern = /^[0-9]{8,15}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/;

const cardPattern = /^([0-9]{15}|[0-9]{16})$/;

// ================== Navigation ==================
const button = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (button) {
    button.addEventListener("click", () => nav.classList.toggle("open"));
}

// ================== Register Form ==================
const registerForm = document.querySelector(".register-form form");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        let errors = [];

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const gender = document.querySelector('input[name="gender"]:checked');

        if (!usernamePattern.test(username)) errors.push("Invalid username.");
        if (!emailPattern.test(email)) errors.push("Invalid email.");
        if (!phonePattern.test(phone)) errors.push("Invalid phone.");
        if (!passwordPattern.test(password)) errors.push("Invalid password.");
        if (password !== confirmPassword) errors.push("Passwords do not match.");
        if (!gender) errors.push("Select gender.");

        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join("\n"));
        }
    });
}

// ================== Reservation Form ==================
const reservationForm = document.querySelector(".reservation-form form");

if (reservationForm) {

    const voucherSection = document.getElementById("voucher-section");
    const cardSection = document.getElementById("card-section");

    const emailInput = document.getElementById("email");
    const billingEmail = document.getElementById("billing-email");
    const sameEmail = document.getElementById("same-email");

    voucherSection.style.display = "none";
    cardSection.style.display = "none";

    // Auto select restaurant
    const restaurantField = document.getElementById("restaurant");

    const params = new URLSearchParams(
        window.location.search
    );

    const selectedRestaurant =
        params.get("restaurant") ||
        localStorage.getItem("selectedRestaurant");

    if (restaurantField && selectedRestaurant) {
        restaurantField.value = selectedRestaurant;
    }

    document.querySelectorAll('input[name="payment"]').forEach(option => {
        option.addEventListener("change", function () {
            voucherSection.style.display =
                this.value === "voucher" ? "block" : "none";

            cardSection.style.display =
                this.value === "online" ? "block" : "none";
        });
    });

    // Same Email Checkbox
    sameEmail.addEventListener("change", function () {
        if (this.checked) {
            billingEmail.value = emailInput.value;
            billingEmail.disabled = true;
        } else {
            billingEmail.disabled = false;
            billingEmail.value = "";
        }
    });

    // Update billing email live
    emailInput.addEventListener("input", function () {
        if (sameEmail.checked) {
            billingEmail.value = emailInput.value;
        }
    });

    reservationForm.addEventListener("submit", function (event) {
        let errors = [];

        const fullname = document.getElementById("fname").value.trim();
        const email = emailInput.value;
        const phone = document.getElementById("phone").value;

        const date = document.getElementById("date").value;
        const people = document.getElementById("people").value;

        const payment = document.querySelector('input[name="payment"]:checked');
        const card = document.getElementById("card").value;

        const today = new Date().toISOString().split("T")[0];

        if (fullname === "") errors.push("Full name required.");
        if (!emailPattern.test(email)) errors.push("Invalid email.");
        if (!phonePattern.test(phone)) errors.push("Invalid phone.");
        if (date < today) errors.push("Invalid date.");
        if (people <= 0) errors.push("People must be above 0.");
        if (!payment) errors.push("Select payment method.");

        if (payment && payment.value === "online") {
            if (!cardPattern.test(card)) errors.push("Invalid card.");
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join("\n"));
        }
    });
}

// ================== Recommendation Page ==================
const recommendationForm = document.querySelector(".recommendation-form form");
const resultsContainer = document.getElementById("results");

if (recommendationForm && resultsContainer) {

    const restaurants = [

        {
            name: "Restaurant 1",
            cuisine: "Cuisine Type",
            price: "$00 - $00",
            diet: "vegan",
            budget: "low",
            purpose: "family"
        },

        {
            name: "Restaurant 2",
            cuisine: "Cuisine Type",
            price: "$00 - $00",
            diet: "halal",
            budget: "medium",
            purpose: "business"
        },

        {
            name: "Restaurant 3",
            cuisine: "Cuisine Type",
            price: "$00 - $00",
            diet: "none",
            budget: "high",
            purpose: "date"
        }
    ];

    recommendationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const diet = document.getElementById("diet").value;
        const budget = document.getElementById("budget").value;
        const purpose = document.getElementById("purpose").value;

        resultsContainer.innerHTML = "";

        const matches = restaurants.filter(restaurant =>

            (diet === "" || restaurant.diet === diet) &&
            (budget === "" || restaurant.budget === budget) &&
            (purpose === "" || restaurant.purpose === purpose)
        );

        if (matches.length > 0) {

            matches.forEach(restaurant => {

                resultsContainer.innerHTML += `

                <div class="recommendation-card">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.cuisine}</p>
                    <p>Price Range: ${restaurant.price}</p>

                    <button class="select-btn"
                        data-name="${restaurant.name}">
                        Select
                    </button>
                </div>
                `;
            });

            // ================== Recommendation Buttons ==================
            document.querySelectorAll(".select-btn").forEach(button => {

                button.addEventListener("click", function (event) {

                    event.preventDefault();

                    const restaurant = encodeURIComponent(
                        this.dataset.name
                    );

                    localStorage.setItem(
                        "selectedRestaurant",
                        this.dataset.name
                    );

                    window.location.href =
                        "reservations.html?restaurant=" + restaurant;
                });
            });
        }

        else {

            resultsContainer.innerHTML = `

            <div class="recommendation-card">
                <h3>No Match Found</h3>
            </div>
            `;
        }
    });
}

// ================== Recommendation Buttons ==================
document.querySelectorAll(".select-btn").forEach(button => {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const restaurant = encodeURIComponent(
            this.dataset.name
        );

        localStorage.setItem(
            "selectedRestaurant",
            this.dataset.name
        );

        window.location.href =
            "reservations.html?restaurant=" + restaurant;
    });
});


// ================== Bill Calculator ==================
const restaurantSelect = document.getElementById("calc-restaurant");
const dishSelect = document.getElementById("calc-dish");

const peopleInput = document.getElementById("calc-people");
const totalInput = document.getElementById("calc-total");

if (restaurantSelect && dishSelect && peopleInput && totalInput) {

    // Pull restaurant data from restaurants page
    const restaurantData = {

        "Restaurant 1": [
            { dish: "Food 1", price: 20 },
            { dish: "Food 2", price: 30 }
        ],

        "Restaurant 2": [
            { dish: "Food 1", price: 25 },
            { dish: "Food 2", price: 35 }
        ],

        "Restaurant 3": [
            { dish: "Food 1", price: 40 },
            { dish: "Food 2", price: 50 }
        ]
    };

    // Load restaurants
    for (const restaurant in restaurantData) {

        const option = document.createElement("option");

        option.value = restaurant;
        option.textContent = restaurant;

        restaurantSelect.appendChild(option);
    }

    // Load dishes
    restaurantSelect.addEventListener("change", function () {

        dishSelect.innerHTML = '<option value="">Select Dish</option>';

        const dishes = restaurantData[this.value];

        dishes.forEach(item => {

            const option = document.createElement("option");

            option.value = item.price;
            option.textContent =
                item.dish + " - $" + item.price;

            dishSelect.appendChild(option);
        });

        updateTotal();
    });

    // Update total
    function updateTotal() {

        const price = Number(dishSelect.value) || 0;
        const people = Number(peopleInput.value) || 0;

        totalInput.value = "$" + (price * people);
    }

    dishSelect.addEventListener("change", updateTotal);
    peopleInput.addEventListener("input", updateTotal);
}

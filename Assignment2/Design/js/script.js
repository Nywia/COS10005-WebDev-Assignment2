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
        }

        else {
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
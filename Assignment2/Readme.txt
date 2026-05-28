README.txt
Restaurant Discovery & Reservation Platform

Author: Ruiyi Guo
Assignment: Web Development Assignment 2

----------------------------------------
WEBSITE STRUCTURE
----------------------------------------
index.html
- Home page introducing the platform

restaurants.html
- Restaurant listing page

recommendations.html
- User preference form and recommendation display

register.html
- User registration form with validation

reservations.html
- Reservation form with deposit, payment options, and validation

Design/css/style.css
- External stylesheet for layout, styling, and responsive design

Design/js/script.js
- Handles navigation toggle, form validation, and dynamic form behaviour

----------------------------------------
JAVASCRIPT VALIDATION LOGIC (PLAIN ENGLISH)
----------------------------------------
Registration Form:
- All fields must be completed
- Username must be at least 5 characters and contain only letters, numbers, or underscores
- Email must follow a valid email format
- Phone number must be 8–15 digits only
- Password must be at least 10 characters and include uppercase, lowercase, numbers, and special characters
- Confirm password must match password
- Gender must be selected
- If any validation fails, form submission is blocked and error messages are displayed

Reservation Form:
- Required fields must not be empty
- Email must be in valid format
- Phone number must contain at least 10 digits
- Reservation date must not be in the past
- Number of people must be greater than 0
- Payment method must be selected
- If voucher is selected:
  - Voucher code field is shown (no validation required)
  - Credit card field is hidden
- If online payment is selected:
  - Credit card number is required
  - Must be 15 or 16 digits (format check only)
- Billing email can be auto-filled from email field using checkbox
- Form submission is blocked until all errors are resolved
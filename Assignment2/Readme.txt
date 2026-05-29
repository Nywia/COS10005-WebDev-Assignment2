Author: Ruiyi Guo
Assignment: Web Development Assignment 2

----------------------------------------
GITHUB REPOSITORY
----------------------------------------
Link: 

----------------------------------------
WEBSITE STRUCTURE
----------------------------------------
index.html
- Home page introducing the platform, core values, and quick booking links.

restaurants.html
- Dynamic restaurant listing page that generates cards and menus from a JavaScript mock database.

recommend.html
- User preference form that filters and suggests restaurants based on dietary needs, purpose, and minimum/maximum budget. Features a fallback scoring system to suggest partial matches if no exact match is found.

register.html
- User registration form with strict input validation and dynamic dropdowns.

reservation.html
- Reservation form featuring a dynamic deposit calculator, conditional payment options, and advanced date/time validation.

bill.html
- Interactive bill calculator allowing users to select a restaurant, adjust dish quantities with custom +/- buttons, and see a real-time estimated total before passing their choice to the reservation page.

Design/css/style.css
- External stylesheet for layout, typography, modern 2x2 dashboard grids, custom form inputs, and responsive media queries (mobile, tablet, desktop).

Design/js/script.js
- Handles the mock database, dynamic HTML generation, navigation toggle, bill calculation, cross-page data passing (via localStorage and URL parameters), and robust form validation.

----------------------------------------
JAVASCRIPT LOGIC & ARCHITECTURE (PLAIN ENGLISH)
----------------------------------------
The JavaScript (script.js) is organized into distinct functional regions to handle data, user interface interactions, and form validation across multiple pages.

1. Global Helpers & Configuration:
- Custom selection functions (`$`, `$$`) and event listener wrappers are used to keep the code clean and prevent errors if a script runs on a page where an element doesn't exist.
- Regex patterns are stored globally to ensure consistent formatting rules (e.g., emails, passwords, credit cards) across all forms.
- Redirect functions use `localStorage` and URL parameters to "remember" a user's selected restaurant and carry that data over when navigating between the Recommendations, Bill Calculator, and Reservation pages.
- A dynamic error handler injects and scrolls to a styled error box whenever form validation fails, replacing ugly alert popups.

2. Data Processing (Mock Database):
- A central `restaurants` array acts as a mock database backend for the entire website. It stores all information including names, images, menus, pricing, and specific tags (cuisine, diet, budget, purpose).
- Dropdown options (like Dietary Preferences) are dynamically extracted directly from this array using Sets to ensure the form options always perfectly match the available data without needing manual HTML updates.

3. Global UI & Navigation:
- Handles the mobile hamburger menu toggle, smoothly expanding and collapsing the navigation.
- Uses "Event Delegation" attached to the document body to listen for clicks on any "Book this" or "Calculate Bill" buttons. This ensures that even dynamically generated buttons (which didn't exist when the page first loaded) still function correctly.

4. Dynamic Page Generation:
- Restaurants Page: Loops through the mock database array and dynamically injects HTML layout blocks into the page, populating them with the correct images, details, and top two signature dishes.
- Recommendations Page: 
  - On initial load, randomly shuffles the database and displays 3 random picks.
  - On search, it compares the user's inputs (diet, budget, purpose) against the database. 
  - If a perfect match is found, it displays those cards. 
  - Fallback Logic: If no perfect match exists, it uses a fuzzy-scoring system to rank restaurants based on how many criteria they met, ensuring the user always gets a helpful suggestion rather than a blank page.

5. Interactive Bill Calculator:
- Listens for the user to select a restaurant from the dropdown and dynamically renders that specific restaurant's menu items as interactive cards.
- Custom `+` and `-` buttons are handled via event delegation. When clicked, they update the hidden number input, prevent the quantity from dropping below zero, and immediately trigger a recalculation.
- The `updateTotal` function loops through all dish inputs on the screen, multiplies the quantities by their respective prices, and updates the read-only total display.

6. Form Validation & Handling (Register & Reservation):
- Form submissions are intercepted using `event.preventDefault()`. The script checks all fields against strict rules before allowing the form to process.
- Registration validation ensures passwords meet complexity requirements, emails are formatted correctly, and passwords match.
- Reservation validation includes dynamic features:
  - Automatically updates the required deposit amount when a restaurant is selected.
  - Enforces a minimum booking window by locking out times in the past.
  - Dynamically shows/hides the Credit Card or Voucher input fields based on the chosen radio button, making the hidden fields no longer required for submission.
  - Allows users to check a box to automatically copy their contact email into the billing email field, locking the field to prevent mismatches.

----------------------------------------
KNOWN ISSUES OR LIMITATIONS
----------------------------------------
- No Backend Database: All restaurant, menu, and pricing data is stored locally in a mock JavaScript array. No actual user accounts or reservations are saved permanently to a server.
- LocalStorage Dependency: Passing selected restaurants between pages (e.g., from Recommendations to the Bill Calculator or Reservations) relies on `localStorage` and URL parameters. This might not function perfectly if a user has highly restrictive browser privacy settings blocking local storage. (This is why there is URL encoding)

----------------------------------------
REFERENCES
----------------------------------------

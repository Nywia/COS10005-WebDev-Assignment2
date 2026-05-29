Author: Ruiyi Guo
Assignment: Web Development Assignment 2

----------------------------------------
GITHUB REPOSITORY
----------------------------------------
Link: https://github.com/Nywia/COS10005-WebDev-Assignment2

----------------------------------------
WEBSITE STRUCTURE
----------------------------------------

index.html
- Home page introducing the platform, platform features, hero slideshow, and quick booking links.

restaurants.html
- Dynamic restaurant listing page that generates restaurant cards, menu previews, pricing, and descriptions directly from the JavaScript mock database.

recommend.html
- User preference recommendation system allowing filtering by dietary requirements, dining purpose, and minimum/maximum budget.
- Includes fallback fuzzy-scoring logic to recommend partial matches if no exact results exist.

register.html
- User registration form featuring strict regex validation, dynamic dietary dropdown generation, and password complexity enforcement.

reservation.html
- Reservation booking form with:
  - Dynamic restaurant deposit calculation
  - Conditional payment methods
  - Voucher / credit card validation
  - Auto-filled billing email synchronization
  - Date and time restrictions preventing past reservations

bill.html
- Interactive bill estimator allowing users to:
  - Select a restaurant
  - Dynamically render dishes
  - Adjust quantities with custom +/- controls
  - Calculate totals live in real time
  - Transfer selected restaurant into the reservation system

Design/css/style.css
- Central stylesheet handling:
  - Responsive layouts
  - Mobile navigation
  - Dashboard-style grids
  - Custom dropdown styling
  - Card systems
  - Form styling
  - Animations and transitions
  - Hero slideshow visuals
  - Tablet/mobile media queries

Design/js/script.js
- Main JavaScript logic controlling:
  - Mock database processing
  - Dynamic content generation
  - Recommendation filtering
  - Bill calculation
  - Validation systems
  - Cross-page navigation state
  - Hero slideshow
  - Custom dropdown menus
  - Event delegation
  - Dynamic form behavior

----------------------------------------
JAVASCRIPT LOGIC & ARCHITECTURE (PLAIN ENGLISH)
----------------------------------------

The JavaScript (script.js) is divided into modular functional regions to keep the things organized, reusable, and easier to maintain across multiple pages.

1. Helpers & Global Configuration:
- Global regex patterns are centralized for validating usernames, emails, passwords, vouchers, phone numbers, and credit cards consistently across the application.
- Utility helper functions (`$`, `$$`, `on`) simplify DOM selection and event handling while preventing null reference errors on pages where elements may not exist.
- Shared utility helpers:
  - `createEl()` dynamically creates reusable HTML elements.
  - `toggleDisplay()` handles conditional visibility.
  - `parsePriceRange()` extracts numeric values from restaurant pricing strings.
  - `getCleanImageName()` dynamically maps restaurant names to image filenames.
- Redirect helpers use both `localStorage` and encoded URL parameters to keep selected restaurants between pages while remaining compatible with local `file://` testing environments.

2. Dynamic Error Handling:
- Instead of default browser alerts, validation errors are injected into a styled `.error-box`.
- Errors automatically scroll into view to improve user experience and visibility.
- Validation logic is centralized into reusable `displayErrors()` functionality.

3. Mock Database System:
- A large centralized `restaurants` array acts as the application's mock backend database.
- Each restaurant stores:
  - Cuisine
  - Dishes
  - Pricing
  - Deposits
  - Dietary categories
  - Budget tags
  - Dining purposes
  - Descriptions
- This structure eliminates repeated hardcoded HTML and ensures all pages stay synchronized automatically.

4. Dynamic Dropdown Generation:
- Dietary and purpose dropdowns are automatically extracted using JavaScript `Set()` operations.
- Dropdown values always remain synchronized with available restaurant data.
- Labels are automatically formatted for cleaner UI presentation.

5. Navigation & Global UI:
- Mobile hamburger navigation toggles dynamically using class switching.
- Event delegation is attached globally to handle:
  - "Book this" buttons
  - "Calculate Bill" buttons
- This ensures dynamically generated content remains interactive even after page rendering.

6. Custom Dropdown System:
- Native HTML `<select>` menus are converted into fully custom-styled dropdown components.
- Features include:
  - Dynamic option syncing
  - Open/close toggling
  - Outside-click closing behavior
  - Selected state highlighting
- Native select values are still preserved underneath for accessibility and compatibility.

7. Dynamic Homepage Features:
- Hero slideshow:
  - Randomly selects restaurants from the database
  - Cycles images every 4 seconds
  - Uses active class swapping for transitions
- Quick booking section:
  - Randomly generates featured restaurant cards
  - Dynamically injects descriptions and booking buttons

8. Dynamic Restaurant Page:
- Restaurant cards are generated entirely from database content.
- Each card displays:
  - Cuisine
  - Dietary tags
  - Price ranges
  - Deposits
  - Signature dishes
  - Descriptions
- Buttons dynamically pass restaurant selections to other pages.

9. Recommendation Engine:
- Initial page load shows randomized restaurant suggestions.
- Exact filtering compares:
  - Dietary requirements
  - Purpose
  - Budget ranges
- If no exact match exists:
  - A fallback fuzzy-scoring system ranks restaurants based on matched criteria.
  - Matching reasons are displayed to the user.
- This prevents empty search results and improves usability.

10. Reservation Form Logic:
- Restaurants dynamically populate the reservation dropdown.
- Deposit amounts automatically update based on restaurant selection.
- Date logic:
  - Prevents past bookings
  - Automatically sets minimum selectable dates
- Payment method logic:
  - Dynamically toggles voucher or card fields
  - Prevents hidden fields from interfering with validation
- Billing email synchronization:
  - Allows automatic mirroring from contact email
  - Locks billing email field when synchronized

11. Registration Validation:
- Strict regex validation enforces:
  - Minimum username length
  - Valid email formatting
  - Password complexity requirements
  - Phone number rules
- Password confirmation matching is enforced before submission.

12. Interactive Bill Calculator:
- Restaurant selection dynamically renders dish cards.
- Quantity adjustment uses:
  - Custom +/- buttons
  - Manual input support
- Real-time total calculation:
  - Iterates through all dishes
  - Multiplies quantities by prices
  - Updates total instantly
- Prevents negative quantities.
- Selected restaurants can be transferred directly into the reservation workflow.

13. Cross-Page State Management:
- `localStorage` and URL query parameters work together to persist user selections between pages.
- This allows seamless transitions from:
  - Recommendations → Reservation
  - Restaurants → Bill Calculator
  - Bill Calculator → Reservation

----------------------------------------
DESIGN PHILOSOPHY & UI APPROACH
----------------------------------------

The interface design follows a modern card-based dashboard layout inspired by:
- Google's Material Design principles
- Modern food delivery and booking platforms
- Responsive mobile-first design practices

Key design goals included:
- Clean visual hierarchy
- Readable spacing and typography
- Large interactive touch targets
- Consistent card layouts
- Reduced user friction during booking flows
- Immediate visual feedback for interactions and validation

The application prioritizes:
- Dynamic rendering over static repetition
- Reusable utility functions
- Modular JavaScript architecture
- Scalability for future backend integration

----------------------------------------
KNOWN ISSUES OR LIMITATIONS
----------------------------------------

- No Backend Database:
  - All restaurant, menu, and pricing data exists only within the JavaScript mock database.
  - User accounts and reservations are not permanently stored.

- LocalStorage Dependency:
  - Cross-page restaurant persistence relies on `localStorage` and URL parameters.
  - Extremely restrictive privacy/browser settings may partially affect functionality.

- Image Dependency:
  - Dynamic image loading depends on strict filename matching conventions.
  - Fallback `.jpg → .jpeg` logic is implemented to reduce missing asset errors.
  
----------------------------------------
REFERENCES
----------------------------------------

Custom Dropdown Arrow SVG
https://dev.to/snippflow/custom-select-arrow-using-css-2a2g
https://www.w3.org/TR/SVG2/

Google Material Design
https://m3.material.io/

Responsive Web Design Basics
https://web.dev/responsive-web-design-basics/

CSS Flexbox Guide
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

CSS Grid Guide
https://css-tricks.com/snippets/css/complete-guide-grid/

Google Fonts
https://fonts.google.com/

General UI/UX Inspiration
https://dribbble.com/

----------------------------------------
IMAGE SOURCES
----------------------------------------

==================================== Restaurant ====================================
[RistoranteUno.jpg](https://unsplash.com/photos/man-riding-on-boat-beside-restaurant-Uu5aXBI1oLk)
[RestaurantDeux.jpg](https://unsplash.com/photos/people-sitting-on-chair-near-building-during-daytime-bOICdD-Gulk)
[RestauranteTres.jpg](https://unsplash.com/photos/a-table-and-chairs-under-a-green-tent-1V-6QTortoU)
[RestaurantVier.jpeg](https://www.pexels.com/photo/charming-outdoor-cafe-in-meissen-germany-29415096/)
[RestauranteCinco.jpg](https://unsplash.com/photos/a-room-filled-with-lots-of-colorful-lights-and-decorations-ijDQXnFWECw)
[RistoranteSei.jpeg](https://www.pexels.com/photo/outdoor-dining-at-ristorante-pedrocchi-in-venice-36514916/)
[IzakayaShichi.jpg](https://unsplash.com/photos/three-bicycles-parked-in-front-of-building-hwLAI5lRhdM)
[EstiatorioOkto.jpg](https://unsplash.com/photos/goal-bar-store-K5upJ7fIqYI)
[CanTingJiu.jpg](https://unsplash.com/photos/a-restaurant-with-tables-and-chairs-5roXmTjPA-s)
[DhabaDas.jpg](https://unsplash.com/photos/a-room-with-tables-and-chairs-7DVAiyyT1NE)
[SikdangSibil.jpeg](https://www.pexels.com/photo/seoul-night-street-scene-with-traditional-signs-34706322/)
[RanAhanSip-Song.jpg](https://unsplash.com/photos/a-wooden-statue-of-a-person-holding-a-bird-bzx_qziexyE)

==================================== Food ====================================
[MargheritaPizza.jpg](https://unsplash.com/photos/pizza-on-chopping-board-MqT0asuoIcU)
[SpaghettiCarbonara.jpg](https://unsplash.com/photos/a-white-plate-topped-with-spaghetti-and-bacon-fDLBn8X_IlU)
[FettuccineAlfredo.jpg](https://unsplash.com/photos/creamy-fettuccine-pasta-with-herbs-and-pine-nuts-5_5tjqjKNAI)
[LasagnaClassica.jpg](https://unsplash.com/photos/a-white-plate-topped-with-lasagna-covered-in-sauce-flEUTTwGlJQ)
[RisottoalFunghi.jpg](https://unsplash.com/photos/a-white-bowl-filled-with-food-on-top-of-a-wooden-table-Gdb1BOuIwbk)
[BruschettaToast.jpg](https://unsplash.com/photos/two-pieces-of-bread-with-tomatoes-and-basil-on-top-DdAEeeV_soU)
[MinestroneSoup.jpg](https://unsplash.com/photos/stainless-steel-spoon-on-white-ceramic-bowl-90Z4qIxWc8Y)
[TiramisuDessert.jpg](https://unsplash.com/photos/a-dessert-dish-with-a-strawberries-on-top-of-it-_SrCiKojoyM)
[SteakFrites.jpg](https://unsplash.com/photos/grilled-meat-on-white-ceramic-plate-pe9dvM1rQkM)
[CoqauVin.jpg](https://unsplash.com/photos/a-bowl-of-food-71gD9JoiPQY)
[EscargotsdeBourgogne.jpeg](https://www.pexels.com/photo/snail-dish-on-a-plate-7474061/)
[FoieGrasTerrine.jpg](https://unsplash.com/photos/foie-gras-with-toast-and-olives-on-a-plate-yBdaWY5tsKI)
[CrèmeBrûlée.jpg](https://unsplash.com/photos/a-bowl-of-pudding-with-a-raspberry-on-top-xQFLBRdch_k)
[SeafoodPaella.jpg](https://unsplash.com/photos/cooked-shrimp-on-black-round-plate-MEW5M1WhMQE)
[GarlicPrawnsTapas.jpg](https://unsplash.com/photos/cooked-food-on-black-ceramic-bowl-HNmcgpzPHag)
[PatatasBravas.jpg](https://unsplash.com/photos/fried-food-with-sauce-vzIgmhbEN9w)
[JamónIbéricoPlatter.jpg](https://unsplash.com/photos/burger-with-tomato-and-lettuce-on-blue-ceramic-plate-MDg4GNYSRBA)
[CalamarialaRomana.jpeg](https://www.pexels.com/photo/sauce-and-fried-calamari-on-plate-27565826/)
[TortillaEspañola.jpg](https://unsplash.com/photos/a-close-up-of-a-piece-of-food-on-a-plate-z4CQtd07u5k)
[CroquetasdeJamón.jpg](https://unsplash.com/photos/a-wooden-cutting-board-topped-with-cheese-and-pastries-bT5A5fi40Hc)
[PimientosdePadrón.jpg](https://unsplash.com/photos/a-brown-bowl-filled-with-green-peppers-on-top-of-a-white-plate-6_n2zVOCyhU)
[ChurrosconChocolate.jpg](https://unsplash.com/photos/white-ceramic-cup-with-saucer-and-fries-on-brown-wooden-table-23dFj4fMPnc)
[ChickenSchnitzel.jpg](https://unsplash.com/photos/a-red-plate-topped-with-meat-patties-and-mashed-potatoes-GPta6bE6Nvw)
[BratwurstPlatter.jpg](https://unsplash.com/photos/a-wooden-tray-topped-with-different-types-of-food-Vcj1KTGq2MQ)
[AppleStrudel.jpg](https://unsplash.com/photos/a-piece-of-food-on-a-cutting-board-0YURPs-TKwk)
[BeefTacosTrio.jpg](https://unsplash.com/photos/close-up-photography-of-food-JiRSy0GfqPA)
[ChickenEnchiladas.jpg](https://unsplash.com/photos/a-table-topped-with-tacos-covered-in-sauce-and-toppings-rHtP-U7bN4I)
[LoadedNachosSharing.jpg](https://unsplash.com/photos/black-ceramic-bowl-with-dish-Y0zbn9lPCEU)
[PorkCarnitasBurrito.jpg](https://unsplash.com/photos/brown-bread-on-white-ceramic-plate-Oya1Kx9311k)
[GuacamoleandChips.jpg](https://unsplash.com/photos/a-bowl-of-guacamole-and-chips-on-a-table-hErE8rUkLiM)
[ChurrosBasket.jpg](https://unsplash.com/photos/a-plate-of-churro-sticks-with-dipping-sauce-WesnbSie4iQ)
[LobsterRavioli.jpg](https://unsplash.com/photos/a-plate-of-pasta-and-a-glass-of-wine-icB_1NkW-ao)
[GrilledSeafoodPlatter.jpg](https://unsplash.com/photos/a-plate-of-lobster-shrimp-scallops-and-green-beans-qft0cj-wdF0)
[CalamariFritti.jpg](https://unsplash.com/photos/a-white-plate-topped-with-fried-food-and-a-dipping-sauce-COtv-D5osKA)
[OystersRockefeller.jpg](https://unsplash.com/photos/sliced-fruit-on-black-ceramic-plate-3PNVc3O7Gb4)
[PanettoneBreadPudding.jpg](https://unsplash.com/photos/a-close-up-of-a-cake-on-a-table-IlbJvIia9aY)
[TonkotsuRamenBowl.jpg](https://unsplash.com/photos/egg-and-vegetable-dish-on-black-ceramic-bowl-5x8dUGe-7Fo)
[SalmonSashimiPlatter.jpg](https://unsplash.com/photos/a-close-up-of-a-bowl-of-food-with-chopsticks-Yw_w8WctF6k)
[ChickenYakitoriSkewers.jpg](https://unsplash.com/photos/a-close-up-of-food-on-a-plate-on-a-table-t8GpZPPJkLk)
[TakoyakiOctopusBalls.jpg](https://unsplash.com/photos/delicious-takoyaki-served-on-a-rectangular-plate-uKdzZgTP398)
[AgedashiTofu.jpg](https://unsplash.com/photos/a-plate-of-food-on-a-wooden-table-nCNf13gc5QA)
[PorkGyozaDumplings.jpg](https://unsplash.com/photos/three-dumplings-are-sitting-on-a-black-plate-vM9R9uu_BKY)
[EdamamewithSeaSalt.jpg](https://unsplash.com/photos/green-beans-on-bowl-ukkQ2PYm0ew)
[VegetableTempura.jpg](https://unsplash.com/photos/a-bowl-of-food-next-to-a-bowl-of-soup-yVKwbc0LKyI)
[TunaTataki.jpg](https://unsplash.com/photos/a-plate-of-food-with-chopsticks-and-a-bowl-of-rice-dOFxWZw_GyQ)
[KaraageChicken.jpg](https://unsplash.com/photos/a-plate-of-food-on-a-table-with-a-glass-of-beer-ydH1nhQks4Q)
[MatchaMochiIceCream.jpg](https://unsplash.com/photos/a-couple-of-glasses-filled-with-food-on-top-of-a-table-eyE2YqMkOU0)
[TraditionalMoussaka.jpeg](https://www.pexels.com/photo/flowers-and-food-in-plate-and-glass-box-19177205/)
[CharcoalGrilledOctopus.jpg](https://unsplash.com/photos/brown-and-white-food-on-blue-ceramic-plate-IZLPicIi-I0)
[GreekSaladwithFeta.jpg](https://unsplash.com/photos/vegetable-salad-on-round-white-ceramic-plate-K4ERT_IYazw)
[SpanakopitaPastry.jpg](https://unsplash.com/photos/two-brown-breads-on-black-surface-IpIq6rQI6oI)
[TzatzikiwithPita.jpg](https://unsplash.com/photos/white-and-blue-floral-ceramic-plate-BVBoWUnIHs4)
[GalaktobourekoDessert.jpg](https://unsplash.com/photos/a-piece-of-cake-sitting-on-top-of-a-white-plate-oqy0C3Fzt7g)
[PekingDuckSharingSet.jpg](https://unsplash.com/photos/delicious-korean-cuisine-with-side-dishes-1U3fudFPghw)
[SteamedXiaoLongBao.jpg](https://unsplash.com/photos/a-wooden-container-filled-with-dumplings-on-top-of-a-table-o8awPHmAzh8)
[SpicyMapoTofu.jpg](https://unsplash.com/photos/food-in-plate-gFll9WKIWPQ)
[KungPaoChicken.jpg](https://unsplash.com/photos/two-dishes-of-asian-food-on-a-table-ijx5tcp2lIg)
[BeefFriedNoodles.jpg](https://unsplash.com/photos/a-white-bowl-filled-with-noodles-and-vegetables-TNnhq2nUR8s)
[HarGowShrimpDumplings.jpeg](https://www.pexels.com/photo/steamed-dim-sum-dumplings-in-bamboo-basket-32393812/)
[SiuMaiPorkDumplings.jpeg](https://www.pexels.com/photo/delicious-dim-sum-dumplings-in-bamboo-steamer-32393806/)
[SpringRollsVeggie.jpg](https://unsplash.com/photos/a-plate-that-has-some-food-on-it-1ugpo9WYPXs)
[GeneralTsoChicken.jpg](https://unsplash.com/photos/a-white-plate-topped-with-lettuce-covered-in-meat-_X5t13XsRyI)
[SweetandSourPork.jpg](https://unsplash.com/photos/cooked-food-on-white-ceramic-plate-8iiaALrjR54)
[WontonSoup.jpg](https://unsplash.com/photos/bowl-of-soup-xqiTvFFee6Y)
[MangoPomeloSago.jpg](https://unsplash.com/photos/a-bowl-of-food-with-a-spoon-in-it-A56ij4gjhX4)
[AromaticButterChicken.jpg](https://unsplash.com/photos/brown-and-green-dish-on-brown-wooden-bowl-sqcH2q7lkvo)
[PaneerTikkaMasala.jpg](https://unsplash.com/photos/a-metal-bowl-filled-with-food-next-to-a-bowl-of-rice-vgTntT8PmIM)
[GarlicNaanBasket.jpg](https://unsplash.com/photos/a-basket-of-pita-bread-with-a-fork-in-it-eNKvr0V43fI)
[SamosaChaat.jpg](https://unsplash.com/photos/a-plate-of-food-next-to-a-cup-of-coffee-Vzvkp94lk_4)
[LambRoganJosh.jpeg](https://www.pexels.com/photo/authentic-rogan-josh-surrounded-by-mixed-spices-30203309/)
[DalMakhani.jpg](https://unsplash.com/photos/a-bowl-of-soup-with-a-spoon-and-lemon-wedges-cqP2NBeXf0g)
[GulabJamunTrio.jpeg](https://www.pexels.com/photo/gulab-jamun-on-white-ceramic-bowl-7449105/)
[WagyuBeefBulgogi.jpeg](https://www.pexels.com/photo/close-up-photo-of-scrumptious-meat-dish-topped-on-rice-5774004/)
[PorkBellyBBQCombo.jpg](https://unsplash.com/photos/sliced-bread-on-black-plate-Lek39g2ZHtI)
[KimchiFriedRice.jpg](https://unsplash.com/photos/sunny-side-up-egg-on-white-ceramic-bowl-1C_RSVhy32Y)
[JapchaeGlassNoodles.jpg](https://unsplash.com/photos/brown-and-white-ceramic-bowl-with-brown-and-white-sticks-LY4xyLYX5Vs)
[SeafoodScallionPancake.jpg](https://unsplash.com/photos/a-plate-of-food-and-a-bottle-of-wine-on-a-table-thwv-cHsXpI)
[TteokbokkiSpicyCakes.jpg](https://unsplash.com/photos/korean-tteokbokki-simmers-in-a-spicy-sauce-Uf2O1CnIpkY)
[SilkenTofuStew.jpg](https://unsplash.com/photos/close-up-of-spicy-korean-stew-with-tofu-and-scallions-1_SenAyTAXg)
[SweetHotteokPancake.jpg](https://unsplash.com/photos/a-person-slicing-a-pizza-Q_lbJP1NBoI)
[ClassicPadThaiBoran.jpeg](https://www.pexels.com/photo/delicious-thai-shrimp-pad-thai-with-fresh-ingredients-31029750/)
[SpicyTomYumGoong.jpg](https://unsplash.com/photos/spicy-seafood-soup-in-a-rustic-pot-with-ingredients-vt_GfNuB3U8)
[GreenPapayaSalad.jpg](https://unsplash.com/photos/a-white-and-blue-bowl-filled-with-pasta-and-vegetables-Wcsks8nkUbc)
[MassamanBeefCurry.jpeg](https://www.pexels.com/photo/beef-stew-on-a-metal-tray-10802919/)
[ChickenSataySkewers.jpg](https://unsplash.com/photos/a-plate-of-food-on-a-table-with-spoons-bVZ7d_LKzus)
[PineappleFriedRice.jpg](https://unsplash.com/photos/brown-and-green-food-in-white-ceramic-bowl-ZU8gGANsw0E)
[VegetableSpringRolls.jpg](https://unsplash.com/photos/a-plate-of-food-on-a-table-next-to-a-glass-of-orange-juice-VeK39ynd3Ac)
[GarlicPepperPrawns.jpg](https://unsplash.com/photos/cooked-shrimps-on-blue-ceramic-plate-4LoGKVmUJsI)
[RedCurrywithDuck.jpg](https://unsplash.com/photos/close-up-of-succulent-roasted-duck-in-rich-sauce-pv-nOwZg2Y8)
[MangoStickyRice.jpg](https://unsplash.com/photos/a-plate-of-food-with-rice-mango-and-sauce-bKrXKkPkhas)



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

==================================== Restaurant Images ====================================
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

==================================== Food Images ====================================
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


==================================== Other Images ====================================
[CustomDropdownArrow]
https://dev.to/snippflow/custom-select-arrow-using-css-2a2g
https://www.w3.org/TR/SVG2/


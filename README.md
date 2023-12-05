# Final Project for Javascript 1

<em>Program Code: info-1272-project</em>

<h2>Description</h2>
<p>This project is intended to create a web page simulating an Online Store with any theme.<br>
Following are listed the requirements that must be fullfiled for this project.</p>

<h3>Functionalities implemented that are beyond Project Requirements:</h3>
 <ul>
    <li>Object-oriented programming concepts applied through the Project</li>
    <li>Singleton Design Pattern applied to Store and ShoppingCart Classes</li>
    <li>Project Documentation following JSDoc concepts</li>
    <li>Shopping Cart and Currency Selection persistence using localStorage</li>
    <li>Website HTML constructed entirely using JavaScript</li>
    <li>Responsive CSS Queries</li>
    <li>Project development using Git with "bite-sized" commits</li>
    <li>Starting HTML code provided was not utilized</li>
</ul>

<h3>Project Requirements</h3> 
0. Project Restriction
<ul>
    <li>Project to be created without use of any Framework or Libraries</li>
</ul>
1. Objects
<ul>
    <li>Store Item Class: <em>./scripts/classes/store-item.js</em></li>
    <li>Shopping Cart Class: <em>./scripts/classes/shopping-cart.js</em></li>
    <li>Review Item Class: <em>./scripts/classes/review.js</em></li>
</ul>
2. Global Variables
<ul>
    <li>(Not required) global varibale for store: <em>./scripts/global.js, ln 36</em></li>
    <li>array for the store items: <em>./scripts/classes/store.js, ln 22</em></li>
    <li>array for the cart items: <em>./scripts/global.js, ln 44</em></li>
</ul>
3. Initialize Function
<ul>
    <li>Display the current Day/Time: <em>./scripts/header.js, ln 60 to 77</em></li>
    <li>Populate the store items array with at least 15 item objects: <em>./scripts/init-alt.js, ln 25 to 452</em></li>
    <li>Call your function that will display the store items (4.): (Section) <em>./scripts/main.js, ln 29</em> -> (Articles)<em>./scripts/classes/store.js, ln 394 || ln 401</em></li>
    <li>Call your function that will display the cart items (5.): (Call) <em>./scripts/header.js, ln 82</em> -> (Method) <em>./scripts/classes/shopping-cart.js, ln 265 to 467</em></li>
</ul>
4. Display Store Items 
<ul>
    <li>Frontpage call "first loading" (All Articles): <em>./scripts/main.js, ln 376</em></li>
    <li>Store Class Method (Single Article-Front): <em>./scripts/classes/store.js, ln 454</em></li>
    <li>StoreItem Class Method (Article-Front): <em>./scripts/classes/store-item.js, ln 201 to 360</em></li>
</ul>
5. Display Cart Items
<ul>
    <li>Shopping Cart Class Method: <em>./scripts/classes/shopping-cart.js, ln 265 to 467</em></li>
</ul>
6. Create Cart Totals
<ul>
    <li>Shopping Cart Class Method: <em>./scripts/classes/shopping-cart.js, ln 389 to 467</em></li>
</ul>
7. Currency Selection
<ul>
    <li>Global Variable for Currency: <em>./scripts/globals.js, ln 40</em></li>
    <li>Frontpage Select: <em>./scripts/header.js, ln 114 to 119</em></li>
    <li>Utility Function for Conversion: <em>./scripts/utility.js, ln 44 to 50</em></li>
</ul>
8. Add to Cart
<ul>
    <li>Home Page and Shopping Cart</li>
    <li>All related methods are in: <em>./scripts/classes/shopping-cart.js</em></li>
</ul>
9. Remove from Cart
<ul>
    <li>Same as 8. Add to Cart</li>
</ul>
10. Review Items
<ul>
    <li>Review area acessible through clicking in a StoreItem review stars or score</li>
    <li>Review Class: <em>./scripts/classes/review.js</em></li>
</ul>
11. Validation
<ul>
    <li>Shopping Cart: <em>./scripts/classes/shopping-cart.js, ln 58 to 259</em></li>
    <li>Shopping Cart (JSON Validation): <em>./scripts/classes/shopping-cart.js, ln 551 to 612</em></li>
    <li>Review Creation: <em>./scripts/classes/store.js, ln 858 to 889</em></li>
</ul>
12. Display Item Details
<ul>
    <li>Frontpage call "first loading" (All Articles): <em>./scripts/main.js, ln 376</em></li>
    <li>Store Class Method (Single Article-Back): <em>./scripts/classes/store.js, ln 475</em></li>
    <li>StoreItem Class Method (Article-Back): <em>./scripts/classes/store-item.js, ln 367 to 513</em></li>
</ul>

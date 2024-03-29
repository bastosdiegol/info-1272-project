//   ___ _     _          _    ___             _            _
//  / __| |___| |__  __ _| |  / __|___ _ _  __| |_ __ _ _ _| |_ ___
// | (_ | / _ \ '_ \/ _` | | | (__/ _ \ ' \(_-<  _/ _` | ' \  _(_-<
//  \___|_\___/_.__/\__,_|_|  \___\___/_||_/__/\__\__,_|_||_\__/__/

// Constant that defines the page context used to reference who called a method
const PAGE_CONTEXT = Object.freeze({
  HOME: 0,
  SHOPPING_CART: 1,
  REVIEW: 2,
});

// Constant that defines the type of arithmetic operation
// that is going to be applied on a shopping cart item quantity
const CART_QUANTITY_OPERATION = Object.freeze({
  INCREMENT: 0,
  DECREMENT: 1,
  CHANGE: 2,
});

// Constant that defines the type of a notification
// that is going to be used on throwNotification utility function
const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: 0,
  WARNING: 1,
  ERROR: 2,
});

//   ___ _     _          _  __   __        _      _    _
//  / __| |___| |__  __ _| | \ \ / /_ _ _ _(_)__ _| |__| |___ ___
// | (_ | / _ \ '_ \/ _` | |  \ V / _` | '_| / _` | '_ \ / -_|_-<
//  \___|_\___/_.__/\__,_|_|   \_/\__,_|_| |_\__,_|_.__/_\___/__/

// Gets the Store Information from the sessionStorage
/** @type {Store} Global Variable that holds the Store Object */
var theStore = null;

// Variable to store current used currency and symbol
/** @type {Number} Variable to store current used currency ID */
var currentCurrencyIndex = Number(localStorage.getItem("currentCurrencyIndex"));

// Variable to store shopping cart
/** @type {ShoppingCart} Shopping Cart Variable */
var shoppingCart = null;

// Variable to store main section context
/** @type {PAGE_CONTEXT} Shopping Cart Variable */
var currentPageContext = PAGE_CONTEXT.HOME;

// Last Visited Product - Used for PAGE_CONTEXT.REVIEW
/** @type {number} Product ID */
var lastVisitedProduct = null;

// Variable that holds information if the cart was changed after being loaded from JSON
/** @type {boolean} Cart was changed */
var isCartChangedFlag = false;

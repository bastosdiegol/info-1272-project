//  _  _             _
// | || |___ __ _ __| |___ _ _
// | __ / -_) _` / _` / -_) '_|
// |_||_\___\__,_\__,_\___|_|

// Gets <title> element
const titleElements = document.getElementsByTagName("title");
// Checks if any <title> elements were found
if (titleElements.length > 0) {
  // Gets the first <title> element
  const titleElement = titleElements[0];
  // Sets the title
  titleElement.textContent = theStore.getStoreNameAndSlogan();
}

// Gets <header> element
const headerElements = document.getElementsByTagName("header");
// Checks if any <header> elements were found
if (headerElements.length > 0) {
  // Gets the first <header> element (at the moment I only have one)
  const headerElement = headerElements[0];

  // Creates a header wrapper
  let headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header-wrapper");

  // Creates a link tag
  let homeElementLink = document.createElement("a");
  homeElementLink.classList.add("home-link");
  homeElementLink.setAttribute("onclick", "theStore.loadStoreItems()");
  homeElementLink.href = "#";

  // Creates figure Tag
  let figureElementLogo = document.createElement("figure");
  figureElementLogo.classList.add("logo-figure");

  // Creates img Tag
  let imgElementLogo = document.createElement("img");
  imgElementLogo.classList.add("logo-img");
  imgElementLogo.src = "./images/" + theStore.getStoreLogo();
  imgElementLogo.alt = theStore.getStoreName();

  // Creates em Tag
  let h1ElementStoreName = document.createElement("h1");
  h1ElementStoreName.classList.add("store-name-h1");
  h1ElementStoreName.textContent = theStore.getStoreName();

  // Creates H2 Tag for slogan
  let h2ElementStoreSlogan = document.createElement("h2");
  // Check if its needed and set values
  if (theStore.getStoreSlogan() != "") {
    h2ElementStoreSlogan.classList.add("store-slogan");
    h2ElementStoreSlogan.textContent = theStore.getStoreSlogan();
  }

  let headerRightWrapper = document.createElement("div");
  headerRightWrapper.classList.add("header-right-wrapper");

  // Creates em Tag
  let emElementDateTime = document.createElement("em");
  emElementDateTime.classList.add("date-time-em");
  // Creates a Date object
  var currentDate = new Date();
  // DateTime Format Options
  let dateTimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  // Formats the current Date using locale
  emElementDateTime.textContent = currentDate.toLocaleString(
    "en-CA",
    dateTimeOptions
  );

  // Creates a link tag
  let cartLinnk = document.createElement("a");
  cartLinnk.classList.add("cart-link");
  cartLinnk.setAttribute("onclick", "shoppingCart.displayShoppingCart()");
  cartLinnk.href = "#";

  // Creates figure Tag
  let cartIconFigure = document.createElement("figure");
  cartIconFigure.classList.add("cart-figure");

  // Creates img Tag
  let cartIconImg = document.createElement("img");
  cartIconImg.classList.add("cart-img");
  cartIconImg.src = "./images/shopping-cart-icon-blue.png";
  cartIconImg.alt = "Shopping Cart";

  // Creates <nav> element
  let navElement = document.createElement("nav");

  // Tag Relations
  homeElementLink.appendChild(figureElementLogo); // Adds figure to the link
  figureElementLogo.appendChild(imgElementLogo); // Adds img to figure
  homeElementLink.appendChild(h1ElementStoreName); // Adds Store Name
  if (theStore.getStoreSlogan() != "")
    homeElementLink.appendChild(h2ElementStoreSlogan); // Adds Slogan if needed

  headerWrapper.appendChild(homeElementLink); // Adds the Home link to the wrapper
  headerWrapper.appendChild(headerRightWrapper); // Adds the right wrapper to the header wrapper

  headerRightWrapper.appendChild(emElementDateTime); // Adds em to the wrapper
  let currencyDiv = theStore.getCurrenciesSelect();
  cartLinnk.appendChild(cartIconFigure);
  cartIconFigure.appendChild(cartIconImg);
  currencyDiv.appendChild(cartLinnk);
  headerRightWrapper.appendChild(currencyDiv); // Adds currency select to the header

  headerElement.appendChild(headerWrapper); // Adds the wrapper to header

  navElement.appendChild(theStore.getNavBarDivElement()); // Adds the Categories list to the nav
  headerElement.appendChild(navElement); // Adds the nav to the header
}

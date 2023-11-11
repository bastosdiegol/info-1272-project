//  _  _             _
// | || |___ __ _ __| |___ _ _
// | __ / -_) _` / _` / -_) '_|
// |_||_\___\__,_\__,_\___|_|

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
  homeElementLink.href = "./index.html";
  homeElementLink.target = "_self";

  // Creates figure Tag
  let figureElementLogo = document.createElement("figure");
  figureElementLogo.classList.add("logo-figure");

  // Creates img Tag
  let imgElementLogo = document.createElement("img");
  imgElementLogo.classList.add("logo-img");
  imgElementLogo.src = "./images/" + theStore.logo;
  imgElementLogo.alt = theStore.name;

  // Creates em Tag
  let h1ElementStoreName = document.createElement("h1");
  h1ElementStoreName.classList.add("store-name-h1");
  h1ElementStoreName.textContent = theStore.name;

  // Creates p Tag
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

  // Creates <nav> element
  let navElement = document.createElement("nav");

  // Tag Relations
  homeElementLink.appendChild(figureElementLogo); // Adds figure to the link
  figureElementLogo.appendChild(imgElementLogo); // Adds img to figure
  homeElementLink.appendChild(h1ElementStoreName);

  headerWrapper.appendChild(homeElementLink); // Adds the Home link to the wrapper
  headerWrapper.appendChild(emElementDateTime); // Adds em to the wrapper
  headerWrapper.appendChild(theStore.getCurrenciesSelect()); // Adds currency select to the header
  headerElement.appendChild(headerWrapper); // Adds the wrapper to header

  navElement.appendChild(theStore.getNavBarDivElement()); // Adds the Categories list to the nav
  headerElement.appendChild(navElement); // Adds the nav to the header
}

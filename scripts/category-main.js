//  __  __      _
// |  \/  |__ _(_)_ _
// | |\/| / _` | | ' \
// |_|  |_\__,_|_|_||_|

// Gets <nav> element
const NAV_ELEMENTS = document.getElementsByTagName("nav");
// Checks if any <nav> elements were found
if (NAV_ELEMENTS.length > 0) {
  // Gets the first <nav> element (at the moment I only have one)
  const NAV_ELEMENT = NAV_ELEMENTS[0];
  // Calls the store method to return the div with values to the nav
  NAV_ELEMENT.appendChild(window.theStore.getNavBarDivElement());
}

// Gets current URL parameters
const URL_Params = new URLSearchParams(window.location.search);
// Tries to get any named id
let categoryId = URL_Params.get("id");
// Checks if it exists
if (categoryId) {
  // Gets <title> element
  let titleElements = document.getElementsByTagName("title");
  // Checks if any <title> elements were found
  if (titleElements.length > 0) {
    // Gets the first <title> element
    let titleElement = titleElements[0];
    // Calls the store method to return the div with values to the nav
    titleElement.textContent =
      theStore.name + " - " + theStore.categories[categoryId];
  }

  // Gets <main> element
  let mainElements = document.getElementsByTagName("main");
  // Checks if any <main> elements were found
  if (mainElements.length > 0) {
    // Gets the first <main> element
    let mainElement = mainElements[0];
    // Calls the store method to return the div with values to the nav
    mainElement.appendChild(
      window.theStore.getStoreItemsGridDivElement(categoryId)
    );
  }
}

//  __  __      _
// |  \/  |__ _(_)_ _
// | |\/| / _` | | ' \
// |_|  |_\__,_|_|_||_|

// Gets <main> element
const MAIN_ELEMENTS = document.getElementsByTagName("main");
// Checks if any <main> elements were found
if (MAIN_ELEMENTS.length > 0) {
  // Gets the first <main> element
  const MAIN_ELEMENT = MAIN_ELEMENTS[0];
  // Calls the store method to return the div with values to the nav
  MAIN_ELEMENT.appendChild(window.theStore.getStoreItemsGridDivElement());
}

//  __  __      _
// |  \/  |__ _(_)_ _
// | |\/| / _` | | ' \
// |_|  |_\__,_|_|_||_|

// Gets current URL parameters
const URL_Params = new URLSearchParams(location.search);
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

    // Gets <main> elements
    const MAIN_ELEMENTS = document.getElementsByTagName("main");
    // Checks if any <main> elements were found
    if (MAIN_ELEMENTS.length > 0) {
      // Gets the first <main> element
      const MAIN_ELEMENT = MAIN_ELEMENTS[0];

      // Adds content description to the page
      let pPageContentDesc = document.createElement("p");
      pPageContentDesc.classList.add("page-content-desc");
      pPageContentDesc.textContent = theStore.categories[categoryId] + ":";
      MAIN_ELEMENT.appendChild(pPageContentDesc);

      // Calls the store method to return the div with values to the nav
      MAIN_ELEMENT.appendChild(
        theStore.getStoreItemsGridDivElement(categoryId)
      );
    }
  }
}

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
  // Adds description to the page content
  let pPageContentDesc = document.createElement("p");
  pPageContentDesc.id = "page-content-desc";
  pPageContentDesc.classList.add("page-content-desc");
  pPageContentDesc.textContent = "Store Items:";
  MAIN_ELEMENT.appendChild(pPageContentDesc);
  // Calls the store method to return the section with items
  MAIN_ELEMENT.appendChild(theStore.getStoreItemsGridDivElement());
}

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

const URL_Params = new URLSearchParams(window.location.search);

let productId = URL_Params.get("id");
if (productId) {
  console.log(productId);
  console.log(window.theStore.storeItems[productId]);
  window.theStore.storeItems[productId].getStoreItemGrid();
}

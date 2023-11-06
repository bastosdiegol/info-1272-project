//  __  __      _
// |  \/  |__ _(_)_ _
// | |\/| / _` | | ' \
// |_|  |_\__,_|_|_||_|

// Gets current URL parameters
const URL_Params = new URLSearchParams(window.location.search);
// Tries to get any named id
let productId = URL_Params.get("id");
// Checks if it exists
if (productId) {
  // Gets <title> element
  let titleElements = document.getElementsByTagName("title");

  // Gets the current store item
  let tempStoreItem = theStore.getStoreItem(productId);

  // Checks if any <title> elements were found
  if (titleElements.length > 0) {
    // Gets the first <title> element
    let titleElement = titleElements[0];
    // Calls the store method to return the div with values to the nav
    titleElement.textContent = theStore.name + " - " + tempStoreItem.name;
  }

  // Gets <main> elements
  let mainelements = document.getElementsByTagName("main");
  // Checks if any <main> elements were found
  if (mainelements.length > 0) {
    // Gets the first <main> element
    let mainElement = mainelements[0];
    // Appends the storeItem information to the <main> tag
    mainElement.appendChild(tempStoreItem.getStoreItemGrid());
  }
}

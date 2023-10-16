//  __  __      _
// |  \/  |__ _(_)_ _
// | |\/| / _` | | ' \
// |_|  |_\__,_|_|_||_|

// Gets current URL parameters
const URL_Params = new URLSearchParams(window.location.search);

let productId = URL_Params.get("id");
if (productId) {
  console.log(productId);
  console.log(window.theStore.storeItems[productId]);
  window.theStore.storeItems[productId].getStoreItemGrid();
}

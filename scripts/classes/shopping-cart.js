/**
 * Class that stores shopping cart information.
 * @class
 */
class ShoppingCart {
  /**
   * ShoppingCart Object Constructor.
   * @constructor
   * @param {ShoppingCartItem[]} itemsMap (Optional) Array of Store Items
   */
  constructor(itemsMap = []) {
    this.itemsMap = itemsMap;
  }

  /**
   * Method that checks if a Store Item exists in the Shopping Cart.
   * @param {StoreItem} storeItem Store Item object to be searched.
   * @returns {ShoppingCartItem} ShoppingCartItem object if found
   */
  findItem(storeItem) {
    for (let i = 0; i < this.itemsMap.length; i++) {
      if (this.itemsMap[i].storeItem === storeItem) {
        return this.itemsMap[i];
      }
    }
    return null;
  }

  /**
   * Description.
   * @param {StoreItem} storeItem StoreItem object.
   * @param {number} quantityDesired Quantity to be added to the cart.
   * @param {String} errorMessage In case of an error, contains error message.
   * @returns {boolean} Result of the operation.
   */
  addItem(storeItem, quantityDesired = 1 /*, errorMessage */) {
    // Checks if item exists on the map
    let shoppingCartItem = this.findItem(storeItem);
    if (shoppingCartItem != null) {
      // Checks if quantity in hands + quantity desired is higher the max per customer
      if (
        storeItem.maxPerCustomer <
        shoppingCartItem.quantityOnHand + quantityDesired
      ) {
        // errorMessage =
        //   "Could not add to the cart. Exceeded maximum quantity allowed per customer.";
        return false;
      } else {
        // Substract from the stock the quantity desired
        storeItem.stockQuantity -= quantityDesired;
        // Updates the quantity on hands
        shoppingCartItem.quantityOnHand += quantityDesired;
      }
    } else {
      // Checks if quantity desired is higher the max per customer
      if (storeItem.maxPerCustomer < quantityDesired) {
        // errorMessage =
        //   "Could not add to the cart. Exceeded maximum quantity allowed per customer.";
        return false;
      } else {
        // Substract from the stock the quantity desired
        storeItem.stockQuantity -= quantityDesired;
        // Updates the quantity on hands
        this.itemsMap.push(new ShoppingCartItem(storeItem, quantityDesired));
      }
    }
    // Saves the cart
    sessionStorage.setItem("shoppingCart", JSON.stringify(this));
    // Updates the storeItem Article
    theStore.loadStoreItemArticle(storeItem.id);
    return true;
  }
}

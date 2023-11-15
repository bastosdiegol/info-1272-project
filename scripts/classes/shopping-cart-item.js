/**
 * Class that stores shopping cart item information.
 * @class
 */
class ShoppingCartItem {
  /**
   * ShoppingCartItem Object Constructor.
   * @constructor
   * @param {StoreItem} storeItem Reference to the StoreItem.
   * @param {Numer} quantityOnHand Quantity of said item being hold in the shopping cart.
   */
  constructor(storeItem, quantityOnHand = 1) {
    this.storeItem = storeItem;
    this.quantityOnHand = quantityOnHand;
  }
}

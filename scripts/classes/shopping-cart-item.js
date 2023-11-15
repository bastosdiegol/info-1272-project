/**
 * Class that stores shopping cart item information.
 * @class
 */
class ShoppingCartItem {
  /**
   * ShoppingCartItem Object Constructor.
   * @constructor
   * @param {StoreItem} storeItem Reference to the StoreItem.
   * @param {Numer} quantity Quantity of said item being hold in the shopping cart.
   */
  constructor(storeItem, quantity = 1) {
    this.storeItem = storeItem;
    this.quantity = quantity;
  }
}

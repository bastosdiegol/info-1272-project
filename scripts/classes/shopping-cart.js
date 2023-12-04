/**
 * Class that stores shopping cart information.
 * @class
 */
class ShoppingCart {
  /**
   * Singleton Instance
   * @type {ShoppingCart} Static Property that holds the unique isntance of ShoppingCart Class
   * @static
   */
  static #_shoppingCartInstance = null;
  /* Private Properties */
  #shoppingCartItems;
  /**
   * ShoppingCart Object Constructor.
   * @constructor
   */
  constructor() {
    this.#shoppingCartItems = new Map();
    if (ShoppingCart.#_shoppingCartInstance === null) {
      ShoppingCart.#_shoppingCartInstance = this;
      return this;
    } else {
      return ShoppingCart.#_shoppingCartInstance;
    }
  }

  /**
   * Static Method that returns the singleton instance of ShoppingCart Class.
   * @static @method
   * @returns {ShoppingCart} The singleton instance.
   */
  static getInstance() {
    if (ShoppingCart.#_shoppingCartInstance === null) {
      return new ShoppingCart();
    } else {
      return ShoppingCart.#_shoppingCartInstance;
    }
  }

  /**
   * Sets all data required for Store object.
   * @param {Map<StoreItem, number>} itemsMap (Optional) Map of Store Items and quantityOnHand
   */
  setData(itemsMap) {
    this.#shoppingCartItems = itemsMap;
  }

  /**
   * Method that updates the quantity of a StoreItem hold on the shopping cart.
   * @method
   * @param {number} storeItemId StoreItem id.
   * @param {CART_QUANTITY_OPERATION} operation Type of operation to be applied to the quantity.
   * @param {PAGE_CONTEXT} pageContext Page context of the method caller.
   * @param {number=} newQuantity (Optional) Desired quantity to be changed.
   * @returns {boolean} Result of the operation.
   */
  updateShoppingCartItemQuantity(
    storeItemId,
    operation,
    pageContext,
    newQuantity = null
  ) {
    // Gets the StoreItem
    /** @type {StoreItem} Variable that holds the current StoreItem Object */
    let storeItem = theStore.getStoreItem(storeItemId);
    // Gets the ShoppingCartItem
    let quantityOnHand = this.#shoppingCartItems.get(storeItem);
    // Validate the storeItem object
    if (storeItem) {
      // Validades the shopping cart item
      // Only INCREMENT is allowed for an inexistent product on the cart
      if (
        quantityOnHand === undefined &&
        operation != CART_QUANTITY_OPERATION.INCREMENT
      ) {
        // Error Handling
        throwNotification(
          "Invalid operation. Product is not in the cart.",
          NOTIFICATION_TYPE.ERROR
        );
        return false;
      }
      // Defines which arithmetical operation is going to be done to the quantity
      switch (operation) {
        /**
         * INCREMENT ++
         */
        case CART_QUANTITY_OPERATION.INCREMENT:
          // Checks if there's stock
          if (storeItem.getStockQuantity() === 0) {
            // Out of stock product
            throwNotification(
              "Product is current unavailable.",
              NOTIFICATION_TYPE.ERROR
            );
            break;
          }
          // Verify existence of the StoreItem in the ShoppingCart
          if (quantityOnHand !== undefined) {
            // StoreItem EXISTS
            // Checks if quantity on hands + 1 is higher the max per customer
            if (storeItem.getMaxPerCustomer() < quantityOnHand + 1) {
              throwNotification(
                "Max quantity allowed per customer exceeded.",
                NOTIFICATION_TYPE.ERROR
              );
              return false;
            } else {
              // Decrement the stock the quantity
              storeItem.subOneStockQuantity();
              // Increment the quantity on hands
              quantityOnHand++;
            }
          } else {
            // StoreItem DOES NOT EXISTS
            // Decrement the stock the quantity
            storeItem.subOneStockQuantity();
            // Sets the quantity on hands to 1
            quantityOnHand = 1;
            // Throws Notification
            throwNotification(
              "Product added to the cart.",
              NOTIFICATION_TYPE.SUCCESS
            );
          }
          break;
        /**
         * DECREMENT --
         */
        case CART_QUANTITY_OPERATION.DECREMENT:
          // Verifies if it is the last item on hand
          if (quantityOnHand === 1) {
            // Increment the stock quantity
            storeItem.addOneStockQuantity();
            // Sets quantity on hand to zero
            quantityOnHand = 0;
          } else {
            // IT IS NOT the last item on hand
            // Increment the stock quantity
            storeItem.addOneStockQuantity();
            // Decrement the quantity of itens on hand
            quantityOnHand--;
          }
          break;
        /**
         * CHANGE
         */
        case CART_QUANTITY_OPERATION.CHANGE:
          // Verify if the new quantity is a number
          if (isNaN(newQuantity)) {
            // NaN Error Handling
            throwNotification(
              "Provided quantity is not a number.",
              NOTIFICATION_TYPE.ERROR
            );
            break;
          } else {
            newQuantity = Number(newQuantity);
          }
          // (Quantity == 0) Removal of the the ShoppingCartItem
          if (newQuantity == 0) {
            // Reverts the stock quantity
            storeItem.setStockQuantity(
              storeItem.getStockQuantity() + quantityOnHand
            );
            // Sets quantity on hand to zero
            quantityOnHand = 0;
          } else {
            // Update to a chosen number
            // Validades if the nweQuantity is higher than max allowed per customer
            if (storeItem.getMaxPerCustomer() < newQuantity) {
              throwNotification(
                "Max quantity exceeded, max allowed set instead.",
                NOTIFICATION_TYPE.WARNING
              );
              // Removes from the stock the remaining quantity
              let remainingQuantity =
                storeItem.getStockQuantity() -
                (storeItem.getMaxPerCustomer() - quantityOnHand);
              storeItem.setStockQuantity(remainingQuantity);
              // Sets the maximum allowed quantity
              quantityOnHand = storeItem.getMaxPerCustomer();
            } else {
              // nweQuantity is lower than max allowed per customer

              // Validades if NEWQUANTITY is HIGHER than current quantity ONHAND
              if (newQuantity > quantityOnHand) {
                // Removes from the stock the remaining quantity
                let remainingQuantity =
                  storeItem.getStockQuantity() - (newQuantity - quantityOnHand);
                storeItem.setStockQuantity(remainingQuantity);
                // Sets the new quantity on hand
                quantityOnHand = newQuantity;
              } else {
                // NEWQUANTITY is LOWER than current quantity ONHAND

                // Checks if newQuantity is HIGHER than ZERO
                if (newQuantity > 0) {
                  // Adds the quantity difference back to the stock
                  let quantityDifference =
                    storeItem.getStockQuantity() +
                    (quantityOnHand - newQuantity);
                  storeItem.setStockQuantity(quantityDifference);
                  // Sets the newQuantity
                  quantityOnHand = newQuantity;
                } else {
                  // newQuantity is LOWER than ZERO
                  // Treats it as an error
                  throwNotification(
                    "Provided quantity is an invalid number.",
                    NOTIFICATION_TYPE.ERROR
                  );
                  break;
                }
              }
            }
          }
          break;
        default:
          break;
      }

      // Saves the cart based on quantity on hands
      if (quantityOnHand > 0) {
        this.#shoppingCartItems.set(storeItem, quantityOnHand);
      } else if (quantityOnHand === 0) {
        // Removes the item from the cart
        this.#shoppingCartItems.delete(storeItem);
        // Throws notification
        throwNotification(
          "Product removed from the cart.",
          NOTIFICATION_TYPE.WARNING
        );
      }
      // Saves the cart to the localStorage
      localStorage.setItem("shoppingCart", this.toJSON());

      // Defines which page context to update
      switch (pageContext) {
        // Updates Home Page StoreItem Grid Section
        case PAGE_CONTEXT.HOME:
          theStore.loadStoreItemArticle(storeItemId);
          break;
        // Updates Shopping Cart Grid Section
        case PAGE_CONTEXT.SHOPPING_CART:
          this.displayShoppingCart();
          break;
        default:
          return;
      }
    } else {
      // Error Handling
      throwNotification("Store Item not found.", NOTIFICATION_TYPE.ERROR);
    }
    // Updates the cart notification div
    this.updateNotification();
    return true;
  }

  /**
   * Method that displays the Shopping Cart.
   * @method
   */
  displayShoppingCart() {
    // Sets current Page Context
    currentPageContext = PAGE_CONTEXT.SHOPPING_CART;
    // Gets the Store Item Section
    let section = document.getElementById("store-items-section");
    // Clear the section
    while (section.firstChild) {
      section.removeChild(section.lastChild);
    }
    // Now to Update the Store Title and Page Description
    theStore.setWebsiteTitle(theStore.getStoreName() + " - " + "Shopping Cart");
    theStore.setPageDescription("Your Cart:");

    // Creates the Shopping Cart Section
    // Products List Div
    let productsDiv = document.createElement("div");
    productsDiv.classList.add("cart-products-wrapper");
    section.appendChild(productsDiv);
    if (this.#shoppingCartItems.size == 0) {
      let emptyP = document.createElement("p");
      emptyP.classList.add("cart-summary-empty");
      emptyP.textContent = "Your cart is empty.";
      productsDiv.appendChild(emptyP);
    } else {
      // Iterate through all items
      for (let [storeItem, quantityOnHand] of this.#shoppingCartItems) {
        // Product Wrapper Div
        let productWrapperDiv = document.createElement("div");
        productWrapperDiv.classList.add("cart-product-wrapper");
        productsDiv.appendChild(productWrapperDiv);

        // Product Image Div
        let productImageDiv = document.createElement("div");
        productImageDiv.classList.add("cart-product-image-wrapper");
        productWrapperDiv.appendChild(productImageDiv);
        // Creates figure tag for the Item
        let figureItem = document.createElement("figure");
        figureItem.classList.add("cart-product-figure");
        productImageDiv.appendChild(figureItem);
        // Creates img Tag for the item
        let imgItem = document.createElement("img");
        imgItem.classList.add("cart-product-img");
        imgItem.src = storeItem.getImageURL();
        imgItem.alt = storeItem.getName();
        figureItem.appendChild(imgItem);

        // Creates a div for the name
        let productNameDiv = document.createElement("div");
        productNameDiv.classList.add("cart-product-name");
        productWrapperDiv.appendChild(productNameDiv);
        let productNameP = document.createElement("p");
        productNameP.textContent = storeItem.getName();
        productNameDiv.appendChild(productNameP);

        // Creates a div for the quantity
        let productQuantityDiv = document.createElement("div");
        productQuantityDiv.classList.add("cart-product-quantity");
        productWrapperDiv.appendChild(productQuantityDiv);
        // [ < ] Creates a link to the cart
        let decrementLink = document.createElement("a");
        decrementLink.href = "javascript:void(0);";
        decrementLink.setAttribute(
          "onclick",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            storeItem.getId() +
            "," +
            CART_QUANTITY_OPERATION.DECREMENT +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            ")"
        );
        productQuantityDiv.appendChild(decrementLink);
        // Creates the Less Then Symbol
        let decrementP = document.createElement("p");
        decrementP.textContent = "-";
        decrementLink.appendChild(decrementP);

        let quantityInput = document.createElement("input");
        quantityInput.classList.add("cart-product-quantity-input");
        quantityInput.value = quantityOnHand;
        quantityInput.setAttribute(
          "onchange",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            storeItem.getId() +
            "," +
            CART_QUANTITY_OPERATION.CHANGE +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            "," +
            "this.value )"
        );
        productQuantityDiv.appendChild(quantityInput);

        // [ > ] Creates a link to the cart
        let incrementLink = document.createElement("a");
        incrementLink.href = "javascript:void(0);";
        incrementLink.setAttribute(
          "onclick",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            storeItem.getId() +
            "," +
            CART_QUANTITY_OPERATION.INCREMENT +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            ")"
        );
        productQuantityDiv.appendChild(incrementLink);
        // Creates the Greater Then Symbol
        let incrementP = document.createElement("p");
        incrementP.textContent = "+";
        incrementLink.appendChild(incrementP);

        // Creates a div for the price
        let productPriceDiv = document.createElement("div");
        productPriceDiv.classList.add("cart-product-price");
        productWrapperDiv.appendChild(productPriceDiv);
        let productPriceP = document.createElement("p");
        productPriceP.textContent = convertToSelectedCurrency(
          storeItem.getPrice()
        );
        productPriceDiv.appendChild(productPriceP);
      }
    }

    // Order Summary Div
    let summaryDiv = document.createElement("div");
    summaryDiv.classList.add("cart-summary-wrapper");
    section.append(summaryDiv);
    let orderSummaryP = document.createElement("p");
    orderSummaryP.classList.add("cart-summary-p");
    orderSummaryP.textContent = "Order Summary:";
    summaryDiv.appendChild(orderSummaryP);
    // Cart Subtotal
    let cartSubtotalDiv = document.createElement("div");
    cartSubtotalDiv.classList.add("cart-summary-cart-subtotal-wrapper");
    summaryDiv.append(cartSubtotalDiv);
    let cartSubtotalLabel = document.createElement("p");
    cartSubtotalLabel.classList.add("cart-summary-label");
    cartSubtotalLabel.textContent = "Cart Subtotal:";
    cartSubtotalDiv.appendChild(cartSubtotalLabel);
    let cartSubtotalValue = document.createElement("p");
    cartSubtotalValue.classList.add("cart-summary-value");
    // Calculates the CartSubtotal
    let cartSubtotal = this.calculateCartSubTotal();
    cartSubtotalValue.textContent = convertToSelectedCurrency(cartSubtotal);
    cartSubtotalDiv.appendChild(cartSubtotalValue);
    // Shipping Cost
    let shippingCostDiv = document.createElement("div");
    shippingCostDiv.classList.add("cart-summary-shipping-wrapper");
    summaryDiv.append(shippingCostDiv);
    let shippingCostLabel = document.createElement("p");
    shippingCostLabel.classList.add("cart-summary-label");
    shippingCostLabel.textContent = "Shipping Cost:";
    shippingCostDiv.appendChild(shippingCostLabel);
    let shippingCostValue = document.createElement("p");
    shippingCostValue.classList.add("cart-summary-value");
    // Calculates the Shipping Cost
    let shippingCost = this.calculateShippingCost();
    shippingCostValue.textContent = convertToSelectedCurrency(shippingCost);
    shippingCostDiv.appendChild(shippingCostValue);
    // Subtotal
    let subtotalDiv = document.createElement("div");
    subtotalDiv.classList.add("cart-summary-subtotal-wrapper");
    summaryDiv.append(subtotalDiv);
    let subtotalLabel = document.createElement("p");
    subtotalLabel.classList.add("cart-summary-label");
    subtotalLabel.textContent = "Subtotal:";
    subtotalDiv.appendChild(subtotalLabel);
    let subtotalValue = document.createElement("p");
    subtotalValue.classList.add("cart-summary-value");
    // Calculates the Subtotal
    let subtotal = cartSubtotal + shippingCost;
    subtotalValue.textContent = convertToSelectedCurrency(subtotal);
    subtotalDiv.appendChild(subtotalValue);
    // Tax
    let taxDiv = document.createElement("div");
    taxDiv.classList.add("cart-summary-tax-wrapper");
    summaryDiv.append(taxDiv);
    let taxLabel = document.createElement("p");
    taxLabel.classList.add("cart-summary-label");
    taxLabel.textContent = "Tax:";
    taxDiv.appendChild(taxLabel);
    let taxValue = document.createElement("p");
    taxValue.classList.add("cart-summary-value");
    // Calculates the Tax
    let tax = subtotal * 0.13;
    taxValue.textContent = convertToSelectedCurrency(tax);
    taxDiv.appendChild(taxValue);
    // Total
    let totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-summary-total-wrapper");
    summaryDiv.append(totalDiv);
    let totalLabel = document.createElement("p");
    totalLabel.classList.add("cart-summary-label");
    totalLabel.textContent = "Total:";
    totalDiv.appendChild(totalLabel);
    let totalValue = document.createElement("p");
    totalValue.classList.add("cart-summary-value");
    // Calculates the Subtotal
    let total = subtotal + tax;
    totalValue.textContent = convertToSelectedCurrency(total);
    totalDiv.appendChild(totalValue);
  }

  /**
   * Method that iterate through all shopping cart items and calculate the shipping total.
   * @method
   * @returns {Number} ShoppingCart subtotal.
   */
  calculateCartSubTotal() {
    let subtotal = 0;
    // Iterate through all shoppingCartItems
    for (let [storeItem, quantityOnHand] of this.#shoppingCartItems) {
      subtotal += storeItem.getPrice() * quantityOnHand;
    }
    return subtotal;
  }

  /**
   * Method that iterate through all shopping cart items and calculate the shipping total.
   * @method
   * @returns {Number} ShoppingCart subtotal.
   */
  calculateShippingCost() {
    let shippingCost = 0;
    // Iterate through all shoppingCartItems
    for (let [storeItem, quantityOnHand] of this.#shoppingCartItems) {
      shippingCost += storeItem.getCostOfShipping() * quantityOnHand;
    }
    return shippingCost;
  }

  /**
   * Method that iterate through all shopping cart items and calculates how many items are in the cart.
   * @method
   * @returns {Number} ShoppingCart sum of units.
   */
  getTotalItemCount() {
    let itemsTotal = 0;
    // Iterate through all shoppingCartItems
    for (let [storeItem, quantityOnHand] of this.#shoppingCartItems) {
      itemsTotal += quantityOnHand;
    }
    return itemsTotal;
  }

  /**
   * Method that updates the Cart Notification Div.
   */
  updateNotification() {
    let totalUnits = this.getTotalItemCount();
    let notificationDiv = document.getElementById("cart-notification");
    if (totalUnits == 0) {
      notificationDiv.style.display = "none";
    } else {
      notificationDiv.style.display = "flex";
      notificationDiv.textContent = totalUnits;
    }
  }

  /**
   * Convert the ShoppingCart object to a JSON representation.
   * @method
   * @returns {string} JSON representation of the ShoppingCart.
   */
  toJSON() {
    // Serialize the map of shoppingCartItems from map to an array of ID and quantity on hand
    const SERIALIED_ITEMS = Array.from(this.#shoppingCartItems.entries()).map(
      ([storeItem, quantityOnHand]) => ({
        storeItemId: storeItem.getId(),
        quantityOnHand,
      })
    );

    return JSON.stringify({
      shoppingCartItems: SERIALIED_ITEMS,
    });
  }

  /**
   * Creates a instance of ShoppingCart object from a JSON representation.
   * @static
   * @method
   * @param {string} json - JSON string of the ShoppingCart.
   * @returns {ShoppingCart} New instance of ShoppingCart object with data from JSON.
   */
  static fromJSON(json) {
    // Validates the parameter
    if (json == null || json === "null") {
      // Received nothing, return empty instancce
      return ShoppingCart.getInstance();
    }
    // Parses the json received from parameter
    const PARSED_DATA = JSON.parse(json);
    // Checks if the shoppingCartItems that came from localStorage is empty
    if (Object.keys(PARSED_DATA.shoppingCartItems).length === 0) {
      // Just return a empty instance of ShoppingCart
      return ShoppingCart.getInstance();
    }

    // Creates the new map of shoppingCartItems that will be passed to the new Shopping Cart Instance
    const ITEMS_MAP = new Map(
      PARSED_DATA.shoppingCartItems
        .map(({ storeItemId, quantityOnHand }) => {
          let storeItem = theStore.getStoreItem(storeItemId);
          if (storeItem === null) {
            isCartChangedFlag = true;
            return null;
          }
          return [storeItem, quantityOnHand];
        })
        .filter((entry) => entry !== null)
    );
    // Creates the new cart
    let newCart = ShoppingCart.getInstance();
    newCart.setData(ITEMS_MAP);
    let itemsToRemove = [];
    // Change all storeItem stock values to match the cart
    for (let [storeItem, quantityOnHand] of newCart.#shoppingCartItems) {
      // Catches the current stock quantity
      let curStockQuantity = storeItem.getStockQuantity();
      if (curStockQuantity === 0) {
        itemsToRemove.push(storeItem);
      }
      // If current stock quantity is lower than quantityOnHand
      else if (curStockQuantity > quantityOnHand) {
        // Reduces the Stock
        storeItem.setStockQuantity(curStockQuantity - quantityOnHand);
      } else {
        // Updates the quantityOnHand
        newCart.#shoppingCartItems.set(storeItem, curStockQuantity);
        // Reduces the Stock
        storeItem.setStockQuantity(curStockQuantity);
        isCartChangedFlag = true;
      }
    }
    // Checks if there are items to remove
    if (itemsToRemove.length > 0) {
      isCartChangedFlag = true;
      // Removes from the cart all necessary products
      itemsToRemove.forEach((element) => {
        newCart.#shoppingCartItems.delete(element);
      });
    }
    // Returns the new Instance of ShoppingCart with data from JSON
    return newCart;
  }
}

/**
 * Class that stores shopping cart information.
 * @class
 */
class ShoppingCart {
  /**
   * ShoppingCart Object Constructor.
   * @constructor
   * @param {Map<StoreItem, number>} itemsMap (Optional) Map of Store Items and quantityOnHand
   */
  constructor(itemsMap = new Map()) {
    this.shoppingCartItems = itemsMap;
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
    let storeItem = theStore.getStoreItem(storeItemId);
    // Gets the ShoppingCartItem
    let quantityOnHand = this.shoppingCartItems.get(storeItem);
    // Validate the storeItem object
    if (storeItem) {
      // Validades the shopping cart item
      // Only INCREMENT is allowed for an inexistent product on the cart
      if (
        quantityOnHand === undefined &&
        operation != CART_QUANTITY_OPERATION.INCREMENT
      ) {
        // Error Handling
        alert(
          "Quantity operation not allowed for an inexistent shopping cart product."
        );
        return false;
      }
      // Defines which arithmetical operation is going to be done to the quantity
      switch (operation) {
        /**
         * INCREMENT ++
         */
        case CART_QUANTITY_OPERATION.INCREMENT:
          // Verify existence of the StoreItem in the ShoppingCart
          if (quantityOnHand !== undefined) {
            // StoreItem EXISTS
            // Checks if quantity on hands + 1 is higher the max per customer
            if (storeItem.maxPerCustomer < quantityOnHand + 1) {
              alert(
                "Could not add another unit to the cart.\nExceeded maximum quantity allowed per customer."
              );
              return false;
            } else {
              // Decrement the stock the quantity
              storeItem.stockQuantity--;
              // Increment the quantity on hands
              quantityOnHand++;
            }
          } else {
            // StoreItem DOES NOT EXISTS
            // Decrement the stock the quantity
            storeItem.stockQuantity--;
            // Sets the quantity on hands to 1
            quantityOnHand = 1;
          }
          break;
        /**
         * DECREMENT --
         */
        case CART_QUANTITY_OPERATION.DECREMENT:
          // Verifies if it is the last item on hand
          if (quantityOnHand === 1) {
            // Increment the stock quantity
            storeItem.stockQuantity++;
            // Sets quantity on hand to zero
            quantityOnHand = 0;
          } else {
            // IT IS NOT the last item on hand
            // Increment the stock quantity
            storeItem.stockQuantity++;
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
            alert("Provided quantity is not a number.");
            break;
          } else {
            newQuantity = Number(newQuantity);
          }
          // (Quantity == 0) Removal of the the ShoppingCartItem
          if (newQuantity == 0) {
            // Reverts the stock quantity
            storeItem.stockQuantity += quantityOnHand;
            // Sets quantity on hand to zero
            quantityOnHand = 0;
          } else {
            // Update to a chosen number
            // Validades if the nweQuantity is higher than max allowed per customer
            if (storeItem.maxPerCustomer < newQuantity) {
              alert(
                "Could not exceeded the maximum quantity allowed per customer.\nMaximum quantity set instead."
              );
              // Removes from the stock the remaining quantity
              storeItem.stockQuantity -=
                storeItem.maxPerCustomer - quantityOnHand;
              // Sets the maximum allowed quantity
              quantityOnHand = storeItem.maxPerCustomer;
            } else {
              // nweQuantity is lower than max allowed per customer

              // Validades if NEWQUANTITY is HIGHER than current quantity ONHAND
              if (newQuantity > quantityOnHand) {
                // Removes from the stock the remaining quantity
                storeItem.stockQuantity -= newQuantity - quantityOnHand;
                // Sets the new quantity on hand
                quantityOnHand = newQuantity;
              } else {
                // NEWQUANTITY is LOWER than current quantity ONHAND

                // Checks if newQuantity is HIGHER than ZERO
                if (newQuantity > 0) {
                  // Adds the quantity difference back to the stock
                  storeItem.stockQuantity += quantityOnHand - newQuantity;
                  // Sets the newQuantity
                  quantityOnHand = newQuantity;
                } else {
                  // newQuantity is LOWER than ZERO
                  // Adds the quantity onHand back to the stock
                  storeItem.stockQuantity += quantityOnHand;
                  // Sets quantity on hand to zero
                  quantityOnHand = 0;
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
        this.shoppingCartItems.set(storeItem, quantityOnHand);
      } else {
        // Removes the item from the cart
        this.shoppingCartItems.delete(storeItem);
      }
      // TODO: Fix the session storage
      // sessionStorage.setItem("shoppingCart", JSON.stringify(this));

      // Defines which page context to update
      switch (pageContext) {
        // Updates Home Page StoreItem Grid Section
        case PAGE_CONTEXT.HOME:
          theStore.loadStoreItemArticle(storeItem.id);
          break;
        // Updates Shopping Cart Grid Section
        case PAGE_CONTEXT.SHOPPING_CART:
          this.displayShoppingCart();
          break;
        default:
          break;
      }
    } else {
      // Error Handling
      alert("Store Item not found.");
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
    // Gets <title> element
    let titleElements = document.getElementsByTagName("title");
    // Gets the page Description
    let pageDescription = document.getElementById("page-content-desc");
    // Checks if any <title> elements were found
    if (titleElements.length > 0) {
      // Gets the first <title> element
      let titleElement = titleElements[0];
      // Updates the title - With Category
      titleElement.textContent =
        theStore.getStoreName() + " - " + "Shopping Cart";
      // Updates the page description
      pageDescription.textContent = "Your Cart:";
    }

    // Creates the Shopping Cart Section
    // Products List Div
    let productsDiv = document.createElement("div");
    productsDiv.classList.add("cart-products-wrapper");
    section.appendChild(productsDiv);
    if (this.shoppingCartItems.size == 0) {
      let emptyP = document.createElement("p");
      emptyP.classList.add("cart-summary-empty");
      emptyP.textContent = "Your cart is empty.";
      productsDiv.appendChild(emptyP);
    } else {
      // Iterate through all items
      for (let [storeItem, quantityOnHand] of this.shoppingCartItems) {
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
        imgItem.src = storeItem.imageURL;
        imgItem.alt = storeItem.name;
        figureItem.appendChild(imgItem);

        // Creates a div for the name
        let productNameDiv = document.createElement("div");
        productNameDiv.classList.add("cart-product-name");
        productWrapperDiv.appendChild(productNameDiv);
        let productNameP = document.createElement("p");
        productNameP.textContent = storeItem.name;
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
            storeItem.id +
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
            storeItem.id +
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
            storeItem.id +
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
        productPriceP.textContent = Store.convertToSelectedCurrency(
          storeItem.price
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
    cartSubtotalValue.textContent =
      Store.convertToSelectedCurrency(cartSubtotal);
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
    shippingCostValue.textContent =
      Store.convertToSelectedCurrency(shippingCost);
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
    subtotalValue.textContent = Store.convertToSelectedCurrency(subtotal);
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
    taxValue.textContent = Store.convertToSelectedCurrency(tax);
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
    totalValue.textContent = Store.convertToSelectedCurrency(total);
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
    for (let [storeItem, quantityOnHand] of this.shoppingCartItems) {
      subtotal += storeItem.price * quantityOnHand;
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
    for (let [storeItem, quantityOnHand] of this.shoppingCartItems) {
      shippingCost += storeItem.costOfShipping * quantityOnHand;
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
    for (let [storeItem, quantityOnHand] of this.shoppingCartItems) {
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
}

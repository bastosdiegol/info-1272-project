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
   * Method that finds a Store Item and remove it from the Shopping Cart.
   * @param {StoreItem} storeItem Store Item object to be searched.
   */
  removeItem(storeItem) {
    for (let i = 0; i < this.itemsMap.length; i++) {
      if (this.itemsMap[i].storeItem === storeItem) {
        this.itemsMap.splice(i, 1);
      }
    }
  }

  /**
   * Method that updates the quantity of a StoreItem hold on the shopping cart.
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
    let shoppingCartItem = this.findItem(storeItem);
    // Validate the storeItem object
    if (storeItem) {
      // Validades the shoppingCartItem object
      // Only INCREMENT is allowed for an inexistent shoppingCartItem object
      if (
        shoppingCartItem == null &&
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
          if (shoppingCartItem != null) {
            // StoreItem EXISTS
            // Checks if quantity on hands + 1 is higher the max per customer
            if (
              storeItem.maxPerCustomer <
              shoppingCartItem.quantityOnHand + 1
            ) {
              alert(
                "Could not add to the cart.\nExceeded maximum quantity allowed per customer."
              );
              return false;
            } else {
              // Decrement the stock the quantity
              storeItem.stockQuantity--;
              // Increment the quantity on hands
              shoppingCartItem.quantityOnHand++;
            }
          } else {
            // StoreItem DOES NOT EXISTS
            // Decrement the stock the quantity
            storeItem.stockQuantity--;
            // Creates the ShoppingCartItem object and sets the quantity on hands to 1
            this.itemsMap.push(new ShoppingCartItem(storeItem, 1));
          }
          break;
        /**
         * DECREMENT --
         */
        case CART_QUANTITY_OPERATION.DECREMENT:
          // Verifies if it is the last item on hand
          if (shoppingCartItem.quantityOnHand == 1) {
            // Increment the stock quantity
            storeItem.stockQuantity++;
            // Remove the ShoppingCartItem from the map
            this.removeItem(storeItem);
          } else {
            // IT IS NOT the last item on hand
            // Increment the stock quantity
            storeItem.stockQuantity++;
            // Decrement the quantity of itens on hand
            shoppingCartItem.quantityOnHand--;
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
            storeItem.stockQuantity += shoppingCartItem.quantityOnHand;
            // Removes Item from the shopping cart
            this.removeItem(storeItem);
          } else {
            // Update to a chosen number
            // Validades if the nweQuantity is higher than max allowed per customer
            if (storeItem.maxPerCustomer < newQuantity) {
              alert(
                "Could not exceeded the maximum quantity allowed per customer.\nMaximum quantity set instead."
              );
              // Removes from the stock the remaining quantity
              storeItem.stockQuantity -=
                storeItem.maxPerCustomer - shoppingCartItem.quantityOnHand;
              // Sets the maximum allowed quantity
              shoppingCartItem.quantityOnHand = storeItem.maxPerCustomer;
            } else {
              // nweQuantity is lower than max allowed per customer

              // Validades if NEWQUANTITY is HIGHER than current quantity ONHAND
              if (newQuantity > shoppingCartItem.quantityOnHand) {
                // Removes from the stock the remaining quantity
                storeItem.stockQuantity -=
                  newQuantity - shoppingCartItem.quantityOnHand;
                // Sets the new quantity on hand
                shoppingCartItem.quantityOnHand = newQuantity;
              } else {
                // NEWQUANTITY is LOWER than current quantity ONHAND

                // Checks if newQuantity is HIGHER than ZERO
                if (newQuantity > 0) {
                  // Adds the quantity difference back to the stock
                  storeItem.stockQuantity +=
                    shoppingCartItem.quantityOnHand - newQuantity;
                  // Sets the newQuantity
                  shoppingCartItem.quantityOnHand = newQuantity;
                } else {
                  // newQuantity is LOWER than ZERO
                  // Adds the quantity onHand back to the stock
                  storeItem.stockQuantity += shoppingCartItem.quantityOnHand;
                  // Remove Item from the shopping cart
                  this.removeItem(storeItem);
                }
              }
            }
          }
          break;
        default:
          break;
      }

      // Saves the cart
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

    return true;
  }

  /**
   * Method that displays the Shopping Cart.
   */
  displayShoppingCart() {
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
    // Order Summary Div
    let summaryDiv = document.createElement("div");
    summaryDiv.classList.add("cart-summary-wrapper");
    section.append(summaryDiv);
    // Iterate through all items
    for (let i = 0; i < this.itemsMap.length; i++) {
      let currentItem = this.itemsMap[i];
      // Product Wrapper Div
      let productWrapperDiv = document.createElement("div");
      productWrapperDiv.classList.add("cart-product-wrapper");
      productsDiv.appendChild(productWrapperDiv);
      {
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
        imgItem.src = currentItem.storeItem.imageURL;
        imgItem.alt = currentItem.storeItem.name;
        figureItem.appendChild(imgItem);
      }
      {
        // Creates a div for the name
        let productNameDiv = document.createElement("div");
        productNameDiv.classList.add("cart-product-name");
        productWrapperDiv.appendChild(productNameDiv);
        let productNameP = document.createElement("p");
        productNameP.textContent = currentItem.storeItem.name;
        productNameDiv.appendChild(productNameP);
      }
      {
        // Creates a div for the quantity
        let productQuantityDiv = document.createElement("div");
        productQuantityDiv.classList.add("cart-product-quantity");
        productWrapperDiv.appendChild(productQuantityDiv);
        // [ < ] Creates a link to the cart
        let lessThenLink = document.createElement("a");
        lessThenLink.href = "javascript:void(0);";
        lessThenLink.setAttribute(
          "onclick",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            currentItem.storeItem.id +
            "," +
            CART_QUANTITY_OPERATION.DECREMENT +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            ")"
        );
        productQuantityDiv.appendChild(lessThenLink);
        // Creates the Less Then Symbol
        let lessThanP = document.createElement("p");
        lessThanP.textContent = "<";
        lessThenLink.appendChild(lessThanP);

        let quantityInput = document.createElement("input");
        quantityInput.classList.add("cart-product-quantity-input");
        quantityInput.value = currentItem.quantityOnHand;
        quantityInput.setAttribute(
          "onchange",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            currentItem.storeItem.id +
            "," +
            CART_QUANTITY_OPERATION.CHANGE +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            "," +
            "this.value )"
        );
        productQuantityDiv.appendChild(quantityInput);

        // [ > ] Creates a link to the cart
        let greaterThanLink = document.createElement("a");
        greaterThanLink.href = "javascript:void(0);";
        greaterThanLink.setAttribute(
          "onclick",
          "shoppingCart.updateShoppingCartItemQuantity( " +
            currentItem.storeItem.id +
            "," +
            CART_QUANTITY_OPERATION.INCREMENT +
            "," +
            PAGE_CONTEXT.SHOPPING_CART +
            ")"
        );
        productQuantityDiv.appendChild(greaterThanLink);
        // Creates the Greater Then Symbol
        let greaterThanP = document.createElement("p");
        greaterThanP.textContent = ">";
        greaterThanLink.appendChild(greaterThanP);
      }
    }
  }
}

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
   * Description.
   * @param {StoreItem} storeItem StoreItem object.
   * @param {number} quantityChangeDesired Quantity to be added to the cart.
   * @param {boolean} isHome Handler for Home Page versus Shopping Cart sections.
   * @returns {boolean} Result of the operation.
   */
  incrementDecrementItemQuantity(
    storeItem,
    quantityChangeDesired = 1,
    isHome = true
  ) {
    if (isNaN(quantityChangeDesired)) {
      // NaN Check
      alert("Provided quantity is not a number.");
      this.displayShoppingCart();
      return;
    } else {
      quantityChangeDesired = Number(quantityChangeDesired);
    }
    // Checks if item exists on the map
    let shoppingCartItem = this.findItem(storeItem);

    // Checks if it is Addition or Substraction
    // If Addition
    if (quantityChangeDesired === 1) {
      if (shoppingCartItem != null) {
        // Checks if quantity in hands + quantity desired is higher the max per customer
        if (
          storeItem.maxPerCustomer <
          shoppingCartItem.quantityOnHand + quantityChangeDesired
        ) {
          alert(
            "Could not add to the cart.\nExceeded maximum quantity allowed per customer."
          );
          return false;
        } else {
          // Substract from the stock the quantity desired
          storeItem.stockQuantity -= quantityChangeDesired;
          // Updates the quantity on hands
          shoppingCartItem.quantityOnHand += quantityChangeDesired;
        }
      } else {
        // Checks if quantity desired is higher the max per customer
        if (storeItem.maxPerCustomer < quantityChangeDesired) {
          alert(
            "Could not add to the cart.\nExceeded maximum quantity allowed per customer."
          );
          return false;
        } else {
          // Substract from the stock the quantity desired
          storeItem.stockQuantity -= quantityChangeDesired;
          // Updates the quantity on hands
          this.itemsMap.push(
            new ShoppingCartItem(storeItem, quantityChangeDesired)
          );
        }
      }
    } else if (quantityChangeDesired === -1) {
      // Item Removal Resolution
      if (shoppingCartItem.quantityOnHand + quantityChangeDesired <= 0) {
        // Revert the stock
        storeItem.stockQuantity += shoppingCartItem.quantityOnHand;
        // Remove Item from the shopping cart
        this.removeItem(storeItem);
      } else {
        // Adds the quantity back to the stock
        storeItem.stockQuantity += Math.abs(quantityChangeDesired);
        // Reduces the quantity of itens on hand
        shoppingCartItem.quantityOnHand -= Math.abs(quantityChangeDesired);
      }
    }
    // Saves the cart
    sessionStorage.setItem("shoppingCart", JSON.stringify(this));
    // Updates the storeItem Article if isHome allows
    if (isHome) {
      theStore.loadStoreItemArticle(storeItem.id);
    } else {
      this.displayShoppingCart();
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
          "shoppingCart.incrementDecrementItemQuantity( theStore.getStoreItem(" +
            currentItem.storeItem.id +
            ") , -1, false )"
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
          "shoppingCart.updateStoreItemQuantity( " +
            currentItem.storeItem.id +
            ", this.value )"
        );
        productQuantityDiv.appendChild(quantityInput);

        // [ > ] Creates a link to the cart
        let greaterThanLink = document.createElement("a");
        greaterThanLink.href = "javascript:void(0);";
        greaterThanLink.setAttribute(
          "onclick",
          "shoppingCart.incrementDecrementItemQuantity( theStore.getStoreItem(" +
            currentItem.storeItem.id +
            ") , 1, false )"
        );
        productQuantityDiv.appendChild(greaterThanLink);
        // Creates the Greater Then Symbol
        let greaterThanP = document.createElement("p");
        greaterThanP.textContent = ">";
        greaterThanLink.appendChild(greaterThanP);
      }
    }
  }

  /**
   * Method that handles the change of store item in the shopping cart section.
   * @param {number} storeItemId StoreItem Id.
   * @param {number} desiredQuantity (Optional) Desired quantity to be changed (Default = +1).
   */
  updateStoreItemQuantity(storeItemId, desiredQuantity = 1) {
    if (isNaN(desiredQuantity)) {
      // NaN Check
      alert("Provided quantity is not a number.");
      this.displayShoppingCart();
      return;
    } else {
      desiredQuantity = Number(desiredQuantity);
    }
    if (desiredQuantity == 0) {
      let storeItem = theStore.getStoreItem(storeItemId);
      let shoppingCartItem = this.findItem(storeItem);
      // Revert the stock
      storeItem.stockQuantity += shoppingCartItem.quantityOnHand;
      // Remove Item from the shopping cart
      this.removeItem(storeItem);
    } else {
      let storeItem = theStore.getStoreItem(storeItemId);
      let shoppingCartItem = this.findItem(storeItem);
      // Update to a chosen number
      if (storeItem.maxPerCustomer < desiredQuantity) {
        alert(
          "Could not exceeded maximum quantity allowed per customer.\nMaximum set instead."
        );
        // Removes from the stock the remaining quantity
        storeItem.stockQuantity -=
          storeItem.maxPerCustomer - shoppingCartItem.quantityOnHand;
        // Sets the maximum allawed
        shoppingCartItem.quantityOnHand +=
          storeItem.maxPerCustomer - shoppingCartItem.quantityOnHand;
      } else {
        // Quantity desired is higher than onHand
        if (desiredQuantity > shoppingCartItem.quantityOnHand) {
          // Removes from the stock the remaining quantity
          storeItem.stockQuantity -=
            desiredQuantity - shoppingCartItem.quantityOnHand;
          // Sets the new quantity desired
          shoppingCartItem.quantityOnHand = desiredQuantity;
        } else {
          // Checks if higher than zero
          if (desiredQuantity > 0) {
            // Quantity desired is lower than onHand
            // Adds the remaining quantity back to the stock
            storeItem.stockQuantity +=
              shoppingCartItem.quantityOnHand - desiredQuantity;
            // Sets the new quantity desired
            shoppingCartItem.quantityOnHand = desiredQuantity;
          } else {
            // Lower than zero
            storeItem.stockQuantity += shoppingCartItem.quantityOnHand;
            // Remove Item from the shopping cart
            this.removeItem(storeItem);
          }
        }
      }
    }

    this.displayShoppingCart();
  }
}

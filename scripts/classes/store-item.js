/**
 * Class that holds information about a Store Item
 * @class
 */
class StoreItem {
  /* Private Properties */
  #id;
  #name;
  #price;
  #stockQuantity;
  #maxPerCustomer;
  #category;
  #costOfShipping;
  #reviews;
  #reviewScore;
  #details;
  #imageURL;
  #frontpageDisplay;
  /**
   * StoreItem Default Constructor.
   * @constructor
   * @param {Number} id StoreItem internal id.
   * @param {String} name StoreItem Name.
   * @param {Number} price StoreItem Price.
   * @param {Number} stockQuantity StoreItem Quantity Available in Stock.
   * @param {Number} maxPerCustomer StoreItem Maximum Quantity permited to sell to a user.
   * @param {String} category StoreItem Category.
   * @param {Number} costOfShipping StoreItem Shipping Cost.
   * @param {Review[]} reviews Array of Review Objects.
   * @param {Number} reviewScore Current review average score.
   * @param {Object} details StoreItem object containing additional details.
   * @param {String} imageURL StoreItem image URL.
   * @param {boolean} frontpageDisplay Switch to allow an item to be displayed on the frontpage or not.
   */
  constructor(
    id,
    name,
    price,
    stockQuantity,
    maxPerCustomer,
    category,
    costOfShipping,
    reviews,
    reviewScore,
    details,
    imageURL,
    frontpageDisplay
  ) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#stockQuantity = stockQuantity;
    this.#maxPerCustomer = maxPerCustomer;
    this.#category = category;
    this.#costOfShipping = costOfShipping;
    this.#reviews = reviews;
    this.#reviewScore = reviewScore;
    this.#details = details;
    this.#imageURL = imageURL;
    this.#frontpageDisplay = frontpageDisplay;
  }

  /**
   * Getters and Setters
   */
  /**
   * Adds a Review to the StoreItem.
   * @method
   * @param {Review} review Review to be added.
   * @returns {number} The reviews array new length.
   */
  addReview(review) {
    return this.#reviews.push(review);
  }
  /**
   * Getter: StoreItem Id
   * @method
   * @returns {Number} StoreItem Id
   */
  getId() {
    return this.#id;
  }
  /**
   * Getter: StoreItem Name
   * @method
   * @returns {String} StoreItem Name
   */
  getName() {
    return this.#name;
  }
  /**
   * Getter: StoreItem price
   * @method
   * @returns {Number} StoreItem price
   */
  getPrice() {
    return this.#price;
  }
  /**
   * Getter: StoreItem stockQuantity
   * @method
   * @returns {Number} StoreItem stockQuantity
   */
  getStockQuantity() {
    return this.#stockQuantity;
  }
  /**
   * Getter: StoreItem maxPerCustomer
   * @method
   * @returns {Number} StoreItem maxPerCustomer
   */
  getMaxPerCustomer() {
    return this.#maxPerCustomer;
  }
  /**
   * Getter: StoreItem Category
   * @method
   * @returns {String} StoreItem Category
   */
  getCategory() {
    return this.#category;
  }
  /**
   * Getter: StoreItem costOfShipping
   * @method
   * @returns {Number} StoreItem costOfShipping
   */
  getCostOfShipping() {
    return this.#costOfShipping;
  }
  /**
   * Getter: StoreItem review instance
   * @method
   * @param {Number} index Review Index
   * @returns {Review} Review instance
   */
  getReview(index) {
    return this.#reviews[index];
  }
  /**
   * Getter: StoreItem reviewScore
   * @method
   * @returns {Number} reviewScore
   */
  getReviewScore() {
    return this.#reviewScore;
  }
  /**
   * Getter: StoreItem Reviews.length
   * @method
   * @returns {Number} Reviews.length
   */
  getReviewsQuantity() {
    return this.#reviews.length;
  }
  /**
   * Getter: StoreItem imageURL
   * @method
   * @returns {String} StoreItem imageURL
   */
  getImageURL() {
    return this.#imageURL;
  }
  /**
   * Getter: StoreItem frontpageDisplay
   * @method
   * @returns {boolean} StoreItem frontpageDisplay
   */
  isFrontpageDisplay() {
    return this.#frontpageDisplay;
  }

  /**
   * Increments stockQuantity property.
   * @method
   */
  addOneStockQuantity() {
    this.#stockQuantity++;
  }
  /**
   * Decrements stockQuantity property.
   * @method
   */
  subOneStockQuantity() {
    this.#stockQuantity--;
  }
  /**
   * Sets new value for stockQuantity property.
   * @method
   * @param {number} newValue Value to update the property
   */
  setStockQuantity(newValue) {
    this.#stockQuantity = newValue;
  }

  /**
   * Method that dynamically creates a div element contaning all info about a store item
   * @method
   * @returns {HTMLElement} A DOM div element containing all information of the store item
   */
  getStoreItemGrid() {
    // Creates the item div card
    let articleStoreItem = document.createElement("article");
    articleStoreItem.classList.add("store-item-article");
    articleStoreItem.classList.add(this.#id);
    articleStoreItem.id = this.#id;
    /**********
     * ITEM   *
     * HEADER *
     **********/
    // Creates a div header for item card
    let divItemHeader = document.createElement("div");
    divItemHeader.classList.add("store-item-article-header");
    // Creates a div to contain item stock and max purchase
    let divItemStock = document.createElement("div");
    divItemStock.classList.add("divItemStock");
    // Creates a em container for item stock and max purchase
    let emItemStock = document.createElement("em");
    emItemStock.classList.add("store-item-stock-em");
    // Creates a div to contain the item stock Quantity
    let divItemStockQuantity = document.createElement("div");
    divItemStockQuantity.classList.add("divItemStockQuantity");
    divItemStockQuantity.textContent = "In Stock: " + this.#stockQuantity;
    // Creates a div to contain the item max purchase per customer
    let divItemMaxPerCustomer = document.createElement("div");
    divItemMaxPerCustomer.classList.add("divItemMaxPerCustomer");
    divItemMaxPerCustomer.textContent = "Per customer: " + this.#maxPerCustomer;
    // Creates a div wrapper for reviews
    let divIemReviewWrapper = document.createElement("div");
    divIemReviewWrapper.classList.add("item-review-wrapper");
    // Adds a link to the item review
    let reviewLink = document.createElement("a");
    reviewLink.classList.add("store-item-review-link");
    reviewLink.href = "#";
    reviewLink.setAttribute(
      "onclick",
      "theStore.displayReviews(" + this.#id + ")"
    );
    // Creates a div to contain the reviews stars
    let divItemReviewsStars = document.createElement("div");
    divItemReviewsStars.classList.add("store-item-review-stars");
    // Calculates how many stars should we display per reviewscore
    let integerPart = Math.floor(this.#reviewScore); // Integer part = filled stars
    let fractionalPart = this.#reviewScore - integerPart; // Fractional part = half filled star
    let countStars = 0; // Counter for how many start was created
    // For each Integer part creates a filled star
    for (countStars; countStars < integerPart; countStars++) {
      getReviewStarImage(divItemReviewsStars, "filled");
    }
    // Adds a half-filled star if the fractional part is higher than 0.25
    if (fractionalPart >= 0.25 && fractionalPart < 1) {
      getReviewStarImage(divItemReviewsStars, "half");
      countStars++;
    }
    // Adds the remaining starts to reach 5 as empty
    while (countStars < 5) {
      getReviewStarImage(divItemReviewsStars, "empty");
      countStars++;
    }
    // Creates a div to contain the reviews quantity
    let divItemReviewsQuantity = document.createElement("div");
    divItemReviewsQuantity.classList.add("store-item-reviews-quantity");
    divItemReviewsQuantity.textContent =
      "(" +
      (this.#reviews.length == undefined ? 0 : this.#reviews.length) +
      ")";
    /********
     * ITEM *
     * BODY *
     ********/
    // Creates a div body to the item card
    let divItemBody = document.createElement("div");
    divItemBody.classList.add("store-item-article-body");
    // Creates a link to the item
    let aItemName = document.createElement("a");
    aItemName.href = "javascript:void(0);";
    aItemName.setAttribute(
      "onclick",
      "theStore.loadStoreItemArticleDetails(" + this.#id + ")"
    );
    // aItemName.textContent = this.name;
    // Creates figure tag for the Item
    let figureItem = document.createElement("figure");
    figureItem.classList.add("store-item-figure");
    // Creates figure caption tag for the Item
    let figureCaptionItem = document.createElement("figcaption");
    figureCaptionItem.classList.add("store-item-figure-caption");
    figureCaptionItem.textContent = this.#name;
    // Creates img Tag for the item
    let imgItem = document.createElement("img");
    imgItem.classList.add("store-item-img");
    imgItem.src = this.#imageURL;
    imgItem.alt = this.#name;
    // Creates em for +Details
    let emDetails = document.createElement("em");
    emDetails.classList.add("store-item-details");
    emDetails.textContent = "+Details";
    // Creates a div for the price
    let divItemPrice = document.createElement("div");
    divItemPrice.classList.add("store-item-price");
    // Display the current price taking in consideration the current selected currenty
    let currency = theStore.getCurrency(currentCurrencyIndex);
    divItemPrice.textContent = convertToSelectedCurrency(this.#price);
    // Creates a div for cart
    let divAddCart = document.createElement("div");
    divAddCart.classList.add("store-item-add-to-cart");
    // Creates a link to the cart
    let aAddCart = document.createElement("a");
    aAddCart.href = "javascript:void(0);";
    aAddCart.setAttribute(
      "onclick",
      "shoppingCart.updateShoppingCartItemQuantity( " +
        this.#id +
        "," +
        CART_QUANTITY_OPERATION.INCREMENT +
        "," +
        PAGE_CONTEXT.HOME +
        ")"
    );
    // Creates figure tag for the Cart
    let figureCart = document.createElement("figure");
    figureCart.classList.add("store-item-cart-figure");
    //figureCart.textContent = "Add to the Cart";
    // Creates img Tag for the Cart
    let imgCart = document.createElement("img");
    imgCart.classList.add("store-item-cart-image");
    imgCart.src = "./images/cart-plus-icon-white.png";
    imgCart.alt = "Add to the Cart";
    // Create div for cart text
    let divAddCartText = document.createElement("div");
    divAddCartText.classList.add("store-item-add-to-cart-text");
    divAddCartText.textContent = "Add to the Cart";

    // Item Tags relationship
    articleStoreItem.appendChild(divItemHeader); // <article "StoreItem"> <div "ItemHeader">
    articleStoreItem.appendChild(divItemBody); //   <article "StoreItem"> <div "ItemBody">
    // Header
    divItemHeader.appendChild(divItemStock); // <div "ItemHeader"> <div "ItemStock">
    divItemStock.appendChild(emItemStock); //                      <div "ItemStock"> <em "ItemStock">
    emItemStock.appendChild(divItemStockQuantity); //                                <em "ItemStock"> <div "ItemStockQuantity">
    emItemStock.appendChild(divItemMaxPerCustomer); //                               <em "ItemStock"> <div "ItemMaxPerCustomer">
    divItemHeader.appendChild(divIemReviewWrapper); //    <div "ItemHeader"> <div "ItemReviewWrapper">
    divIemReviewWrapper.appendChild(reviewLink); //                 <div "ItemReviewWrapper"> <a "reviewLink">
    reviewLink.appendChild(divItemReviewsStars); //                                          <a "reviewLink"> <div "ItemReviewsStars">
    reviewLink.appendChild(divItemReviewsQuantity); //                                       <a "reviewLink"> <div "temReviewsQuantity">
    // Body
    divItemBody.appendChild(aItemName); //    <div "ItemBody"> <a "ItemName">
    aItemName.appendChild(figureItem); //                      <a "ItemName"> <figure "Item">
    figureItem.appendChild(figureCaptionItem); //                             <figure "Item"> <figure "CaptionItem">
    figureItem.appendChild(imgItem); //                                       <figure "Item"> <img "Item">
    aItemName.appendChild(emDetails); //                       <a "ItemName"> <em "+Details">
    divItemBody.appendChild(divItemPrice); // <div "ItemBody"> <div "ItemPrice">
    divItemBody.appendChild(divAddCart); //   <div "ItemBody"> <div "AddCart">
    divAddCart.appendChild(aAddCart); //                       <div "AddCart"> <a "AddCart">
    aAddCart.appendChild(figureCart); //                                       <a "AddCart"> <figure "Cart">
    figureCart.appendChild(imgCart); //                                                      <figure "Cart"> <img "Cart">
    aAddCart.appendChild(divAddCartText); //                                   <a "AddCart"> <div "AddCartText">

    return articleStoreItem;
  }

  /**
   * Method that dynamically creates a article element contaning detailed info about a store item
   * @method
   * @returns {HTMLElement} A DOM div element containing detailed information of the store item
   */
  getStoreItemDetailsGrid() {
    // Creates the article card
    let articleStoreItem = document.createElement("article");
    articleStoreItem.classList.add("store-item-article-details");
    articleStoreItem.classList.add(this.#id);
    articleStoreItem.classList.add("article-back");
    articleStoreItem.id = this.#id;
    /**********
     * ITEM   *
     * HEADER *
     **********/
    // Creates a div header for item card
    let divItemHeader = document.createElement("div");
    divItemHeader.classList.add("store-item-article-header");
    articleStoreItem.appendChild(divItemHeader);
    // Creates a link to the item
    let aItemName = document.createElement("a");
    aItemName.href = "javascript:void(0);";
    aItemName.setAttribute(
      "onclick",
      "theStore.loadStoreItemArticle(" + this.#id + ")"
    );
    divItemHeader.appendChild(aItemName);
    // aItemName.textContent = this.name;
    // Creates figure tag for the Item
    let figureItem = document.createElement("figure");
    figureItem.classList.add("store-item-figure");
    aItemName.appendChild(figureItem);
    // Creates img Tag for the item
    let imgItem = document.createElement("img");
    imgItem.classList.add("store-item-img");
    imgItem.src = this.#imageURL;
    imgItem.alt = this.#name;
    figureItem.appendChild(imgItem);

    // Creates a link to the item
    let aSwitch = document.createElement("a");
    aSwitch.href = "javascript:void(0);";
    aSwitch.setAttribute(
      "onclick",
      "theStore.loadStoreItemArticle(" + this.#id + ")"
    );
    articleStoreItem.appendChild(aSwitch);
    // Creates figure tag for the flip icon
    let figureSwitch = document.createElement("figure");
    figureSwitch.classList.add("switch-figure");
    aSwitch.appendChild(figureSwitch);
    // Creates img Tag for the item
    let imgISwitch = document.createElement("img");
    imgISwitch.classList.add("switch-img");
    imgISwitch.src = "./images/switch-icon.png";
    imgISwitch.alt = "Switch Icon";
    figureSwitch.appendChild(imgISwitch);

    /********
     * ITEM *
     * BODY *
     ********/
    // Creates a div body to the item card
    let divItemBody = document.createElement("div");
    divItemBody.classList.add("store-item-article-body");
    articleStoreItem.appendChild(divItemBody);
    // Creates a div for the name
    let divItemName = document.createElement("div");
    divItemName.classList.add("store-item-details");
    divItemBody.appendChild(divItemName);
    let strongTag = document.createElement("strong");
    strongTag.textContent = "Product Name:";
    divItemName.appendChild(strongTag);
    let pTag = document.createElement("p");
    pTag.textContent = this.#name;
    divItemName.appendChild(pTag);
    // Creates a div for the price
    let divItemPrice = document.createElement("div");
    divItemPrice.classList.add("store-item-details");
    divItemBody.appendChild(divItemPrice);
    strongTag = document.createElement("strong");
    strongTag.textContent = "Price:";
    divItemPrice.appendChild(strongTag);
    pTag = document.createElement("p");
    let currency = theStore.getCurrency(currentCurrencyIndex);
    pTag.textContent = convertToSelectedCurrency(this.#price);
    divItemPrice.appendChild(pTag);
    // Now loop through all additional information
    for (const key in this.#details) {
      let divElement = document.createElement("div");
      divElement.classList.add("store-item-details");
      divItemBody.appendChild(divElement);
      strongTag = document.createElement("strong");
      strongTag.textContent = key + ":";
      divElement.appendChild(strongTag);
      pTag = document.createElement("p");
      // Weight Conversion
      if (key === "Weight") {
        // If the weight is higher than 1000grams display in kilograms
        if (this.#details[key] > 999) {
          pTag.textContent = convertWeight(
            this.#details[key] / 1000,
            "kilogram"
          );
        } else {
          // Else display in grams
          pTag.textContent = convertWeight(this.#details[key], "gram");
        }
      } else {
        pTag.textContent = this.#details[key];
      }
      divElement.appendChild(pTag);
    }
    // Display the current price taking in consideration the current selected currenty
    // Creates a div for cart
    let divAddCart = document.createElement("div");
    divAddCart.classList.add("store-item-add-to-cart");
    articleStoreItem.appendChild(divAddCart); // <div "ItemBody"> <div "AddCart">
    // Creates a link to the cart
    let aAddCart = document.createElement("a");
    aAddCart.href = "javascript:void(0);";
    aAddCart.setAttribute(
      "onclick",
      "shoppingCart.updateShoppingCartItemQuantity( " +
        this.#id +
        "," +
        CART_QUANTITY_OPERATION.INCREMENT +
        "," +
        PAGE_CONTEXT.HOME +
        ")"
    );
    divAddCart.appendChild(aAddCart); // <div "AddCart"> <a "AddCart">
    // Creates figure tag for the Cart
    let figureCart = document.createElement("figure");
    figureCart.classList.add("store-item-cart-figure");
    aAddCart.appendChild(figureCart); // <a "AddCart"> <figure "Cart">
    //figureCart.textContent = "Add to the Cart";
    // Creates img Tag for the Cart
    let imgCart = document.createElement("img");
    imgCart.classList.add("store-item-cart-image");
    imgCart.src = "./images/cart-plus-icon-white.png";
    imgCart.alt = "Add to the Cart";
    figureCart.appendChild(imgCart); // <figure "Cart"> <img "Cart">
    // Create div for cart text
    let divAddCartText = document.createElement("div");
    divAddCartText.classList.add("store-item-add-to-cart-text");
    divAddCartText.textContent = "Add to the Cart";
    aAddCart.appendChild(divAddCartText); // <a "AddCart"> <div "AddCartText">

    return articleStoreItem;
  }

  /**
   * Method that updates the StoreItem review average.
   */
  updateReviewAverage() {
    let reviewCount = 0;
    let totalScore = 0;
    // Iterate through all reviews
    for (let i = 0; i < this.#reviews.length; i++) {
      reviewCount++;
      totalScore += this.#reviews[i].rating;
    }
    this.#reviewScore = totalScore / reviewCount;
  }
}

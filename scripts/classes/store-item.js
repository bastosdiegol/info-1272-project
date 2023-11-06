/*
 * Class that holds information about a Store Item
 */
class StoreItem {
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
    description,
    imageURL,
    frontpageDisplay
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.maxPerCustomer = maxPerCustomer;
    this.category = category;
    this.costOfShipping = costOfShipping;
    this.reviews = reviews;
    this.reviewScore = reviewScore;
    this.description = description;
    this.imageURL = imageURL;
    this.frontpageDisplay = frontpageDisplay;
  }

  /* Method that dynamically creates a div element contaning all info about a store item
   * Returns: a div document element
   */
  getStoreItemGrid() {
    // Creates the item div card
    let divStoreItem = document.createElement("div");
    divStoreItem.classList = "divStoreItem";
    /**********
     * ITEM   *
     * HEADER *
     **********/
    // Creates a div header for item card
    let divItemHeader = document.createElement("div");
    divItemHeader.classList = "divItemHeader";
    // Creates a div to contain item stock and max purchase
    let divItemStock = document.createElement("div");
    divItemStock.classList = "divItemStock";
    // Creates a em container for item stock and max purchase
    let emItemStock = document.createElement("em");
    emItemStock.classList = "emItemStock";
    // Creates a div to contain the item stock Quantity
    let divItemStockQuantity = document.createElement("div");
    divItemStockQuantity.classList = "divItemStockQuantity";
    divItemStockQuantity.textContent = "In Stock: " + this.stockQuantity;
    // Creates a div to contain the item max purchase per customer
    let divItemMaxPerCustomer = document.createElement("div");
    divItemMaxPerCustomer.classList = "divItemMaxPerCustomer";
    divItemMaxPerCustomer.textContent = "Per customer: " + this.maxPerCustomer;
    // Creates a div to contain the reviews stars
    let divItemReviewsStars = document.createElement("div");
    divItemReviewsStars.classList = "divItemReviewsStars";
    // Calculates how many stars should we display per reviewscore
    let integerPart = Math.floor(this.reviewScore); // Integer part = filled stars
    let fractionalPart = this.reviewScore - integerPart; // Fractional part = half filled star
    let countStars = 0; // Counter for how many start was created
    // For each Integer part creates a filled star
    for (countStars; countStars < integerPart; countStars++) {
      this.addReviewStarImage(divItemReviewsStars, "filled");
    }
    // Adds a half-filled star if the fractional part is higher than 0.25
    if (fractionalPart >= 0.25 && fractionalPart < 1) {
      this.addReviewStarImage(divItemReviewsStars, "half");
      countStars++;
    }
    // Adds the remaining starts to reach 5 as empty
    while (countStars < 5) {
      this.addReviewStarImage(divItemReviewsStars, "empty");
      countStars++;
    }
    // Creates a div to contain the reviews quantity
    let divItemReviewsQuantity = document.createElement("div");
    divItemReviewsQuantity.classList = "divItemReviewsQuantity";
    // TODO: Fix the quantity of reviews
    // Quick conditional so I don't show (undefined)
    divItemReviewsQuantity.textContent =
      "(" + (this.reviews.length == undefined ? 0 : this.reviews.length) + ")";
    /********
     * ITEM *
     * BODY *
     ********/
    // Creates a div body to the item card
    let divItemBody = document.createElement("div");
    divItemBody.classList = "divItemBody";
    // Creates a link to the item
    let aItemName = document.createElement("a");
    aItemName.href = "./product.html?id=" + this.id;
    aItemName.target = "_self";
    // aItemName.textContent = this.name;
    // Creates figure tag for the Item
    let figureItem = document.createElement("figure");
    figureItem.classList = "figureItem";
    // Creates figure caption tag for the Item
    let figureCaptionItem = document.createElement("figcaption");
    figureCaptionItem.classList = "figureCaptionItem";
    figureCaptionItem.textContent = this.name;
    // Creates img Tag for the item
    let imgItem = document.createElement("img");
    imgItem.classList = "imgItem";
    imgItem.src = this.imageURL;
    imgItem.alt = this.name;
    // Creates a div for the price
    let divItemPrice = document.createElement("div");
    divItemPrice.classList = "divItemPrice";
    // TODO: Calculate the correct price accordingly to the current currency
    divItemPrice.textContent =
      "Price: " +
      theStore.currencies[currentCurrencyIndex].symbol +
      (this.price * theStore.currencies[currentCurrencyIndex].rate).toFixed(2);
    // Creates a div for cart
    let divAddCart = document.createElement("div");
    divAddCart.classList = "divAddCart";
    // Creates a link to the cart
    let aAddCart = document.createElement("a");
    aAddCart.href = "./cart.html?add=" + this.id;
    aAddCart.target = "_self";
    // Creates figure tag for the Cart
    let figureCart = document.createElement("figure");
    figureCart.classList = "figureCart";
    //figureCart.textContent = "Add to the Cart";
    // Creates img Tag for the Cart
    let imgCart = document.createElement("img");
    imgCart.classList = "imgCart";
    imgCart.src = "./images/cart-plus-icon-white.png";
    imgCart.alt = "Add to the Cart";
    // Create div for cart text
    let divAddCartText = document.createElement("div");
    divAddCartText.classList = "divAddCartText";
    divAddCartText.textContent = "Add to the Cart";

    // Item Tags relationship
    divStoreItem.appendChild(divItemHeader); // <div "StoreItem"> <div "ItemHeader">
    divStoreItem.appendChild(divItemBody); //   <div "StoreItem"> <div "ItemBody">
    // Header
    divItemHeader.appendChild(divItemStock); // <div "ItemHeader"> <div "ItemStock">
    divItemStock.appendChild(emItemStock); //                      <div "ItemStock"> <em "ItemStock">
    emItemStock.appendChild(divItemStockQuantity); //                                <em "ItemStock"> <div "ItemStockQuantity">
    emItemStock.appendChild(divItemMaxPerCustomer); //                               <em "ItemStock"> <div "ItemMaxPerCustomer">
    divItemHeader.appendChild(divItemReviewsStars); //    <div "ItemHeader"> <div "ItemReviewsStars">
    divItemHeader.appendChild(divItemReviewsQuantity); // <div "ItemHeader"> <div "temReviewsQuantity">
    // Body
    divItemBody.appendChild(aItemName); //    <div "ItemBody"> <a "ItemName">
    aItemName.appendChild(figureItem); //                      <a "ItemName"> <figure "Item">
    figureItem.appendChild(figureCaptionItem); //                             <figure "Item"> <figure "CaptionItem">
    figureItem.appendChild(imgItem); //                                       <figure "Item"> <img "Item">
    divItemBody.appendChild(divItemPrice); // <div "ItemBody"> <div "ItemPrice">
    divItemBody.appendChild(divAddCart); //   <div "ItemBody"> <div "AddCart">
    divAddCart.appendChild(aAddCart); //                       <div "AddCart"> <a "AddCart">
    aAddCart.appendChild(figureCart); //                                       <a "AddCart"> <figure "Cart">
    figureCart.appendChild(imgCart); //                                                      <figure "Cart"> <img "Cart">
    aAddCart.appendChild(divAddCartText); //                                   <a "AddCart"> <div "AddCartText">
    // TODO: remove Temporary
    divStoreItem.appendChild(document.createElement("br")); // <br>

    return divStoreItem;
  }

  /* Method that creates a start review image on a document element
   * Receives: a document element which will contain the image
   *           a type of star (filled, half or empty)
   */
  addReviewStarImage(documentElement, starType) {
    // Creates figure Tag
    let figureReviewStar = document.createElement("figure");
    figureReviewStar.classList = "figureStar";
    // Creates img Tag
    let imgReviewStar = document.createElement("img");
    imgReviewStar.classList = "imgReviewStar";
    switch (starType) {
      case "filled":
        imgReviewStar.src = "./images/review/star-icon.png";
        imgReviewStar.alt = "Review Filled Star";
        break;
      case "half":
        imgReviewStar.src = "./images/review/star-half-yellow-icon.png";
        imgReviewStar.alt = "Review Half-Filled Star";
        break;
      case "empty":
        imgReviewStar.src = "./images/review/star-line-yellow-icon.png";
        imgReviewStar.alt = "Review Empty Star";
        break;
      default:
        break;
    }
    // Tags relationship
    figureReviewStar.appendChild(imgReviewStar);
    documentElement.appendChild(figureReviewStar);
  }
}

/*
 * Class that holds information about a Store Item 
*/
class StoreItem{
    constructor(id, name, price, stockQuantity, maxPerCustomer, category, costOfShipping, reviews, reviewScore, description, imageURL, frontpageDisplay){
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
    getStoreItemGrid(){
        // Creates the item div card
        let divElementStoreItem = document.createElement("div");
        divElementStoreItem.id = "divElementStoreItem"+this.id;
        // Creates a div header for item card
        let divElementItemHeader = document.createElement("div");
        divElementItemHeader.classList = "divElementItemHeader";
        // Creates a div to contain item stock and max purchase
        let divElementItemStock = document.createElement("div");
        divElementItemStock.classList = "divElementItemStock";
        // Creates a div to contain the item stock Quantity
        let divElementItemStockQuantity = document.createElement("div");
        divElementItemStockQuantity.classList = "divElementItemStockQuantity";
        divElementItemStockQuantity.textContent = "Available: "+this.stockQuantity;
        // Creates a div to contain the item max purchase per customer
        let divElementItemMaxPerCustomer = document.createElement("div");
        divElementItemMaxPerCustomer.classList = "divElementItemMaxPerCustomer";
        divElementItemMaxPerCustomer.textContent = "Per customer: "+this.maxPerCustomer;
        // Creates a div to contain the reviews
        let divElementItemReviews = document.createElement("div");
        divElementItemReviews.classList = "divelementItemReviews";
        // TODO: Fix the quantity of reviews
        divElementItemReviews.textContent = "("+this.reviews.length+")";
        // Lets calculate how many stars should we display per reviewscore
        let integerPart = Math.floor(this.reviewScore); // Integer part = filled stars
        let fractionalPart = this.reviewScore - integerPart; // Fractional part = half filled star
        let countStars = 0; // Counter for how many start was created
        // For each Integer part creates a filled star
        for (countStars; countStars < integerPart; countStars++) {
            this.addReviewStarImage(divElementItemReviews, "filled");
        }
        // Adds a half-filled star if the fractional part is higher than 0.25
        if (fractionalPart >= 0.25 && fractionalPart < 1) {
            this.addReviewStarImage(divElementItemReviews, "half");
            countStars++;
        }
        // Adds the remaining starts to reach 5 as empty
        while(countStars < 5){
            this.addReviewStarImage(divElementItemReviews, "empty");
            countStars++;
        }
        // Creates a div body to the item card
        let divElementItemBody = document.createElement("div");
        divElementItemBody.classList = "divElementItemBody";
        // Creates a link to the item
        let aElementItemName = document.createElement("a");
        aElementItemName.href = "../product.html?id="+this.id;
        aElementItemName.target = "_self";
        // aElementItemName.textContent = this.name;
        // Creates figure tag for the Item
        let figureElementItem = document.createElement('figure');
        figureElementItem.class = "figureElementItem";
        // Creates img Tag for the item
        let imgElementItem = document.createElement('img');
        imgElementItem.class = "imgElementItem";
        imgElementItem.src = this.imageURL;
        imgElementItem.alt = this.name;
        // Creates a div for the price
        let divElementItemPrice = document.createElement("div");
        divElementItemPrice.classList = "divElementItemPrice";
        // TODO: Calculate the correct price accordingly to the current currency
        divElementItemPrice.textContent = window.currentCurrencySymbol + " " + this.price;
        // Creates a div for cart
        let divElementAddCart = document.createElement("div");
        divElementAddCart.classList = "divElementAddCart";
        // Creates a link to the cart
        let aElementAddCart = document.createElement("a");
        aElementAddCart.href = "../cart.html?add="+this.id;
        aElementAddCart.target = "_self";
        aElementAddCart.textContent = "Add to the cart";

        // Tags relations
        divElementStoreItem.appendChild(divElementItemHeader); // Appends the item header to the card div
        divElementItemHeader.appendChild(divElementItemStock); // Appends the stock div to the item header
        divElementItemStock.appendChild(divElementItemStockQuantity); // Appends the stock quantity to the stock div
        divElementItemStock.appendChild(divElementItemMaxPerCustomer); // Appends the max per customer to the stock div
        divElementItemHeader.appendChild(divElementItemReviews); // Appends reviews to the item header
        divElementStoreItem.appendChild(divElementItemBody); // Appends the item header to the card div
        figureElementItem.appendChild(imgElementItem); // Appends the item img to the figure
        aElementItemName.appendChild(figureElementItem); // Appends the item figure to the link
        divElementItemBody.appendChild(aElementItemName); // Appends the link to the item div body
        divElementItemBody.appendChild(divElementItemPrice); // Appends the price to the item div body
        divElementAddCart.appendChild(aElementAddCart); // Appends cart link to the cart element
        divElementItemBody.appendChild(divElementAddCart); // Appends car element to the item body
        // TODO: remove Temporary
        divElementStoreItem.appendChild(document.createElement("br"));

        return divElementStoreItem;
    }

    /* Method that creates a start review image on a document element
     * Receives: a document element which will contain the image
     *           a type of star (filled, half or empty)
     */
    addReviewStarImage(documentElement, starType){
        // Creates figure Tag
        let figureReviewStar = document.createElement('figure');
        figureReviewStar.classList = "figureStar";
        // Creates img Tag
        let imgReviewStar = document.createElement('img');
        imgReviewStar.classList = "imgReviewStar";
        switch (starType) {
            case "filled":
                imgReviewStar.src = "../images/review/star-icon.png";
                imgReviewStar.alt = "Review Filled Star";
                break;
            case "half":
                imgReviewStar.src = "../images/review/star-half-yellow-icon.png";
                imgReviewStar.alt = "Review Half-Filled Star";
                break;
            case "empty":
                imgReviewStar.src = "../images/review/star-line-yellow-icon.png";
                imgReviewStar.alt = "Review Empty Star";
                break;
            default:
                break;
        }
        // Tag relations
        figureReviewStar.appendChild(imgReviewStar);
        documentElement.appendChild(figureReviewStar);
    }
}

// My class now is visible to other files
export default StoreItem;
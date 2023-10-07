/*
 * Class that holds information about a Store Item 
*/
class StoreItem{
    constructor(id, name, price, stockQuantity, category, costOfShipping, reviews, reviewScore, description, imageURL){
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.costOfShipping = costOfShipping;
        this.reviews = reviews;
        this.reviewScore = reviewScore;
        this.description = description;
        this.imageURL = imageURL;
    }
}

// My class now is visible to other files
export default StoreItem;
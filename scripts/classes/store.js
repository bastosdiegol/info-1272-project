/**
 * Class that holds information about the Store
 * @class
 */
class Store {
  /* Private Properties */
  #name;
  #address;
  #postal;
  #phone;
  #email;
  #logo;
  #socials;
  #slogan;
  #categories;
  #storeItems;
  #currencies;
  /**
   * Default Constructor for Store Class
   * @constructor
   * @param {String} name Store Name.
   * @param {String} address Store Physical Address.
   * @param {String} postal Store Postal Code.
   * @param {String} phone Store Phone Number.
   * @param {String} email Store E-mail.
   * @param {String} logo URL for the Store Picture.
   * @param {Object[]} socials Object Array containing the Store Socials.
   * @param {String} socials.name Social Media Name.
   * @param {String} socials.url Store Social Media URL.
   * @param {String} slogan (Optional) Store Slogan - Sub-title.
   * @param {Array<string>} Store (Optional) Categories.
   * @param {StoreItem[]} storeItems (Optional) Object Array containing all store items.
   * @param {Currency[]} currencies (Optional) Object Array containing all currencies used.
   */
  constructor(
    name,
    address,
    postal,
    phone,
    email,
    logo,
    socials,
    slogan = "",
    categories = [],
    storeItems = [],
    currencies = []
  ) {
    this.#name = name;
    this.#slogan = slogan;
    this.#address = address;
    this.#postal = postal;
    this.#phone = phone;
    this.#email = email;
    this.#logo = logo;
    this.#socials = socials;
    this.#categories = categories;
    this.#storeItems = storeItems;
    this.#currencies = currencies;
  }

  /**
   * Getters and Setters
   */
  /**
   * Adds a StoreItem to the Store.
   * @method
   * @param {StoreItem} storeItem StoreItem to be added.
   * @returns {number} The storeItem array new length.
   */
  addStoreItem(storeItem) {
    return this.#storeItems.push(storeItem);
  }

  /**
   * Adds a Currency to the Store.
   * @method
   * @param {Currency} currency Currency to be added.
   * @returns {number} The currency array new length.
   */
  addCurrency(currency) {
    return this.#currencies.push(currency);
  }

  /**
   * Getter: Store Name
   * @method
   * @returns {String} Store Name
   */
  getStoreName() {
    return this.#name;
  }

  /**
   * Getter: Store Slogan
   * @method
   * @returns {String} Store Slogan
   */
  getStoreSlogan() {
    return this.#slogan;
  }

  /**
   * Getter: Store Name + Slogan
   * @method
   * @returns {String} String with Name and Slogan concatenated
   */
  getStoreNameAndSlogan() {
    return this.#name + " - " + this.#slogan;
  }

  /**
   * Getter: Store Logo
   * @method
   * @returns {String} Path to Store Logo File
   */
  getStoreLogo() {
    return this.#logo;
  }

  /**
   * Method that finds a store item and return it
   * @method
   * @param {Number} storeItemId A storeItem id
   * @returns {StoreItem} A storeItem object or null if not found
   */
  getStoreItem(storeItemId) {
    for (let i = 0; i < this.#storeItems.length; i++) {
      if (this.#storeItems[i].id === storeItemId) {
        return this.#storeItems[i];
      }
    }
    return null;
  }

  /**
   * Method that finds a store item and return it
   * @method
   * @param {Number} currencyIndex A Currency array index
   * @returns {Currency} A Currency object or null if not found
   */
  getCurrency(currencyIndex) {
    if (this.#currencies.length > currencyIndex) {
      return this.#currencies[currencyIndex];
    } else {
      return null;
    }
  }

  /**
   * Method that dynamically generate theStory categories based on the current storeItems
   * @method
   */
  defineCategories() {
    // Clears the array
    this.#categories = [];
    // Loop for each existing storeItem
    for (let i = 0; i < this.#storeItems.length; i++) {
      // Checks if the current item category already exists in categories array
      if (!this.#categories.includes(this.#storeItems[i].category)) {
        // If not push it to the array
        this.#categories.push(this.#storeItems[i].category);
      }
    }
  }

  /**
   * Method that dynamically creates a div element containing all necessary links for navigation
   * @method
   * @returns {HTMLUListElement} A DOM ul Element containing all categories and its links
   */
  getNavBarDivElement() {
    // Creates ul Tag
    let ulElementCategories = document.createElement("ul");
    ulElementCategories.classList.add("nav-list-ul");
    // Loop to dynamically create nav bar with categories
    for (let i = 0; i < this.#categories.length; i++) {
      // Checks if the first category
      if (i == 0) {
        // If first, then adds Home category
        // Creates a li tag
        let liElementCategory = document.createElement("li");
        liElementCategory.classList.add("nav-list-item-li");
        ulElementCategories.appendChild(liElementCategory);
        // Creates hyperlink Tag
        let aCategory = document.createElement("a");
        aCategory.classList.add("nav-list-item-link-a");
        aCategory.href = "#";
        aCategory.setAttribute("onclick", "theStore.loadStoreItems()");
        // aCategory.href = "./index.html";
        // aCategory.target = "_self";
        aCategory.textContent = "Home";
        // Adds the Home Category to the div
        liElementCategory.appendChild(aCategory);
      }
      // Creates a li tag
      let liElementCategory = document.createElement("li");
      liElementCategory.classList.add("nav-list-item-li");
      ulElementCategories.appendChild(liElementCategory);
      // Creates hyperlink Tag
      let aCategory = document.createElement("a");
      aCategory.classList.add("nav-list-item-link-a");
      aCategory.href = "#";
      aCategory.setAttribute("onclick", "theStore.loadStoreItems(" + i + ")");
      // aCategory.href = "./category.html?id=" + i;
      // aCategory.target = "_self";
      aCategory.textContent = this.#categories[i];
      liElementCategory.appendChild(aCategory);
    }
    return ulElementCategories;
  }

  /**
   * Method that dynamically creates a select option with all currencies available.
   * @method
   * @returns {HTMLUListElement} DOM Div element containing the Select Input element.
   */
  getCurrenciesSelect() {
    // Creates a div wrapper
    let currenciesDiv = document.createElement("div");
    currenciesDiv.classList.add("currency-select-div");
    // Creates the select label
    let currenciesLabel = document.createElement("label");
    currenciesLabel.classList.add("currency-select-label");
    currenciesLabel.htmlFor = "currency-select";
    currenciesLabel.textContent = "Currency:";
    currenciesDiv.appendChild(currenciesLabel);
    // Creates figure tag for the Item
    let figureFlag = document.createElement("figure");
    figureFlag.classList.add("flag-figure");
    // Creates img Tag for the item
    let imgFlag = document.createElement("img");
    imgFlag.id = "currency-flag-img";
    imgFlag.classList.add("flag-img");
    imgFlag.src = this.#currencies[currentCurrencyIndex].flag;
    imgFlag.alt = this.#currencies[currentCurrencyIndex].name;
    figureFlag.appendChild(imgFlag);
    currenciesDiv.appendChild(figureFlag);
    // Creates the select element
    let currenciesSelect = document.createElement("select");
    currenciesSelect.title = "Currency Select";
    currenciesSelect.name = "currency-select";
    currenciesSelect.classList.add("currency-select");
    // currenciesSelect.onchange = function () {
    //   this.setNewDefaultCurrency();
    // };
    currenciesSelect.setAttribute(
      "onchange",
      "theStore.setNewDefaultCurrency(this.value)"
    );
    currenciesDiv.appendChild(currenciesSelect);
    // Iterate through all currencies
    for (let i = 0; i < this.#currencies.length; i++) {
      // Creates each option
      let currencyOption = document.createElement("option");
      currencyOption.classList.add("currency-option");
      currencyOption.classList.add(
        "currency-option-" + this.#currencies[i].name
      );
      currencyOption.value = this.#currencies[i].name;
      currencyOption.text = this.#currencies[i].name;
      if (currentCurrencyIndex == i) {
        currencyOption.selected = true;
      }
      currenciesSelect.appendChild(currencyOption);
    }
    // Return the div wrapper containing the select
    return currenciesDiv;
  }

  /**
   * Method that sets a new currency as a default currency for the store.
   * @method
   * @param {String} currency Name of the selected currency.
   */
  setNewDefaultCurrency(currency) {
    // console.log("setNewDefaultCurrency(" + currency + ")");
    // Iterate through all the currencies
    for (let i = 0; i < this.#currencies.length; i++) {
      // Checks if the currency is matching
      if (this.#currencies[i].name === currency) {
        // Update the currency index
        currentCurrencyIndex = i;
        // Set the value on the session
        localStorage.setItem("currentCurrencyIndex", i);
        // Get the flag img
        let flagImg = document.getElementById("currency-flag-img");
        flagImg.src = this.#currencies[currentCurrencyIndex].flag;
        // Load current context
        this.loadMainSectionContext();
      }
    }
    return null;
  }

  /**
   * Method that sets a string as a new page title.
   * @method
   * @param {String} newTitle New Store Title.
   */
  setWebsiteTitle(newTitle) {
    // Gets <title> element
    let titleElements = document.getElementsByTagName("title");
    // Checks if any <title> elements were found
    if (titleElements.length > 0) {
      // Gets the first <title> element
      let titleElement = titleElements[0];
      // Updates the title - With Category
      titleElement.textContent = newTitle;
    }
  }

  /**
   * Method that sets a string as a new page description.
   * @method
   * @param {String} newDescription New Page Description.
   */
  setPageDescription(newDescription) {
    // Gets the page Description and Updates its textContent
    document.getElementById("page-content-desc").textContent = newDescription;
  }

  /**
   * Method that load all store items.
   * If no category is passed by parameter will display all items
   *    But If a item has frontpageDisplay variable set as false it won't show
   * If a category is passed by parameter only items that belongs to that category are going to be loaded
   * @method
   * @param {Number=} category Category Id or null for Home Page.
   */
  loadStoreItems(category = null) {
    // Sets current page context
    currentPageContext = PAGE_CONTEXT.HOME;
    // Gets the Store Item Section
    let section = document.getElementById("store-items-section");
    // Clear the section
    while (section.firstChild) {
      section.removeChild(section.lastChild);
    }
    // Loop to dynamically insert store items into grid div
    for (let i = 0; i < this.#storeItems.length; i++) {
      // Temp variable to handle the item
      let theItem = this.#storeItems[i];
      // Checks if the grid is request for frontpage
      if (category == null) {
        // Checks if the item should be displayed at frontpage
        if (theItem.frontpageDisplay) {
          // Gets the current item card information
          section.appendChild(theItem.getStoreItemGrid());
        }
      } else {
        // Category Items request
        // Checks if the item category matches the category requested
        if (theItem.category == this.#categories[category]) {
          // Gets the current item card information
          section.appendChild(theItem.getStoreItemGrid());
        }
      }
    }

    // Now to Update the Store Title and Page Description
    // Checks if its Home Page of Category Page
    if (category != null) {
      // Updates the title - With Category
      this.setWebsiteTitle(
        this.#name + " - Category: " + this.#categories[category]
      );
      // Updates the page description
      this.setPageDescription(this.#categories[category] + ":");
    } else {
      // Updates the title
      this.setWebsiteTitle(this.#name + " - " + this.#slogan);
      // Updates the page description
      this.setPageDescription("Store Items:");
    }
  }

  /**
   * Method that changes a store item article and display its INITIAL information.
   * @method
   * @param {Number} storeItemId Store Item Id.
   */
  loadStoreItemArticle(storeItemId) {
    // Gets the store item
    let storeItem = this.getStoreItem(storeItemId);
    // Checks if it was found
    if (storeItem != null) {
      // Gets the Store Item Article
      let article = document.getElementById(storeItemId);
      // Clears the current article
      while (article.firstChild) {
        article.removeChild(article.lastChild);
      }
      // Replaces it with the Details article
      article.replaceWith(storeItem.getStoreItemGrid());
    }
  }

  /**
   * Method that changes a store item article and display ADDITIONAL information.
   * @method
   * @param {Number} storeItemId Store Item Id.
   */
  loadStoreItemArticleDetails(storeItemId) {
    // Gets the store item
    let storeItem = this.getStoreItem(storeItemId);
    // Checks if it was found
    if (storeItem != null) {
      // Gets the Store Item Article
      let article = document.getElementById(storeItemId);
      // Clears the current article
      while (article.firstChild) {
        article.removeChild(article.lastChild);
      }
      // Replaces it with the Details article
      article.replaceWith(storeItem.getStoreItemDetailsGrid());
    }
  }

  /**
   * Method that dynamically creates a div element with all socials available.
   * @method
   * @returns {HTMLUListElement} DOM Div element containing all socials links.
   */
  getStoreSocialsDivElement() {
    // Creates div Tag for each Socials
    let divElementSocials = document.createElement("div");
    divElementSocials.classList.add("socials-div");
    // Loop to dynamically create each social network link
    for (const KEY in this.#socials) {
      const SOCIAL = this.#socials[KEY];
      // Creates hyperlink Tag
      let aFooterSocial = document.createElement("a");
      aFooterSocial.href = SOCIAL.url;
      aFooterSocial.target = "_blank";
      // Creates figure Tag
      let figureFooterSocial = document.createElement("figure");
      figureFooterSocial.id = "figureFooter" + SOCIAL.name;
      // Creates img Tag
      let imgFooterSocial = document.createElement("img");
      imgFooterSocial.id = "imgFooter" + SOCIAL.name;
      imgFooterSocial.src = "./images/socials/" + SOCIAL.name + ".png";
      imgFooterSocial.alt = "Company " + SOCIAL.name;
      // Tags Relations
      figureFooterSocial.appendChild(imgFooterSocial); // Appends img to figure
      aFooterSocial.appendChild(figureFooterSocial); // Appends figure to a
      divElementSocials.appendChild(aFooterSocial); // Appends a to div
    }
    return divElementSocials;
  }

  /**
   * Method that loads the correct main section context accordingly with the current page context.
   * @method
   */
  loadMainSectionContext() {
    switch (currentPageContext) {
      case PAGE_CONTEXT.HOME:
        this.loadStoreItems();
        break;
      case PAGE_CONTEXT.SHOPPING_CART:
        shoppingCart.displayShoppingCart();
        break;
      case PAGE_CONTEXT.REVIEW:
        this.displayReviews(lastVisitedProduct);
        break;
      default:
        break;
    }
  }

  /**
   * Display all reviews from a specified StoreItem.
   * @method
   * @param {number} storeItemId Store Item ID which reviews should be loaded.
   */
  displayReviews(storeItemId) {
    // Sets current Page Context
    currentPageContext = PAGE_CONTEXT.REVIEW;
    // Sets last visited product
    lastVisitedProduct = storeItemId;
    // Gets the Store Item Section
    let section = document.getElementById("store-items-section");
    // Gets the Store Item
    let storeItem = this.getStoreItem(storeItemId);
    // Clear the section
    while (section.firstChild) {
      section.removeChild(section.lastChild);
    }

    // Now to Update the Store Title and Page Description
    this.setWebsiteTitle(
      theStore.getStoreName() + " - " + storeItem.name + " Reviews"
    );
    this.setPageDescription("Customer Reviews:");

    // Validade if the item has a review
    if (storeItem.reviews.length === 0) {
    }
    // Load the Item Details
    // Product Wrapper Div
    let productWrapperDiv = document.createElement("div");
    productWrapperDiv.classList.add("product-wrapper");
    section.appendChild(productWrapperDiv);
    // Product Image Div
    let productImageDiv = document.createElement("div");
    productImageDiv.classList.add("product-image-wrapper");
    productWrapperDiv.appendChild(productImageDiv);
    // Creates figure tag for the Item
    let figureItem = document.createElement("figure");
    figureItem.classList.add("product-figure");
    productImageDiv.appendChild(figureItem);
    // Creates img Tag for the item
    let imgItem = document.createElement("img");
    imgItem.classList.add("cart-product-img");
    imgItem.src = storeItem.imageURL;
    imgItem.alt = storeItem.name;
    figureItem.appendChild(imgItem);
    // Creates a div for the name
    let productNameDiv = document.createElement("div");
    productNameDiv.classList.add("product-name");
    productWrapperDiv.appendChild(productNameDiv);
    let productNameP = document.createElement("p");
    productNameP.textContent = storeItem.name;
    productNameDiv.appendChild(productNameP);
    // Creates a div for the overall score
    let productScoreDiv = document.createElement("div");
    productScoreDiv.classList.add("product-score");
    productWrapperDiv.appendChild(productScoreDiv);
    // Creates a div to contain the reviews stars
    let divItemReviewsStars = document.createElement("div");
    divItemReviewsStars.classList.add("store-item-review-stars");
    // Calculates how many stars should we display per reviewscore
    let integerPart = Math.floor(storeItem.reviewScore); // Integer part = filled stars
    let fractionalPart = storeItem.reviewScore - integerPart; // Fractional part = half filled star
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
    productScoreDiv.appendChild(divItemReviewsStars);
    // Adds the remaining starts to reach 5 as empty
    while (countStars < 5) {
      getReviewStarImage(divItemReviewsStars, "empty");
      countStars++;
    }
    let productScoreP = document.createElement("p");
    productScoreP.textContent = storeItem.reviewScore.toFixed(1) + " out of 5";
    productScoreDiv.appendChild(productScoreP);
    // Calculates Star Percentages
    let percentageArray = this.calculateStarPercentage(storeItem);
    for (let i = 5; i >= 1; i--) {
      // Creates the Wrapper
      let starReviewWrapper = document.createElement("div");
      starReviewWrapper.classList.add("star-review-wapper");
      productWrapperDiv.appendChild(starReviewWrapper);
      // Creates the Star Description
      let starDescription = document.createElement("p");
      starDescription.classList.add("star-description");
      if (i === 1) {
        starDescription.textContent = i + " Star";
      } else {
        starDescription.textContent = i + " Stars";
      }
      starReviewWrapper.appendChild(starDescription);
      // Creates the percentage progress
      let starPercentageProgress = document.createElement("progress");
      starPercentageProgress.classList.add("star-percentage-progress");
      starPercentageProgress.max = 100;
      starPercentageProgress.value = Number.isNaN(percentageArray.get(i))
        ? 0
        : percentageArray.get(i);
      starReviewWrapper.appendChild(starPercentageProgress);
      // Creates the percentage Description
      let percentageDescription = document.createElement("p");
      percentageDescription.classList.add("percentage-description");
      percentageDescription.textContent =
        (Number.isNaN(percentageArray.get(i))
          ? 0
          : percentageArray.get(i).toFixed(1)) + "%";
      starReviewWrapper.appendChild(percentageDescription);
    }

    // Creates a div for all reviews
    let reviewsWrapper = document.createElement("div");
    reviewsWrapper.classList.add("reviews-wrapper");
    section.appendChild(reviewsWrapper);
    if (storeItem.reviews.length == 0) {
      // No reviews description
      let noReviewsDescription = document.createElement("p");
      noReviewsDescription.classList.add("no-reviews-description");
      noReviewsDescription.textContent = "This product has no reviews.";
      reviewsWrapper.appendChild(noReviewsDescription);
    } else {
      // Loop to dynamically insert store items into grid div
      for (let i = storeItem.reviews.length - 1; i >= 0; i--) {
        // Creates a div for the review
        let reviewWrapper = document.createElement("div");
        reviewWrapper.classList.add("review-wrapper");
        reviewsWrapper.appendChild(reviewWrapper);
        // Creates the review header
        let reviewHeader = document.createElement("div");
        reviewHeader.classList.add("review-header");
        reviewWrapper.appendChild(reviewHeader);
        // Creates the review rating
        let reviewRating = document.createElement("div");
        reviewRating.classList.add("review-rating");
        reviewHeader.appendChild(reviewRating);
        // Add Filled stars
        for (let j = 0; j < storeItem.reviews[i].rating; j++) {
          getReviewStarImage(reviewRating, "filled");
        }
        // Add Blank stars
        for (let j = 0; j < 5 - storeItem.reviews[i].rating; j++) {
          getReviewStarImage(reviewRating, "empty");
        }
        // Creates the review Title
        let reviewTitle = document.createElement("p");
        reviewTitle.classList.add("review-title");
        reviewTitle.textContent = storeItem.reviews[i].headline;
        reviewHeader.appendChild(reviewTitle);
        // Creates the review description
        let reviewDescription = document.createElement("p");
        reviewDescription.classList.add("review-description");
        reviewDescription.textContent = storeItem.reviews[i].description;
        reviewWrapper.appendChild(reviewDescription);
      }
    }

    // Appends the review form submission
    section.appendChild(this.createReviewForm());
  }

  /**
   * Method that calculates the percentage for each review star.
   * @param {StoreItem} storeItem StoreItem from which the percentages will be calculated.
   * @returns {Map<number, number>} Array containing the percentagem for each star.
   */
  calculateStarPercentage(storeItem) {
    // Array that will store how many different stars appear
    let starCount = [0, 0, 0, 0, 0, 0];
    // Final Map with percentages
    let percentageMap = new Map();
    // Loop through all reviews and increments the star count
    for (let i = 0; i < storeItem.reviews.length; i++) {
      starCount[storeItem.reviews[i].rating]++;
    }
    // Loop through starCount array and stores the percentages
    for (let i = 1; i < starCount.length; i++) {
      percentageMap.set(i, (starCount[i] * 100) / storeItem.reviews.length);
    }
    return percentageMap;
  }

  /**
   * Method that creates a form for .
   * @method
   * @returns {HTMLUListElement} DOM Div element containing the Select Input element.
   */
  createReviewForm() {
    // Creates the form
    let formDiv = document.createElement("div");
    formDiv.id = "review-form";
    formDiv.classList.add("review-form");
    // Creates the fildset
    let fieldset = document.createElement("fieldset");
    fieldset.classList.add("review-fieldset");
    formDiv.appendChild(fieldset);
    let legend = document.createElement("legend");
    legend.textContent = "Submit a review:";
    fieldset.appendChild(legend);
    // Creates the review score
    let scoreLabel = document.createElement("label");
    scoreLabel.classList.add("review-score-label");
    scoreLabel.htmlFor = "score";
    scoreLabel.textContent = "Score:";
    fieldset.appendChild(scoreLabel);
    // Creates the starts for review score
    let scoreStarsDiv = document.createElement("div");
    scoreStarsDiv.classList.add("score-stars-form");
    fieldset.appendChild(scoreStarsDiv);
    let hiddenScore = document.createElement("input");
    hiddenScore.id = "hidden-score-star";
    hiddenScore.type = "hidden";
    hiddenScore.value = 1;
    fieldset.appendChild(hiddenScore);
    for (let i = 1; i <= 5; i++) {
      // Adds a link to set a review
      let reviewScoreLink = document.createElement("a");
      reviewScoreLink.classList.add("store-item-review-link");
      reviewScoreLink.href = "#";
      reviewScoreLink.setAttribute(
        "onclick",
        "theStore.setReviewScoreForm(" + i + ")"
      );
      let star;
      if (i == 1) {
        star = getReviewStarImage(reviewScoreLink, "filled");
      } else {
        star = getReviewStarImage(reviewScoreLink, "empty");
      }
      star.id = "star-" + i;
      star.classList.add("star-" + i);
      star.firstChild.classList.add("score-star-form");
      scoreStarsDiv.appendChild(reviewScoreLink);
    }

    // Creates the review headline input
    let headlineLabel = document.createElement("label");
    headlineLabel.classList.add("review-headline-label");
    headlineLabel.htmlFor = "headline";
    headlineLabel.textContent = "Headline:";
    fieldset.appendChild(headlineLabel);
    let headlineInput = document.createElement("input");
    headlineInput.type = "text";
    headlineInput.classList.add("review-headline-input");
    headlineInput.name = "headline";
    headlineInput.id = "headline";
    headlineInput.placeholder = "Your title.";
    fieldset.appendChild(headlineInput);
    // Creates the review description textarea
    let descriptionLabel = document.createElement("label");
    descriptionLabel.classList.add("review-description-label");
    descriptionLabel.htmlFor = "description";
    descriptionLabel.textContent = "Description:";
    fieldset.appendChild(descriptionLabel);
    let descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.classList.add("review-description-textarea");
    descriptionTextArea.name = "description";
    descriptionTextArea.id = "description";
    descriptionTextArea.placeholder = "Write your review here.";
    descriptionTextArea.cols = 40;
    descriptionTextArea.rows = 4;
    fieldset.appendChild(descriptionTextArea);
    // Creates the submit button
    let submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit";
    submit.addEventListener("click", function (event) {
      theStore.createReview(
        lastVisitedProduct,
        hiddenScore.value,
        headlineInput.value,
        descriptionTextArea.value
      );
    });
    fieldset.appendChild(submit);

    return formDiv;
  }

  /**
   * Method that creates a new instance of a review and adds it to a StoreItem.
   * @param {number} storeItemId StoreItem which will receive the review.
   * @param {number} score Review rating.
   * @param {String} headline Review title.
   * @param {String} description Review text content.
   */
  createReview(storeItemId, score, headline, description) {
    let storeItem = this.getStoreItem(storeItemId);
    let newReview = new Review(Number(score), headline, description);
    storeItem.reviews.push(newReview);
    storeItem.updateReviewAverage();

    document.getElementById("hidden-score-star").value = 1;
    document.getElementById("headline").textContent = "";
    document.getElementById("description").textContent = "";

    this.displayReviews(storeItemId);
  }

  /**
   * Function that changes the hidden score in form review.
   * @param {number} score New Score.
   */
  setReviewScoreForm(score) {
    let hiddenScore = document.getElementById("hidden-score-star");
    // Iterate through all stars
    for (let i = 1; i <= 5; i++) {
      // Checks if its to be a Filled Star
      if (i <= score) {
        // Checks if its already filled then skip
        if (hiddenScore.value > score) {
          continue;
        } else {
          // Else change the image src
          let currentStarImage = document.getElementById("star-" + i);
          currentStarImage.firstChild.src = "./images/review/star-icon.png";
        }
      } else {
        // It should be empty, then change its source
        let currentStarImage = document.getElementById("star-" + i);
        currentStarImage.firstChild.src =
          "./images/review/star-line-yellow-icon.png";
      }
    }
    // Finally updates the form hidden score
    hiddenScore.value = score;
  }
}

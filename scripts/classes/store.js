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
   * Method that dynamically creates a div element contaning all necessary store items that should appear at specified page
   * @method
   * @param {Number} category ID for a specified story category, empty (or null) for frontpage
   * @returns {HTMLUListElement} A DOM Section Element containing a grid of store items
   */
  getStoreItemsGridDivElement(category = null) {
    // Creates div Tag
    let sectionElementStoreItemGrid = document.createElement("section");
    sectionElementStoreItemGrid.id = "store-items-section";
    sectionElementStoreItemGrid.classList.add("store-items-section");

    // Loop to dynamically insert store items into grid div
    for (let i = 0; i < this.#storeItems.length; i++) {
      // Temp variable to handle the item
      let theItem = this.#storeItems[i];
      // Checks if the grid is request for frontpage
      if (category == null) {
        // Checks if the item should be displayed at frontpage
        if (theItem.frontpageDisplay) {
          // Gets the current item card information
          sectionElementStoreItemGrid.appendChild(theItem.getStoreItemGrid());
        }
      } else {
        // Category Items request
        // Checks if the item category matches the category requested
        if (theItem.category == this.#categories[category]) {
          // Gets the current item card information
          sectionElementStoreItemGrid.appendChild(theItem.getStoreItemGrid());
        }
      }
    }
    return sectionElementStoreItemGrid;
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
        // Clean the Store Item Section
        let sectionElement = document.getElementById("store-items-section");
        // Remove all Section element children
        while (sectionElement.firstChild) {
          sectionElement.removeChild(sectionElement.lastChild);
        }
        // Updates the store items section with new currencies
        sectionElement.replaceWith(this.getStoreItemsGridDivElement());
      }
    }
    return null;
  }

  /**
   * Method that prepares the page for a new set of Store Items.
   * Updates the page title and page description and replace the main section with a new one
   * @method
   * @param {Number} category Category Id or null for Home Page.
   */
  loadStoreItems(category = null) {
    // Gets the Store Item Section
    let section = document.getElementById("store-items-section");
    // Clear the section
    while (section.firstChild) {
      section.removeChild(section.lastChild);
    }
    // Appends the new section
    section.replaceWith(this.getStoreItemsGridDivElement(category));

    // Now to Update the Store Title and Page Description
    // Gets <title> element
    let titleElements = document.getElementsByTagName("title");
    // Gets the page Description
    let pageDescription = document.getElementById("page-content-desc");
    // Checks if any <title> elements were found
    if (titleElements.length > 0) {
      // Gets the first <title> element
      let titleElement = titleElements[0];
      // Checks if its Home Page of Category Page
      if (category != null) {
        // Updates the title - With Category
        titleElement.textContent =
          this.#name + " - " + this.#categories[category];
        // Updates the page description
        pageDescription.textContent = this.#categories[category] + ":";
      } else {
        // Updates the title
        titleElement.textContent = this.#name + " - " + this.#slogan;
        // Updates the page description
        pageDescription.textContent = "Store Items:";
      }
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
   * Static Method that receives a Number and convert it to the current selected currency.
   * @static @method
   * @param {number} value Value to be converted.
   * @returns {String} Value in the corresponding selected currency.
   */
  static convertToSelectedCurrency(value) {
    let currency = theStore.getCurrency(currentCurrencyIndex);
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency.name,
    }).format(value * currency.rate);
  }
}

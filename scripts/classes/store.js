/*
 * Class that holds information about the Store
 */
class Store {
  constructor(name, address, postal, phone, email, logo, socials) {
    this.name = name;
    this.address = address;
    this.postal = postal;
    this.phone = phone;
    this.email = email;
    this.logo = logo;
    this.socials = socials;
    this.categories = [];
    this.storeItems = [];
    this.currencies = [];
  }

  /* Method that dynamically generate theStory categories based on the storeItems categories
   * Returns nothing, but fills the Store.categories array with values
   */
  defineCategories() {
    // Clears the array
    this.categories = [];
    // Loop for each existing storeItem
    for (let i = 0; i < this.storeItems.length; i++) {
      // Checks if the current item category already exists in categories array
      if (!this.categories.includes(this.storeItems[i].category)) {
        // If not push it to the array
        this.categories.push(this.storeItems[i].category);
      }
    }
  }

  /* Method that dynamically creates a div element containing all necessary links for navigation
   * Returns: a div document element
   */
  getNavBarDivElement() {
    // Creates ul Tag
    let ulElementCategories = document.createElement("ul");
    ulElementCategories.classList.add("nav-list-ul");
    // Loop to dynamically create nav bar with categories
    for (let i = 0; i < this.categories.length; i++) {
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
        aCategory.href = "./index.html";
        aCategory.target = "_self";
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
      aCategory.href = "./category.html?id=" + i;
      aCategory.target = "_self";
      aCategory.textContent = this.categories[i];
      liElementCategory.appendChild(aCategory);
    }
    return ulElementCategories;
  }

  /* Method that dynamically creates a div element contaning all necessary store items that should appear at specified page
   * Receives: id for a specified story category, empty (or null) for frontpage
   * Returns: a div document element
   */
  getStoreItemsGridDivElement(category = null) {
    // Creates div Tag
    let sectionElementStoreItemGrid = document.createElement("section");
    sectionElementStoreItemGrid.classList.add("store-items-section");

    // Loop to dynamically insert store items into grid div
    for (let i = 0; i < this.storeItems.length; i++) {
      // Temp variable to handle the item
      let theItem = this.storeItems[i];
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
        if (theItem.category == this.categories[category]) {
          // Gets the current item card information
          sectionElementStoreItemGrid.appendChild(theItem.getStoreItemGrid());
        }
      }
    }
    return sectionElementStoreItemGrid;
  }

  /* Method that finds a store item and return it
   * Receives: a storeItem id
   * Returns: a storeItem object or null if not found
   */
  getStoreItem(storeItemId) {
    for (let i = 0; i < this.storeItems.length; i++) {
      if (this.storeItems[i].id == storeItemId) {
        return this.storeItems[i];
      }
    }
    return null;
  }
}

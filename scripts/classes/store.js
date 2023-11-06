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
    // Creates div Tag
    let divElementCategories = document.createElement("div");
    divElementCategories.id = "divElementCategories";
    // Appends an empty div at the beginning for aesthetic purpose
    divElementCategories.appendChild(document.createElement("div"));
    // Loop to dynamically create nav bar with categories
    for (let i = 0; i < this.categories.length; i++) {
      // Checks if the first category
      if (i == 0) {
        // If first, then adds Home category
        // Creates hyperlink Tag
        let aCategory = document.createElement("a");
        aCategory.href = "./index.html";
        aCategory.target = "_self";
        aCategory.textContent = "Home";
        // Adds the Home Category to the div
        divElementCategories.appendChild(aCategory);
      }
      // Creates a simple separator for each category
      let divSeparator = document.createElement("div");
      divSeparator.classList = "separator";
      divSeparator.textContent = "|";
      divElementCategories.appendChild(divSeparator);
      // Creates hyperlink Tag
      let aCategory = document.createElement("a");
      aCategory.href = "./category.html?id=" + i;
      aCategory.target = "_self";
      aCategory.textContent = this.categories[i];
      // Adds the Home Category to the div
      divElementCategories.appendChild(aCategory);
    }
    // Appends an empty div at the end for aesthetic purpose
    divElementCategories.appendChild(document.createElement("div"));
    return divElementCategories;
  }

  /* Method that dynamically creates a div element contaning all necessary store items that should appear at specified page
   * Receives: id for a specified story category, empty (or null) for frontpage
   * Returns: a div document element
   */
  getStoreItemsGridDivElement(category = null) {
    // Creates div Tag
    let divElementStoreItemGrid = document.createElement("div");
    divElementStoreItemGrid.id = "divElementStoreItemGrid";
    // Checks if specific category of frontpage
    if (category == null) {
      divElementStoreItemGrid.innerHTML = "<strong>Store Items:</strong>";
    } else {
      divElementStoreItemGrid.innerHTML =
        "<strong>" + this.categories[category] + ":</strong>";
    }
    divElementStoreItemGrid.appendChild(document.createElement("br"));
    // Loop to dynamically insert store items into grid div
    for (let i = 0; i < this.storeItems.length; i++) {
      // Temp variable to handle the item
      let theItem = this.storeItems[i];
      // Checks if the grid is request for frontpage
      if (category == null) {
        // Checks if the item should be displayed at frontpage
        if (theItem.frontpageDisplay) {
          // Gets the current item card information
          divElementStoreItemGrid.appendChild(theItem.getStoreItemGrid());
        }
      } else {
        // Category Items request
        // Checks if the item category matches the category requested
        if (theItem.category == this.categories[category]) {
          // Gets the current item card information
          divElementStoreItemGrid.appendChild(theItem.getStoreItemGrid());
        }
      }
    }
    return divElementStoreItemGrid;
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

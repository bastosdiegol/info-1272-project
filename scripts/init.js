// *****************
// STORE INFORMATION
// *****************
// Reads the store.json and sets its values on the window.theStore
fetch("../data/store.json")
  .then((response) => {
    // Network Check
    if (!response.ok) {
      throw new Error("Network error.");
    }
    return response.json();
  })
  .then((jsonObject) => {
    // Network Response Ok
    console.log(jsonObject);
    // Now we instanciate theStore
    window.theStore = new Store(
      jsonObject.store.name,
      jsonObject.store.address,
      jsonObject.store.postal,
      jsonObject.store.phone,
      jsonObject.store.email,
      jsonObject.store.logo,
      jsonObject.store.socials
    );
    // Sets theStore into the session
    sessionStorage.setItem("theStore", JSON.stringify(window.theStore));
  })
  .catch((error) => {
    // Error found
    console.error("Fetch error:", error);
  });

// ****************
// STORE ITEMS DATA
// ****************
fetch("../data/store-items.json")
  .then((response) => {
    // Network Check
    if (!response.ok) {
      throw new Error("Network error.");
    }
    return response.json();
  })
  .then((jsonObject) => {
    // Network Response Ok
    console.log(jsonObject);
    // For each item read from the jsonObject
    for (const KEY in jsonObject) {
      const STORE_ITEM = jsonObject[KEY];
      // Now we instanciate a single storeItem
      let aStoreItem = new StoreItem(
        STORE_ITEM.id,
        STORE_ITEM.name,
        STORE_ITEM.price,
        STORE_ITEM.stockQuantity,
        STORE_ITEM.maxPerCustomer,
        STORE_ITEM.category,
        STORE_ITEM.costOfShipping,
        STORE_ITEM.reviews,
        STORE_ITEM.reviewScore,
        STORE_ITEM.description,
        STORE_ITEM.imageURL,
        STORE_ITEM.frontpageDisplay
      );
      // Pushes the new item to the storeItems array
      window.theStore.storeItems.push(aStoreItem);
    }
    window.theStore.defineCategories();
    console.log(window.theStore);
  })
  .catch((error) => {
    // Error found
    console.error("Fetch error:", error);
  });

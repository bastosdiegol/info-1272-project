// Creates an array of socials
let socials = [
  { name: "linkedin", url: "https://www.linkedin.com/company/0000000/" },
  { name: "instagram", url: "https://www.instagram.com/MyOnlineStore" },
  { name: "x", url: "https://x.com/MyOnlineStore" },
  { name: "whatsapp", url: "https://wa.me/00000000000" },
];
// Now we instanciate theStore
theStore = new Store(
  "My Online Store",
  "123 Street",
  "A1B 2C3",
  "(555) 444-6666",
  "email@company.ca",
  "logo-no-background.png",
  socials
);
// Sets theStore into the session
sessionStorage.setItem("theStore", JSON.stringify(theStore));

// Create Store items
// 1
let aStoreItem = new StoreItem(
  1,
  "Item 1",
  10,
  5,
  1,
  "Category A",
  5.99,
  [],
  3.25,
  "Desc Item 1",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 2
aStoreItem = new StoreItem(
  2,
  "Item 2",
  9,
  1,
  1,
  "Category B",
  5.99,
  [],
  2.1,
  "Desc Item 2",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 3
aStoreItem = new StoreItem(
  3,
  "Item 3",
  9,
  1,
  1,
  "Category C",
  5.99,
  [],
  2.1,
  "Desc Item 3",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 4
aStoreItem = new StoreItem(
  4,
  "Item 4",
  9,
  1,
  1,
  "Category D",
  5.99,
  [],
  2.1,
  "Desc Item 4",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 5
aStoreItem = new StoreItem(
  5,
  "Item 5",
  9,
  1,
  1,
  "Category E",
  5.99,
  [],
  2.1,
  "Desc Item 5",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 6
aStoreItem = new StoreItem(
  6,
  "Item 6",
  9,
  1,
  1,
  "Category F",
  5.99,
  [],
  2.1,
  "Desc Item 6",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 7
aStoreItem = new StoreItem(
  7,
  "Item 7",
  9,
  1,
  1,
  "Category G",
  5.99,
  [],
  2.1,
  "Desc Item 7",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 8
aStoreItem = new StoreItem(
  9,
  "Item 8",
  9,
  1,
  1,
  "Category H",
  5.99,
  [],
  2.1,
  "Desc Item 8",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 9
aStoreItem = new StoreItem(
  9,
  "Item 9",
  9,
  1,
  1,
  "Category I",
  5.99,
  [],
  2.1,
  "Desc Item 9",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 10
aStoreItem = new StoreItem(
  10,
  "Item 10",
  9,
  1,
  1,
  "Category J",
  5.99,
  [],
  2.1,
  "Desc Item 10",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 11
aStoreItem = new StoreItem(
  11,
  "Item 11",
  9,
  1,
  1,
  "Category A",
  5.99,
  [],
  2.1,
  "Desc Item 11",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 12
aStoreItem = new StoreItem(
  12,
  "Item 12",
  9,
  1,
  1,
  "Category B",
  5.99,
  [],
  2.1,
  "Desc Item 12",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 13
aStoreItem = new StoreItem(
  13,
  "Item 13",
  9,
  1,
  1,
  "Category C",
  5.99,
  [],
  2.1,
  "Desc Item 13",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 14
aStoreItem = new StoreItem(
  14,
  "Item 14",
  9,
  1,
  1,
  "Category D",
  5.99,
  [],
  2.1,
  "Desc Item 14",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 15
aStoreItem = new StoreItem(
  15,
  "Item 15",
  9,
  1,
  1,
  "Category E",
  5.99,
  [],
  2.1,
  "Desc Item 15",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);
// 16
aStoreItem = new StoreItem(
  16,
  "Item 16",
  9,
  1,
  1,
  "Category F",
  5.99,
  [],
  2.1,
  "Desc Item 16",
  "./images/products/box-package-icon.png",
  true
);
theStore.storeItems.push(aStoreItem);

// Define Store Categories
theStore.defineCategories();

// Create the currencies for the store
var aNewCurrency = new Currency(
  "CAD",
  1,
  "$",
  "./images/flags/canada-flag-icon-16.png"
);
let currencyCount = theStore.currencies.push(aNewCurrency);
// Checks if there's a default currency already
let currencyIndex = sessionStorage.getItem("currentCurrencyIndex");
// If not, adds Canada to the session as default currency
if (currencyIndex == null) {
  // currentCurrencyIndex = currencyCount - 1;
  currentCurrencyIndex = 2;
  sessionStorage.setItem("currentCurrencyIndex", currentCurrencyIndex);
}

aNewCurrency = new Currency(
  "USD",
  0.73,
  "U$",
  "./images/flags/united-states-of-america-flag-icon-16.png"
);
theStore.currencies.push(aNewCurrency);

aNewCurrency = new Currency(
  "BRL",
  3.76,
  "R$",
  "./images/flags/brazil-flag-icon-16.png"
);
theStore.currencies.push(aNewCurrency);

aNewCurrency = new Currency(
  "EUR",
  3.76,
  "€",
  "./images/flags/europe-flag-icon-16.png"
);
theStore.currencies.push(aNewCurrency);

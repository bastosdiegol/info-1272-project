// Creates an array of socials
let socials = [
  { name: "linkedin", url: "https://www.linkedin.com/company/0000000/" },
  { name: "instagram", url: "https://www.instagram.com/MyOnlineStore" },
  { name: "x", url: "https://x.com/MyOnlineStore" },
  { name: "whatsapp", url: "https://wa.me/00000000000" },
  { name: "tiktok", url: "https://www.tiktok.com/@MyOnlineStore/" },
  // { name: "youtube", url: "https://www.youtube.com/MyOnlineStore/" },
];
// Now we instanciate theStore
theStore = new Store(
  "Lenz",
  "123 Street",
  "A1B 2C3",
  "(555) 444-6666",
  "email@company.ca",
  "logo-no-background-2.png",
  socials,
  "An Online Store for Photographers"
);

// Create Store items
// 1
let aStoreItem = new StoreItem(
  1,
  "Nikon D750",
  1779.95,
  9,
  2,
  "Nikon",
  5.99,
  [
    new Review(
      5,
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    ),
    new Review(
      5,
      "Lorem, ipsum.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quo."
    ),
    new Review(
      3,
      "Lorem, ipsum dolor.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint."
    ),
    new Review(
      4,
      "Lorem.",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    ),
    new Review(
      5,
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing."
    ),
  ],
  4.6,
  {
    Brand: "Nikon",
    Year: 2014,
    Colour: "Black",
    Resolution: "24.93 MP",
    Weight: 748.43,
  },
  "./images/products/nikon-d750.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 2
aStoreItem = new StoreItem(
  2,
  "Polaroid One Step 2",
  266.32,
  11,
  3,
  "Polaroid",
  5.99,
  [
    new Review(
      3,
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor, sit amet consectetur adipisicing."
    ),
    new Review(
      2,
      "Lorem, ipsum.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quo."
    ),
  ],
  2.5,
  {
    Brand: "Polaroid",
    Year: 2017,
    Colour: "Black and White",
    Weight: 408.24,
  },
  "./images/products/polaroid-onestep2.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 3
aStoreItem = new StoreItem(
  3,
  "Polaroid Pronto 600",
  56.42,
  15,
  4,
  "Polaroid",
  5.99,
  [
    new Review(
      5,
      "Lorem.",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A dignissimos dicta beatae vitae sed magni."
    ),
    new Review(
      4,
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, natus quo iure voluptates fugiat nesciunt dolorem doloribus eum id facere."
    ),
  ],
  4.5,
  {
    Brand: "Polaroid",
    Year: 1981,
    Colour: "Black",
    Weight: 544,
  },
  "./images/products/polaroid-pronto600.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 4
aStoreItem = new StoreItem(
  4,
  "Canon EOS Rebel T3i",
  402.55,
  14,
  3,
  "Canon",
  5.99,
  [new Review(5, "Great Product", "Amazing product")],
  5,
  {
    Brand: "Canon",
    Year: 2011,
    Colour: "Black",
    Resolution: "18 MP",
    Weight: 712.14,
  },
  "./images/products/canon-eos-t3i.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 5
aStoreItem = new StoreItem(
  5,
  "Lumix GH5",
  1173.94,
  10,
  2,
  "Lumix",
  5.99,
  [
    new Review(
      1,
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, placeat."
    ),
  ],
  1,
  {
    Brand: "Lumix",
    Year: 2017,
    Colour: "Black",
    Resolution: "20.3 MP",
    Weight: 725,
  },
  "./images/products/lumix-gh5.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 6
aStoreItem = new StoreItem(
  6,
  "Canon AE-1",
  328,
  16,
  3,
  "Canon",
  5.99,
  [],
  0,
  {
    Brand: "Canon",
    Year: 2014,
    Colour: "Silver",
    Weight: 952.54,
  },
  "./images/products/canon-ae1.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 7
aStoreItem = new StoreItem(
  7,
  "Canon AT-1",
  310.78,
  3,
  1,
  "Canon",
  5.99,
  [],
  0,
  {
    Brand: "Canon",
    Year: 1977,
    Colour: "Black and Silver",
    Weight: 590,
  },
  "./images/products/canon-at1.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 8
aStoreItem = new StoreItem(
  8,
  "Nikon D7200",
  1534.95,
  17,
  2,
  "Nikon",
  5.99,
  [],
  0,
  {
    Brand: "Nikon",
    Year: 2015,
    Colour: "Black",
    Resolution: "24.2 MP",
    Weight: 675.85,
  },
  "./images/products/nikon-d7200.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 9
aStoreItem = new StoreItem(
  9,
  "Nikon F2A",
  148.12,
  6,
  1,
  "Nikon",
  5.99,
  [],
  0,
  {
    Brand: "Nikon",
    Year: 1977,
    Colour: "Black and Silver",
    Weight: 760,
  },
  "./images/products/nikon-f2a.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 10
aStoreItem = new StoreItem(
  10,
  "Canon EOS 80D",
  1289.95,
  14,
  2,
  "Canon",
  5.99,
  [],
  0,
  {
    Brand: "Canon",
    Year: 2016,
    Colour: "Black",
    Resolution: "25.8 MP",
    Weight: 1500,
  },
  "./images/products/canon-eos-80d.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 11
aStoreItem = new StoreItem(
  11,
  "Minolta MD 85mm",
  345.95,
  18,
  2,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Minolta", Year: 1981, Colour: "Black", Weight: 285 },
  "./images/products/minolta-md-85mm.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 12
aStoreItem = new StoreItem(
  12,
  "Canon EF 135mm",
  1649.95,
  19,
  3,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Canon", Year: 2010, Colour: "Black", Weight: 750 },
  "./images/products/canon-ef-135.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 13
aStoreItem = new StoreItem(
  13,
  "Ronin DJI RS 3 Pro",
  1068.65,
  17,
  3,
  "Accessories",
  5.99,
  [],
  0,
  { Brand: "Ronin", Year: 2022, Colour: "Black", Weight: 2000 },
  "./images/products/ronin-dji-rs3pro.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 14
aStoreItem = new StoreItem(
  14,
  "Lowepro Flipside 500 AW II",
  329.95,
  25,
  4,
  "Accessories",
  5.99,
  [],
  0,
  { Brand: "Lowepro", Year: 2017, Colour: "Black and Gray", Weight: 2005 },
  "./images/products/lowepro-flipside-500ii.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 15
aStoreItem = new StoreItem(
  15,
  "Ronin DJI RSC 2 Pro Combo",
  744.22,
  22,
  3,
  "Accessories",
  5.99,
  [],
  0,
  { Brand: "Ronin", Year: 2020, Colour: "Black", Weight: 1200 },
  "./images/products/ronin-dji-2pro.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 16
aStoreItem = new StoreItem(
  16,
  "Vinta Type II",
  392.1,
  32,
  5,
  "Accessories",
  5.99,
  [],
  0,
  { Brand: "Vinta", Year: 2019, Colour: "Charcoal and Natural", Weight: 1400 },
  "./images/products/vinta-type-ii.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 17
aStoreItem = new StoreItem(
  17,
  "Sony FE 70-200mm GM OSS",
  2426.73,
  12,
  1,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Sony", Year: 2016, Colour: "Black and White", Weight: 2230 },
  "./images/products/sony-fe-70-200.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 18
aStoreItem = new StoreItem(
  18,
  "Sony FE 24-70mm GM",
  1722.68,
  15,
  2,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Sony", Year: 2016, Colour: "Black", Weight: 1036 },
  "./images/products/sony-fe-24-70.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 19
aStoreItem = new StoreItem(
  19,
  "Sony Fe 24-105mm G OSS",
  1325.02,
  19,
  3,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Sony", Year: 2017, Colour: "Black", Weight: 662 },
  "./images/products/sony-fe-24-105.png",
  true
);
theStore.addStoreItem(aStoreItem);
// 20
aStoreItem = new StoreItem(
  20,
  "Sony Fe 35mm",
  894.3,
  29,
  4,
  "Lenses",
  5.99,
  [],
  0,
  { Brand: "Sony", Year: 2019, Colour: "Black", Weight: 280 },
  "./images/products/sony-fe-35.png",
  true
);
theStore.addStoreItem(aStoreItem);

// Define Store Categories
theStore.defineCategories();

// Create the currencies for the store
var aNewCurrency = new Currency(
  "CAD",
  1,
  "$",
  "./images/flags/canada-flag-icon-16.png"
);
let currencyCount = theStore.addCurrency(aNewCurrency);
// Checks if there's a default currency already
let currencyIndex = localStorage.getItem("currentCurrencyIndex");
// If not, adds Canada to the session as default currency
if (currencyIndex == null) {
  currentCurrencyIndex = currencyCount - 1;
  localStorage.setItem("currentCurrencyIndex", currentCurrencyIndex);
}

aNewCurrency = new Currency(
  "USD",
  0.72,
  "U$",
  "./images/flags/united-states-of-america-flag-icon-16.png"
);
theStore.addCurrency(aNewCurrency);

aNewCurrency = new Currency(
  "BRL",
  3.55,
  "R$",
  "./images/flags/brazil-flag-icon-16.png"
);
theStore.addCurrency(aNewCurrency);

aNewCurrency = new Currency(
  "EUR",
  0.68,
  "€",
  "./images/flags/europe-flag-icon-16.png"
);
theStore.addCurrency(aNewCurrency);

/** Shopping Cart */
let shoppingCartChecker = JSON.parse(sessionStorage.getItem("shoppingCart"));
if (shoppingCartChecker == null) {
  shoppingCartChecker = new ShoppingCart();
  sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCartChecker));
}

// Sets theStore into the session
sessionStorage.setItem("theStore", JSON.stringify(theStore));

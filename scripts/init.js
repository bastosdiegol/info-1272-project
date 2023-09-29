// Import Store class
import Store from './store.js';

// Fetch the JSON file with the Store Info
fetch('../data/store.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonObject => {
    console.log(jsonObject);
    // File Read
    // Now we instanciate theStore
    window.theStore = new Store(jsonObject.store.name,
                                jsonObject.store.address, 
                                jsonObject.store.postal, 
                                jsonObject.store.phone, 
                                jsonObject.store.email);

    // Defines the Header
    defineStoreHeader();
    // Defines the Footer
    defineStoreFooter();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  //  _  _             _         
  // | || |___ __ _ __| |___ _ _ 
  // | __ / -_) _` / _` / -_) '_|
  // |_||_\___\__,_\__,_\___|_|  
  function defineStoreHeader() {
    // Get <header> element
    const headerElements = document.getElementsByTagName("header");
  
    // Check if any <header> elements were found
    if (headerElements.length > 0) {
      // Get the first <header> element (at the moment I only have one)
      const headerElement = headerElements[0];  
      // Adds the company name to the website
      headerElement.innerHTML = "<h1>Online Store - <em>" + window.theStore.name + "</em></h1><hr />";
    }
  }

  //  ___         _           
  // | __|__  ___| |_ ___ _ _ 
  // | _/ _ \/ _ \  _/ -_) '_|
  // |_|\___/\___/\__\___|_|  
  function defineStoreFooter(){
    // Get <footer> element
    const footerElements = document.getElementsByTagName("footer");
  
    // Check if any <footer> elements were found
    if (footerElements.length > 0) {
      // Get the first <header> element (at the moment I only have one)
      const footerElement = footerElements[0];  
      // Adds the company name to the website
      footerElement.innerHTML = "<hr /><p>Copyright &copy; 2023. "+window.theStore.name+".</p>";
    }
  }
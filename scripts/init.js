// Import Store class
import Store from './store.js';

// Checks if the theStore was instantiated previously
// If null, then grabs the store.json ans instantiate it
if(window.theStore == null){
  // Fetch the JSON file with the Store Info
  await fetch('../data/store.json') // Use await to make sure its synchronous
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error.');
      }
      return response.json();
    })
    .then(jsonObject => {
      console.log(jsonObject);
      // Now we instanciate theStore
      window.theStore = new Store(jsonObject.store.name,
                                  jsonObject.store.address, 
                                  jsonObject.store.postal, 
                                  jsonObject.store.phone, 
                                  jsonObject.store.email);
      // Sets theStore into the session
      sessionStorage.setItem('theStore', JSON.stringify(window.theStore));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
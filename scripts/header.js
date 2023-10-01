//  _  _             _         
// | || |___ __ _ __| |___ _ _ 
// | __ / -_) _` / _` / -_) '_|
// |_||_\___\__,_\__,_\___|_|  
// Get <header> element
const headerElements = document.getElementsByTagName("header");
  
// Check if any <header> elements were found
if (headerElements.length > 0) {
  // Get the first <header> element (at the moment I only have one)
  const headerElement = headerElements[0];  
  // Adds the company name to the website
  headerElement.innerHTML = "<h1>Online Store - <em>" + window.theStore.name + "</em></h1><hr />";
}
//  ___         _           
// | __|__  ___| |_ ___ _ _ 
// | _/ _ \/ _ \  _/ -_) '_|
// |_|\___/\___/\__\___|_|  
// Get <footer> element
const footerElements = document.getElementsByTagName("footer");

// Check if any <footer> elements were found
if (footerElements.length > 0) {
  // Get the first <header> element (at the moment I only have one)
  const footerElement = footerElements[0];  
  // Adds the company name to the website
  footerElement.innerHTML = "<hr /><p>Copyright &copy; 2023. "+window.theStore.name+".</p>";
}
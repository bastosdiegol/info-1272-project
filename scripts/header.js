//  _  _             _         
// | || |___ __ _ __| |___ _ _ 
// | __ / -_) _` / _` / -_) '_|
// |_||_\___\__,_\__,_\___|_|  

// Gets <header> element
const headerElements = document.getElementsByTagName("header");
// Checks if any <header> elements were found
if (headerElements.length > 0) {
  // Gets the first <header> element (at the moment I only have one)
  const headerElement = headerElements[0];  

  // Creates figure Tag
  let figureElementLogo = document.createElement('figure');
  figureElementLogo.id = "figureElementLogo";

  // Creates img Tag
  let imgElementLogo = document.createElement('img');
  imgElementLogo.id = "imgElementLogo";
  imgElementLogo.src = "./images/" + window.theStore.logo;
  imgElementLogo.alt = window.theStore.name;

  // Creates em Tag
  let strongElementStoreName = document.createElement('strong');
  strongElementStoreName.id = "strongElementStoreName";
  strongElementStoreName.textContent = window.theStore.name;

  // Creates p Tag
  let emElementDateTime = document.createElement('em');
  emElementDateTime.id = "emElementDateTime";
  // Creates a Date object
  var currentDate = new Date();
  // DateTime Format Options
  let dateTimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  // Formats the current Date using locale
  emElementDateTime.textContent = currentDate.toLocaleString("en-CA", dateTimeOptions);

  // Tag Relations
  figureElementLogo.appendChild(imgElementLogo); // Adds img to figure
  headerElement.appendChild(figureElementLogo); // Adds figure to header
  headerElement.appendChild(strongElementStoreName) // Adds strong to header
  headerElement.appendChild(emElementDateTime); // Adds em to header
}
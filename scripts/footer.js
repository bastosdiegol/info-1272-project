//  ___         _
// | __|__  ___| |_ ___ _ _
// | _/ _ \/ _ \  _/ -_) '_|
// |_|\___/\___/\__\___|_|

// Gets <footer> element
const FOOTER_ELEMENTS = document.getElementsByTagName("footer");
// Checks if any <footer> elements were found
if (FOOTER_ELEMENTS.length > 0) {
  // Gets the first <footer> element (at the moment I only have one)
  const FOOTER_ELEMENT = FOOTER_ELEMENTS[0];

  // Creates div Tag
  let divElementCopyright = document.createElement("div");
  divElementCopyright.classList.add("copyright-div");
  divElementCopyright.textContent =
    "Copyright © 2023. " + theStore.getStoreNameAndSlogan();

  // Tags Relations
  FOOTER_ELEMENT.appendChild(document.createElement("hr")); // Adds hr
  FOOTER_ELEMENT.appendChild(divElementCopyright); // Adds p to footer
  FOOTER_ELEMENT.appendChild(theStore.getStoreSocialsDivElement()); // Adds social div to the footer
}

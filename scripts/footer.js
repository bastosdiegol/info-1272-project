//  ___         _           
// | __|__  ___| |_ ___ _ _ 
// | _/ _ \/ _ \  _/ -_) '_|
// |_|\___/\___/\__\___|_|  
// Get <footer> element
const footerElements = document.getElementsByTagName("footer");

// Check if any <footer> elements were found
if (footerElements.length > 0) {
  // Get the first <footer> element (at the moment I only have one)
  const footerElement = footerElements[0];  

  // Creates p Tag
  let pElementCopyright = document.createElement("p");
  pElementCopyright.id = "pElementCopyright";
  pElementCopyright.textContent = "Copyright © 2023. " + window.theStore.name;

  // Creates div Tag for each Socials
  let divElementSocials = document.createElement("div");
  divElementSocials.id = "divElementSocials";
  // Loop for each social network
  for (const key in window.theStore.socials) {
    const social = window.theStore.socials[key];
    // Creates hyperlink Tag
    let aFooterSocial = document.createElement("a");
    aFooterSocial.href = social.url;
    aFooterSocial.target = "_blank";
    // Creates figure Tag
    let figureFooterSocial = document.createElement('figure');
    figureFooterSocial.id = "figureFooter" + social.name;
    // Creates img Tag
    let imgFooterSocial = document.createElement('img');
    imgFooterSocial.id = "imgFooter" + social.name;
    imgFooterSocial.src = "../images/"+social.name+".png";
    imgFooterSocial.alt = "Company " + social.name;
    // Tags Relations
    figureFooterSocial.appendChild(imgFooterSocial); // Appends img to figure
    aFooterSocial.appendChild(figureFooterSocial); // Appends figure to a
    divElementSocials.appendChild(aFooterSocial); // Appends a to div
  }

  // Tags Relations
  footerElement.appendChild(document.createElement("hr")); // Adds hr
  footerElement.appendChild(pElementCopyright); // Adds p to footer
  footerElement.appendChild(divElementSocials); // Adds div to the footer
}
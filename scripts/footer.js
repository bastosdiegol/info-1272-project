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
  divElementCopyright.id = "divElementCopyright";
  divElementCopyright.textContent = "Copyright © 2023. " + theStore.name;

  // Creates div Tag for each Socials
  let divElementSocials = document.createElement("div");
  divElementSocials.id = "divElementSocials";
  // Loop to dynamically create each social network link
  for (const KEY in theStore.socials) {
    const SOCIAL = theStore.socials[KEY];
    // Creates hyperlink Tag
    let aFooterSocial = document.createElement("a");
    aFooterSocial.href = SOCIAL.url;
    aFooterSocial.target = "_blank";
    // Creates figure Tag
    let figureFooterSocial = document.createElement("figure");
    figureFooterSocial.id = "figureFooter" + SOCIAL.name;
    // Creates img Tag
    let imgFooterSocial = document.createElement("img");
    imgFooterSocial.id = "imgFooter" + SOCIAL.name;
    imgFooterSocial.src = "./images/socials/" + SOCIAL.name + ".png";
    imgFooterSocial.alt = "Company " + SOCIAL.name;
    // Tags Relations
    figureFooterSocial.appendChild(imgFooterSocial); // Appends img to figure
    aFooterSocial.appendChild(figureFooterSocial); // Appends figure to a
    divElementSocials.appendChild(aFooterSocial); // Appends a to div
  }

  // Tags Relations
  FOOTER_ELEMENT.appendChild(document.createElement("hr")); // Adds hr
  FOOTER_ELEMENT.appendChild(divElementCopyright); // Adds p to footer
  FOOTER_ELEMENT.appendChild(divElementSocials); // Adds div to the footer
}

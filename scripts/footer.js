//  ___         _           
// | __|__  ___| |_ ___ _ _ 
// | _/ _ \/ _ \  _/ -_) '_|
// |_|\___/\___/\__\___|_|  

// Window Load Event to make sure it will only runs after the init.js
window.addEventListener('load', async () => {
  // Gets <footer> element
  const footerElements = document.getElementsByTagName("footer");

  // Checks if any <footer> elements were found
  if (footerElements.length > 0) {
    // Gets the first <footer> element (at the moment I only have one)
    const footerElement = footerElements[0];  

    // Creates p Tag
    let divElementCopyright = document.createElement("div");
    divElementCopyright.id = "divElementCopyright";
    divElementCopyright.textContent = "Copyright © 2023. " + window.theStore.name;

    // Creates div Tag for each Socials
    let divElementSocials = document.createElement("div");
    divElementSocials.id = "divElementSocials";
    // Loop to dynamicly create each social network link
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
      imgFooterSocial.src = "../images/socials/"+social.name+".png";
      imgFooterSocial.alt = "Company " + social.name;
      // Tags Relations
      figureFooterSocial.appendChild(imgFooterSocial); // Appends img to figure
      aFooterSocial.appendChild(figureFooterSocial); // Appends figure to a
      divElementSocials.appendChild(aFooterSocial); // Appends a to div
    }

    // Tags Relations
    footerElement.appendChild(document.createElement("hr")); // Adds hr
    footerElement.appendChild(divElementCopyright); // Adds p to footer
    footerElement.appendChild(divElementSocials); // Adds div to the footer
  }
});
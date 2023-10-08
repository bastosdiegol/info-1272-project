//  __  __      _      
// |  \/  |__ _(_)_ _  
// | |\/| / _` | | ' \ 
// |_|  |_\__,_|_|_||_|

// Window Load Event to make sure it will only runs after the init.js
window.addEventListener('load', async () => {
    // Gets <nav> element
    const NAV_ELEMENTS = document.getElementsByTagName("nav");
    // Checks if any <nav> elements were found
    if (NAV_ELEMENTS.length > 0) {
        // Gets the first <nav> element (at the moment I only have one)
        const NAV_ELEMENT = NAV_ELEMENTS[0]; 
        // Creates div Tag
        let divElementCategories = document.createElement("div");
        divElementCategories.id = "divElementCategories";
        // Loop to dynamically create nav bar with categories
        for (let i = 0; i < window.theStore.categories.length; i++) {
            // Checks if the first category
            if(i == 0){ // If first, then adds Home category
                // Creates hyperlink Tag
                let aCategory = document.createElement("a");
                aCategory.href = "../index.html";
                aCategory.target = "_self";
                aCategory.textContent = "Home";
                // Adds the Home Category to the div
                divElementCategories.appendChild(aCategory);
            }
            // Creates a simple separator for each category
            let divSeparator = document.createElement("div");
            divSeparator.classList = "separator";
            divSeparator.textContent = "|";
            divElementCategories.appendChild(divSeparator);
            // Creates hyperlink Tag
            let aCategory = document.createElement("a");
            aCategory.href = "../category.html?id="+i;
            aCategory.target = "_self";
            aCategory.textContent = window.theStore.categories[i];
            // Adds the Home Category to the div
            divElementCategories.appendChild(aCategory);
        }
        // Adds the div to the nav
        NAV_ELEMENT.appendChild(divElementCategories);
    }
});
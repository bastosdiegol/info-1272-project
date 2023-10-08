/*
 * Class that holds information about the Store 
*/
class Store{
    constructor(name, address, postal, phone, email, logo, socials){
        this.name = name;
        this.address = address;
        this.postal = postal;
        this.phone = phone;
        this.email = email;
        this.logo = logo;
        this.socials = socials;
        this.categories = [];
        this.storeItems = [];
    }

    // Dynamically generate theStory categories based on the storeItems categories
    defineCategories(){
        // Clears the array
        this.categories = [];
        // Loop for each existing storeItem
        for (let i = 0; i < this.storeItems.length; i++) {
            // Checks if the current item category already exists in categories array
            if(!this.categories.includes(this.storeItems[i].category)){
                // If not push it to the array
                this.categories.push(this.storeItems[i].category);
            }
        }
    }

    getFrontpageItemsDivElement(){

    }
}

// My class now is visible to other files
export default Store;
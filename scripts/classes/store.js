/*
 * Class that holds information about the Store 
*/
class Store{
    constructor(name, address, postal, phone, email, logo){
        this.name = name;
        this.address = address;
        this.postal = postal;
        this.phone = phone;
        this.email = email;
        this.logo = logo;
    }
}

// My class now is visible to other files
export default Store;
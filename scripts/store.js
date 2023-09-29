/*
 * Class that holds information about the Store 
*/
class Store{
    constructor(name, address, postal, phone, email){
        this.name = name;
        this.address = address;
        this.postal = postal;
        this.phone = phone;
        this.email = email;
    }
}

// My class now is visible to other files
export default Store;
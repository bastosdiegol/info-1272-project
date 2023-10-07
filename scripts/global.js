//   ___ _     _          _    ___             _            _      
//  / __| |___| |__  __ _| |  / __|___ _ _  __| |_ __ _ _ _| |_ ___
// | (_ | / _ \ '_ \/ _` | | | (__/ _ \ ' \(_-<  _/ _` | ' \  _(_-<
//  \___|_\___/_.__/\__,_|_|  \___\___/_||_/__/\__\__,_|_||_\__/__/
const CURRENCY_RATES = [{name: "USD", rate: 0.73}
                      , {name: "BRL", rate: 3.76}
                      , {name: "EUR", rate: 0.69}];

//   ___ _     _          _  __   __        _      _    _        
//  / __| |___| |__  __ _| | \ \ / /_ _ _ _(_)__ _| |__| |___ ___
// | (_ | / _ \ '_ \/ _` | |  \ V / _` | '_| / _` | '_ \ / -_|_-<
//  \___|_\___/_.__/\__,_|_|   \_/\__,_|_| |_\__,_|_.__/_\___/__/

// Gets the Store Information from the sessionStorage
var theStore = JSON.parse(sessionStorage.getItem('theStore'));
// Gets the Store products from the sessionStorage
var theStoreItems = JSON.parse(sessionStorage.getItem('theStoreItems'));
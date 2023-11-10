//   ___ _     _          _    ___             _            _
//  / __| |___| |__  __ _| |  / __|___ _ _  __| |_ __ _ _ _| |_ ___
// | (_ | / _ \ '_ \/ _` | | | (__/ _ \ ' \(_-<  _/ _` | ' \  _(_-<
//  \___|_\___/_.__/\__,_|_|  \___\___/_||_/__/\__\__,_|_||_\__/__/

//   ___ _     _          _  __   __        _      _    _
//  / __| |___| |__  __ _| | \ \ / /_ _ _ _(_)__ _| |__| |___ ___
// | (_ | / _ \ '_ \/ _` | |  \ V / _` | '_| / _` | '_ \ / -_|_-<
//  \___|_\___/_.__/\__,_|_|   \_/\__,_|_| |_\__,_|_.__/_\___/__/

// Gets the Store Information from the sessionStorage
/** @type {Store} Global Variable that holds the Store Object */
var theStore = JSON.parse(sessionStorage.getItem("theStore"));

// Variables to store current used currency and symbol
/** @type {Number} Variables to store current used currency ID */
var currentCurrencyIndex = Number(
  sessionStorage.getItem("currentCurrencyIndex")
);

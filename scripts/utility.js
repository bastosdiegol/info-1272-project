/**
 * Method that creates a start review image on a document element
 * @function
 * @param {HTMLUListElement} documentElement a document element which will contain the image
 * @param {String} starType a type of star (filled, half or empty)
 * @returns {HTMLUListElement} Returns the figure element that contains the star
 */
function getReviewStarImage(documentElement, starType) {
  // Creates figure Tag
  let figureReviewStar = document.createElement("figure");
  figureReviewStar.classList = "figureStar";
  // Creates img Tag
  let imgReviewStar = document.createElement("img");
  imgReviewStar.classList = "imgReviewStar";
  switch (starType) {
    case "filled":
      imgReviewStar.src = "./images/review/star-icon.png";
      imgReviewStar.alt = "Review Filled Star";
      break;
    case "half":
      imgReviewStar.src = "./images/review/star-half-yellow-icon.png";
      imgReviewStar.alt = "Review Half-Filled Star";
      break;
    case "empty":
      imgReviewStar.src = "./images/review/star-line-yellow-icon.png";
      imgReviewStar.alt = "Review Empty Star";
      break;
    default:
      break;
  }
  // Tags relationship
  figureReviewStar.appendChild(imgReviewStar);
  documentElement.appendChild(figureReviewStar);

  return figureReviewStar;
}

/**
 * Static Method that receives a Number and convert it to the current selected currency.
 * @static @method
 * @param {number} value Value to be converted.
 * @returns {String} Value in the corresponding selected currency.
 */
function convertToSelectedCurrency(value) {
  let currency = theStore.getCurrency(currentCurrencyIndex);
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.name,
  }).format(value * currency.rate);
}

/**
 * Static Method that receives a weight and convert it to a specified unit.
 * @static @method
 * @param {number} value weight number.
 * @param {String} unit String which represents the weight unit to be converted.
 * @returns {String} Value of the weight converted.
 */
function convertWeight(weight, unit) {
  const options = {
    style: "unit",
    unit: unit,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat("en-CA", options).format(weight);
}

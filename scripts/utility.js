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

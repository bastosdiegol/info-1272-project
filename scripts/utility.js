/**
 * Function that creates a start review image on a document element
 * @function
 * @param {HTMLElement} documentElement a document element which will contain the image
 * @param {String} starType a type of star (filled, half or empty)
 * @returns {HTMLElement} Returns the figure element that contains the star
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
 * Function that receives a Number and convert it to the current selected currency.
 * @function
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
 * Function that receives a weight and convert it to a specified unit.
 * @function
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

/**
 * Function that throws a notification on the screen.
 * @param {String} message - Message to be displayed.
 * @param {NOTIFICATION_TYPE} notificationType - Type of notification to be displayed.
 */
function throwNotification(message, notificationType) {
  // Gets the Notifications Wrapper Div
  let notificationsWrapper = document.getElementById("notifications-wrapper");
  // Creates the new notification wrapper
  let newNotificationWrapper = document.createElement("div");
  newNotificationWrapper.classList.add("notification");
  // Switch for the type of notification
  switch (notificationType) {
    case NOTIFICATION_TYPE.SUCCESS:
      newNotificationWrapper.classList.add("notification-success");
      break;
    case NOTIFICATION_TYPE.WARNING:
      newNotificationWrapper.classList.add("notification-warning");
      break;
    case NOTIFICATION_TYPE.ERROR:
      newNotificationWrapper.classList.add("notification-error");
      break;
    default:
      console.log("Invalid Notification Type.");
      return;
  }
  // Appends the wrapper to the notification div area
  notificationsWrapper.appendChild(newNotificationWrapper);
  // Creates the text element
  let notificationMessage = document.createElement("p");
  notificationMessage.classList.add("notification-message");
  notificationMessage.textContent = message;
  newNotificationWrapper.appendChild(notificationMessage);
  // Creates the close button
  let closeLink = document.createElement("a");
  closeLink.classList.add("notification-close");
  closeLink.textContent = "X";
  closeLink.setAttribute("onclick", "this.parentElement.remove()");
  newNotificationWrapper.appendChild(closeLink);
}

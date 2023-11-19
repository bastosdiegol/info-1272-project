/**
 * Class that stores review information.
 * @class
 */
class Review {
  /**
   * Review Object Constructor.
   * @constructor
   * @param {Numer} rating Review Score from 1 to 5.
   * @param {String} headline Review title.
   * @param {String} description Review text.
   */
  constructor(rating, headline, description) {
    this.rating = rating;
    this.headline = headline;
    this.description = description;
  }
}

/**
 * Class that stores currency information.
 * @class
 */
class Currency {
  /**
   * Currency Object Constructor.
   * @constructor
   * @param {String} name Name of the Currency.
   * @param {Numer} rate Currency rate difference between this currency and Canadian Dolars.
   * @param {String} symbol Text that holds the currency symbol.
   * @param {String} flag Path to the figure corresponding the flag.
   */
  constructor(name, rate, symbol, flag) {
    this.name = name;
    this.rate = rate;
    this.symbol = symbol;
    this.flag = flag;
  }
}

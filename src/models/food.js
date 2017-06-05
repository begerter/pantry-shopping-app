
export default class Food {
  constructor(description, amount, units, index) {
    this.description = description;
    this.amount = amount;
    this.units = units;
    this.index = index;
  }

  toString() {
    return this.amount + ' ' + this.units + ' ' + this.description;
  }

  removeQuantity(amount, units) {
    if (units === this.units) {
      this.amount = this.amount - amount;
    } else {
      // do some arcane unit conversions
    }
  }

}

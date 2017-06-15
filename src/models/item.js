
const ITEM_TYPES = {
  shopping: 'SHOPPING',
  pantry: 'PANTRY'
};

export default class Item {
  constructor(description, amount, units, time, type, index) {
    this.description = description;
    this.amount = amount;
    this.units = units;
    this.type = type;
    this.time = time;
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

  serialize() {
    const data = {
      description: this.description,
      amount: this.amount,
      units: this.units,
      type: this.type,
      index: this.index
    };

    if (this.type === ITEM_TYPES.pantry) {
      data.time = this.time;
    }

    return JSON.stringify(data);
  }
}

function deserializeItem(dataStr) {
  const data = JSON.parse(dataStr);
  
  return new Item(data.description, data.amount, data.units, data.time, data.type, data.index);
}

export {ITEM_TYPES, deserializeItem};

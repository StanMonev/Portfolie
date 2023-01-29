class JSONInterface {
  constructor() {
    if (new.target === JSONInterface) {
      throw new TypeError("Cannot construct JSONInterface instances directly.");
    }
  }

  toJSON(){
    throw new TypeError("toJSON() method must be implemented by child classes.");
  }
}

module.exports = JSONInterface;
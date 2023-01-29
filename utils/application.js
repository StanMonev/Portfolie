class Application {
  constructor() {
    if (new.target === Application) {
      throw new TypeError("Cannot construct Application instances directly.");
    }
  }

  run(...args) {
    throw new TypeError("run() method must be implemented by child classes.");
  }
}


module.exports = Application;

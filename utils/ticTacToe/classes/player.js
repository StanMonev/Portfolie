const JSONInterface = require("./JSONInterface");

class Player extends JSONInterface {
  constructor(name){
    super();
    this.name = name;
    this.wins = 0;
    this.loses = 0;
  }

  getName(){
    return this.name;
  }

  won(){
    this.wins++;
  }

  lost(){
    this.loses++;
  }

  reset(){
    this.wins = 0;
    this.loses = 0;
  }
}

module.exports = Player;
const brain = require('../training/trainedNet2.js');

class BotBrain {
  constructor(board){
    this.brain = brain;
    this.board = board;
    this.name = 'AI Opponent';
    this.wins = 0;
    this.loses = 0;
  }

  getDecision(){
    let decision = this.brain.decide(this.board.getAllValues());
    return this._applyDecision(decision);
  }

  _applyDecision(decision){
    const chosenMove = decision.indexOf(Math.max(...decision));
    let values = this.board.getAllValues();
    if(values[chosenMove] == 0){
      values[chosenMove] = 1;
    }
    this.board.update(values)

    return this.board;
  }
}

module.exports = BotBrain;
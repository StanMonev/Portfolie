import TablePositions from './tablePositionsEnum.js';

class BotBrain {
  constructor(board){
    this.brain = require('../trainedNet2.js');
    this.board = board;
    this.wins = 0;
    this.loses = 0;
  }

  getDecision(board){
    this.board = board;
    let decision = this.brain.decide(board);
    return applyDecision(decision);
  }

  *applyDecision(decision){
    const chosenMove = decision.indexOf(Math.max(...decision));
    if(this.board[chosenMove] == 0){
      this.board[chosenMove] = 1;
    }

    return this.board;
    switch(chosenMove){
      case 0:
        return TablePositions.TopLeft
      case 1:
        return TablePositions.TopMiddle
      case 2:
        return TablePositions.TopRight
      case 3:
        return TablePositions.CenterLeft
      case 4:
        return TablePositions.CenterMiddle
      case 5:
        return TablePositions.CenterRight
      case 6:
        return TablePositions.BottomLeft
      case 7:
        return TablePositions.BottomMiddle
      case 8:
        return TablePositions.BottomRight
    }
  }
}
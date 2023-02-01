const Application = require("../../application");
const BotBrain = require("./botBrain");
const Board = require("./board");
const GameEnum = require("./gameEnum");

//TODO: Finish this class
class Game extends Application {
  constructor(board, playerOne, playerTwo = 'AI') {
    super();
    this.board = board;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo == 'AI' ? this._getBot() : playerTwo;
    this.draws = 0;
  }

  getResults(){
    return this._checkBoard(this.board);
  }

  updateBoard(board){
    this.board = board;
  }

  // Private methods

  _checkBoard(board) {
    if (!(board instanceof Board)) return {error: 'Given parameter must be a Board'};

    return this._getGameOutput(this._getGameResult(board), this.playerTwo);
  }

  _getGameOutput(gameResult, playerTwo){
    if (gameResult === GameEnum.ContinueGame){
      return {
        gameResult: gameResult,
        board: playerTwo.getDecision().getAllValues()
      }
    }else{
      return {
        gameResult: gameResult,
        board: this.board.getAllValues()
      }
    }
  }
  
  _getBot(){
    return new BotBrain(this.board);
  }

  _getGameResult(board) { 
    const height = 4;
    const width = 4;

  
    let table = [];
    let index = 0;
    for (let row = 0; row < width; row++) {
      table[row] = [];
      for (let col = 0; col < height; col++) {
        table[row][col] = row === 0 || col === 0 ? 0 : board.getValueAt(index++);
      }
    }
  
    for (let i = 1; i < table.length; i++) {
      for (let j = 1; j < table[i].length; j++) {
        if (i == j) { //Get Diagonal
          table[0][0] += table[i][j];
        }
        table[i][0] += table[i][j]; //Get Row
        table[0][j] += table[i][j]; //Get Column
      }
    }
  
    return this._getResultDecr(this._getResultEnc(table));
  }

  _getResultEnc(table){
    let continueGame;
    for (let row = 0; row < table.length; row++) {
      for (let col = 0; col < table.length; col++) {
        if(row === 0 || col === 0){
          let value = table[row][col];
          if(value == 3 || value == -3){
            return value;
          }else if(value == -2 || value == 2 || value == 0){
            continueGame = 0;
          }
        }
      }
    }

    return continueGame;
  }

  _getResultDecr(value){
    switch (value) {
      case -3:
        return GameEnum.PlayerOneWin
      case 3:
        return GameEnum.PlayerTwoWin;
      case 0:
        return GameEnum.ContinueGame;
      default:
        return GameEnum.Draw;
    }
  }
}

module.exports = Game;
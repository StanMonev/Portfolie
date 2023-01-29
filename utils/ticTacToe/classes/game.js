const Application = require("../../application");
const BotBrain = require("./botBrain");
const Board = require("./board");

//TODO: Finish this class
class Game extends Application {
  constructor(board, playerOne, playerTwo = 'AI') {
    super();
    this.board = board;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo == 'AI' ? this.getBot() : playerTwo;
    this.draws = 0;
  }

  getResults(){
    return this.run(this.board);
  }

  updateBoard(board){
    this.board = board;
  }

  run(board) {
    if (!(board instanceof Board)) return {error: 'Given parameter must be a Board'};

    return this.getWinner(board);
  }

  getWinner(board) { 
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
  
    return table;
  }

  getBot(){
    return new BotBrain(this.board);
  }
}

module.exports = Game;
import Application from "../application";

//TODO: Finish this class
class Game extends Application {
  constructor(board, playerOne, playerTwo = 'AI') {
    super();
    this.board = board;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo == 'AI' ? getBot() : playerTwo;
    this.draws = 0;
  }

  run(...args){
    args.forEach(this.runGame)
  }

  updateBoard(board){
    this.board = board;
  }

  runGame(board) {
    if (!(board instanceof Board)) return {error: 'Given parameter must be a Board'};

    let winner = checkForWinner(board);
    if (winner) return getWinner();
    else continueGame(board);
  }

  *getBot(){
    return new BotBrain();
  }
}
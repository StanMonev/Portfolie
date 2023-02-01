const { importClasses } = require('../helper');
const classes = importClasses('./utils/ticTacToe/classes');
const Game = classes.game;
const Board = classes.board;
const Player = classes.player;

const {expect} = require("chai");
const GameEnum = require('../../utils/ticTacToe/classes/gameEnum');

describe("Game", () => {
  let game, board, player;

  beforeEach(() => {
    player = new Player("Player 1");
  });

  describe("getResults", () => {
    it("should return win for the first player", () => {
      board = new Board([1, -1, 1, -1, -1, -1, 1, 0, 1]);
      game = new Game(board, player);
      let result = game.getResults();
      expect(result).to.deep.equal({
        gameResult: GameEnum.PlayerOneWin,
        board: board.getAllValues()
      });
    });

    it("should return win for the second player", () => {
      board = new Board([1, 1, 1, -1, 1, -1, -1, 0, -1]);
      game = new Game(board, player);
      let result = game.getResults();
      expect(result).to.deep.equal({
        gameResult: GameEnum.PlayerTwoWin,
        board: board.getAllValues()
      });
    });

    it("should return a draw", () => {
      board = new Board([1, -1, -1, -1, 1, 1, 1, 1, -1]);
      game = new Game(board, player);
      let result = game.getResults();
      expect(result).to.deep.equal({
        gameResult: GameEnum.Draw,
        board: board.getAllValues()
      });
    });

    it("should return a bot prefinal decision", () => {
      board = new Board([1, -1, -1, -1, 1, 1, 1, 0, -1]);
      game = new Game(board, player);
      let result = game.getResults();
      let resultBoard = new Board([1, -1, -1, -1, 1, 1, 1, 1, -1]);
      expect(result).to.deep.equal({
        gameResult: GameEnum.ContinueGame,
        board: resultBoard.getAllValues()
      });
    });

    it("should return a bot reasonable decision", () => {
      board = new Board([0, -1, -1, 1, 0, 0, 0, 0, 0]);
      game = new Game(board, player);
      let result = game.getResults();
      let resultBoard = new Board([1, -1, -1, 1, 0, 0, 0, 0, 0]);
      expect(result).to.deep.equal({
        gameResult: GameEnum.ContinueGame,
        board: resultBoard.getAllValues()
      });
    });
  });
});
const { importClasses } = require('../helper');
const classes = importClasses('./utils/ticTacToe/classes');
const Game = classes.game;
const Board = classes.board;
const Player = classes.player;

const {expect} = require("chai");

describe("Game", () => {
  let game, board, player;

  beforeEach(() => {
    board = new Board([1, 1, 1, -1, 1, -1, -1, 0, -1]);
    player = new Player("Player 1");
    game = new Game(board, player);
  });

  describe("getResults", () => {
    it("should return the filled matrix, with correct values", () => {
      let result = game.getResults();
      expect(result).to.deep.equal([
                           [ 1,-1,2,-1],
                           [ 3, 1,1, 1],
                           [-1,-1,1,-1],
                           [-2,-1,0,-1], 
                          ]);
    });
  });
});
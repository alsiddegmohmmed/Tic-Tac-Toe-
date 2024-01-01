const Player = (name, symbol) => {
    return { name, symbol };
  };

  const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const isSpotTaken = (index) => board[index] !== "";
    const markSpot = (index, symbol) => (board[index] = symbol);
    const getBoard = () => [...board];
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { isSpotTaken, markSpot, getBoard, resetBoard };
  })();
 
  const GameController = (() => {
    let currentPlayer;
    let player1;
    let player2;
    let gameOver = false;
  
    const startGame = () => {
      player1 = Player(prompt("Enter Player 1 name:"), "X");
      player2 = Player(prompt("Enter Player 2 name:"), "O");
      currentPlayer = player1;
      gameOver = false;
      Gameboard.resetBoard();
      displayController.render();
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const playTurn = (index) => {
      if (!gameOver && !Gameboard.isSpotTaken(index)) {
        Gameboard.markSpot(index, currentPlayer.symbol);
        displayController.render();
        checkGameStatus();
        switchPlayer();
      }
    };
  
    const checkGameStatus = () => {
      const board = Gameboard.getBoard();
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          gameOver = true;
          displayController.showResult(`${currentPlayer.name} wins!`);
          return;
        }
      }
  
      if (!board.includes("") && !gameOver) {
        gameOver = true;
        displayController.showResult("It's a tie!");
      }
    };
  
    return { startGame, playTurn };
  })();
  
  const displayController = (() => {
    const boardContainer = document.getElementById("board");
    const resultDisplay = document.getElementById("result");
    const startBtn = document.getElementById("startBtn");
  
    startBtn.addEventListener("click", GameController.startGame);
  
    const render = () => {
      const board = Gameboard.getBoard();
      boardContainer.innerHTML = "";
      board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => GameController.playTurn(index));
        boardContainer.appendChild(cellElement);
      });
    };
  
    const showResult = (result) => {
      resultDisplay.textContent = result;
    };
  
    return { render, showResult };
  })();
  
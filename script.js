let board = [];
let n = 8; // default N size
let speed = 500;
const chessboard = document.getElementById('chessboard');
const speedControl = document.getElementById('speed');
const nSizeInput = document.getElementById('n-size');
const startBtn = document.getElementById('start-btn');

function createBoard() {
  chessboard.style.gridTemplateColumns = `repeat(${n}, 50px)`;
  chessboard.innerHTML = '';
  board = Array.from({ length: n }, () => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if ((i + j) % 2 === 1) cell.classList.add('black');
      cell.id = `${i}-${j}`;
      chessboard.appendChild(cell);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solveNQueen(row) {
  if (row === n) return true;

  for (let col = 0; col < n; col++) {
    if (isValid(row, col)) {
      board[row][col] = 1;
      renderQueen(row, col, true);
      await sleep(speed);

      if (await solveNQueen(row + 1)) return true;

      board[row][col] = 0;
      renderQueen(row, col, false);
      await sleep(speed);
    }
  }
  return false;
}

function isValid(row, col) {
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false;
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) return false;
  }
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 1) return false;
  }
  return true;
}

function renderQueen(row, col, isPlacing) {
  const cell = document.getElementById(`${row}-${col}`);
  if (isPlacing) {
    const queen = document.createElement('div');
    queen.classList.add('queen');
    cell.appendChild(queen);
  } else {
    cell.innerHTML = '';
  }
}

startBtn.addEventListener('click', () => {
  n = parseInt(nSizeInput.value);
  createBoard();
  solveNQueen(0);
});

speedControl.addEventListener('input', (e) => {
  speed = parseInt(e.target.value);
});

createBoard(); // Create board on page load

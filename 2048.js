const gridItems = document.querySelectorAll('.grid-item');
const newGameButton = document.getElementById('new-game');
const backToMenuButton = document.getElementById('back-to-menu');

let board = [];
let previousBoard = [];

// Inicia o jogo
function startGame() {
    board = Array(16).fill(0);
    previousBoard = [...board];
    generateRandomTile();
    generateRandomTile();
    updateGrid();
}

// Gera uma nova peça (2 ou 4) em uma posição aleatória
function generateRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < 16; i++) {
        if (board[i] === 0) {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = Math.random() < 0.9 ? 2 : 4;
}

// Atualiza a grid no HTML
function updateGrid() {
    board.forEach((value, index) => {
        const gridItem = gridItems[index];
        gridItem.textContent = value === 0 ? '' : value;
        gridItem.setAttribute('data-value', value);
    });

    previousBoard = [...board];
}

// Detecta movimentos de teclado
document.addEventListener('keydown', (e) => {
    let moved = false;
    if (e.key === 'ArrowLeft') {
        moved = moveLeft();
    } else if (e.key === 'ArrowRight') {
        moved = moveRight();
    } else if (e.key === 'ArrowUp') {
        moved = moveUp();
    } else if (e.key === 'ArrowDown') {
        moved = moveDown();
    }

    if (moved) {
        generateRandomTile();
        updateGrid();
    }
});

// Função para mover à esquerda
function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const row = board.slice(i * 4, i * 4 + 4);
        const newRow = moveRow(row);
        if (newRow.some((value, index) => value !== row[index])) {
            moved = true;
        }
        board.splice(i * 4, 4, ...newRow);
    }
    return moved;
}

// Função para mover à direita
function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const row = board.slice(i * 4, i * 4 + 4).reverse();
        const newRow = moveRow(row).reverse();
        if (newRow.some((value, index) => value !== row[index])) {
            moved = true;
        }
        board.splice(i * 4, 4, ...newRow);
    }
    return moved;
}

// Função para mover para cima
function moveUp() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const column = [board[i], board[i + 4], board[i + 8], board[i + 12]];
        const newColumn = moveRow(column);
        if (newColumn.some((value, index) => value !== column[index])) {
            moved = true;
        }
        [board[i], board[i + 4], board[i + 8], board[i + 12]] = newColumn;
    }
    return moved;
}

// Função para mover para baixo
function moveDown() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const column = [board[i], board[i + 4], board[i + 8], board[i + 12]].reverse();
        const newColumn = moveRow(column).reverse();
        if (newColumn.some((value, index) => value !== column[index])) {
            moved = true;
        }
        [board[i], board[i + 4], board[i + 8], board[i + 12]] = newColumn;
    }
    return moved;
}

// Função auxiliar para mover os números em uma linha ou coluna
function moveRow(row) {
    const filtered = row.filter(value => value !== 0);
    const merged = [];
    let skip = false;

    for (let i = 0; i < filtered.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }
        if (filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2);
            skip = true;
        } else {
            merged.push(filtered[i]);
        }
    }

    while (merged.length < 4) {
        merged.push(0);
    }

    return merged;
}

newGameButton.addEventListener('click', startGame);
backToMenuButton.addEventListener('click', () => {
    window.location.href = "menu.html"; // Redireciona para o menu
});

startGame();
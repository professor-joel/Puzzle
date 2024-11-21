// Obtém os botões dos jogos
const additionSubtractionButton = document.getElementById('addition-subtraction');
const multiplicationButton = document.getElementById('multiplication');
const divisionButton = document.getElementById('subtraction'); // Divisão foi colocado como Subtração no HTML

// Adiciona o evento de redirecionamento para cada botão
additionSubtractionButton.addEventListener('click', () => {
  window.location.href = 'game-ad-sub1.html'; // Redireciona para o jogo de Adição e Subtração
});

multiplicationButton.addEventListener('click', () => {
  window.location.href = 'game-veloz.html'; // Redireciona para o jogo de matemática rápida
});

divisionButton.addEventListener('click', () => {
  window.location.href = 'game-2048.html'; // Redireciona para o jogo 2048
});
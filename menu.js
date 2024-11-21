// Seleciona o botão de iniciar o jogo e o input de nome do jogador
const startGameButton = document.getElementById('start-game');
const playerNameInput = document.getElementById('player-name');

// Verifica se o nome do jogador foi digitado antes de redirecionar
startGameButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();

  if (playerName === '') {
    alert('Por favor, digite seu nome!');
  } else {
    // Salva o nome do jogador no localStorage
    localStorage.setItem('playerName', playerName);
    window.location.href = 'choice.html';
  }
});
class Game2 {
    constructor() {
      this.phase = 2;
      this.chances = 12;
      this.openedCards = [];
      this.matchedCards = [];
      this.cards = [];
      this.boardElement = document.getElementById('board');
      this.phaseInfoElement = document.getElementById('phase-info');
      this.chancesInfoElement = document.getElementById('chances-info');
      this.backToMenuButton = document.getElementById('back-to-menu');
  
      this.backToMenuButton.addEventListener('click', () => {
        window.location.href = 'menu.html';
      });
  
      this.start();
    }
  
    start() {
      this.updatePhaseInfo();
      this.updateChancesInfo();
      this.setupBoard();
    }
  
    updatePhaseInfo() {
      this.phaseInfoElement.textContent = `Fase: ${this.phase}`;
    }
  
    updateChancesInfo() {
      this.chancesInfoElement.textContent = `Chances: ${this.chances}`;
    }
  
    setupBoard() {
      const gridSize = this.getGridSize();
      this.generateCards(gridSize);
      this.boardElement.innerHTML = '';
      this.boardElement.style.gridTemplateColumns = `repeat(4, 1fr)`;
  
      this.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.dataset.index = index;
        cardElement.dataset.value = card.value;
        cardElement.dataset.expression = card.expression;
        cardElement.addEventListener('click', this.handleCardClick.bind(this));
        this.boardElement.appendChild(cardElement);
      });
    }
  
    getGridSize() {
      return 12;
    }
  
    generateCards(gridSize) {
      const expressions = [
        { expression: "2", value: 2 },
        { expression: "1 + 1", value: 2 },
        { expression: "5", value: 5 },
        { expression: "3 + 2", value: 5 },
        { expression: "3", value: 3 },
        { expression: "6 - 3", value: 3 },
        { expression: "4", value: 4 },
        { expression: "7 - 3", value: 4 },
        { expression: "8", value: 8 },
        { expression: "5 + 3", value: 8 },
        { expression: "6", value: 6 },
        { expression: "9 - 3", value: 6 },
      ];
  
      this.cards = expressions.map((expr) => ({
        value: expr.value,
        expression: expr.expression,
        hidden: true,
      }));
  
      this.cards = this.cards.sort(() => Math.random() - 0.5);
    }
  
    handleCardClick(event) {
      const cardElement = event.target;
  
      if (!cardElement.classList.contains('hidden') || this.openedCards.length === 2) {
        return;
      }
  
      cardElement.classList.remove('hidden');
      cardElement.textContent = cardElement.dataset.expression;
      this.openedCards.push(cardElement);
  
      if (this.openedCards.length === 2) {
        const [firstCard, secondCard] = this.openedCards;
  
        if (firstCard.dataset.value === secondCard.dataset.value) {
          this.matchedCards.push(firstCard, secondCard);
          this.openedCards = [];
  
          if (this.matchedCards.length === this.cards.length) {
            window.location.href = 'game-ad-sub3.html';
          }
        } else {
          this.chances--;
          this.updateChancesInfo();
  
          if (this.chances === 0) {
            alert('Você perdeu! Recomece.');
            window.location.href = 'menu.html';
          } else {
            setTimeout(() => {
              firstCard.classList.add('hidden');
              secondCard.classList.add('hidden');
              firstCard.textContent = '';
              secondCard.textContent = '';
              this.openedCards = [];
            }, 1000);
          }
        }
      }
    }
  }
  
  const game2 = new Game2();
class MathGame {
  constructor() {
    this.score = 0;
    this.maxScore = 50;
    this.timeLeft = 5;
    this.timer = null;
    this.currentQuestion = null;
    this.pointsPerQuestion = 2;

    this.questionElement = document.getElementById('question');
    this.answerInput = document.getElementById('answer-input');
    this.scoreElement = document.getElementById('score');
    this.timeLeftElement = document.getElementById('time-left');
    this.startButton = document.getElementById('start-button');
    this.backToMenuButton = document.getElementById('back-to-menu');

    this.startButton.addEventListener('click', this.startGame.bind(this));
    this.answerInput.addEventListener('keydown', this.checkAnswer.bind(this));
    this.backToMenuButton.addEventListener('click', () => {
      window.location.href = 'menu.html';
    });
  }

  startGame() {
    this.score = 0;
    this.updateScore();
    this.nextQuestion();
  }

  nextQuestion() {
    this.clearTimer();
    this.timeLeft = 5;
    this.updateTime();
    this.currentQuestion = this.generateQuestion();
    this.questionElement.textContent = this.currentQuestion.text;
    this.answerInput.value = '';
    this.answerInput.focus();
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTime();
      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let result;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
    }

    return {
      text: `${num1} ${operation} ${num2}`,
      answer: result,
    };
  }

  checkAnswer(event) {
    if (event.key === 'Enter') {
      const playerAnswer = parseInt(this.answerInput.value, 10);

      if (playerAnswer === this.currentQuestion.answer) {
        this.score += this.pointsPerQuestion;
        this.updateScore();

        if (this.score >= this.maxScore) {
          this.winGame();
        } else {
          this.nextQuestion();
        }
      } else {
        this.gameOver();
      }
    }
  }

  updateScore() {
    this.scoreElement.textContent = `Pontuação: ${this.score}`;
  }

  updateTime() {
    this.timeLeftElement.textContent = `Tempo restante: ${this.timeLeft}s`;
  }

  clearTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  gameOver() {
    this.clearTimer();
    alert('Você perdeu! Sua pontuação foi zerada.');
    this.score = 0;
    this.updateScore();
    this.questionElement.textContent = 'Tente novamente!';
  }

  winGame() {
    this.clearTimer();
    alert('Parabéns! Você atingiu a pontuação máxima!');
    window.location.href = 'menu.html';
  }
}

new MathGame();
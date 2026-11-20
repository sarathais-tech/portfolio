const questions = [
  { text: 'Quanto é 7 × 6?', options: ['36', '42', '48'], correct: 1 },
  { text: 'Qual é o Planeta Vermelho?', options: ['Marte', 'Vênus', 'Júpiter'], correct: 0 },
  { text: 'Qual componente move a porta do Coflume físico?', options: ['LED', 'Display', 'Microservo'], correct: 2 },
];

const safe = document.querySelector('.safe-shell');
const status = document.querySelector('#game-status');
const question = document.querySelector('#game-question');
const answers = document.querySelector('#game-answers');
const advance = document.querySelector('#game-advance');
let position = -1;
let score = 0;

function showQuestion() {
  const current = questions[position];
  status.textContent = `Pergunta ${position + 1} de ${questions.length}`;
  question.textContent = current.text;
  question.hidden = false;
  answers.hidden = false;
  advance.hidden = true;
  answers.replaceChildren();

  current.options.forEach((option, index) => {
    const choice = document.createElement('button');
    choice.type = 'button';
    choice.className = 'outline';
    choice.textContent = option;
    choice.addEventListener('click', () => {
      const correct = index === current.correct;
      if (correct) score += 1;
      status.textContent = correct ? 'Acertou!' : `A resposta certa é ${current.options[current.correct]}.`;
      advance.textContent = position === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
      advance.hidden = false;
      advance.focus();
      for (const button of answers.children) button.disabled = true;
    });
    answers.append(choice);
  });
  question.focus();
}

advance.addEventListener('click', () => {
  if (position < 0 || position === questions.length) {
    score = 0;
    position = 0;
    safe.classList.remove('is-open');
    showQuestion();
    return;
  }

  position += 1;
  if (position < questions.length) {
    showQuestion();
    return;
  }

  const won = score >= 2;
  safe.classList.toggle('is-open', won);
  answers.hidden = true;
  answers.replaceChildren();
  question.textContent = won ? 'Cofre aberto!' : 'Cofre trancado';
  status.textContent = won
    ? `${score} de 3. Bastidor da montagem: o microservo tem uma fonte de 5 V própria e compartilha o GND com o ESP32.`
    : `${score} de 3. Acerte pelo menos duas para abrir o cofre.`;
  advance.textContent = 'Jogar de novo';
  question.focus();
});

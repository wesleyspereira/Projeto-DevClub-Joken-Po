const result = document.querySelector('.result');
const humanScore = document.querySelector('#human-score');
const machineScore = document.querySelector('#machine-score');
const humanHand = document.querySelector('#human-hand');
const machineHand = document.querySelector('#machine-hand');
const humanChoiceLabel = document.querySelector('#human-choice');
const machineChoiceLabel = document.querySelector('#machine-choice');
const arena = document.querySelector('.arena');
const buttons = document.querySelectorAll('.btn');

let humanScoreNumber = 0;
let machineScoreNumber = 0;
let isPlaying = false;

const GAME_OPTIONS = {
    ROCK: 'pedra',
    PAPER: 'papel',
    SCISSORS: 'tesoura'
};

const CHOICES = {
    pedra: { emoji: '👊', name: 'Pedra', beats: 'tesoura', color: '#a200ff' },
    papel: { emoji: '🖐️', name: 'Papel', beats: 'pedra', color: '#9ee01a' },
    tesoura: { emoji: '✌️', name: 'Tesoura', beats: 'papel', color: '#7dbeed' }
};

const playMachine = () => {
    const choices = Object.values(GAME_OPTIONS);
    return choices[Math.floor(Math.random() * choices.length)];
};

const playHuman = (humanChoice) => {
    // Impede cliques extras de iniciar rodadas durante a animação.
    if (isPlaying || !Object.hasOwn(CHOICES, humanChoice)) return;
    isPlaying = true;
    buttons.forEach(button => { button.disabled = true; });

    const machineChoice = playMachine();
    humanHand.textContent = '👊';
    machineHand.textContent = '👊';
    humanChoiceLabel.textContent = 'Preparando…';
    machineChoiceLabel.textContent = 'Preparando…';
    result.dataset.outcome = '';
    result.textContent = 'Pedra…';
    // Volta às cores neutras do CSS durante a animação.
    humanHand.parentElement.style.backgroundColor = '';
    machineHand.parentElement.style.backgroundColor = '';
    humanHand.parentElement.style.color = '';
    machineHand.parentElement.style.color = '';
    arena.classList.add('is-playing');

    // A contagem acompanha as mãos antes de revelar as jogadas.
    setTimeout(() => { result.textContent = 'Papel…'; }, 450);
    setTimeout(() => { result.textContent = 'Tesoura!'; }, 900);
    setTimeout(() => {
        arena.classList.remove('is-playing');
        humanHand.textContent = CHOICES[humanChoice].emoji;
        machineHand.textContent = CHOICES[machineChoice].emoji;
        humanChoiceLabel.textContent = CHOICES[humanChoice].name;
        machineChoiceLabel.textContent = CHOICES[machineChoice].name;

        // Cada cartão recebe a mesma cor do botão da jogada escolhida.
        humanHand.parentElement.style.backgroundColor = CHOICES[humanChoice].color;
        machineHand.parentElement.style.backgroundColor = CHOICES[machineChoice].color;
        humanHand.parentElement.style.color = humanChoice === 'pedra' ? '#fff' : '#111';
        machineHand.parentElement.style.color = machineChoice === 'pedra' ? '#fff' : '#111';

        playTheGame(humanChoice, machineChoice);
        isPlaying = false;
        buttons.forEach(button => { button.disabled = false; });
    }, 1350);
};

const playTheGame = (humanChoice, machineChoice) => {
    let message;
    if (humanChoice === machineChoice) {
        message = 'Deu empate!';
        result.dataset.outcome = 'draw';
    } else if (CHOICES[humanChoice].beats === machineChoice) {
        humanScoreNumber++;
        humanScore.textContent = humanScoreNumber;
        message = 'Você ganhou!';
        result.dataset.outcome = 'win';
    } else {
        machineScoreNumber++;
        machineScore.textContent = machineScoreNumber;
        message = 'A CPU ganhou!';
        result.dataset.outcome = 'loss';
    }

    result.textContent = `Você: ${CHOICES[humanChoice].name} · CPU: ${CHOICES[machineChoice].name}. ${message}`;
};

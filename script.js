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
    pedra: { emoji: '👊', name: 'Pedra', beats: 'tesoura' },
    papel: { emoji: '🖐️', name: 'Papel', beats: 'pedra' },
    tesoura: { emoji: '✌️', name: 'Tesoura', beats: 'papel' }
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

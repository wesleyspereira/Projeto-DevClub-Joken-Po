const result = document.querySelector('.result')
const humanScore = document.querySelector('#human-score')
const machineScore = document.querySelector('#machine-score')

let humanScoreNumber = 0;
let machineScoreNumber = 0;

const GAME_OPTIONS = {
    ROCK: 'pedra',
    PAPER: 'papel',
    SCISSORS: 'tesoura'
}


const playHuman = (humanchoice) => {
    playTheGame(humanchoice, playMachine())
}
const playMachine = () => {
    const choices = [GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, GAME_OPTIONS.SCISSORS];
    const randomNunber = Math.floor(Math.random() * 3);
    return choices[randomNunber]
}
const playTheGame = (humanchoice, machinechoice) => {
    console.log('Humano:' + humanchoice + ' Maquina:' + machinechoice)

    if (humanchoice === machinechoice) {
        result.innerHTML = 'Deu empate!'
    }
    else if (humanchoice === GAME_OPTIONS.ROCK && machinechoice === GAME_OPTIONS.SCISSORS ||
        humanchoice === GAME_OPTIONS.PAPER && machinechoice === GAME_OPTIONS.ROCK ||
        humanchoice === GAME_OPTIONS.SCISSORS && machinechoice === GAME_OPTIONS.PAPER) {

        humanScoreNumber++
        humanScore.innerHTML = humanScoreNumber
        result.innerHTML = 'Você ganhou!'
    }
    else {
        machineScoreNumber++
        machineScore.innerHTML = machineScoreNumber
        result.innerHTML = 'Você perdeu para Alexa!'
    }
}
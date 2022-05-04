const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'
const SONG = 'notification.mp3'
const SONG2 = 'notification2.mp3'
const TITLE = 'Parabens você capturou um novo pokemon'

const cardCheck = document.getElementById('card-check')

startGame()

function startGame() {
  initializeCards(game.createCardsFromPoks())
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard')
  gameBoard.innerHTML = ''
  game.cards.forEach(card => {
    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon

    setTimeout(() => {
      cardElement.classList.add('flip')
    }, 300)

    setTimeout(() => {
      cardElement.classList.remove('flip')
    }, 5000)

    creatCardContent(card, cardElement)

    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}

function creatCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)
  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = './imagens/' + card.icon + '.png'
    cardElementFace.appendChild(iconElement)
  } else {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = './imagens/pokebola.png'
    cardElementFace.appendChild(iconElement)
  }
  element.appendChild(cardElementFace)
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards()
        cardCheck.play()

        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById('gameOver')
          gameOverLayer.style.display = 'flex'
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          game.unflipCards()
        }, 1500)
      }
    }
  }
}

function restart() {
  game.clearCards()
  startGame()
  let gameOverLayer = document.getElementById('gameOver')
  gameOverLayer.style.display = 'none'
  document.getElementById('song2').play().document.getElementById('song2')
}

function start() {
  game.clearCards
  startGame()
  let gameOverLayer = document.getElementById('gamePlay')
  gameOverLayer.style.display = 'none'
  let gameStart = document.getElementById('gameBoard')
  gameStart.style.display = 'grid'
  document.getElementById('song').play().document.getElementById('song')
}

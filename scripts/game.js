let musica = document.getElementById('song')
let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  poks: [
    'charizard',
    'pikachu',
    'evee',
    'gengar',
    'zeraora',
    'snorlax',
    'tsareena',
    'suicune',
    'cinderace',
    'alakazam',
    'nevinha',
    'dragonite',
    'meowth',
    'mrmime',
    'venusaur',
    'farfetch',
    'blastoise',
    'aegislash'
  ],

  cards: null,

  setCard: function (id) {
    let card = this.cards.filter(card => card.id === id)[0]
    console.log(card)

    if (card.flipped || this.lockMode) {
      return false
    }

    if (!this.firstCard) {
      this.firstCard = card
      this.firstCard.flipped = true
      return true
    } else {
      this.secondCard = card
      this.secondCard.flipped = true
      this.lockMode = true
      return true
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false
    }
    return this.firstCard.icon === this.secondCard.icon
  },
  notifyMe: function () {
    if (this.firstCard.icon === this.secondCard.icon) return true
  },

  clearCards: function () {
    this.firstCard = null
    this.secondCard = null
    this.lockMode = false
  },

  unflipCards() {
    this.firstCard.flipped = false
    this.secondCard.flipped = false
    this.clearCards()
  },

  checkGameOver() {
    return this.cards.filter(card => !card.flipped).length == 0
  },

  createCardsFromPoks: function () {
    this.cards = []

    this.poks.forEach(pok => {
      this.cards.push(this.createPairFromPok(pok))
    })

    this.cards = this.cards.flatMap(pair => pair)
    this.shuffleCards()
    return this.cards
  },

  createPairFromPok: function (pok) {
    return [
      {
        id: this.createIdWithPok(pok),
        icon: pok,
        flipped: false
      },
      {
        id: this.createIdWithPok(pok),
        icon: pok,
        flipped: false
      }
    ]
  },

  createIdWithPok: function (pok) {
    return pok + parseInt(Math.random() * 1000)
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex]
      ]
    }
  }
}

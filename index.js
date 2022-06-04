const cardValues = ['2','3','4','5','6','7','8','9', '10', 'Jack', 'Queen', 'King', 'Ace']
const cardSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const drawButton = document.querySelector('#drawCards')
const seeFlopButton = document.querySelector('#seeFlop')

const currentBestHand = document.querySelector('#current-best-hand')
const switchViewButton = document.querySelector('#toggleMode')
const mainContainer = document.querySelector('.main-container')
const audio = new Audio('./card-sound.mp3')
const switchAudio = new Audio('./switch-screen.mp3')

let hasFlopBeenShown = false
let hasTurnCardBeenShown = false
let hasRiverCardBeenShown = false

let playersHandCards = []
let topModeView = true

var test = [
{name: '3', value: 3, suit: 'Hearts'},
{name: '3', value: 3, suit: 'Spades'},
{name: '3', value: 3, suit: 'Clubs'},
{name: '6', value:  6, suit: 'Clubs'},
{name: '6', value: 6, suit: 'Hearts'},
{name: '6', value: 6, suit: 'Hests'},
{name: 'King', value: 13, suit: 'Hearts'}
]

seeFlopButton.disabled = true

switchViewButton.addEventListener('click', function() {
    topModeView = !topModeView
    switchAudio.play()
    this.disabled = true
  if (!topModeView) {
    document.querySelector('#title > p').innerHTML = `<p>Poker Texas Hold' em </p>`
    mainContainer.classList.remove('top-mode')
      mainContainer.classList.add('bottom-mode')
      switchAudio.play()
      this.disabled = false

  } else {
    document.querySelector('#title > p').innerHTML = `<p>Poker Texas Hold' em </p>`
    mainContainer.classList.remove('bottom-mode')
    mainContainer.classList.add('top-mode')
    switchAudio.play()
    this.disabled = false


  }

  // setTimeout(function() {this.disabled = false},5000)
})

let cardDeck = []
for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardSuits.length; j++) {
        cardDeck = [...cardDeck, {
          name: cardValues[i],
          fullName:`${cardValues[i]} Of ${cardSuits[j]}`,
          value:cardValues.indexOf(cardValues[i]) + 2,
          suit:cardSuits[j]
        }]
    }
}




drawButton.addEventListener('click', function() {

    audio.play()
    const randomIndex1 = getRndInteger(0, cardDeck.length - 1)
    const card1 = cardDeck.splice(randomIndex1, 1)
    playersHandCards.push(card1)
    const randomIndex2 = getRndInteger(0, cardDeck.length - 1)
    const card2 = cardDeck.splice(randomIndex2, 1)
    playersHandCards.push(card2)

    document.querySelector('.card1  > .card-body').classList.toggle('rotate')
    document.querySelector('.card2  > .card-body').classList.toggle('rotate')

    setTimeout(function() {
    document.querySelector('.card1  > .card-body').classList.toggle('rotate')
    document.querySelector('.card2  > .card-body').classList.toggle('rotate')
    document.querySelector('.card1  .card-front').innerHTML = `<p>Hover To See</p>`
    document.querySelector('.card2  .card-front').innerHTML = `<p>Hover To See</p>`

    seeFlopButton.disabled = false
  },1400)

  document.querySelector('.card1  .card-back').innerHTML = `<p>${card1[0].fullName}</p>`
  document.querySelector('.card2  .card-back').innerHTML = `<p>${card2[0].fullName}</p>`



  document.querySelector('#current-best-hand').textContent = card1[0].value === card2[0].value ? `1-Pair (${card1[0].name})` :
  card1[0].value > card2[0].value ? `${card1[0].name}-High` : `${card2[0].name}-High`

  this.disabled = true

})



seeFlopButton.addEventListener('click', function(e) {

   seeFlopButton.textContent = cardDeck.length === 52 ? 'See Flop' : cardDeck.length === 50 ? 'See Turn'  : 'See River'

   //to see and analyze best hand in the Flop
  if (!hasFlopBeenShown) {
    audio.play()
      seeFlopButton.disabled = true
      hasFlopBeenShown = true
    const flopCardIndex1 = getRndInteger(0, cardDeck.length - 1)
    const flopCard1 = cardDeck.splice(flopCardIndex1, 1)

    const flopCardIndex2 = getRndInteger(0, cardDeck.length - 1)
    const flopCard2 = cardDeck.splice(flopCardIndex2, 1)

    const flopCardIndex3 = getRndInteger(0, cardDeck.length - 1)
    const flopCard3 = cardDeck.splice(flopCardIndex3, 1)

    const flopCards =  [flopCard1, flopCard2, flopCard3]
    const allFlopCards = document.querySelectorAll('.table-card-flop > .table-card-back')



    for (let i = 0; i < flopCards.length; i++) {

      allFlopCards[i].textContent = flopCards[i][0].fullName
      allFlopCards[i].parentElement.style.transform = `rotateY(-180deg)`
    }

    playersHandCards = [...playersHandCards, ...flopCards ].flat()

    setTimeout(function(){seeFlopButton.disabled = false}, 1400)
    currentBestHand.textContent = checkValueOfHand(playersHandCards)

    return checkValueOfHand(playersHandCards)
  }

   if (hasFlopBeenShown && !hasTurnCardBeenShown) {
     audio.play()
    hasTurnCardBeenShown = true
    const turnCardIndex = getRndInteger(0, cardDeck.length - 1)
    const turnCard = cardDeck.splice(turnCardIndex, 1)[0]
    playersHandCards.push(turnCard)

    const turnCardDiv = document.querySelector('.table-card-turn > .table-card-back')
    turnCardDiv.textContent  = turnCard.fullName
    turnCardDiv.parentElement.style.transform = `rotateY(-180deg)`
    currentBestHand.textContent = checkValueOfHand(playersHandCards)
    return checkValueOfHand(playersHandCards)

  }
    if (hasFlopBeenShown && hasTurnCardBeenShown) {
      audio.play()
     hasRiverCardBeenShown = true
    const RiverCardIndex = getRndInteger(0, cardDeck.length - 1)
    const riverCard = cardDeck.splice(RiverCardIndex, 1)[0]
    playersHandCards.push(riverCard)

    const riverCardDiv = document.querySelector('.table-card-river > .table-card-back')
    riverCardDiv.textContent  = riverCard.fullName
    riverCardDiv.parentElement.style.transform = `rotateY(-180deg)`
    setTimeout(function(){
      const allCardBodies = document.querySelectorAll('.player-card')

      for (const element of allCardBodies) {
        element.style.transform = `rotateY(-180deg)`
      }
      audio.play()

    }, 1400)
    this.textContent = `Game Ended!`
    this.disabled = true
    currentBestHand.textContent = checkValueOfHand(playersHandCards)
    return checkValueOfHand(playersHandCards)

   }

})

function checkValueOfHand(arrayOfPlayerCards) {
   console.log('checkValueOfHand ran')
  let bestCurrentHand = ''
  const functionsArray = [isItFlushIfSoWhatKind, checkQuads ,checkFullHouseAndTriples, checkStraight, checkPairs, checkHighCard]
  for (const myFunction of functionsArray) {
    if (myFunction(arrayOfPlayerCards)) {
      bestCurrentHand =  myFunction(arrayOfPlayerCards)
      currentBestHand.textContent = bestCurrentHand
      break;

    }
  }

 return bestCurrentHand

}

function objCountConstructor(arrayOfPlayerCards, desiredCategory) {
  //desiredCategory can be either 'name', 'value' or 'suit'
      const obj = {}
       for (const card of arrayOfPlayerCards) {
        if (!obj[`${card[desiredCategory]}`]) {
          obj[`${card[desiredCategory]}`] = 1
        } else {
          obj[`${card[desiredCategory]}`]++
        }
    }
    return obj
}

function checkHighCard(arrayOfPlayerCards) {
  const obj = objCountConstructor(arrayOfPlayerCards, 'name')
  const objKeys =  Object.keys(obj)
  const objValues =  Object.values(obj)

  console.log('CheckHighCard Keys', objKeys)

  return `${objKeys[objKeys.length-1]} High, ${objKeys[objKeys.length-2]}-Kicker`

}

function checkPairs(arrayOfPlayerCards) {
  console.log('check pairs ran')
  arrayOfPlayerCards.sort((a,b) => a.value < b.value ? -1 : a.value === b.value ? 0 : 1)
  const obj = objCountConstructor(arrayOfPlayerCards, 'name')

  const objKeys =  Object.keys(obj)
  const objValues =  Object.values(obj)

// the code below means if there are no two cards of the same values then there are no pairs
  if (!objValues.includes(2)) return false

  const occurrences = PairOccurences(objKeys, objValues)

  if (occurrences === 1) return `Pair of ${objKeys[objValues.indexOf(2)]}s`
  if (occurrences === 2) return `2 Pairs: ${objKeys[objValues.lastIndexOf(2)]}s & ${objKeys[objValues.indexOf(2)]}s Kicker`
  if (occurrences === 3 ) {
      //card names already sorted from low to high (2 => Ace) so first index of occurence = lowest value pair
    objKeys.splice(objValues.indexOf(2), 1)
    objValues.splice(objValues.indexOf(2), 1)
    return `2 Pairs: ${objKeys[objValues.lastIndexOf(2)]}s & ${objKeys[objValues.indexOf(2)]}s Kicker`
  }
}

function PairOccurences(arrayofObjKeys, arrayOfNumbersValues, desiredValue = 2) {

  let occurrenceCount = 0
  for (const number of arrayOfNumbersValues) {
    if (desiredValue === number) occurrenceCount++
  }
  let has1Pair = occurrenceCount === 1 ? 1 : false
  let has2Pairs = occurrenceCount === 2 ? 2 : false
  let has3Pairs = occurrenceCount === 3 ? 3 : false

  for (const howManyPairsDoWeHave of [has1Pair, has2Pairs, has3Pairs]) {
    if (howManyPairsDoWeHave) return howManyPairsDoWeHave
  }

}



function isItFlushIfSoWhatKind(array) {
  console.log('isItFlushIfSoWhatKind ran')
  const obj = {}
  for (const card of array) {
    !obj[`${card.suit}`] ? obj[`${card.suit}`] = 1 : obj[`${card.suit}`]++
  }

  const objKeys = Object.keys(obj)
  const objValues = Object.values(obj)

  // to have a flush, a players hand must have at least 5 of the same suits, denoted by objValues

  if ( Math.max(...objValues) >= 5)  {
      const amountOfFlushCards =  Math.max(...objValues)
      const desiredSuit = objKeys[objValues.indexOf(amountOfFlushCards)]

      const filteredHand = array.filter(val => val.suit === desiredSuit)
      console.log('filtered hand', filteredHand)
      return checkFlush(filteredHand, desiredSuit)
  } else {
    return false
  }
}
function checkQuads(array) {

  let quadHighName

  const obj = objCountConstructor(array, 'name')
  const objKeys = Object.keys(obj)
  const objValues = Object.values(obj)

  quadHighName = objKeys[objValues.indexOf(Math.max(...objValues))]
  return objValues.includes(4) ? `Four-of-a-Kind (${quadHighName}s)` : false
}

function checkFlush(array, givenSuit='[*Note: suit was not given as second argument]') {
   console.log('checkFlush ran')
   // This function checks for TYPES of flush AFTER the last function isItaFlush returns true.
   // Checks for royal/regular flushes
   // Note that you CANNOT have BOTH a flush AND Quads w/ 2 draw cards + 5 community cards in Texas Hold 'em
  const initialValue = array[0].suit
      let highestCard = 0
      let handValue = 0
      const straightCheckValues = []

      for (const card of array) {
        if (card.value >= highestCard) {
          highestCard = card.value
        }
        handValue += card.value
        straightCheckValues.push(card.value)

      }

      straightCheckValues.sort((a,b) => a-b)
      const royalFlushChecker = straightCheckValues.slice(straightCheckValues.length - 5, straightCheckValues.length)

      return straightCheckValues[straightCheckValues.length - 1] === 14 && royalFlushChecker.reduce((a,b) => a+b, 0) >= 60 && straightCheckValues.includes(13) ?
            // Note that you must check for Royal Flush BEFORE Straight Flushes since an Ace can form the bottom end of a straight => A,2,3,4,5
            // in Texas Hold 'em
            `ROYALL FLUSHHHH` : checkStraight(array) ? // Note that you CANNOT have BOTH a flush AND Quads w/ 2 draw cards + 5 community cards in Texas Hold 'em
            checkStraight(array) + ` FLUSH!!!` : `${convertToCardName(highestCard)}-High Flush ${givenSuit}`



    // return straightCheckValues[straightCheckValues.length - 1] === 14 && royalFlushChecker.reduce((a,b) => a+b, 0) >= 60 && straightCheckValues.includes(13) ?
    //        `ROYALL FLUSHHHH` :

    //  if (checkStraight(array)) {
    //         console.log('wopwow array', array)
    //            return checkStraight(array) + ` FLUSH!!!`
    //  }
    //  if (!checkStraight(array) && checkQuads(array)) {
    //       return `${checkQuads(array)}`
    //  }


    //   return `${convertToCardName(highestCard)}-High Flush ${givenSuit}`

}

function checkFullHouseAndTriples(array) {
    console.log('checkFullHouseAndTriples ran')
    const obj = objCountConstructor(array, 'name')

    const objKeys = Object.keys(obj)
    const objValues = Object.values(obj)

    console.log(objKeys)
    console.log(objValues)

    let highSet = ''
    let lowSet = ''
    if (objValues.includes(3) && objValues.includes(2)) {

        highSet = objKeys[objValues.indexOf(3)]
        lowSet = objKeys[objValues.lastIndexOf(2)]
        return `Full House of ${highSet}s w/ ${lowSet}-Kickers `
    }

  else if (objValues.includes(3) && !objValues.includes(2)) {
    let targetCount = 0
    for (const val of objValues) {
      if (val === 3) targetCount++
    }

    if (targetCount === 1 && !checkStraight(array)) {
      const highestTriples = objKeys[objValues.lastIndexOf(3)]
      return `Three of a Kind ${highestTriples}s-High`
    } else {
        return checkStraight(array)
    }

    //This mean there are Two Sets-Of-3s, which is just a FULL House

    if (targetCount === 2) {
        highSet = objKeys[objValues.lastIndexOf(3)]
        lowSet = objKeys[objValues.indexOf(3)]
      return `Full House of ${highSet}s w/ ${lowSet}-Kickers `
    }

  }

  return false

}
function checkStraight(array) {
  console.log('checkStraight ran')
  let possibleStraightValues = []
  for (const card of array)  {
    possibleStraightValues.push(card.value)
  }

  possibleStraightValues = [...new Set(possibleStraightValues)].sort((a,b) => a-b)

  if (possibleStraightValues.length < 5) return false
  const consecutiveValues = possibleStraightValues.filter((value, idx) => possibleStraightValues.includes(value + 1) || possibleStraightValues.includes(value - 1))

  let straightCount = 0
  let highestCard = ''


  for (let i = 0; i < consecutiveValues.length - 1; i++) {
      if (consecutiveValues[i] + 1 === consecutiveValues[i + 1]) {
        straightCount++
        if (straightCount === 4 ) {
          highestCard = checkForHighStraight(consecutiveValues)
          return `${highestCard}-High Straight`

        }

      } else {
        straightCount = 0
      }
  }

  return false
}
/////////////////////////////////////////

function checkForHighStraight(array) {
  console.log('checkForHighStraight ran')
   const highStraightArr = array.slice(4)
   let currentHighestStraightValue = highStraightArr[0]
   const cardFaceValues = [2,3,4,5,6,7,8,9,10,'Jack','Queen', 'King', 'Ace']

   for (let i = 0; i < highStraightArr.length - 1; i++) {
      if (highStraightArr[i + 1] === currentHighestStraightValue + 1) {
          currentHighestStraightValue++
      } else {
         currentHighestStraightValue = currentHighestStraightValue
      }
   }
   return convertToCardName(currentHighestStraightValue)
  //  currentHighestStraightValue = currentHighestStraightValue <= 10 ? currentHighestStraightValue :
  //  currentHighestStraightValue === 11 ? 'Jack' : currentHighestStraightValue === 12 ? 'Queen' :
  //  currentHighestStraightValue === 13 ? 'King' : 'Ace'


}

function convertToCardName(faceCardValue) {
  if (faceCardValue <= 10) return faceCardValue

   return faceCardValue = faceCardValue === 11 ? 'Jack'
          : faceCardValue === 12 ? 'Queen'
          : faceCardValue === 13 ? 'King'
          : 'Ace'
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

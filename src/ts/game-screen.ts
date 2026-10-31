import { CardSelectionState, GameState, MemoryCard } from "./intefaces";
import { gameImages, cardCover } from "./themes";
import { gameSettings } from "./setting-screen";
import { createCardTemplate } from "./templates";

type Theme = keyof typeof cardCover;

export function initGameScreen() {
    const theme = gameSettings.theme as Theme;
    const gameState = createGameState();

        const numberOfPairs = gameSettings.boardSize! / 2;
        const selectedCards = gameImages[theme].slice(0, numberOfPairs);
        const cards = createMemoryCards(selectedCards);
        shuffleArray(cards);
        renderCards(cards, theme);
        displayGameStats(gameState);
        handleCardClick(cards, gameState);
}

function displayGameStats(gameState:GameState){
    let blueScoreRef = document.querySelector<HTMLSpanElement>(".blue-score");
    let orangeScoreRef = document.querySelector<HTMLSpanElement>(".orange-score");
    let currentPlayerRef = document.querySelector<HTMLSpanElement>(".current-player");
    const player = gameState.activePlayer;

    if (blueScoreRef && orangeScoreRef && currentPlayerRef) {
        blueScoreRef.textContent = String(gameState.scoreBlue);
        orangeScoreRef.textContent = String(gameState.scoreOrange);
        currentPlayerRef.textContent = player.charAt(0).toUpperCase() + player.slice(1);
        
    }
}


function createGameState():GameState{
    const playerColour = gameSettings.playerColour;

    if (playerColour !== "blue" && playerColour !== "orange") {
        throw new Error("Player color not found");
    }

    return {
        activePlayer : playerColour,
        scoreBlue : 0,
        scoreOrange : 0,
        gameRunning : true,
        gameOver : false,
    }
}


function createMemoryCards(images:string[]):MemoryCard[]{
        const cards = images.flatMap((image, index): MemoryCard[] =>[
            {
                id : index*2,
                pairId : index,
                img : image,
                isFlipped : false,
                isMatched : false 
            },{
                id : index*2+1,
                pairId : index,
                img : image,
                isFlipped : false,
                isMatched : false
            }
        ]);
        return cards;
}

function shuffleArray(cards: MemoryCard[]): MemoryCard[] {
  for (let i = cards.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Elemente tauschen
  }
  
  return cards;
}

function renderCards(cards: MemoryCard[], theme:Theme): void {
    const gameField = document.querySelector<HTMLElement>("#field");
    if (!gameField) {
        throw new Error('Das Spielfeld "#field" wurde nicht gefunden.');
    }

    if (gameSettings.boardSize === 16) {
        gameField.style.gridTemplateColumns = "repeat(4, max-content)";
    } else if (gameSettings.boardSize === 24 || gameSettings.boardSize === 36) {
        gameField.style.gridTemplateColumns = "repeat(6, max-content)";
    }

    const template = createCardTemplate();
    const cardElements = cards.map((card) => {
        const fragment = template.content.cloneNode(true) as DocumentFragment;
        const button = fragment.querySelector<HTMLButtonElement>(".card");
        const frontImage = fragment.querySelector<HTMLImageElement>(".card__face--front");
        const backImage = fragment.querySelector<HTMLImageElement>(".card__face--back");

        if (!button || !backImage || !frontImage) {
            throw new Error("Das Karten-Template ist unvollständig.");
        }

        button.dataset.cardId = String(card.id);
        backImage.src = cardCover[theme][0];
        frontImage.src = card.img;

        return fragment;
    });
    gameField.replaceChildren(...cardElements);
}

function handleCardClick(cards: MemoryCard[], gameState:GameState){
    const selectionState : CardSelectionState = {
        flippedCards:[],
        isLocked : false
    }
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof Element) ) {
                return;
            }
            const card = (event.target as HTMLElement).closest(".card") as HTMLButtonElement;
           
            const id = Number(card.dataset.cardId) 
            const memoryCard = cards.find((card) => card.id === id);
            if (!memoryCard || memoryCard.isMatched || memoryCard.isFlipped || selectionState.isLocked) {
                return
            }
            if (selectionState.flippedCards.length < 2 && card && !card.classList.contains("is-flipped") && !selectionState.isLocked) {
                    card.classList.add("is-flipped");
                    memoryCard.isFlipped = true;
                    selectionState.flippedCards.push(memoryCard)
                }
                if (selectionState.flippedCards.length === 2) {
                selectionState.isLocked = true;
                checkCardMatch(selectionState, gameState)
            }
        });
    }
}

function checkCardMatch(selectionState:CardSelectionState, gameState:GameState){
    const firstCard = selectionState.flippedCards[0];
    const secondCard = selectionState.flippedCards[1];

    if (firstCard.pairId === secondCard.pairId) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        playerScore(gameState);
        unflipCards(selectionState, true);
        displayGameStats(gameState)
    } else if (firstCard.pairId !== secondCard.pairId){
        unflipCards(selectionState, false);
        gameState.activePlayer = gameState.activePlayer === "blue" ? "orange": "blue";
        displayGameStats(gameState)
    }
}

function playerScore(gameState:GameState){
    if (gameState.activePlayer === "blue") {
        gameState.scoreBlue++
    }else{
        gameState.scoreOrange++
    }
}

function unflipCards(selectionState: CardSelectionState, cardMatch: boolean) {
    const flippedCards = selectionState.flippedCards;

    if (cardMatch) {
        flippedCards.forEach((flippedCard) => {
            flippedCard.isMatched = true;
                const cardElement = document.querySelector<HTMLButtonElement>(
                `.card[data-card-id="${flippedCard.id}"]`
            );
            setTimeout(() => {
                cardElement?.classList.add("is-match");
            }, 200);
        });
        setTimeout(() => {
            selectionState.isLocked = false;
            flippedCards.length = 0;
        }, 200);
        
    }else{
        setTimeout(() => {
            flippedCards.forEach((flippedCard) => {
                const cardElement = document.querySelector<HTMLButtonElement>(
                    `.card[data-card-id="${flippedCard.id}"]`
                );
                cardElement?.classList.remove("is-flipped");
                flippedCard.isFlipped = false;
            });
            flippedCards.length = 0;
            selectionState.isLocked = false;
        }, 700);
    }
}
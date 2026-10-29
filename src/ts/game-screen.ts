import { GameSettings, MemoryCard } from "./intefaces";
import { gameImages, cardCover } from "./themes";
import { gameSettings } from "./setting-screen";
import { createCardTemplate } from "./templates";

type Theme = keyof typeof cardCover;

export function initGameScreen() {
    const theme = gameSettings.theme;

    if (
        theme === "codeVibeTheme" ||
        theme === "gamingTheme" ||
        theme === "daProjectTheme"
    ) {
        const numberOfPairs = gameSettings.boardSize! / 2;
        const selectedCards = gameImages[theme].slice(0, numberOfPairs);
        const cards = createMemoryCards(selectedCards);
        shuffleArray(cards);
        renderCards(cards, theme);
        handleCardClick(cards);
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
  console.log(cards);
  
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

function handleCardClick(cards: MemoryCard[]){
    const fieldRef = document.getElementById("field");

    if (fieldRef) {
        fieldRef.addEventListener("click", (event) => {
            const card = (event.target as HTMLElement).closest(".card") as HTMLButtonElement;
           
            const id = Number(card.dataset.cardId) 
            const memoryCard = cards.find((card) => card.id === id);
            if (!memoryCard || memoryCard.isMatched || memoryCard.isFlipped) {
                return
            }

            memoryCard.isFlipped = true;
             if (card && !card.classList.contains("is-flipped")) {
                card.classList.add("is-flipped");
            }
            console.log(memoryCard);
            
        });
    }
}
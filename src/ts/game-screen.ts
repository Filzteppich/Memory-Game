import { GameSettings, MemoryCard } from "./intefaces";
import { gameImages } from "./themes";
import { gameSettings } from "./setting-screen";


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

function shuffleArray(cards:[]):[] {
  for (let i = cards.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Elemente tauschen
  }
  return cards;
}
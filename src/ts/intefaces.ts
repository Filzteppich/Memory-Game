export interface GameSettings{
    theme : string | null,
    playerColour : string | null,
    boardSize : number | null,
}

export interface MemoryCard {
    id : number,
    pairId : number,
    img : string,
    isFlipped : boolean,
    isMatched : boolean
}

export interface GameState {
    activePlayer : "blue" | "orange",
    scoreBlue : number,
    scoreOrange : number,
    totalCardMatches: number
    gameRunning : boolean,
    gameOver : boolean,
}

export interface CardSelectionState {
    flippedCards : MemoryCard[],
    isLocked : boolean
}

export interface ThemeIcons {
    bluePlayerIcon : string | null,
    orangePlayerIcon : string | null,
    activePlayerIcon : string | null,
    blueWin : string | null,
    orangeWin : string | null,
    drawIcon : string | null
}
import { GameSettings, GameState } from "./intefaces";
import { initGameScreen } from "./game-screen";



type Theme = "codeVibeTheme" | "gamingTheme" | "daProjectTheme";
type PlayerColour = "blue" | "orange";
type BoardSize = 16 | 24 | 36;


export let gameSettings:GameSettings = {
    theme: null ,
    playerColour: null,
    boardSize: null,
}


export function initSettings(){
    let radioTheme = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
    let radioPlayer = document.querySelectorAll<HTMLInputElement>('input[name="player-colour"]');
    let radioBoard = document.querySelectorAll<HTMLInputElement>('input[name="board-size"]');
    let startButtonRef = document.querySelector<HTMLButtonElement>(".overview__start-button");
    let settingscreenRef = document.querySelector<HTMLElement>('.settingscreen');
    let gamescreenRef = document.querySelector<HTMLElement>('.gamescreen');

    radioTheme.forEach((radio) => {
        radio.addEventListener("click", () => {
                changeTheme(radio.value as Theme);
        })
    })

    radioPlayer.forEach((radio) =>{
        radio.addEventListener("click", () =>{
            initPlayer(radio.value as PlayerColour);
        })
    })

    radioBoard.forEach((radio) => {
        radio.addEventListener("click", () => {
            let boardSize = Number(radio.value);
                initBoard(boardSize as BoardSize);
        })
    })

    if (startButtonRef) {
        startButtonRef.addEventListener("click", () => {
        console.log('game can start now');
        initGameScreen();
        settingscreenRef?.classList.add('hidden');
        gamescreenRef?.classList.remove('hidden');
        })
    }
}


function changeTheme(theme:Theme):void{
let themeSource = document.querySelector<HTMLImageElement>('#themePreviewImg');
let themeOverview = document.querySelector<HTMLSpanElement>('#gameThemeOverview');

    gameSettings.theme = theme;
    if (themeSource && themeOverview) {
    switch(theme){
        case "codeVibeTheme" : 
        themeSource.src  = "./public/assets/images/settingscreen/code-vibes-theme.png";
        themeOverview.textContent = "Code Vibe Theme";
        break;
        case "gamingTheme" : 
        themeSource.src = "./public/assets/images/settingscreen/gaming-theme.png";
        themeOverview.textContent = "Gaming Theme";
        break;            
        case "daProjectTheme" :
        themeSource.src = "./public/assets/images/settingscreen/da-projects-theme.png";
        themeOverview.textContent = "DA Project Theme";
        break;
      }           
      validateGameSettings()
    }
}


function initPlayer(playerColour:PlayerColour){
let playerOverview = document.querySelector<HTMLSpanElement>('#gamePlayerOverview');

    gameSettings.playerColour = playerColour;
    if (playerOverview) {
        switch(playerColour){
            case "blue": 
            playerOverview.textContent = "Blue";
            break;
            case "orange":
            playerOverview.textContent = "Orange"
            break;
        }

        validateGameSettings()
    }
}


function initBoard(boardSize:BoardSize):void{
    let boardOverview = document.querySelector<HTMLSpanElement>('#gameBoardOverview');

    gameSettings.boardSize= boardSize;
    if (boardOverview) {
        switch(boardSize){
            case 16 : 
            boardOverview.textContent = "16 Cards"
            break;
            case 24 : 
            boardOverview.textContent = "24 Cards"
            break;
            case 36 : 
            boardOverview.textContent = "36 Cards"
            break;
        }
        validateGameSettings()
    }
}


function validateGameSettings(){
    let startButtonRef = document.querySelector<HTMLButtonElement>(".overview__start-button");

        if (startButtonRef && gameSettings.theme && gameSettings.playerColour && gameSettings.boardSize !== null) {
            startButtonRef.disabled = false;
            startButtonRef.classList.remove('disabled');
        }else{
            return;
        }
    }


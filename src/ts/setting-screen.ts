let activeTheme:string | null = null;
let activePlayerColour:string | null = null;
let activeBoardSize:string| null = null;
let themeSource = document.querySelector<HTMLImageElement>('#themePreviewImg');
let themeOverview = document.querySelector<HTMLSpanElement>('#gameThemeOverview');
let playerOverview = document.querySelector<HTMLSpanElement>('#gamePlayerOverview');
let boardOverview = document.querySelector<HTMLSpanElement>('#gameBoardOverview');


export function initSettings(){
    let radioTheme = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
    let radioPlayer = document.querySelectorAll<HTMLInputElement>('input[name="player-colour"]');
    let radioBoard = document.querySelectorAll<HTMLInputElement>('input[name="board-size"]');


    radioBoard.forEach((radio) => {
        radio.addEventListener("click", () => {
            initBoard(radio.value);
            
        })
    })

    radioPlayer.forEach((radio) =>{
        radio.addEventListener("click", () =>{
            initPlayer(radio.value);
        })
    })

    radioTheme.forEach((radio) => {
        radio.addEventListener("click", () => {
            changeTheme(radio.value);
        })
    })
}

function initBoard(boardSize:string):void{
    if (boardOverview) {
        switch(boardSize){
            case "16" : 
            boardOverview.textContent = "16 Cards"
            activeBoardSize = boardSize;
            break;
            case "24" : 
            boardOverview.textContent = "24 Cards"
            activeBoardSize = boardSize;
            break;
            case "36" : 
            boardOverview.textContent = "36 Cards"
            activeBoardSize = boardSize;
            break;
        }
        validateGameSettings()
    }
}

function validateGameSettings(){
    let startButtonRef = document.querySelector<HTMLButtonElement>(".overview__start-button");
        if (startButtonRef && activeTheme && activePlayerColour && activeBoardSize !== null) {
            startButtonRef.disabled = false;
            startButtonRef.classList.remove('disabled');
            startButtonRef.addEventListener("click", () => {
                console.log('game can start now');
                
            })
        }
    }


function initPlayer(playerColour:string){
    if (playerOverview) {
        switch(playerColour){
            case "blue": 
            playerOverview.textContent = "Blue";
            activePlayerColour = playerColour;
            break;
            case "orange":
            playerOverview.textContent = "Orange"
            activePlayerColour = playerColour;
            break;
        }
        validateGameSettings()
    }
}

function changeTheme(theme:string):void{
    if (themeSource && themeOverview) {
    switch(theme){
        case "codeVibeTheme" : 
            activeTheme = theme;
            themeSource.src  = "./public/assets/images/settingscreen/code-vibes-theme.png";
            themeOverview.textContent = "Code Vibe Theme";
            break;
            case "gamingTheme" : 
            activeTheme = theme;
            themeSource.src = "./public/assets/images/settingscreen/gaming-theme.png";
            themeOverview.textContent = "Gaming Theme";
            break;            
            case "daProjectTheme" :
                activeTheme = theme;
                themeSource.src = "./public/assets/images/settingscreen/da-projects-theme.png";
                themeOverview.textContent = "DA Project Theme";
                break;
      }           
      validateGameSettings()
    }
}

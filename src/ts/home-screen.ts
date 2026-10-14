const startButton = document.querySelector<HTMLButtonElement>(".start-button");
const homeSection = document.querySelector<HTMLElement>(".startscreen")
const settingSection = document.querySelector<HTMLElement>(".settingscreen")
startButton?.addEventListener("click", showSettingsScreen);



function showSettingsScreen(){
    homeSection?.classList.add('d-none');
    settingSection?.classList.remove('d-none');
}


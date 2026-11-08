



export function showSettingsScreen(){
const startButton = document.querySelector<HTMLButtonElement>(".start-button");
const homeSection = document.querySelector<HTMLElement>(".startscreen");
const settingSection = document.querySelector<HTMLElement>(".settingscreen");

if (startButton) {
    startButton.onclick = () => {
        homeSection?.classList.add('hidden');
        settingSection?.classList.remove('hidden');
    };
}
}


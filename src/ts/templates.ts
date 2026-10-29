export function createCardTemplate():HTMLTemplateElement{
    const template = document.createElement("template");

    template.innerHTML = `
             <button class="card" type="button">
            <div class="card__inner">
                <img class="card__face card__face--front" alt="" src="">
                <img class="card__face card__face--back" alt="" src="">
            </div>
        </button>
    `
    return template;
}
// Content writer //
let content =
    "This site was created to implement a model built with a machine learning technology written in Python. The goal of the model is to predict the possibility of a person developing heart disease based on his information and health habits, the accuracy rate of this model reaches 74%. ";

const contentContainer = document.querySelector(".introduction p.info");
contentContainer.innerHTML = "";

let lettersDelay = 70;
let wordsDelay = 100;
let endWritingDelay = 17000;
let lettersPointer = 0;

function writeLetter() {
    contentContainer.innerHTML += content[lettersPointer];
    lettersPointer++;

    if (lettersPointer == content.length) {
        setTimeout(() => {
            contentContainer.innerHTML = "";
            lettersPointer = 0;

            writeLetter();
        }, endWritingDelay);
    } else {
        // const delay = content[lettersPointer] == " " ? wordsDelay : lettersDelay;
        const delay = lettersDelay;

        setTimeout(() => {
            writeLetter();
        }, delay);
    }
}
writeLetter();
//  //

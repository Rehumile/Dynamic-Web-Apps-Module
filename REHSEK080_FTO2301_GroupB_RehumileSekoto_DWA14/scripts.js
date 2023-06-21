// Global variables used everywhere is the program and do not change, written in uppercase

const MAX_NUMBER = 15
const MIN_NUMBER = -5
const STEP_AMOUNT = 5

/*Const Used for storing variable*/ 
/*query selector is going to find the element from html doc, use data-key to find elements */

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');

/*addEventlistener is function used for when certain event happens from element, something must happen */

/*syntax below is used to assign a specific behavior */
const subtractHandler = () => {
    const newValue =  parseInt(number.value) - STEP_AMOUNT /*parseint is used to convert a string to a number */
   number.value = newValue;

    if (add.disabled === true) {
        add.disabled = false;
    }

   if(newValue <= MIN_NUMBER){
    subtract.disabled = true;
   }

}

const addHandler = () => {
    const newValue =  parseInt(number.value) + STEP_AMOUNT
   number.value = newValue;

    if (subtract.disabled === true) {
        subtract.disabled = false
    }

   if(newValue >= MAX_NUMBER){
    add.disabled = true;
   } 
}


subtract.addEventListener('click', subtractHandler) /*Run subtractHandler when the button is clicked */

add.addEventListener('click', addHandler) /*Run subtractHandler when the button is clicked */


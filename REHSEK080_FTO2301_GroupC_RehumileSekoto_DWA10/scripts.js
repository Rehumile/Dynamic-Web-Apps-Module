// Global variables used everywhere is the program and do not change, written in uppercase

const MAX_NUMBER = 15
const MIN_NUMBER = -1
const STEP_AMOUNT = 1


const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');

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


subtract.addEventListener('click', subtractHandler) 

add.addEventListener('click', addHandler) 


// Global variables used everywhere is the program and do not change, written in uppercase

// DATA
const MAX_NUMBER = 15
const MIN_NUMBER = -15
const STEP_AMOUNT = 1


const number = document.querySelector('[data-number]');
const reset = document.querySelector('[data-reset]')
const subtract = document.querySelector('[data-subtract]');
const add = document.querySelector('[data-add]');
const dialog = document.querySelector('.dialog');
const closeButton = dialog.querySelector('sl-button[slot="footer"]')


/**
 * Handler Funtion that reset counter to 0
 */
const resetHandler = () => {
    number.value = 0
    dialog.show()
   
}

/**
 * Handler function that decreases the counter by 1 when user clicks on "-" button
 */
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

/**
 * Handler function that increase the counter by 1 when user clicks on "+" button
 */
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


// Event listeners
subtract.addEventListener('click', subtractHandler) 

add.addEventListener('click', addHandler) 

reset.addEventListener('click', resetHandler)

closeButton.addEventListener('click', () => { dialog.hide()})
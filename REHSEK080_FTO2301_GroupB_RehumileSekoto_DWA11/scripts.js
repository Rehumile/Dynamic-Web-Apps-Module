import { subscribe, dispatch, getState } from "./model/store.js";
import { increment, decrement, reset} from "./model/actions.js";

subscribe((_,next) => console.log(next))

console.log(getState());
dispatch(increment())
dispatch(increment())
dispatch(decrement());
dispatch(reset())


// // data

// const MAX_NUMBER = 15
// const MIN_NUMBER = -15
// const STEP_AMOUNT = 1


// const counter = document.querySelector('[data-number]');
// const resetButton = document.querySelector('[data-reset]')
// const subtract = document.querySelector('[data-subtract]');
// const add = document.querySelector('[data-add]');
// const dialog = document.querySelector('.dialog');
// const closeButton = dialog.querySelector('sl-button[slot="footer"]')


// /**
//  *  Function to update the UI with the current count
//  */
// const updateCounterUI = () => {
//     counter.textContent = getState().count.toString();
//   };

//   /**
//    * Function to handle button click events
//    * @param {object} actionCreator 
//    */
//   const handleButtonClick = (actionCreator) => {
//     dispatch(actionCreator());
//   };

//   /**
//    * Subscribe to changes in the store
//    */
// subscribe((_,next) => console.log(next))


// /**
//  * Handler function that increase the counter by 1 when user clicks on "+" button
//  * and logs the states to the console and disables the button if reaches the maximum/minimum number
//  */
// add.addEventListener('click', () => {
//     const newValue =  parseInt(counter.value) + STEP_AMOUNT
//  counter.value = newValue;
//  if (subtract.disabled === true) {
//              subtract.disabled = false
//          }
    
//         if(newValue >= MAX_NUMBER){
//         add.disabled = true;
//        } 
//     handleButtonClick(increment)
// });

// /**
//  * event listener that decreases the counter by 1 when user clicks on "-" button
//  * and logs the states to the console and disables the button if reaches the maximum/minimum number
//  */
// subtract.addEventListener('click', () => {
//     const newValue =  parseInt(counter.value) - STEP_AMOUNT
//     counter.value = newValue;
//     handleButtonClick(decrement);
//     if (add.disabled === true) {
//         add.disabled = false;
//    }
        
//    if(newValue <= MIN_NUMBER){
//    subtract.disabled = true;
// }
//  });

//  /**
//   * event listener that reset counter to 0, alerts user the counter has been reset and 
//   * the state is logged to the console
//   */
// resetButton.addEventListener('click', () => {
//     dialog.show();
//     handleButtonClick(reset)
// });

// /**
//  * event listener that will close dialog 
//  */
// closeButton.addEventListener('click', () => { dialog.hide()})

// // Initialize the UI with the initial count
// updateCounterUI();





// scripts.js

// HTML References
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

/**
 * This event listener will be invoked when the user clicks on the submit button on the web page.
 * User enters the numbers and once submit is clicked it will display the quotient on the web page.
 * Error checks are provided should the user enter neither or both of the inputs, when an invalid 
 * division is performed or when a user enters enything that is not a number
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
    
     if (dividend === ''|| divider === '') {
     throw new Error("Division not performed. Both values are required in inputs")
     }
     if (dividend === ''&& divider === '') {
        throw new Error("Division not performed. Both values are required in inputs")
     }
     
     try {
      if (divider <= 0 || dividend < 0) throw new Error("Division not performed. Invalid number provided. Try again")
      if (isNaN(dividend) || isNaN(divider)) {
         
          document.body.innerHTML = "Something critical went wrong. Please reload the page"
          throw new Error()
      }
        result.innerText = parseInt(dividend / divider);
        
     } catch (error) {
      console.log(error)
       
     }
   
  
    
});
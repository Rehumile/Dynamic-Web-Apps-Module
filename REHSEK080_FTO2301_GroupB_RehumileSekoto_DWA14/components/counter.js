import { LitElement, html, css} from "../libs/lit-html.js"

const counterStates = {
  NORMAL: "normal",
  MAXIMUM: "maximum",
  MINIMUM: "minimum"
}

export class TallyCountElement extends LitElement {
    static styles = css`
    :root{
        --color-green: #31c48d;
        --color-white: #fff;
        --color-dark-grey: #33333d;
        --color-medium-grey: #424250;
        --color-light-grey: #9ca3ae;
    }
    /* Controls */
.controls {
    background: yellow;
}

/* Counter */
.counter {
    background: var(--color-dark-grey);
}

.counter__value {
    width: 100%;
    height: 15rem;
    text-align: center;
    font-size: 6rem;
    font-weight: 900;
    background: none;
    color: var(--color-white);
    border-width: 0;
    border-bottom: 1px solid var(--color-light-grey);
}
.counter__actions {
    display: flex; /*For the button to be next to each other*/
}

.counter__button {
    background: none;
    width: 50%;
    border-width:0;
    color: var(--color-white);
    font-size: 3rem;
    height: 10rem;
    border-bottom: 1px solid var(--color-light-grey);
    transition: transform 0.1s;
    transform: translateY(0);
}

.counter__button:active {
    background: var(--color-medium-grey);
    transform: translateY(2%);
}

.counter__button:disabled {
    opacity: 0.2;
}

.counter__button_first {
    border-right: 1px solid var(--color-light-grey);
}

.message{
  border-radius: 10px;
  margin: auto;
  outline: 0;
  padding: 15px;
  border: 0;
  display: flex;
  flex-direction: column;
  height: 8rem
  
}

.reset {
  height: 30px;
 border-width: 1px;
  background-color: transparent;
  border: none;
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 400;
  text-decoration: underline;
  
}

.reset:hover {
  color:var(--color-green)
}


.reset:active {
  transform: scale(1.075) translateY(2px);
  transition: 0.3ms;
}
.closebutton {
  background-color: var(--color-green)
  padding: 2rem;
  font-size: 1rem;
  align-items: center
}

    
        `

    static properties =  {
      count: { type: String },
      showDialog: { type: Boolean, state:true },
      max: {type: Number},
      min: {type:Number},
      state: {type: String}
    };

    constructor() {
        super();
        this.count  = '0'
        this.showDialog = false
        this.min = -15;
        this.max = 15,
        this.state = counterStates.NORMAL
    }

    render() {
        return html`
        <button class="reset"  data-reset @click=${this.resetCounter}>Reset</button>
        ${this.showDialog
          ? html `
      <sl-dialog label="Dialog" class="dialog-width" style="--width: 50vw;">
      The counter has been reset to zero
  <sl-button slot="footer" variant="primary" @click=${this.closeDialog}>Close</sl-button>
</sl-dialog>
          `
          : ''}
        
    <input class="counter__value" readonly value="${this.count}" data-number>
    <div class="counter__actions">
      <button ?disabled=${this.state === counterStates.MINIMUM} @click=${this.decrementCounter} class="counter__button counter__button_first"  data-subtract >-</button>
      <button ?disabled=${this.state === counterStates.MAXIMUM} @click=${this.incrementCounter} class="counter__button"  data-add >+</button>
    </div>
        `;
    }
    toggleOpen() {
      this.showDialog = !this.showDialog;
    }

   incrementCounter() {
    let number = parseInt(this.count)
   number = number + 1
   number === this.max
      ? (this.state = counterStates.MAXIMUM)
      : (this.state = counterStates.NORMAL);
    this.count = number.toString()
    console.log(number)
   }

   decrementCounter() {
    let number = parseInt(this.count)
    number = number - 1
    number === this.min
       ? (this.state = counterStates.MINIMUM)
       : (this.state = counterStates.NORMAL);
     this.count = number.toString()
   }

   resetCounter() {
    const dialog = this.renderRoot.querySelector('.message');
    this.state = counterStates.NORMAL;
    this.count = '0';
    this.toggleOpen();

    console.log(dialog)
   }

   closeDialog() {
    this.showDialog = false;
   }
}

customElements.define('tally-counter', TallyCountElement )
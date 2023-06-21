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
    
    
    sl-dialog::part(body) {
        color: #000;
    }
    
    
        sl-input.counter__value::part(input) {
            height: 15rem;
            width: 100%;
            font-size: 6rem;
            text-align: center;
            font-weight: 400;
            background: none;
            color: var(--color-white);
            border-bottom: 1px solid var(--color-light-grey)
        }
    
    sl-input.counter__value::part(base) {
        height: 15rem;
        background: none;
        border-width: 0;
    }
    .counter__actions {
        display: flex; 
        justify-content: center;
    }
    
      sl-button.button::part(prefix){
        padding: 75px;
      }
      sl-button.button::part(suffix){
        padding: 75px;
      }
    
      sl-button.reset::part(base) {
        --sl-input-height-medium: 30px;
        --sl-input-border-width: 1px;
        background-color: transparent;
        border: none;
        color: var(--color-white);
        font-size: 1rem;
        font-weight: 400;
        text-decoration: underline;
        
      }
    
       sl-button.reset::part(base):hover {
        color:var(--color-green)
      }
    
    
      sl-button.reset::part(base):active {
        transform: scale(1.075) translateY(2px);
        transition: 0.3ms;
      }
    
    
      sl-button.button::part(base) {
          width: 100%;
        height: 10rem;
        border: none;
        background-color: transparent;
        color: var(--color-white);
        font-size: 3rem;
        align-items: center;
        transition: transform 0.1s;
      transform: translateY(0);
      
      }
    
       sl-button.add::part(base){
       border-left: 1px solid var(--color-light-grey);
       border-radius: 0;
       
      }
    
      sl-button.button::part(base):hover {
          color:var(--color-green)
      }
    
       sl-button.button::part(base):disabled {
        opacity: 0.2;
    }

    /* Controls */
.controls {
    background: yellow;
}

/* Counter */
.message{
    border-radius: 10px;
    margin: auto;
    outline: 0;
    padding: 15px;
    border: 0;
    display: flex;
    flex-direction: column;
    
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
        <dialog .open=${this.toggleOpen} class="message" data-overlay>
        The counter has been reset to zero
      </dialog>

    <sl-button class="reset"  data-reset @click=${this.resetCounter}>Reset</sl-button>
    <sl-input class="counter__value" readonly value="${this.count}" data-number></sl-input>
    <div class="counter__actions">
      <sl-button ?disabled=${this.state === counterStates.MINIMUM} @click=${this.decrementCounter} class="button subtract"  data-subtract >-</sl-button>
      <sl-button ?disabled=${this.state === counterStates.MAXIMUM} @click=${this.incrementCounter} class="button add"  data-add >+</sl-button>
    </div>
        `;
    }
    toggleOpen() {
      this.showDialog = true;
    }

   incrementCounter() {
    let number = parseInt(this.value)
   number = number + 1
   number === this.max
      ? (this.state = counterStates.MAXIMUM)
      : (this.state = counterStates.NORMAL);
    this.count = number.toString()
   }

   decrementCounter() {
    let number = parseInt(this.value)
    number = number - 1
    number === this.min
       ? (this.state = counterStates.MINIMUM)
       : (this.state = counterStates.NORMAL);
     this.count = number.toString()
   }

   resetCounter() {
    this.state = counterStates.NORMAL;
    this.count = '0'
    this.toggleOpen;
    setTimeout(() => {
      this.toggleOpen;
    }, 2000);
   }

   closeDialog() {
    this.showDialog = false;
   }
}

customElements.define('tally-counter', TallyCountElement )
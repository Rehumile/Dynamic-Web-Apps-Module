import { LitElement, html, css } from "../libs/lit-html.js";
/**
 * @type {Object}
 */
const counterStates = {
  NORMAL: "normal",
  MAXIMUM: "maximum",
  MINIMUM: "minimum",
};

export class TallyCountElement extends LitElement {
  static styles = css`
    :root{
        --color-green: #31c48d;
        --color-white: #fff;
        --color-dark-grey: #33333d;
        --color-medium-grey: #424250;
        --color-light-grey: #9ca3ae;
    }
 
.controls {
    background: yellow;
}


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
    display: flex;
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
.counter__button:hover {
  color:var(--color-green)
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
  height: 8rem;
  align-items: center;
  justify-content: space-evenly;
  
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
  margin-left: 1rem;
  
}

.reset:hover {
  color:var(--color-green)
}


.reset:active {
  transform: scale(1.075) translateY(2px);
  transition: 0.3ms;
}
.closebutton {
  background-color: #31c48d;
  font-size: 1rem;
  padding: 0.5rem;
  align-items: center;
  width: 40%;
  border: 1px solid #424250;
}
 `;

  static properties = {
    count: { type: String },
    showDialog: { type: Boolean, state: true },
    max: { type: Number },
    min: { type: Number },
    state: { type: String },
  };

  constructor() {
    super();
    this.count = "0";
    this.showDialog = false;
    this.min = -15;
    this.max = 15;
    this.state = counterStates.NORMAL;
  }

  /**@returns {any} */
  render() {
    return html`
      <button class="reset" data-reset @click=${this.resetCounter}>
        Reset
      </button>
      ${this.showDialog
        ? html`
            <dialog label="Dialog" class="message">
              <p>The counter has been reset to zero</p>
              <button class="closebutton" @click=${this.closeDialog}>
                Close
              </button>
            </dialog>
          `
        : ""}

      <input
        class="counter__value"
        readonly
        value="${this.count}"
        data-number
      />
      <div class="counter__actions">
        <button
          ?disabled=${this.state === counterStates.MINIMUM}
          @click=${this.decrementCounter}
          class="counter__button counter__button_first"
          data-subtract
        >
          -
        </button>
        <button
          ?disabled=${this.state === counterStates.MAXIMUM}
          @click=${this.incrementCounter}
          class="counter__button"
          data-add
        >
          +
        </button>
      </div>
    `;
  }

  /**
   * Handler that is invoked when user clicks on "+" button
   */
  incrementCounter() {
    let number = parseInt(this.count);
    number = number + 1;
    number === this.max
      ? (this.state = counterStates.MAXIMUM)
      : (this.state = counterStates.NORMAL);
    this.count = number.toString();
  }

  /**
   * Handler that is invoked when user clicks on "-" button
   */
  decrementCounter() {
    let number = parseInt(this.count);
    number = number - 1;
    number === this.min
      ? (this.state = counterStates.MINIMUM)
      : (this.state = counterStates.NORMAL);
    this.count = number.toString();
  }

  /**
   * Handler that is invoked when user clicks on "Reset" button
   */
  resetCounter() {
    const dialog = this.renderRoot.querySelector(".message");
    this.state = counterStates.NORMAL;
    this.count = "0";
    this.openDialog();
  }
  
  openDialog() {
    this.showDialog = !this.showDialog;
  }

  closeDialog() {
    this.showDialog = false;
  }
}

customElements.define("tally-counter", TallyCountElement);

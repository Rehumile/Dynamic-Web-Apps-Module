
/**
 * @typedef {object} increment
 * @prop {string} type
 */

export const increment = () => ({
    type: 'INCREMENT',
});

/**
 * @typedef {object} decrement
 * @prop {string} type
 */

export const decrement = () => ({
    type: 'DECREMENT',
});

/**
 * @typedef {object} reset
 * @prop {string} type
 */
export const reset = () => ({
    type: 'RESET',
});

/**
 * @typedef {increment | decrement | reset} Action
 */
export const Action = {};
import { Action } from "./actions.js";
import { reducer } from "./reducer.js";


/**
 * @typedef {object} State
 * @prop {number} count
 */

export const State = {}

/**
 * function that runs to get the current state
 * @callback GetState
 * @returns {State} // returns currrent state
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * gives us the means to unsubscribe
 * @callback EmptyFn
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */


/**
 * @type {Array<Subscription>}
 */
let subscribers = []

/**
 * @type {Array<State>}
 */

const states = [{
    count: 0
}
];

/**
 * 
 * @returns {State}
 */
export const getState = () => {
    return Object.freeze({ ...states[0] })
}

/**
 * 
 * @param {Action} action 
 */
export const dispatch = (action) => {
    const prev = getState();
    const next = reducer(prev, action)

    const handler = (item) => item(prev, next)
    subscribers.forEach(handler)
    states.unshift(next) 
}

/**
 * @param {Subscription} subscription
 * @return {EmptyFn}
 */
export const subscribe = (subscription) => {
    subscribers.push(subscription)
    const handler = (item) => item !== subscription

    const unsubscribe  = () => {
        const newSubscribers = subscribers.filter(handler)
        subscribers = newSubscribers;
    }

    return unsubscribe
 }
/**
 * Utility that was built to somewhat resemble the defunct simulant library
 * which we no longer use as it had ton of stuff to test older browsers we
 * do not care about, as well as not supporting certain newer event types,
 * like PointerEvents.
 *
 * @see https://github.com/Rich-Harris/simulant
 */

/**
 * Fires an event to the passed in target, adding in some defuault options.
 *
 * @param {Element|Node} target DOM element to dispatch event to
 * @param {Event} Event Event to fire against the target
 * @param {String} eventType String representing type of given Event that should fire
 * @param {Object} options Options to use for the Event
 * @returns {boolean} Returns false if event was cancelable and at least one event
 *  handler prevented the default, else return true.
 */
function fireEvent(target, Event, eventType, options) {
  options = options || {};
  return target.dispatchEvent(new Event(eventType, Object.assign(options, {
    cancelable: true,
    bubbles: true,
    target: target
  })));
}

/**
 * Fires a MouseEvent of some given type with given options against a target
 *
 * @param {Element|Node} target DOM element to dispatch mouse event to
 * @param {String} eventType Type of MouseEvent to use
 * @param {Object} options Options to use for the MouseEvent
 * @returns {boolean} Returns false if event was cancelable and at least one
 *  event handler prevented the default, else returns true.
 */
export function fireMouseEvent(target, eventType, options) {
  return fireEvent(target, MouseEvent, eventType, options);
};

/**
 * Fires a FocusEvent of some given type with given options against a target
 *
 * @param {Element|Node} target DOM element to dispatch mouse event to
 * @param {String} eventType Type of FocusEvent to use
 * @param {Object} options Options to use for the FocusEvent
 * @returns {boolean} Returns false if event was cancelable and at least one
 *  event handler prevented the default, else returns true.
 */
export function fireFocusEvent(target, eventType, options) {
  return fireEvent(target, FocusEvent, eventType, options);
};

/**
 * Fires a PointerEvent of some given type with given options against a target
 *
 * @param {Element|Node} target DOM element to dispatch mouse event to
 * @param {String} eventType Type of PointerEvent to use
 * @param {Object} options Options to use for the PointerEvent
 * @returns {boolean} Returns false if event was cancelable and at least one
 *  event handler prevented the default, else returns true.
 */
export function firePointerEvent(target, eventType, options) {
  return fireEvent(target, PointerEvent, eventType, options);
};

/**
 * Fires a KeyboardEvent of some given type with given options against a target
 *
 * @param {Element|Node} target DOM element to dispatch mouse event to
 * @param {String} eventType Type of KeyboardEvent to use
 * @param {Object} options Options to use for the KeyboardEvent
 * @returns {boolean} Returns false if event was cancelable and at least one
 *  event handler prevented the default, else returns true.
 */
export function fireKeyboardEvent(target, eventType, options) {
  return fireEvent(target, KeyboardEvent, eventType, options);
};

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

export function fireMouseEvent(target, eventType, options) {
  return fireEvent(target, MouseEvent, eventType, options);
};

export function fireFocusEvent(target, eventType, options) {
  return fireEvent(target, FocusEvent, eventType, options);
};

export function firePointerEvent(target, eventType, options) {
  return fireEvent(target, PointerEvent, eventType, options);
};

export function fireKeyboardEvent(target, eventType, options) {
  return fireEvent(target, KeyboardEvent, eventType, options);
};

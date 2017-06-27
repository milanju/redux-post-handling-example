import { sagaMiddleware } from "./store";
import { take, race } from "redux-saga/effects";

/**
 * Helper to watch many actions and react on the first
 * occuring action.
 * 
 * Example:
 * watchNext({
 *   USER_UPDATE_COMPLETE: action => {
 *     console.log('success', action);
 *   },
 *   USER_UPDATE_FAILED: action => {
 *     console.log('fail', action);
 *   }
 * });
 */
export const watchNext = obj => {
  const effectsObject = Object.keys(obj).reduce((output, key) => {
    output[key] = take(key);
    return output;
  }, {});

  sagaMiddleware.run(function*() {
    const result = yield race(effectsObject);
    Object.keys(result).forEach(key => {
      obj[key](result[key]);
    })
  });
};
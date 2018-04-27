/**
 * Add message to storage
 *
 * @param {string} key - Storage key
 * @param {string} message - Storage message
 * @returns {void}
 */
export const addFlash = (key, message) => {
  sessionStorage.setItem(key, message);
};
/**
 * Check if message is in storage
 *
 * @param {string} key - Storage key
 * @returns {boolean} -true/false
 */
export const hasFlash = key => !!sessionStorage.getItem(key);
/**
 * Get message and remove message from storage
 *
 * @param {string} key - Storage key
 * @param {string} message - Storage message
 * @returns {void}
 */
export const getFlash = (key) => {
  let message = '';

  if (hasFlash(key)) {
    message = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
  }
  return message;
};

/**
 * Utility function to check what environment we're using, mainly
 * focusing around CI and Firefox. For whateve reason, the Firefox
 * on CI ends up with slightly different margins on things compared
 * to Chrome or things on local machine. Use this function to handle
 * adding a switch around using a set of values specifically for that.
 *
 * @returns {boolean} True if using CI and Firefox, else False
 */
export default () => {
  return (process.env.CI === 'true' || process.env.CI === true) && navigator && /firefox/i.test(navigator.userAgent);
};

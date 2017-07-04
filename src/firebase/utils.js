/**
 * Uid is part of the firebase email name. This encoding makes sure to use only email valid
 * characters.
 * @param uid
 */
function encodeUid(uid) {
  return uid.split('').reduce((prev, curr) => {
    const encodedCurr = curr.charCodeAt(0);
    return `${prev}${encodedCurr}`;
  }, '');
}

module.exports = {
  encodeUid,
};

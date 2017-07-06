const { expect } = require('chai');
const { encodeUid } = require('../utils');

describe('Firebase Auth', () => {
  it('encoded email address should decode alright', () => {
    const UID = 'loLlipOp';
    const expected = [108, 111, 76, 108, 105, 112, 79, 112].join('');
    expect(encodeUid(UID)).to.equal(expected);
  });
});

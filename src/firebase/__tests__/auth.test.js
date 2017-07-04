const { expect } = require('chai');
const auth = require('../auth');

describe('Firebase Auth', () => {
  it('encoded email address should decode alright', () => {
    const UID = 'loLlipOp';
    const expected = '1234@firebase.com';
    expect(auth._encodeFirebaseEmail(UID)).to.be(expected); // eslint-disable-line
  });
});

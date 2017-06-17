const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const firebaseMock = require('firebase-mock');
const localIp = require('ip');
const publicIp = require('public-ip');

const mockFirebase = new firebaseMock.MockFirebase();
const firebaseMockSdk = firebaseMock.MockFirebaseSdk(path => mockFirebase.child(path));
const { reportAlive } = proxyquire('../up', {
  firebase: firebaseMockSdk,
});

describe('[Service] Up', () => {
  before(() => {
    sinon.stub(localIp, 'address').callsFake(() => '192.168.1.42');
    sinon.stub(publicIp, 'v4').callsFake(() => Promise.resolve('80.80.80.80'));
    firebaseMockSdk.database.ServerValue = { TIMESTAMP: 1 };
  });

  after(() => {
    localIp.address.restore();
    publicIp.v4.restore();
  });

  it('should store a new up entry onto the firebase storage', async () => {
    const newEntryRef = await reportAlive();
    const firebaseRef = firebaseMockSdk.database().ref('up');
    firebaseRef.flush();
    const expected = {
      '80%80%80%80': {
        [newEntryRef.key]: {
          localIp: '192.168.1.42',
          timestamp: 1,
        },
      },
    };
    expect(firebaseRef.getData()).to.eql(expected);
  });
});

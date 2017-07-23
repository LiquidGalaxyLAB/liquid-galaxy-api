/**
 * Authenticate server.
 * Signs up new server with random credentials (stored in data/credentials.txt)
 * Sign in with the stored credentials.
 * File format (.json)
 * {
 *   uid: device UID.
 *   editKey: firebase edit key.
 *   password (optional): password to send / receive information from the API.
 *   displayName: friendly name (doesn't have to be unique).
 * }
 */

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const generatePassword = require('generate-password');
const firebase = require('firebase');

const log = require('../helpers/log');
const { encodeUid } = require('./utils');

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const createDir = Promise.promisify(mkdirp);

const CREDENTIALS_PATH = path.join('data/credentials.txt');

/**
 * Reads credentials from file.
 * See the file format above.
 */
async function readCredentials() {
  try {
    const contents = await readFile(CREDENTIALS_PATH, { encoding: 'utf-8' });
    const { uid, editKey, password, displayName } = JSON.parse(contents);
    return { uid, editKey, password, displayName };
  } catch (error) {
    log.info(`${CREDENTIALS_PATH} does not exist (or it is invalid).`);
    return null;
  }
}

/**
 * Saves credentials to file.
 * See the file format above.
 */
async function saveCredentials(values) {
  const contents = JSON.stringify(values);
  await createDir(path.join(CREDENTIALS_PATH, '..'));
  return writeFile(CREDENTIALS_PATH, contents);
}

async function generateCredentials() {
  const uid = shortid.generate();
  const editKey = generatePassword.generate({
    length: 20,
    numbers: true,
  });
  const password = '';
  return { uid, editKey, password };
}

function encodeEmail(uid) {
  const encodedUid = encodeUid(uid);
  return `${encodedUid}@firebase.com`;
}

function signup({ uid, editKey }) {
  const emailVal = encodeEmail(uid);
  const passwordVal = editKey;
  return firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal);
}

function signin({ uid, editKey }) {
  const emailVal = encodeEmail(uid);
  const passwordVal = editKey;
  return firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal);
}

module.exports = async () => {
  let credentials = await readCredentials();
  if (!credentials) {
    credentials = await generateCredentials();
    await saveCredentials(credentials);
    await signup(credentials);
  }
  await signin(credentials);
  return credentials;
};

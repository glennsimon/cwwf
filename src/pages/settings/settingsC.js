import { db, storage } from '../../firebase-init.js';
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  runTransaction,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from 'firebase/storage';
import { currentUser } from '../signin/signinC.js';

/**
 * Store settings on Firebase Storage and Firestore
 * @param {object} prefAvatar object containing settings keys and values
 * @returns preferred avatar URL
 */
function storeAvatar(prefAvatar) {
  const settingsRef = refStorage(
    storage,
    `users/${currentUser.uid}/avatar.png`
  );
  const metaData = { contentType: 'image/png' };
  return uploadBytes(settingsRef, prefAvatar, metaData)
    .then((result) => {
      return getDownloadURL(settingsRef);
    })
    .catch((error) => {
      console.log('Error uploading photo to storage: ', error);
      return null;
    });
}

/**
 * Store settings on Firebase Storage and Firestore
 * @param {object} settingsPrefs object containing settings keys and values
 * @returns void Promise
 */
async function storeSettings(settingsPrefs) {
  let prefAvatarUrl = null;
  if (settingsPrefs.prefAvatar) {
    prefAvatarUrl = await storeAvatar(settingsPrefs.prefAvatar);
  }
  const refUserData = doc(db, 'users', currentUser.uid);
  try {
    return runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(refUserData);
      if (!userDoc.exists()) throw 'User document does not exist!';
      const updateData = {
        prefName: settingsPrefs.prefName || currentUser.prefName || 'Anonymous',
        prefHandle: settingsPrefs.prefHandle || currentUser.prefHandle || null,
        prefScoring: settingsPrefs.scoring,
      };
      if (prefAvatarUrl) updateData.prefAvatarUrl = prefAvatarUrl;
      transaction.update(refUserData, updateData);
    });
  } catch (error) {
    console.log('UserData update transaction failed: ', error);
  }
}

/**
 * Check availability of unique handle for for users preferred handle.
 * @param {string} handle
 * @returns {boolean} true if handle is available, false otherwise
 */
async function handleAvailable(handle) {
  const q = query(collection(db, 'users'), where('prefHandle', '==', handle));
  const docs = await getDocs(q);
  let available = true;
  docs.forEach((doc) => {
    if (doc.id !== currentUser.uid) available = false;
  });
  return available;
}

export { storeSettings, handleAvailable };

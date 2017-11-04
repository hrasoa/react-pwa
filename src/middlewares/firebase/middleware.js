import {
  FIREBASE_SIGNUP_REQUEST,
  signupDone
} from './actions';

export default function firebaseMiddleware(firebaseApp) {
  // const firebase = firebaseApp;
  return store => next => async (action) => {
    if (action.type === FIREBASE_SIGNUP_REQUEST) {
      next(action);
      // const result = await firebase
        // .auth()
        // .createUserWithEmailAndPassword(action.email, action.password)
        // .catch(err => ({ error: err.message }));
      const result = { uid: 'qdqdqdqdqqd' };
      return next(signupDone({
        uid: result.uid
      }));
    }

    return next(action);
  };
}

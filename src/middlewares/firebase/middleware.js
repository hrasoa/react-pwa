import {
  FIREBASE_SIGNUP_REQUEST
} from './actions';

export default function firebaseMiddleware(firebaseApp) {
  const firebase = firebaseApp;

  return store => next => (action) => {
    if (action.type === FIREBASE_SIGNUP_REQUEST) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(action.email, action.password)
        .catch(err => ({ error: err.message }));
    }

    return next(action);
  };
}

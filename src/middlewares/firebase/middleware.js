import {
  FIREBASE_SIGNUP_REQUEST,
  signUpSuccess,
  signUpFail
} from './actions';

export default function firebaseMiddleware(firebaseApp) {
  const firebase = firebaseApp;
  return store => next => async (action) => {
    if (action.type === FIREBASE_SIGNUP_REQUEST) {
      next(action);

      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(action.email, action.password)
        .catch(err => ({ error: err.message }));

      if (result.error) {
        return next(signUpFail({
          message: result.error
        }));
      }

      return next(signUpSuccess({
        uid: result.uid
      }));
    }

    return next(action);
  };
}

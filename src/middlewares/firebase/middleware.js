import {
  FIREBASE_SIGN_UP,
  signUpSuccess,
  signUpFailure
} from './actions';

export default function firebaseMiddleware(firebaseApp) {
  const firebase = firebaseApp;

  return store => next => async (action) => {
    if (action.type === FIREBASE_SIGN_UP.REQUEST) {
      const { email, password } = action.payload;
      next(action);

      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => ({ error: err.message }));

      if (result.error) {
        return next(signUpFailure({
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

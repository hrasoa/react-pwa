import * as actions from './actions';

export default function firebaseMiddleware(firebaseApp) {
  const firebase = firebaseApp;

  return store => next => async (action) => {
    if (action.type === actions.FIREBASE_SIGN_UP.REQUEST) {
      const { email, password } = action.payload;
      next(action);

      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => ({ error: err.message }));

      if (result.error) {
        return next(actions.signUpFailure({
          message: result.error
        }));
      }

      return next(actions.signUpSuccess({
        uid: result.uid
      }));
    }

    if (action.type === actions.FIREBASE_SIGN_IN.REQUEST) {
      const { email, password } = action.payload;
      next(action);

      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => ({ error: err.message }));

      if (result.error) {
        return next(actions.signInFailure({
          message: result.error
        }));
      }

      return next(actions.signInSuccess({
        uid: result.uid,
        email: result.email
      }));
    }

    if (action.type === actions.FIREBASE_SIGN_OUT.REQUEST) {
      next(action);

      const result = await firebase
        .auth()
        .signOut()
        .catch(err => ({ error: err.message }));

      if (result && result.error) {
        return next(actions.signOutFailure({
          message: result.error
        }));
      }

      return next(actions.signOutSuccess());
    }

    return next(action);
  };
}

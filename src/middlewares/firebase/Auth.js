import Handler from './Handler';

function getUser(result) {
  return {
    uid: result.uid,
    displayName: result.displayName,
    photoURL: result.photoURL,
    email: result.email,
    emailVerified: result.emailVerified,
    phoneNumber: result.phoneNumber,
    isAnonymous: result.isAnonymous
  };
}

class Auth extends Handler {
  constructor() {
    super();
    this.createUserWithEmailAndPassword = this.createUserWithEmailAndPassword.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  mapActionsToApi() {
    return {
      [this.actions.FIREBASE_SIGN_UP.REQUEST]: this.createUserWithEmailAndPassword,
      [this.actions.FIREBASE_SIGN_IN.REQUEST]: this.signInWithEmailAndPassword,
      [this.actions.FIREBASE_SIGN_OUT.REQUEST]: this.signOut
    };
  }

  async createUserWithEmailAndPassword({ firebase, action, next }) {
    const { email, password } = action.payload;
    next(action);

    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => ({ error: err.message }));

    if (result.error) {
      return next(this.actions.signUpFailure({
        message: result.error
      }));
    }

    return next(this.actions.signUpSuccess(getUser(result)));
  }

  async signInWithEmailAndPassword({ firebase, action, next }) {
    const { email, password } = action.payload;
    next(action);

    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => ({ error: err.message }));

    if (result.error) {
      return next(this.actions.signInFailure({
        message: result.error
      }));
    }

    return next(this.actions.signInSuccess(getUser(result)));
  }

  async signOut({ firebase, action, next }) {
    next(action);

    const result = await firebase
      .auth()
      .signOut()
      .catch(err => ({ error: err.message }));

    if (result && result.error) {
      return next(this.actions.signOutFailure({
        message: result.error
      }));
    }

    return next(this.actions.signOutSuccess());
  }
}

export default Auth;

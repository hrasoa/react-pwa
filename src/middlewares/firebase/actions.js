const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const NAMESPACE = '@@firebase';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${NAMESPACE}/${base}_${type}`;
    return acc;
  }, {});
}

function action(type, payload = {}) {
  return { type, payload };
}

export const FIREBASE_SIGN_UP = createRequestTypes('SIGN_UP');

export const FIREBASE_SIGN_IN = createRequestTypes('SIGN_IN');

export const FIREBASE_SIGN_OUT = createRequestTypes('SIGN_OUT');

export const signUp = payload => action(FIREBASE_SIGN_UP.REQUEST, payload);

export const signUpSuccess = payload => action(FIREBASE_SIGN_UP.SUCCESS, payload);

export const signUpFailure = payload => action(FIREBASE_SIGN_UP.FAILURE, payload);

export const signIn = payload => action(FIREBASE_SIGN_IN.REQUEST, payload);

export const signInSuccess = payload => action(FIREBASE_SIGN_IN.SUCCESS, payload);

export const signInFailure = payload => action(FIREBASE_SIGN_IN.FAILURE, payload);

export const signOut = () => action(FIREBASE_SIGN_OUT.REQUEST);

export const signOutSuccess = () => action(FIREBASE_SIGN_OUT.SUCCESS);

export const signOutFailure = payload => action(FIREBASE_SIGN_OUT.FAILURE, payload);

import { action } from '../../actions';

export const FIREBASE_SIGN_UP = '@@firebase/SIGN_UP';

export const FIREBASE_SIGN_UP_REQUEST = '@@firebase/SIGN_UP_REQUEST';

export const FIREBASE_SIGN_UP_SUCCESS = '@@firebase/SIGN_UP_SUCCESS';

export const FIREBASE_SIGN_UP_FAILURE = '@@firebase/SIGN_UP_FAILURE';

export const FIREBASE_SIGN_IN_REQUEST = '@@firebase/SIGN_IN_REQUEST';

export const signUp = payload => action(FIREBASE_SIGN_UP, payload);

export const signUpRequest = payload => action(FIREBASE_SIGN_UP_REQUEST, payload);

export const signUpSuccess = payload => action(FIREBASE_SIGN_UP_SUCCESS, payload);

export const signUpFail = payload => action(FIREBASE_SIGN_UP_FAILURE, payload);

export const signIn = payload => action(FIREBASE_SIGN_IN_REQUEST, payload);

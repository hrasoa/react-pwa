import { action } from '../../actions';

export const FIREBASE_SIGNUP_REQUEST = '@@firebase/SIGNUP_REQUEST';

export const FIREBASE_SIGNUP_SUCCESS = '@@firebase/SIGNUP_SUCCESS';

export const FIREBASE_SIGNUP_FAILURE = '@@firebase/SIGNUP_FAILURE';

export const FIREBASE_SIGNIN_REQUEST = '@@firebase/SIGNIN_REQUEST';

export const signUp = payload => action(FIREBASE_SIGNUP_REQUEST, payload);

export const signUpSuccess = payload => action(FIREBASE_SIGNUP_SUCCESS, payload);

export const signUpFail = payload => action(FIREBASE_SIGNUP_FAILURE, payload);

export const signIn = payload => action(FIREBASE_SIGNIN_REQUEST, payload);

import {
  action,
  createRequestTypes
} from '../../actions';

export const FIREBASE_SIGN_UP = createRequestTypes('@@firebase/SIGN_UP');

export const FIREBASE_SIGN_IN = createRequestTypes('@@firebase/SIGN_IN');

export const signUp = payload => action(FIREBASE_SIGN_UP.REQUEST, payload);

export const signUpSuccess = payload => action(FIREBASE_SIGN_UP.SUCCESS, payload);

export const signUpFailure = payload => action(FIREBASE_SIGN_UP.FAILURE, payload);

export const signIn = payload => action(FIREBASE_SIGN_IN.REQUEST, payload);

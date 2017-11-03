import { action } from '../../actions';

export const FIREBASE_SIGNUP_REQUEST = '@@firebase/SIGNUP_REQUEST';

export const FIREBASE_SIGNIN_REQUEST = '@@firebase/SIGNIN_REQUEST';

export const signup = payload => action(FIREBASE_SIGNUP_REQUEST, payload);

export const signin = payload => action(FIREBASE_SIGNIN_REQUEST, payload);

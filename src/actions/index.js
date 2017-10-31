const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const POST = createRequestTypes('POST');
export const HOME = createRequestTypes('HOME');
export const LOGIN = createRequestTypes('LOGIN');
export const REGISTER = createRequestTypes('REGISTER');

export const post = {
  request: ({ id }) => action(POST[REQUEST], { id }),
  success: ({ id, response }) => action(POST[SUCCESS], { id, response }),
  failure: ({ id, error }) => action(POST[FAILURE], { id, error })
};

export const login = {
  request: ({ email, password }) => action(LOGIN[REQUEST], { email, password }),
  success: ({ response }) => action(LOGIN[SUCCESS], { response }),
  failure: ({ error }) => action(LOGIN[FAILURE], { error })
};

export const home = {
  request: () => action(HOME[REQUEST]),
  success: ({ response }) => action(HOME[SUCCESS], { response }),
  failure: ({ error }) => action(HOME[FAILURE], { error })
};

export const register = {
  request: ({ email, password }) => action(REGISTER[REQUEST], { email, password }),
  success: ({ response }) => action(REGISTER[SUCCESS], { response }),
  failure: ({ error }) => action(REGISTER[FAILURE], { error })
};

export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';
export const LEAVE_POST_PAGE = 'LEAVE_POST_PAGE';
export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';
export const LEAVE_HOME_PAGE = 'LEAVE_HOME_PAGE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';

export const loadPostPage = (id, requiredFields = ['id', 'title', 'body']) =>
  action(LOAD_POST_PAGE, { id, requiredFields });
export const leavePostPage = () => action(LEAVE_POST_PAGE);

export const loadHomePage = () => action(LOAD_HOME_PAGE);
export const leaveHomePage = () => action(LEAVE_HOME_PAGE);

export const loginRequest = (email, password) => action(LOGIN_USER, { email, password });
export const logoutRequest = () => action(LOGOUT_USER);

export const registerRequest = (email, password) => action(REGISTER_USER, { email, password });

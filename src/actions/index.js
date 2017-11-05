export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, payload };
}

export const POST = createRequestTypes('POST');

export const HOME = createRequestTypes('HOME');

export const LOGIN = createRequestTypes('LOGIN');

export const ADD_USER = createRequestTypes('ADD_USER');

export const post = {
  request: ({ id }) => action(POST[REQUEST], { id }),
  success: payload => action(POST[SUCCESS], payload),
  failure: error => action(POST[FAILURE], error)
};

export const home = {
  request: () => action(HOME[REQUEST]),
  success: payload => action(HOME[SUCCESS], payload),
  failure: error => action(HOME[FAILURE], error)
};

export const addUser = {
  request: ({ uid }) => action(ADD_USER[REQUEST], { uid }),
  success: payload => action(ADD_USER[SUCCESS], payload),
  failure: error => action(ADD_USER[FAILURE], error)
};

export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';

export const LEAVE_POST_PAGE = 'LEAVE_POST_PAGE';

export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';

export const LEAVE_HOME_PAGE = 'LEAVE_HOME_PAGE';

export const LOGIN_USER = 'LOGIN_USER';

export const LOGOUT_USER = 'LOGOUT_USER';

export const loadPostPage = (id, requiredFields = ['id', 'title', 'body']) =>
  action(LOAD_POST_PAGE, { id, requiredFields });

export const leavePostPage = () => action(LEAVE_POST_PAGE);

export const loadHomePage = () => action(LOAD_HOME_PAGE);

export const leaveHomePage = () => action(LEAVE_HOME_PAGE);

export const loginRequest = payload => action(LOGIN_USER, payload);

export const logoutRequest = () => action(LOGOUT_USER);

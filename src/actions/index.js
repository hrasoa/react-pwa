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
  return { type, payload };
}

export const POST = createRequestTypes('POST');

export const HOME = createRequestTypes('HOME');

export const LOG_OUT = createRequestTypes('LOG_OUT');

export const REGISTER = createRequestTypes('REGISTER');

export const CURRENT_USER = createRequestTypes('CURRENT_USER');

export const post = {
  request: payload => action(POST[REQUEST], payload),
  success: payload => action(POST[SUCCESS], payload),
  failure: error => action(POST[FAILURE], error)
};

export const home = {
  request: () => action(HOME[REQUEST]),
  success: payload => action(HOME[SUCCESS], payload),
  failure: error => action(HOME[FAILURE], error)
};

export const register = {
  request: payload => action(REGISTER[REQUEST], payload),
  success: payload => action(REGISTER[SUCCESS], payload),
  failure: error => action(REGISTER[FAILURE], error)
};

export const currentUser = {
  request: () => action(CURRENT_USER[REQUEST]),
  success: payload => action(CURRENT_USER[SUCCESS], payload),
  failure: error => action(CURRENT_USER[FAILURE], error)
};

export const logout = {
  request: () => action(LOG_OUT[REQUEST]),
  success: () => action(LOG_OUT[SUCCESS]),
  failure: error => action(LOG_OUT[FAILURE], error)
};

export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';

export const LEAVE_POST_PAGE = 'LEAVE_POST_PAGE';

export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';

export const LEAVE_HOME_PAGE = 'LEAVE_HOME_PAGE';

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';

export const loadPostPage = (id, requiredFields = ['id', 'title', 'body']) =>
  action(LOAD_POST_PAGE, { id, requiredFields });

export const leavePostPage = () => action(LEAVE_POST_PAGE);

export const loadHomePage = () => action(LOAD_HOME_PAGE);

export const leaveHomePage = () => action(LEAVE_HOME_PAGE);

export const loadCurrentUser = () => action(LOAD_CURRENT_USER);

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


export const post = {
  request: ({ id }) => action(POST[REQUEST], { id }),
  success: ({ id, response }) => action(POST[SUCCESS], { id, response }),
  failure: ({ id, error }) => action(POST[FAILURE], { id, error })
};


export const home = {
  request: () => action(HOME[REQUEST]),
  success: ({ response }) => action(HOME[SUCCESS], { response }),
  failure: ({ error }) => action(HOME[FAILURE], { error })
};


export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';
export const LEAVE_POST_PAGE = 'LEAVE_POST_PAGE';
export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';
export const LEAVE_HOME_PAGE = 'LEAVE_HOME_PAGE';


export const loadPostPage = (id, requiredFields = ['id', 'title', 'body']) =>
  action(LOAD_POST_PAGE, { id, requiredFields });
export const leavePostPage = () => action(LEAVE_POST_PAGE);


export const loadHomePage = () => action(LOAD_HOME_PAGE);
export const leaveHomePage = () => action(LEAVE_HOME_PAGE);

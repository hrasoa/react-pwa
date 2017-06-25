const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}


function action(type, payload = {}) {
  return { type, ...payload };
}


export const POST = createRequestTypes('POST');
export const HOME = createRequestTypes('HOME');


export const post = {
  request: id => action(POST[REQUEST], { id }),
  success: (id, response) => action(POST[SUCCESS], { id, response }),
  failure: (id, error) => action(POST[FAILURE], { id, error })
};


export const home = {
  request: id => action(HOME[REQUEST], { id }),
  success: (id, response) => action(HOME[SUCCESS], { id, response }),
  failure: (id, error) => action(HOME[FAILURE], { id, error })
};


export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';
export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';


export const loadPostPage = (id, requiredFields = ['id', 'title', 'body']) =>
  action(LOAD_POST_PAGE, { id, requiredFields });


export const loadHomePage = () => action(LOAD_HOME_PAGE);

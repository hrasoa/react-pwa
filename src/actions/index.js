const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const POST = createRequestTypes('POST');

function action(type, payload = {}) {
  return { type, ...payload };
}

export const post = {
  request: id => action(POST[REQUEST], { id }),
  success: (id, response) => action(POST[SUCCESS], { id, response }),
  failure: (id, error) => action(POST[FAILURE], { id, error })
};

export const LOAD_POST_PAGE = 'LOAD_POST_PAGE';

export const loadPostPage = (id, requiredFields = []) =>
  action(LOAD_POST_PAGE, { id, requiredFields });

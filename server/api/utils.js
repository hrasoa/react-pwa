const merge = require('lodash.merge');

const prepare = o => merge({}, o, { id: o._id });

const paginate = (list, { first, after }) => {
  let requiresList = [].concat(list);

  if (after) {
    const index = requiresList.reduce((acc, listItem, i) => {
      if (listItem._id === parseInt(after, 10)) {
        return i;
      }
      return acc;
    }, 0);
    requiresList = requiresList.slice(index + 1);
  }

  if (first) {
    requiresList = requiresList.slice(0, parseInt(first, 10));
  }

  return {
    totalCount: requiresList.length,
    edges: requiresList.map(listItem => ({
      node: prepare(listItem),
      cursor: listItem._id
    })),
    pageInfo: {
      endCursor: requiresList[requiresList.length - 1]._id,
      nexPage: false
    }
  };
};

module.exports = { prepare, paginate };

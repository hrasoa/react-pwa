const base64 = require('base-64');

const paginate = ({ results, cursors }) => ({
  totalCount: results.length,
  edges: results.map(node => ({
    node,
    cursor: base64.encode(JSON.stringify([node.id]))
  })),
  pageInfo: {
    endCursor: cursors.after,
    hasNextPage: cursors.hasNext
  }
});

module.exports = { paginate };

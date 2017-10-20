const paginate = async (Model, { first, after = null, where = null }) => {
  const { results, cursors } = await Model.paginate({
    limit: first,
    where,
    after
  });

  return ({
    totalCount: results.length,
    edges: results.map(node => ({
      node,
      cursor: node.id
    })),
    pageInfo: {
      endCursor: cursors.after,
      hasNextPage: cursors.hasNext
    }
  });
};

module.exports = { paginate };

export const prepare = o => ({ ...o, id: o['_id'] });

export const paginate = (list, { first, after }) => {
  let requiresList = [...list];

  if (after) {
    const index = requiresList.reduce((acc, listItem, index) => {
      if (listItem._id === parseInt(after, 10)) {
        acc = index;
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
  }
};

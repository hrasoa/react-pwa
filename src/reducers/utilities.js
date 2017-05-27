export function updateItem(oldObject = {}, newValues) {
  return { ...oldObject, ...newValues };
}

export function updateItemsInObject(obj = {}, items, key = 'id') {
  return items.reduce((acc, item) => ({
    ...acc,
    [item[key]]: updateItem(obj[item[key]], item)
  }), {});
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (action.type in handlers) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}


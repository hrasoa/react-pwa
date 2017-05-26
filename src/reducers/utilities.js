export function updateItem(oldObject = {}, newValues) {
  return { ...oldObject, ...newValues };
}

export function updateItemByKeyInObject(obj = {}, key, newValues) {
  return {
    ...obj,
    [key]: updateItem(obj[key], newValues)
  };
}

export function updateItemsInObject(obj = {}, items) {
  return items.reduce((acc, item) => ({
    ...acc,
    [item.id]: updateItem(obj[item.id], item)
  }), {});
}

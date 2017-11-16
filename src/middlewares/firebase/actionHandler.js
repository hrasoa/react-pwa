export default (firebaseApp, handlers = []) => {
  const firebase = firebaseApp;
  const actions = handlers.reduce((acc, handler) => {
    const handlerActions = handler.mapActionsToApi();
    return { ...acc, ...handlerActions };
  }, {});
  return (action, next) => {
    const { type } = action;
    return actions[type] ? actions[type]({ firebase, action, next }) : next(action);
  };
};

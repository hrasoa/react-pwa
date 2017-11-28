export default (firebaseApp, services = []) => {
  const firebase = firebaseApp;
  const actions = services.reduce((acc, service) => {
    const serviceActions = service.mapActionsToApi();
    return { ...acc, ...serviceActions };
  }, {});

  return (action, next) => {
    const { type } = action;
    return actions[type] ? actions[type](firebase, action, next) : next(action);
  };
};

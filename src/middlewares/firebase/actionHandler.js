export default (firebaseApp, services = []) => {
  const firebase = firebaseApp;
  const actions = services.reduce((acc, service) => {
    service.setApi(firebase);
    const serviceActions = service.mapActionsToApi();
    return { ...acc, ...serviceActions };
  }, {});

  return (action, next) => {
    const { type } = action;
    return actions[type] ? actions[type](action, next) : next(action);
  };
};

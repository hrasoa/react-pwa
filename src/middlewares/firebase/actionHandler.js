import Service from './Service';

export default (firebaseApp, services = []) => {
  Service.prototype.firebase = firebaseApp;

  const actions = services.reduce((acc, service) => {
    const serviceActions = service.mapActionsToApi();
    return { ...acc, ...serviceActions };
  }, {});

  return (action, next) => {
    const { type } = action;
    return actions[type] ? actions[type](action, next) : next(action);
  };
};

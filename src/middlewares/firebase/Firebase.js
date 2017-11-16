export default class Firebase {
  constructor(firebaseApp, handlers = []) {
    this.firebase = firebaseApp;
    this.handlers = {};
    this.initHandlers(handlers);
  }

  initHandlers(handlers) {
    this.handlers = handlers.reduce((acc, handler) => {
      const actions = handler.mapActionsToMethods();
      return { ...acc, ...actions };
    }, {});
  }

  handleAction(action, next) {
    return this.handlers[action.type] ?
      this.handlers[action.type]({ firebase: this.firebase, action, next }) :
      next(action);
  }
}

export default class Firebase {
  constructor(firebaseApp, handlers = []) {
    this.firebase = firebaseApp;
    this.handlers = handlers.reduce((acc, handler) => {
      const actions = handler.mapActionsToApi();
      return { ...acc, ...actions };
    }, {});
  }

  handleAction(action, next) {
    return this.handlers[action.type] ?
      this.handlers[action.type]({ firebase: this.firebase, action, next }) :
      next(action);
  }
}

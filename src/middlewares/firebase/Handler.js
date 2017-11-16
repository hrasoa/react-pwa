import * as actions from './actions';

export default class Handler {
  constructor() {
    this.actions = actions;
  }

  mapActionsToMethods() { // eslint-disable-line class-methods-use-this
    return {};
  }
}

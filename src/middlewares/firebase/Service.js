import * as actions from './actions';

export default class Service {
  constructor() {
    this.actions = actions;
  }

  mapActionsToApi() { // eslint-disable-line class-methods-use-this
    return {};
  }
}

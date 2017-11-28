import * as actions from './actions';

export default class Service {
  constructor() {
    this.actions = actions;
  }

  setApi(firebase) {
    this.firebase = firebase;
  }

  mapActionsToApi() { // eslint-disable-line class-methods-use-this
    return {};
  }
}

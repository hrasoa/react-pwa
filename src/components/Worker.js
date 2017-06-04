import { Component } from 'react';
import { withRouter } from 'react-router-dom';

const cacheUrl = (url) => {
  if (typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    navigator.serviceWorker.controller
  ) {
    navigator.serviceWorker.controller.postMessage({ url });
  }
};

class Worker extends Component {
  componentDidMount() {
    cacheUrl(this.props.location.pathname);
  }

  componentWillReceiveProps({ location }) {
    if (this.props.location.pathname !== location.pathname) {
      cacheUrl(location.pathname);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(Worker);

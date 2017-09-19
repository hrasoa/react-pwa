import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const cacheUrl = (url) => {
  if (typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    navigator.serviceWorker.controller
  ) {
    navigator.serviceWorker.controller.postMessage({ action: 'navigate', url });
  }

  if (typeof window !== 'undefined' && window.ga) {
    ga('set', 'page', url);
    ga('send', 'pageview');
  }
};

class Worker extends Component {
  componentWillReceiveProps({ location }) {
    if (this.props.location.pathname !== location.pathname) {
      cacheUrl(location.pathname);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Worker);

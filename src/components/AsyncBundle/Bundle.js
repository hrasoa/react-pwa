import React from 'react';
import { Helmet } from 'react-helmet';
import '../../bundle.scss';

export default () => (
  <Helmet>
    <title>My App</title>
    <link rel="canonical" href="http://example.com" />
  </Helmet>
);

import React from 'react';
import universal from 'react-universal-component';
import Loader from '../Loader';

export default universal(import('./Private'), {
  loading: <Loader />
});

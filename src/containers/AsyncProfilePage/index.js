import React from 'react';
import universal from 'react-universal-component';
import Loader from '../../components/Loader';

export default universal(import('./ProfilePage'), {
  loading: <Loader />
});

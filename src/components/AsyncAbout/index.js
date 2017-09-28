import universal from 'react-universal-component';
import options from '../../async';

export default universal(import(/* webpackChunkName: "about" */ './About'), options);

import universal from 'react-universal-component';

export default universal(props => import(`${props.page}`));

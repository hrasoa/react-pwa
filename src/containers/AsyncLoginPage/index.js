import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => import(
    /* webpackChunkName: "login-page" */
    './LoginPage'
  )
});

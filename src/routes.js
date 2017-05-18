import App from './components/App';
import Posts from './containers/Posts';
import About from './components/About';

export default [
  { component: App,
    routes: [
      { path: '/',
        component: Posts,
        exact: true
      },
      { path: '/about',
        component: About,
        exact: true
      }
    ]
  }
];

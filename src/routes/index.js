import About from '../components/About';
import App from '../components/App';
import PostView from '../containers/Posts/PostView';
import PostHome from '../containers/Posts/PostHome';

export default [
  { component: App,
    routes: [
      { path: '/',
        component: PostHome,
        exact: true
      },
      { path: '/posts/:id',
        component: PostView,
        exact: true
      },
      { path: '/about',
        component: About,
        exact: true
      }
    ]
  }
];

import { fetchPosts } from './actions/index';
import About from './components/About';
import App from './components/App';
import Posts from './containers/Posts';

export default [
  { component: App,
    loadData: params => fetchPosts(params),
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

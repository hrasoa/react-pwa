import { fetchPosts } from '../actions/index';
import About from '../components/About';
import App from '../components/App';
import Posts from '../containers/Posts';

export default [
  { component: App,
    routes: [
      { path: '/',
        component: Posts,
        exact: true,
        loadData: params => fetchPosts(params)
      },
      { path: '/about',
        component: About,
        exact: true
      }
    ]
  }
];

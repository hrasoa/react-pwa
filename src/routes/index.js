import {
  fetchPosts,
  fetchSinglePost
} from '../actions/index';
import About from '../components/About';
import App from '../components/App';
import PostView from '../containers/PostView';
import PostHome from '../containers/PostHome';

export default [
  { component: App,
    routes: [
      { path: '/',
        component: PostHome,
        exact: true,
        loadData: params => fetchPosts(params)
      },
      { path: '/posts/:id',
        component: PostView,
        exact: true,
        loadData: params => fetchSinglePost(params)
      },
      { path: '/about',
        component: About,
        exact: true
      }
    ]
  }
];

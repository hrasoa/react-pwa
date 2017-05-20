import {
  fetchPosts,
  fetchSinglePost
} from '../actions/index';
import About from '../components/About';
import App from '../components/App';
import Post from '../containers/Post';
import Posts from '../containers/Posts';

export default [
  { component: App,
    routes: [
      { path: '/',
        component: Posts,
        exact: true,
        loadData: params => fetchPosts(params)
      },
      { path: '/posts/:id',
        component: Post,
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

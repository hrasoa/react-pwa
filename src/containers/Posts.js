import { connect, dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import PostsListing from '../components/PostsListing';

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (params = {}) => {
      dispatch(fetchPosts(params));
    }
  };
};

const Posts = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsListing));

export default Posts;

import { connect, dispatch } from 'react-redux';
import { fetchPosts } from '../actions/index';
import PostsListing from '../components/PostsListing';

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts());
    }
  };
};

const Posts = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsListing);

export default Posts;

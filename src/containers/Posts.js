import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import PostsListing from '../components/PostsListing';

const mapStateToProps = state => ({
  posts: state.post && state.post.listing ?
    state.post.listing.map(postId => state.post[postId]) : []
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (params = {}) => {
    dispatch(fetchPosts(params));
  }
});

const Posts = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsListing));

export default Posts;

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import PostsListing from '../components/PostsListing';

const mapStateToProps = state => ({
  posts: state.posts && state.posts.listing ?
    state.posts.listing.map(postId => state.posts[postId]) : []
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

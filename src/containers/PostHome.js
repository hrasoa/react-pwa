import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import PostListing from '../components/PostListing';

const mapStateToProps = state => ({
  posts: (state.posts &&
    state.posts.byListing &&
    state.posts.byListing.home &&
    state.posts.byListing.home.items) || []
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (params = { listingName: 'home' }) => {
    dispatch(fetchPosts(params));
  }
});

const PostHome = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListing));

export default PostHome;

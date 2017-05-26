import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSinglePost } from '../actions/index';
import Post from '../components/Post';

const mapStateToProps = (state, ownProps) => ({
  post: (state.posts &&
    state.posts.byId &&
    state.posts.byId[ownProps.match.params.id]) || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSinglePost: () => {
    dispatch(fetchSinglePost(ownProps.match));
  }
});

const PostView = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));

export default PostView;
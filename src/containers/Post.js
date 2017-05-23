import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSinglePost } from '../actions/index';
import SinglePost from '../components/SinglePost';

const mapStateToProps = (state, ownProps) => ({
  post: (state.post && state.post[ownProps.match.params.id]) || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSinglePost: () => {
    dispatch(fetchSinglePost(ownProps.match));
  }
});

const Post = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost));

export default Post;

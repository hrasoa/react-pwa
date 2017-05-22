import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchSinglePost,
  leaveSinglePost
} from '../actions/index';
import SinglePost from '../components/SinglePost';

const mapStateToProps = state => ({
  post: (state.post && state.post[state.selectedPost]) || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSinglePost: () => {
    dispatch(fetchSinglePost(ownProps.match));
  },
  leaveSinglePost: () => {
    dispatch(leaveSinglePost());
  }
});

const Post = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost));

export default Post;

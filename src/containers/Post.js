import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSinglePost } from '../actions/index';
import SinglePost from '../components/SinglePost';

const mapStateToProps = state => ({
  title: state.post.title,
  body: state.post.body
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

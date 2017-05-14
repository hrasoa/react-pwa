import { connect } from 'react-redux';
import PostListing from '../components/PostListing';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const Posts = connect(
  mapStateToProps
)(PostListing);

export default Posts;

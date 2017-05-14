import { connect } from 'react-redux';
import PostsListing from '../components/PostsListing';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const Posts = connect(
  mapStateToProps
)(PostsListing);

export default Posts;

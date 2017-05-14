import { connect } from 'react-redux';
import PostsListing from '../components/PostsListing';

const mapStateToProps = state => ({
  posts: state.posts
});

const Posts = connect(
  mapStateToProps
)(PostsListing);

export default Posts;

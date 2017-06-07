import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListing from '../components/Posts/PostListing';

const Home = withRouter(connect()(PostListing));

export default Home;

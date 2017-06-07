import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

const Post = ({ id, title, body }) => (
  <div className="c-content">
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={`http://example.com/posts/${id}`} />
    </Helmet>
    <h1>{title}</h1>
    <p>{body}</p>
  </div>
);

Post.defaultProps = {
  title: '',
  body: '',
  id: 0
};

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.number
};

export default Post;

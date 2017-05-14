import React from 'react';
import PropTypes from 'prop-types';

const PostsItem = ({ title }) => <div>{title}</div>;

PostsItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default PostsItem;

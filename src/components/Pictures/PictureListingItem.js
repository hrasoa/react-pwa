import React from 'react';
import PropTypes from 'prop-types';

const PictureListingItem = ({ id }) =>
  <img src={`https://unsplash.it/300/200?image=${id}`} alt="" />;

PictureListingItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default PictureListingItem;

import React from 'react';
import PropTypes from 'prop-types';
import PictureListingItem from './PictureListingItem';

const PictureListing = ({ latestPictures: { items } }) => (
  <ul className="c-picture-listing">
    {items.map(picture => (
      <li key={picture.id}>
        <PictureListingItem {...picture} />
      </li>)
    )}
  </ul>
);

PictureListing.propTypes = {
  latestPictures: PropTypes.shape({
    items: PropTypes.array
  }).isRequired
};

export default PictureListing;

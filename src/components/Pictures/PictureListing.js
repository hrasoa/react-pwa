import React from 'react';
import PropTypes from 'prop-types';
import PictureListingItem from './PictureListingItem';

const PictureListing = ({ latestPictures }) => (
  <ul className="c-picture-listing">
    {latestPictures.map(picture => (
      <li key={picture.id}>
        <PictureListingItem {...picture} />
      </li>)
    )}
  </ul>
);

PictureListing.propTypes = {
  latestPictures: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PictureListing;

import React from 'react';
import PropTypes from 'prop-types';
import PictureListingItem from './PictureListingItem';

const PictureListing = ({ latestPictures: { ids }, pictures }) => (
  <ul className="c-picture-listing">
    {ids && ids.map(pictureId => (
      <li key={pictureId}>
        <PictureListingItem {...pictures[pictureId]} />
      </li>)
    )}
  </ul>
);

PictureListing.propTypes = {
  latestPictures: PropTypes.shape({
    ids: PropTypes.array
  }).isRequired,
  pictures: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

export default PictureListing;

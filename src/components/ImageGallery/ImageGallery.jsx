import PropTypes from 'prop-types';

import {ImageGalleryItem} from 'components';

import styles from './ImageGallery.module.css';

export const ImageGallery = ({images}) => (
    <ul className={styles.ImageGallery}>
        {images.map((image) => <li key={image.id}><ImageGalleryItem image={image} /></li>)}
    </ul>
);

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
};
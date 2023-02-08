import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

import { Modal } from 'components';

export const ImageGalleryItem = ({image}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return <>
        <div className={styles.ImageGalleryItem}>
            <img
                className={styles.ImageGalleryItemImage}
                src={image.webformatURL}
                alt={image.tags}
                onClick={handleModalOpen}
            />
        </div>

        {isModalOpen && <Modal image={image} onClick={handleModalClose}/>}
    </>
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
};
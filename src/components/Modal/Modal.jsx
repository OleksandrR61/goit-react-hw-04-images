import { useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export const Modal = ({ image, onClick }) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Escape') {
                onClick();
            };
        };

        document.addEventListener('keyup', handleKeyPress);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener('keyup', handleKeyPress);
            document.body.style.overflow = "auto";            
        }
    }, [onClick])    

    return (
        <div className={styles.Overlay} onClick={onClick}>
            <img className={styles.Modal} src={image.largeImageURL} alt={image.tags}/>
        </div>
    );
};

Modal.propTypes = {
    image: PropTypes.shape({
        tags: PropTypes.string,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
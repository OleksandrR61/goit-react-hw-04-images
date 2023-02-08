import { useState, useEffect } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar, ImageGallery, Button, Loader } from 'components';
import { getImages, api_per_page } from '../../services/fetch';

import styles from './ImageFinder.module.css';

export const ImageFinder = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstRender, setIsFirstrender] = useState(true);

    useEffect(() => {
        if (isFirstRender) {
            return;
        };

        setIsLoading(true);

        getImages({query, page}).then(({data: {hits, total, totalHits}}) => {
            setImages((prev) => page > 1 ? [...prev, ...hits] : [...hits]);
            setTotalPage(() => totalHits > 0 ? Math.ceil(totalHits / api_per_page) : 1);
        }).catch((error) => {Notify.failure(`error.message`);});

        setIsLoading(false);
    }, [page, query, isFirstRender]);

    const handleSearch = (string) => {
        setQuery(string);
        setPage(1);
        if (isFirstRender) {
            setIsFirstrender(false);
        };
    };

    const handleLoadMore = (event) => {
        setPage(prev => prev + 1);

        event.target.blur();
    };

    // if (document.querySelectorAll('img').length > 0) {
    //     console.log(document.querySelectorAll('img').length);
    //     document.querySelectorAll('img')[12 * (page - 1)].scrollIntoView();
    //     window.scrollBy(0, -76);
    // }
    if (page > 1) {window.scrollBy(0, 1380);}

    return (
        <div className={styles.ImageFinder}>
            <Searchbar onSearch={handleSearch} />

            {!isLoading && images.length > 0 &&
                <ImageGallery images={images} />}

            {page !== totalPage && <Button onClick={handleLoadMore}/>}

            {isLoading && <Loader />}
        </div>
    );
};
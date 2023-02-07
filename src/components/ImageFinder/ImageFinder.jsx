import { useState, useEffect } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import { Searchbar } from 'components';
import { getImages, api_per_page } from '../../services/fetch';

import styles from './ImageFinder.module.css';

export const ImageFinder = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // componentDidUpdate(_, prevState) {
    //     if (prevState.images.length !== this.state.images.length && document.querySelectorAll('img').length > 0) {
    //         document.querySelectorAll('img')[12 * (this.state.page - 1)].scrollIntoView();
    //         window.scrollBy(0, -76);
    //     };
    // }

    useEffect(() => {
        handleFetch();

        document.querySelectorAll('img')[12 * (this.state.page - 1)].scrollIntoView();
        window.scrollBy(0, -76);
    }, [page, query, handleFetch]);

    const handleFetch = async () => {
        console.log("Rerender");
        setIsLoading(true);

        try {
            const {data: {hits, total, totalHits}} = await getImages({query, page});

            if (total === 0) {
                Notify.failure("Nothing found for your request");
            };

            setImages([...images, ...hits]);
            setTotalPage(totalHits > 0 ? Math.ceil(totalHits / api_per_page) : 1);
        } catch {
            Notify.failure(`error.message`);
        }

        setIsLoading(false);
    }

    const handleSearch = (string) => {
        setQuery(string);
        setPage(1);
    };

    // handleLoadMore = (event) => {
    //     this.handleSetState({page: this.state.page + 1});

    //     event.target.blur();
    // };

    // handleModalOpen = (image) => {
    //     this.setState({
    //         imageModal: image,
    //         status: STATE_STATUS.modal,
    //     });
    // };

    // handleModalClose = () => {
    //     this.setState({
    //         status: STATE_STATUS.ready,
    //     });
    // };

    // const handleFetch = async ({query = query, page = 1}) => {
    //     setIsLoading(true);

    //     try {
    //         const {data: {hits, total, totalHits}} = await getImages({query, page});
            
    //         if (total === 0) {
    //             Notify.failure("Nothing found for your request");
    //         }

    //         const arrayImages = page === 1 ? [] : [...images]

    //         setImages([...images, ...hits]);
    //         setQuery()
            
    //         this.setState({
    //             images: [...arrayImages, ...hits],
    //             search,
    //             page,
    //             totalPage: totalHits > 0 ? Math.ceil(totalHits / api_per_page) : 1,
    //         });
    //     }
    //     catch(error){
    //         Notify.failure(`error.message`);
    //     }

    //     this.setState({
    //         status: STATE_STATUS.ready,
    //     });
    // }

    return (
        <div className={styles.ImageFinder}>
            <Searchbar onSearch={handleSearch} />

            {/* {!isLoading && images.length > 0 &&
                <ImageGallery images={images} onClick={this.handleModalOpen}/>} */}

            {/* {page !== totalPage && <Button onClick={this.handleLoadMore}/>} */}

            {/* {isLoading && <Loader />} */}
        </div>
    );
};
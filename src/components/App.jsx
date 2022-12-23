import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import * as api from 'services/fetchImagesWithQuery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const [currentLargeImg, setCurrentLargeImg] = useState(null);

  const setInitialParams = query => {
    if (query === '') {
      return alert('Enter the search value!');
    }

    if (query === searchQuery) {
      return;
    }

    setImages([]);
    setSearchQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const addImages = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!searchQuery) {
        return;
      }

      const data = await api.fetchImagesWithQuery(searchQuery, page);
      const { hits: newImages, totalHits } = data;

      setImages(oldImages => [...oldImages, ...newImages]);
      setTotalImages(totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);

  const openModal = (src, alt) => {
    setCurrentLargeImg({ src, alt });
  };

  const closeModal = evt => {
    setCurrentLargeImg(null);
  };

  useEffect(() => {
    addImages();
  }, [addImages]);

  const { app } = styles;
  return (
    <div className={app}>
      <Searchbar onSubmit={setInitialParams} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} openModal={openModal} />
          {images.length < totalImages && <Button loadMore={loadMore} />}
        </>
      )}
      {currentLargeImg && (
        <Modal closeModal={closeModal} imgData={currentLargeImg} />
      )}
    </div>
  );
};

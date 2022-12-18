import React, { Component, useState } from 'react';
import styles from './App.module.css';
import * as api from 'services/fetchImagesWithQuery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foundImages, setFoundImages] = useState(null);
  // state = {
  //   images: [],
  //   searchQuery: '',
  //   page: 1,
  //   isLoading: false,
  //   error: null,
  //   foundImages: null,
  //   currentLargeImg: null,
  // }

  setInitialParams = (searchQuery) => {
    if (searchQuery === '') {
      return alert('Enter the search value!')
    }

    if (searchQuery === setSearchQuery) {
      return;
    }

    setImages([]);
    setSearchQuery("");
    setPage(1);
    


    // this.setState({
    //   images: [],
    //   searchQuery,
    //   page: 1,
    // });
  }

  const loadMore = () => {
    setPage(page + 1);
  }

  const addImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await api.fetchImagesWithQuery(searchQuery, page);
      const { hits: newImages, totalHits } = data;

      setImages(oldImages => [...oldImages, ...newImages]);
      setTotalImages(totalHits);
     
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }

  openModal = (src, alt) => {
    this.setState(state => ({ ...state, currentLargeImg: { src, alt } }));
  }

  closeModal = (evt) => {
    this.setState({ currentLargeImg: null });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
      const { searchQuery, page } = this.state;
      this.addImages(searchQuery, page);
    }
  }

 

  return (
    <div className={app}>
      <Searchbar onSubmit={this.setInitialParams} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 &&
        <>
          <ImageGallery
            items={images}
            openModal={this.openModal}
          />
          {images.length < foundImages &&
            <Button loadMore={this.loadMore} />
          }
        </>
      }
      {currentLargeImg && <Modal closeModal={this.closeModal} imgData={currentLargeImg} />}
    </div>
  );
};

export default App;
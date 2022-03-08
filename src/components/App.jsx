import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Grid } from 'react-loader-spinner';

class App extends Component {
  state = {
    pictures: [],
    page: 2,
    inputValue: '',
    loading: false,
    showModal: false,
    modalImage: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const form = e.currentTarget;
    const inputValue = form.elements.input.value;
    const URL_API = `https://pixabay.com/api/?q=${inputValue}&page=1&key=24802256-ad66129038acba5a8b956a80c&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(URL_API)
      .then(response => response.json())
      .then(pictures => {
        this.setState({
          pictures: pictures.hits,
          page: this.state.page + 1,
          inputValue: inputValue,
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ loading: false, page: 2 });
      });
  };

  loadMorePics = () => {
    this.setState({ loading: true });
    const URL_API = `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=24802256-ad66129038acba5a8b956a80c&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(URL_API)
      .then(response => response.json())
      .then(pictures =>
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...pictures.hits],
            page: prevState.page + 1,
          };
        })
      )
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  // toggleLoading() {
  //   this.setState(prevState => ({ loading: !prevState.loading }));
  // }

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      modalImage: largeImageURL,
    });

    window.addEventListener('keydown', this.handleKeydown)

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = e => {
    if(e.code === 'Escape'){
      console.log('close modal')
      this.closeModal();
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { pictures, loading, showModal, modalImage } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery picturesList={pictures} onClickImg={this.openModal} />

        {loading && (
          <Grid height="100" width="100" color="grey" ariaLabel="loading" />
        )}

        {pictures.length <= 11 ? null : <Button onClick={this.loadMorePics} />}

        {showModal && (
          <Modal modalImage={modalImage} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

export default App;

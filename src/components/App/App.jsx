import React, { useState, useEffect } from "react";
import fetchImages from "../../services/unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalImagesCount, setTotalImagesCount] = useState(0);

  useEffect(() => {
    const fetchImagesData = async () => {
      setIsLoading(true);
      try {
        const { results, total } = await fetchImages(searchTerm, currentPage);
        if (currentPage === 1) {
          setImageList(results);
          setTotalImagesCount(total);
        } else {
          setImageList((prevImages) => [...prevImages, ...results]);
        }
        setIsLoading(false);
        if (total === 0) {
          toast.error("No images found for your query.");
        }
      } catch (error) {
        setFetchError("Failed to fetch images.");
        setIsLoading(false);
      }
    };

    if (searchTerm !== "") {
      fetchImagesData();
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    if (imageList.length === totalImagesCount && totalImagesCount !== 0) {
      toast.error("You've reached the end of the images.");
    }
  }, [imageList, totalImagesCount]);

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  const handleOpenModal = (image) => {
    setIsModalOpen(true);
    setActiveImage(image);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={imageList} openModal={handleOpenModal} />
      {isLoading && <Loader />}
      {imageList.length > 0 && imageList.length < totalImagesCount && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        image={activeImage}
      />
      <Toaster position="top-right" reverseOrder={false} />
      {fetchError && <ErrorMessage message={fetchError} />}
    </div>
  );
};

export default App;

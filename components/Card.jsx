'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Card = ({ book }) => {
  const { data: session } = useSession();
  const [addedBooks, setAddedBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of added books for the current user
    const fetchAddedBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        const addedBooks = response.data.map((book) => book.kitapId);
        setAddedBooks(addedBooks);
      } catch (error) {
        console.log('Failed to fetch added books:', error);
      }
    };

    fetchAddedBooks();
  }, []);

  const handleAddToLibrary = (item) => {
    const { title, imageLinks, authors, categories } = item.volumeInfo;
    const { id } = item
    const bookData = {
      title: title || '',
      image: imageLinks?.smallThumbnail || '',
      author: authors ? authors.join(', ') : '',
      addedBy: session?.user?.email,
      kitapId: id || '',
      categories: categories ? categories.join(', ') : '',
    };

    setAddedBooks((prevAddedBooks) => [...prevAddedBooks, id]); // Update the added books state immediately

    axios
      .post('/api/books', bookData)
      .then((res) => {
        console.log('Book saved to library:', res.data);
        setAddedToLibrary(true); // Set the state to indicate book was added
      })
      .catch((error) => {
        console.log('Failed to save book to library:', error);
      });
  };

  const isBookAdded = (id) => {
    return addedBooks.includes(id);
  };

  return (
    <>
      {book.map((item, index) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        if (thumbnail !== undefined) {
          const isAdded = isBookAdded(item.id);
          const buttonClass = isAdded
            ? 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg opacity-50 cursor-not-allowed'
            : 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

          return (
            <div
              className="mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <img className="rounded-t-lg items-center mx-auto mt-3" src={thumbnail} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.volumeInfo.title}
                </h5>
                <p className="mb-3 font-normal italic text-gray-700 dark:text-gray-400">
                  {item.volumeInfo.authors}
                </p>
                <button
                  href="#"
                  onClick={() => handleAddToLibrary(item)}
                  className={buttonClass}
                  disabled={isAdded}
                >
                  {isAdded ? 'Added' : 'Add to Library'}
                </button>
              
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default Card;






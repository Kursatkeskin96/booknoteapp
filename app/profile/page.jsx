'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'

const ProfilePage = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [note, setNote] = useState('');
  const router = useRouter();

  var currentURL = window.location.href;
  var urlParts = currentURL.split("/");
  var domain = urlParts[1];
  const api = domain

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await axios.get(`${api}/api/books`);
          const filteredBooks = response.data.filter(
            (book) => book.addedBy === session?.user?.email
          );
          setBooks(filteredBooks);
        }
      } catch (error) {
        console.log('Failed to fetch books:', error);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await axios.get(`${api}/api/notes`)
          const filteredNotes = response.data.filter(
            (note) => note.addedBy === session?.user?.email
          );
          setNotes(filteredNotes);
        }
      } catch (error) {
        console.log('Failed to fetch notes:', error);
      }
    };
    fetchData();
  }, [session]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const openAddNote = (book) => {
    setSelectedBook(book);
  };

  const closeAddNote = () => {
    setSelectedBook(null);
    setNote('');
  };

  const addNote = (book) => {
    const kitapId = book.kitapId;
    const noteData = {
      text: note,
      addedBy: session?.user?.email,
      kitapId: kitapId || '',
    };
  

    axios
      .post(`${api}/api/notes`, noteData)
      .then((res) => {
        console.log('Note saved to library:', res.data);
        axios.get(`${api}/api/notes`)
        .then((response) => {
          const filteredNotes = response.data.filter(
            (note) => note.addedBy === session?.user?.email
          );
          setNotes(filteredNotes);
        })
        .catch((error) => {
          console.log('Failed to fetch notes:', error);
        });
      closeAddNote();
    })
    .catch((error) => {
      console.log('Failed to save note to library:', error);
    });
};
  const deleteBook = async (addedBy, kitapId) => {
    const hasConfirmed = confirm("Are you sure you want to delete this book");
    if (hasConfirmed) {
    try {
      const response = await axios.delete(`${api}/api/books/${kitapId}`, {
        data: { addedBy },
      });
      console.log('Book deleted successfully:', response.data);
      // Refresh the books list
      const updatedBooks = books.filter(
        (book) => book.kitapId !== kitapId || book.addedBy !== addedBy
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.log('Failed to delete book:', error);
    }
  };}

  const handleEdit = (note) => {
    router.push(`${api}/update-note?id=${note._id}`);
  };

  return (
    <div className=''>
      {/* Render the fetched books */}
      <div className=' max-w-[90%] mt-10 mx-auto'>
      <p className='text-white text-xl'>Welcome to your profile page</p>
      <hr></hr>
      </div>
      {books.map((book) => (
  <div className="my-16 max-w-[90%] flex flex-center justify-center lg:flex-nowrap flex-wrap" key={book._id}>
    <div className='w-[50%] my-10 justify-center items-center text-center'>
      <div className='lg:max-w-[50%] w-[100%] mx-auto py-5 rounded-md bg-gray-800 text-white'>
        <img className='rounded-md mb-3 mx-auto' src={book.image} alt="" />
        <h3 className='text-2xl'>{book.title}</h3>
        <p className='italic text-gray-300'>{book.author}</p>
        {/* Additional book information */}
        {selectedBook && selectedBook._id === book._id ? (
          <>
            <div className='mt-5'>
              <textarea
                placeholder="Add note"
                value={note}
                className='bg-slate-200 rounded-md text-black max-w-[90%] lg:max-w-none'
                onChange={handleNoteChange}
              ></textarea>
            </div>
            <div className='flex py-5 justify-center'>
              <button className='bg-green-500 p-1 text-white rounded-md mr-4' onClick={() => addNote(book)}>Submit</button>
              <button className='bg-red-500 p-1 text-white rounded-md' onClick={closeAddNote}>Cancel</button>
            </div>
          </>
        ) : (
          <div className='flex justify-center'>
            <button className='bg-red-500 mt-5 text-white p-1 rounded-md mx-2' onClick={() => deleteBook(book.addedBy, book.kitapId)}>Delete Book</button>
          </div>
        )}
      </div>
    </div>
    {notes.filter((note) => note.kitapId === book.kitapId).length > 0 ? (
  <div className='bg-gray-800 text-white lg:max-w-[50%] md:w-[60%] w-[60%] py-5 h-auto my-auto justify-center items-center text-center rounded-md'>
    {/* Render the notes for the current book */}
    {notes.filter((note) => note.kitapId === book.kitapId).map((note) => (
      <div key={note._id}>
        <div className='flex justify-end mr-3 mb-3'>
          <button onClick={() => handleEdit(note)}>
            <AiOutlineEdit className='text-xl mx-5 text-gray-300' />
          </button>
        </div>
        <div>
          <p className='break-words max-w-[90%] text-center mx-auto'>{note.text}</p>
        </div>
      </div>
    ))}
  </div>
) : (
      <div className='bg-gray-800 text-white lg:max-w-[50%] md:w-[60%] w-[60%] py-5 h-auto my-auto justify-center items-center text-center rounded-md'>
        <button className='bg-blue-500 mt-5 text-white p-1 rounded-md mx-2' onClick={() => openAddNote(book)}>Add Note</button>
      </div>
    )}
  </div>
))}
    
    </div>
  );
};

export default ProfilePage;

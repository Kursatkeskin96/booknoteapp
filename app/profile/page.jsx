'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [note, setNote] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await axios.get('/api/books');
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
      .post('/api/notes', noteData)
      .then((res) => {
        console.log('Note saved to library:', res.data);
        closeAddNote();
      })
      .catch((error) => {
        console.log('Failed to save note to library:', error);
      });
  };

  return (
    <div>
      {/* Render the fetched books */}
      {books.map((book) => (
        <div className="bg-gray my-5" key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.kitapId}</p>
          <img src={book.image} alt="" />
          {/* Additional book information */}
          {selectedBook && selectedBook._id === book._id ? (
          <div>
            <textarea
              placeholder="Add note"
              value={note}
              onChange={handleNoteChange}
            ></textarea>
            <button onClick={() => addNote(book)}>Submit</button>
            <button onClick={closeAddNote}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => openAddNote(book)}>Add Note</button>
        )}
        </div>
      ))}
    </div>
  );
};

export default Profile;

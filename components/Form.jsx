'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
const UpdateNoteForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const response = await fetch(`/api/notes/${noteId}`);
        if (response.ok) {
          const { text } = await response.json();
          setUpdatedText(text);
        } else {
          console.log('Error fetching note details:', response.status);
        }
      } catch (error) {
        console.log('Error fetching note details:', error);
      }
    };

    if (noteId) {
      getNoteDetails();
    }
  }, [noteId]);

  const handleDelete = async (noteId) => {
    const hasConfirmed = confirm("Are you sure you want to delete this note");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/notes/${noteId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: updatedText,
        }),
      });

      if (response.ok) {
        // Note successfully updated, perform any necessary actions
        // such as showing a success message or redirecting the user.
        router.push('/profile'); // Example: Redirect to the profile
      } else {
        // Handle the error response
        console.log('Error updating note:', response.status);
      }
    } catch (error) {
      console.log('Error updating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='lg:w-[50%] w-[90%] mt-20 mx-auto flex flex-col'>
        <textarea
          value={updatedText}
          onChange={handleTextChange}
          placeholder='Enter updated note text'
          required
          className='lg:min-w-[100%] min-w-[100%] mb-4 lg:min-h-[250px] min-h-[125px] mx-auto'
        />
      <div className='flex lg:justify-end justify-center'>
      <button className='bg-blue-500 mt-1 text-white p-1 rounded-md lg:marker:mx-2 mx-3 w-20' type='submit'>
        Save
      </button>
      <button className='bg-red-500 mt-1 text-white p-1 rounded-md lg:mx-2 mx-3 w-20' onClick={() => handleDelete(noteId)}>
        Delete
      </button>
    </div>
      </div>
    </form>
  );
};

export default UpdateNoteForm;
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const UpdateNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  if (typeof window !== 'undefined') {
    var currentURL = window.location.href;
    var urlParts = currentURL.split("/");
    var domain = urlParts[1];
  }

  const api = domain

  const [post, setPost] = useState({ text: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`${api}/api/notes/${noteId}`);
      const data = await response.json();

      setPost({
        text: data.text,
      });
      setNote(data);
    };

    if (noteId) getNoteDetails();
  }, [noteId]);

  const updateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!noteId) return alert("Missing noteID!");

    try {
      const response = await fetch(`${api}/api/notes/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          note: post.text,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <>
      <div className=' max-w-[90%] mt-10 mx-auto'>
      <p className='text-white text-xl'>Edit Your Note</p>
      <hr></hr>
      </div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateNote}
      />
      {note && (
        <div key={note._id}>

        </div>
      )}
    </>
  );
};

export default UpdateNote;

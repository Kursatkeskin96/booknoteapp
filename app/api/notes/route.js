import AddNotes from "@/models/AddNotes";
import { connectToDB } from '@/config/db';

export const POST = async (request) => {
    try {
      const { kitapId, text, addedBy } = await request.json();
  
      await connectToDB();
      const newNote = new AddNotes({ kitapId, text, addedBy  });
  
      await newNote.save();
      return new Response(JSON.stringify(newNote), { status: 201 });
    } catch (error) {
      return new Response('Failed to create a new book', { status: 500 });
    }
  };

  export const GET = async (req, res) => {
    try {
      await connectToDB();
      const notes = await AddNotes.find({}).populate('addedBy'); // Updated variable name
  
      return new Response(JSON.stringify(notes), { status: 200 });
    } catch (error) {
      return new Response('Failed to fetch all books and notes', { status: 500 }); // Updated error message
    }
  };
  
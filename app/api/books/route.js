import BooksAndNotesModel from '@/models/BooksAndNotes'; // Updated model import name
import { connectToDB } from '@/config/db';

export const POST = async (request) => {
  try {
    const { title, image, author, addedBy, kitapId, categories } = await request.json();

    await connectToDB();

    // Check if the book is already added by the same user
    const existingBook = await BooksAndNotesModel.findOne({ kitapId, addedBy });
    if (existingBook) {
      return new Response('Book already added by this user', { status: 400 });
    }

    const newBook = new BooksAndNotesModel({ title, image, author, addedBy, kitapId, categories });

    await newBook.save();
    return new Response(JSON.stringify(newBook), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new book', { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const booksAndNotes = await BooksAndNotesModel.find({}).populate('addedBy'); // Updated variable name

    return new Response(JSON.stringify(booksAndNotes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all books and notes', { status: 500 }); // Updated error message
  }
};

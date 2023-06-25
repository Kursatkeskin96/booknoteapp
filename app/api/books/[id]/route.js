import BookModel from '@/models/BooksAndNotes';
import AddNotes from '@/models/AddNotes';
import { connectToDB } from '@/config/db';

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the book by kitapId and remove it
    await BookModel.findOneAndRemove(params.id);

    const deletedNote = await AddNotes.findOneAndRemove(params.id);

    if (deletedNote) {
      return new Response("Book and note deleted successfully", { status: 200 });
    } else {
      return new Response("Book deleted successfully. No note found for the book", { status: 200 });
    }
  } catch (error) {
    return new Response("Error deleting book", { status: 500 });
  }
};



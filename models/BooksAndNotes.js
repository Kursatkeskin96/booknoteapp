import { Schema, model, models } from 'mongoose'

const BooksAndNotesSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },
    addedBy: {
        type: String,
    },
    kitapId: {
        type: String,
    },
    categories: {
        type: String,
    },
}, {strict: false});

const BooksAndNotes = models.BooksAndNotes || model('BooksAndNotes', BooksAndNotesSchema)

export default BooksAndNotes;
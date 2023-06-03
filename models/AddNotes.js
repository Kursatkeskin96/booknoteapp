import { Schema, model, models } from 'mongoose'

const AddNotesSchema = new Schema({
    kitapId: {
        type: String,
    },
    text: {
        type: String,
    },
    addedBy: {
        type: String,
    },
}, {timestamps: true});

const AddNotes = models.AddNotes || model('AddNotes', AddNotesSchema)

export default AddNotes;
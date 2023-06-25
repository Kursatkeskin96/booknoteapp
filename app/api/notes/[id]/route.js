import Note from "@/models/AddNotes";
import { connectToDB } from '@/config/db';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const note = await Note.findById(params.id).populate("addedBy")
        if (!note) return new Response("Not Found", { status: 404 });

        return new Response(JSON.stringify(note), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { text } = await request.json();

    try {
        await connectToDB();

        const existingNote = await Note.findById(params.id);

        if (!existingNote) {
            return new Response(" not found", { status: 404 });
        }

        existingNote.text = text;

        await existingNote.save();

        return new Response("Successfully updated the notes", { status: 200 });
    } catch (error) {
        return new Response("Error Updating note", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Note.findByIdAndRemove(params.id);

        return new Response("Note deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting note", { status: 500 });
    }
};
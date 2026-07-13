import UserModel from "../models/user.model.js";
import NotesModel from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
    try {
        const notes = await NotesModel.find({ user: req.userID }).select("topic classLevel examType revisionMode includeDiagram includeCharts createdAt").sort({ createdAt: -1 })
        if (!notes) {
            return res.status(404).json({
                error: "Note not found"
            });
        }
        return res.status(200).json(notes)
    }
    catch (error) {
        return res.status(500).json({ message: `getCurrentUser notes error ${error}` });
    }
}


export const getSingleNotes = async (req, res) => {
    try {
        const notes = await NotesModel.findOne({
            _id: req.params.id,
            user: req.userID
        })

        if (!notes) {
            return res.status(404).json({
                error: "Note not found"
            });
        }
        return res.json({
            content: notes.content,
            topic: notes.topic,
            createdAt: notes.createdAt
        });
    } catch (error) {
        return res.status(500).json({ message: `getSingleNotes notes error ${error}` });
    }
}




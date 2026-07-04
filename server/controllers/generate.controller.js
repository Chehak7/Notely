import { generateGeminiResponse } from "../services/gemini.services"
import { buildPrompt } from "../utils/promptBuilder"

export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeCharts = false
        } = req.body()
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" })
        }
        const user = await UserModel.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ message: "User is not found" })
        }

        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save()
            return res.status(403).json({
                message: "Insufficient credits",
            });
        }
        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeCharts
        })

        const AIresponse = generateGeminiResponse(prompt)

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeCharts
        }
        )

    } catch (error) {
        console.log()
    }
}
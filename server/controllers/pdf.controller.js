import PDFDocument from "pdfkit"

export const pdfDownload = async (req, res) => {

    const { result } = req.body;

    if (!result) {
        return res.status(400).json({ error: "No content provided" });
    }
    try {
        // normalize keys and provide safe defaults to avoid runtime errors
        const data = result || {};
        const importance = data.importance || "";
        const subtopics = data.subtopics || data.subTopics || {};
        const notes = (data.notes || "").replace ? data.notes.replace(/[#*]/g, "") : "";
        const revisionPoints = data.revisionPoints || [];
        const questions = data.questions || {};
        const shortQuestions = questions.short || [];
        const longQuestions = questions.long || questions.Long || [];
        const diagramQuestion = questions.diagram || "";

        const doc = new PDFDocument({ margin: 50 });

        // collect PDF chunks then send as one response to avoid incomplete chunked encoding
        const chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
            try {
                const pdfData = Buffer.concat(chunks);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", 'attachment; filename="Notely.pdf"');
                res.send(pdfData);
            } catch (err) {
                console.error("Error sending PDF:", err);
                if (!res.headersSent) {
                    res.status(500).json({ error: "Failed to send PDF" });
                } else {
                    try { res.end(); } catch (e) { }
                }
            }
        });

        doc.on("error", (err) => {
            console.error("PDF generation error:", err);
            if (!res.headersSent) {
                res.status(500).json({ error: "PDF generation error" });
            } else {
                try { res.end(); } catch (e) { }
            }
        });

        // Title
        doc.fontSize(20).text("StudyWith AI", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Importance: ${importance}`);
        doc.moveDown();

        // Sub Topics
        doc.fontSize(16).text("Sub Topics");
        doc.moveDown(0.5);
        Object.entries(subtopics).forEach(([star, topics]) => {
            doc.moveDown(0.5);
            doc.fontSize(13).text(`${star} Topics:`);

            (topics || []).forEach((t) => {
                doc.fontSize(12).text(`• ${t}`);
            });
        });

        doc.moveDown();

        // Notes
        doc.fontSize(16).text("Notes");
        doc.moveDown(0.5);
        doc.fontSize(12).text(notes);

        doc.moveDown();

        // Revision Points
        doc.fontSize(16).text("Revision Points");
        doc.moveDown(0.5);
        (revisionPoints || []).forEach((p) => {
            doc.fontSize(12).text(`• ${p}`);
        });

        doc.moveDown();

        // Questions
        doc.fontSize(16).text("Important Questions");
        doc.moveDown(0.5);

        doc.fontSize(13).text("Short Questions: ");
        (shortQuestions || []).forEach((q) => {
            doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
        doc.fontSize(13).text("Long Questions:");
        (longQuestions || []).forEach((q) => {
            doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
        doc.fontSize(13).text("Diagram Question:");
        doc.fontSize(12).text(diagramQuestion || "");

        doc.end();
    } catch (error) {
        console.error("PDF controller error:", error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "PDF generation failed", message: error.message });
        }
        try {
            res.end();
        } catch (e) {
            // ignore
        }
    }


}


const gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt) => {

    try {
        const response = await fetch(`${gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    })

    //if response is not ok, throw an error with the response text
    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }
    //store data in json format and return it
    const data = await response.json();
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if(!text) {
        throw new Error("No text returned from Gemini");
    }

    const cleanText = text
        .replace(/```Json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Error generating Gemini response:", error);
        throw new Error("Gemini API fetch failed");
    }
}

import jwt from "jsonwebtoken"

export const generateToken = async (userID) => {
    try {
        const token = jwt.sign({ userID }, process.env.JWT_SECRETKEY, { expiresIn: '7d' })
        console.log("Token generated successfully:", token);
        return token;
    } catch (error) {
        console.log("Error generating token:", error);
        
    }

}
import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        let user = await UserModel.findOne({ email })
        if (!user) {
            user = await UserModel.create({ name, email }) 
        }
        // Generate a JWT token for the user
        let token = await generateToken(user._id)

        // Set the token as an HTTP-only cookie
        res.cookie("token", token, { httpOnly: true , secure:true , sameSite:"none",path: "/",maxAge:7*24*60*60*1000 })
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `google signup error ${error.message}` });
    }
}

export const logout = async(req, res) => {
    try{
        await res.clearCookie("token")
        return res.status(200).json({message:"Logout successful"})
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error.message}` });
    }
}

import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(400).json({ message: "Token not found" })
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRETKEY)
        if (!verifiedToken){
            return res.status(400).json({message:"user doesn't have valid Token."})
        }
        req.userID = verifiedToken.userID
        next()

    } catch (error) {
        return res.status(500).json({ message: "Invalid or expired token", error: error.message })
    }
}
export default isAuth

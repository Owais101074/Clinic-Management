import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

    try {

        // 1. Get token from cookie
        const token = req.cookies.token;

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 4. Store decoded user information
        req.user = decoded;

        // 5. Continue to next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
};
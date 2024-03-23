const jwt = require("jsonwebtoken");
const User = require("../schema/signupSchema");

const adminStatus = async(req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.params.token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const userId = decoded.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.json("user not found");
            };
            const userRole = user.role;

            if (userRole == "admin") {
                next();
            } else {
                return res.sendStatus(403);
            }

        } catch (error) {
            return res.sendStatus(500);
        }
    }
}

module.exports = adminStatus;
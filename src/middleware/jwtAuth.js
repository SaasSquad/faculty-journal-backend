const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

    const token = req.cookies.token
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.email = user.email
        req.firstName = user.firstName
        req.lastName = user.lastName
        next();
    });
};

module.exports = authenticateToken;
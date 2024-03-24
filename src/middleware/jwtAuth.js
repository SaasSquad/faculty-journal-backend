const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

    // const token = req.cookies.jwt || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    const token = req.params.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
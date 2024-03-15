const jwt = require('jsonwebtoken');

function handleErrorResponse(res, error, message) {
    console.error(error); // Log the error to console
    res.status(500).json({ success: false, message: `${message}: ${error.message}` });
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
        return handleErrorResponse(res, null, 'Unauthorized - No token provided', 401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return handleErrorResponse(res, err, 'Unauthorized - No valid token', 401)
        }

        req.userId = decoded.id;

        next();
    })
}

module.exports = {
    handleErrorResponse,
    verifyToken
}
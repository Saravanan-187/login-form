const router = require("../Routes/AuthRouter");

const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
    const auth=req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized,JWT token not provided"});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error) {
        return res.status(403).json({ message: "Unauthorized,JWT token is invalid"});
    }
}
module.exports = router

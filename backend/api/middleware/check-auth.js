const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY, 
            null
        );
        req.userData = decoded;
        if(req.originalUrl.endsWith('/agent/signup')){
            if(decoded.isAdmin){
                next();
            } else {
                const jsonResponse = {
                    error: 'Can\'t create new agent'
                };
                console.log(jsonResponse);
                return res.status(401).json(jsonResponse);
            }
        } else {
            next();
        }
    } catch(error){
        const jsonResponse = {
            error: 'Authentication failed'
        };
        console.log(jsonResponse);
        return res.status(401).json(jsonResponse);
    }
}
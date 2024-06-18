const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.headers.authorization){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_KEY, 
                null
            );
            req.userData = decoded;
            next();
        } catch(error){
            const jsonResponse = {
                error:error
            };
            console.log(jsonResponse);
            return res.status(401).json(jsonResponse);
        }
    } else {
        const jsonResponse = {
            message: 'Authorization Header not set'
        };
        console.log(jsonResponse);
        return res.status(401).json(jsonResponse);
    }
}
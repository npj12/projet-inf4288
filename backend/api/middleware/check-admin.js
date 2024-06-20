module.exports = (req, res, next) => {
    if(req.userData && req.userData.isAdmin){
        next();
    } else {
        const jsonResponse = {
            error: 'Not allowed'
        };
        console.log(jsonResponse);
        return res.status(403).json(jsonResponse);
    }
};
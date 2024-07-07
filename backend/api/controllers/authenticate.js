const { dbConfig, baseURL } = require("../constants");
const { Client } = require("pg");


exports.post_authenticate = (req, res, next)=>{
    if(req.file){

    } else {
        const jsonResponse = {error:"Provide a birth certificate", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }
}
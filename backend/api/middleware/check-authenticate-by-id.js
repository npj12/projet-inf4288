const { dbConfig } = require("../constants");
const { Client } = require("pg");
const { deleteFile } = require('../utils/delete-file');

module.exports = (req, res, next) => {
    const client = new Client(dbConfig);
    client.connect()
       .then(()=>{
           client.query('SELECT * FROM birth_certificate WHERE bc_uid=$1', [req.params.bcID])
               .then(result=>{
                   if(result.rowCount == 0){
                       deleteFile(req.file.path);
                       const jsonResponse = {
                           error: `Invalid birth certificate ID (${req.params.bcID})`
                       };
                       console.log(jsonResponse);
                       return res.status(422).json(jsonResponse);
                   } else {
                       return next();
                   }
               })
               .catch(error=>{ 
                   const jsonResponse = {
                       error: error
                   };
                   console.log(jsonResponse);
                   res.status(500).json(jsonResponse);
               });

       })
       .catch(error=>{ 
           const jsonResponse = {
               error: error
           };
           console.log(jsonResponse);
           res.status(500).json(jsonResponse);
       });
}
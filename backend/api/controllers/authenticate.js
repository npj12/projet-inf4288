const { dbConfig, baseURL } = require("../constants");
const { Client } = require("pg");

exports.post_authenticate_by_bcid = (req, res, next)=>{
    const client = new Client(dbConfig);
    client.connect()
       .then(()=>{
           client.query('SELECT * FROM birth_certificate WHERE bc_uid=$1', [req.params.bcID])
               .then(result=>{
                    const jsonResponse = {
                        birthCertificateInformations: result.rows[0],
                        birthCertificateLocation: baseURL + result.rows[0]['bc_file_path'].substring('uploads/'.length)
                    };
                    console.log(jsonResponse);
                    res.status(200).json(jsonResponse);
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

exports.post_authenticate_by_file = (req, res, next)=>{
    if(req.file){

    } else {
        const jsonResponse = {error:"Provide a birth certificate", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }
}
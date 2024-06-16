const { emailRegex, dbConfig } = require("../constants");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

exports.get_all_individuals = (req, res, next)=>{
    const client = new Client(dbConfig);
    client.connect()
        .then(() => {
            client.query('SELECT * FROM individual')
                .then((result)=>{
                    const jsonResponse = {
                        count: result.rowCount,
                        result: result.rows.map(row => {
                            delete row['password'];
                            return row;
                        })
                    };
                    console.log(jsonResponse);
                    res.status(200).json(jsonResponse);
                    client.end()
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
        })
        .catch(error=>{ 
            const jsonResponse = {
                error: error
            };
            console.log(jsonResponse);
            res.status(500).json(jsonResponse);
        });
};

exports.get_individual = (req, res, next)=>{
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                client.query('SELECT * FROM individual WHERE id=$1', [id])
                    .then((result)=>{
                        if(result.rowCount == 0){
                            const jsonResponse = {error: "Individual not found", request_body: req.body};
                            console.log(jsonResponse);
                            res.status(404).json(jsonResponse);
                        } else {
                            delete result.rows[0]['password'];
                            const jsonResponse = result.rows[0];
                            console.log(jsonResponse);
                            res.status(200).json(jsonResponse);
                        }
                        
                        client.end()
                            .catch(error=>{ 
                                const jsonResponse = {
                                    error: error
                                }
                                console.log(jsonResponse)
                                res.status(500).json(jsonResponse) 
                            });
                    })
                    .catch(error=>{ 
                        const jsonResponse = {
                            error: error.message
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
};

exports.patch_individual = (req, res, next)=>{ 
    const id = parseInt(req.params.id);
    const { name, surname, email, phoneNumber, login, oldPassword, newPassword} = req.body;
    
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_params:req.params};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(email && !emailRegex.test(email)){
        const jsonResponse = {error: "Invalid email address", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse); 
    } else if(oldPassword === undefined){
        const jsonResponse = {error:"'oldPassword' is a required parameter", request_body:req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        const client = new Client(dbConfig);
        client.connect()
            .then(()=>{
                    client.query('SELECT * FROM individual WHERE id=$1', [id])
                        .then(result => {
                            if(result.rowCount == 0){
                                const jsonResponse = {error:"Individual does not exist", request_params: req.params};
                                res.status(404).json(jsonResponse);
                            } else {
                                const oldIndividual = result.rows[0];
                                bcrypt.compare(oldPassword, oldIndividual['password'], function(error, result) {
                                    if(error){ // bcrypt is unable to compare th password to the hashed password
                                        const jsonResponse = {error:error.message};
                                        console.log(jsonResponse);
                                        res.status(500).json(jsonResponse);
                                    } else if(result == false){ // the old password is not equals to the stored password
                                        const jsonResponse = {error:"The old password is not correct", request_body: req.body};
                                        console.log(jsonResponse);
                                        res.status(422).json(jsonResponse);
                                    } else {
                                        bcrypt.hash(newPassword ? newPassword : '', 10, (error, hash)=>{// we are hashing the new password
                                            if(error){
                                                const jsonResponse = {error:error.message};
                                                console.log(jsonResponse);
                                                res.status(500).json(jsonResponse);
                                            } else { 
                                                client.query('SELECT * FROM individual WHERE login=$1', [login])
                                                // we should ensure that the new login (if exists) will be unique
                                                    .then(result => {
                                                        if(result.rowCount > 0){
                                                            const jsonResponse = {error: "This login already exists", request_body: req.body};
                                                            console.log(jsonResponse);
                                                            res.status(409).json(jsonResponse);
                                                        } else {
                                                            const query = 'UPDATE agent SET name=$1, surname=$2, email=$3, phone_number=$4, login=$5, password=$6 WHERE id=$8';
                                                            const values = [
                                                                    name ? name:oldIndividual['name'],
                                                                    surname ? surname:oldIndividual['surname'],
                                                                    email ? email:oldIndividual['email'],
                                                                    phoneNumber ? phoneNumber:oldIndividual['phone_number'],
                                                                    login ? login:oldIndividual['login'],
                                                                    newPassword ? hash:oldIndividual['password'],
                                                                    id
                                                                ];
                                                                client.query(query, values)
                                                                    .then(() => {
                                                                        const jsonResponse = {message: 'Individual successfully updated'};
                                                                        console.log(jsonResponse);
                                                                        res.status(200).json(jsonResponse);
                                                                        client.end()
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
                                                    })
                                                    .catch(error=>{ 
                                                        const jsonResponse = {
                                                            error: error
                                                        };
                                                        console.log(jsonResponse);
                                                        res.status(500).json(jsonResponse);
                                                    });
                                            }
                                        });
                                    }
                                });
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
};

exports.delete_individual = (req, res, next)=>{
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_params: req.params};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                client.query('DELETE FROM individual WHERE id=$1', [id])
                    .then(result => {
                        if(result.rowCount == 0){
                            const jsonResponse = {error: "individual does not exist.", request_params: req.params};
                            console.log(jsonResponse);
                            res.status(404).json(jsonResponse);
                        } else {
                            const jsonResponse = {message:"individual successfuly deleted"};
                            console.log(jsonResponse);
                            res.status(200).json(jsonResponse);
                        }
                        
                        client.end()
                            .catch(error=>{ 
                                const jsonResponse = {
                                    error: error
                                }
                                console.log(jsonResponse)
                                res.status(500).json(jsonResponse) 
                            });
                        })
                    .catch(error=>{ 
                        const jsonResponse = {
                            error: error.message
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
};

exports.sign_up = (req, res, next)=>{
    const { name, surname, email, phoneNumber, login, password} =  req.body;
    const client = new Client(dbConfig);
    if(email && !emailRegex.test(email)) {
        const jsonResponse = {error: "Invalid email address", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(name === undefined) {
        const jsonResponse = {error:"'name' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(login === undefined) {
        const jsonResponse = {error:"'login' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(password === undefined) {
        const jsonResponse = {error:"'password' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        client.connect()
            .then(()=>{
                client.query("SELECT COUNT(*) FROM individual WHERE login=$1", [login])
                .then((result)=>{
                    if(result.rows[0].count > 0){
                        const jsonResponse = {error: "The login already exists"};
                        console.log(jsonResponse);
                        res.status(409).json(jsonResponse);

                        client.end().then().catch(error=>{ 
                            const jsonResponse = {
                                error: error
                            };
                            console.log(jsonResponse);
                            res.status(500).json(jsonResponse);
                        });
                    } else {
                        bcrypt.hash(password, 10, (error, hash)=>{
                            if(error){
                                const jsonResponse = {error:error.message};
                                console.log(jsonResponse);
                                res.status(500).json(jsonResponse);
                            } else {
                                const query = 'INSERT INTO individual(name, surname, email, phone_number, login, password) VALUES ($1, $2, $3, $4, $5, $6)';
                                const values = [name, surname, email, phoneNumber, login, hash];

                                client.query(query, values)
                                    .then(() => {
                                        const jsonResponse = {message:"New Individual created successfully"};
                                        console.log(jsonResponse);
                                        res.status(201).json(jsonResponse);
                                        client.end().then().catch(error=>{ 
                                            const jsonResponse = {
                                                error: error
                                            };
                                            console.log(jsonResponse);
                                            res.status(500).json(jsonResponse);
                                        });
                                    })
                                    .catch(error => {
                                        error.message = "Unable to add new individual to the database";
                                        const jsonResponse = {error:error.message};
                                        console.log(jsonResponse);
                                        res.status(500).json(jsonResponse);
                                    });
                            }
                        });
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
                    error: error.message
                };
                console.log(jsonResponse);
                res.status(500).json(jsonResponse);
            });

    }
};

exports.login = (req, res, next)=>{
    const { login, password } =  req.body;
    
    if(login === undefined){
        const jsonResponse = {error:"'login' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(password === undefined){
        const jsonResponse = {error:"'password' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }
    const client = new Client(dbConfig);
    client.connect()
        .then(() => {
            client.query('SELECT * FROM individual WHERE login=$1', [login])
                .then(result => {
                    if(result.rowCount > 0){
                        const individual = result.rows[0];
                        bcrypt.compare(password, individual['password'], (error, result) => {
                            if(result){
                                const token = jwt.sign({
                                    id: individual['id'],
                                    login: individual['login'],
                                    isAgent: false,
                                    isIndividual: true
                                }, 
                                process.env.JWT_KEY, 
                                {
                                    expiresIn: "1h"
                                }
                                );
                                const jsonResponse = {
                                    message:'connected successdully',
                                    token: token
                                };
                                console.log(jsonResponse);
                                res.status(200).json(jsonResponse);
                                client.end().then().catch(error=>{ 
                                    const jsonResponse = {
                                        error: error
                                    };
                                    console.log(jsonResponse);
                                    res.status(500).json(jsonResponse);
                                });
                            } else {
                                const jsonResponse = {error:'Invalid credentials'};
                                console.log(jsonResponse);
                                res.status(401).json(jsonResponse); // incorrect password
                                client.end().then().catch(error=>{ 
                                    const jsonResponse = {
                                        error: error
                                    };
                                    console.log(jsonResponse);
                                    res.status(500).json(jsonResponse);
                                });
                            }
                        });
                    } else {
                        const jsonResponse = {error: 'Invalid credentials', request_body: req.body};
                        console.log(jsonResponse);
                        res.status(401).json(jsonResponse); // individual not found
                        client.end().then().catch(error=>{ 
                            const jsonResponse = {
                                error: error
                            };
                            console.log(jsonResponse);
                            res.status(500).json(jsonResponse);
                        });
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
};
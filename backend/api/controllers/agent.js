const { emailRegex, dbConfig } = require("../constants");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

exports.agents_get_all = (req, res, next)=>{
    const client = new Client(dbConfig);
    client.connect()
        .then(() => {
            client.query('SELECT ag.id, ag.name, ag.surname, ag.email, ag.phone_number, ag.login, ag.is_admin, \
                                ci.city_hall_name, ci.address as city_hall_address, ci.po_box as city_hall_po_box, ci.phone_number as city_hall_phone_number, ci.email as city_hall_email, \
                                re.region_name \
                            FROM agent ag INNER JOIN city_hall ci \
                            ON ag.city_hall_id = ci.id INNER JOIN region re \
                            ON ci.region_id = re.id')
                .then((result)=>{
                    const jsonResponse = {
                        count: result.rowCount,
                        result: result.rows
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
}

exports.agents_get_all_agents_per_region = (req, res, next)=>{
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }

    const client = new Client(dbConfig);
    client.connect()
        .then(() => {
            client.query('SELECT ag.id, ag.name, ag.surname, ag.email, ag.phone_number, ag.login, ag.is_admin, \
                                ci.city_hall_name, ci.address as city_hall_address, ci.po_box as city_hall_po_box, ci.phone_number as city_hall_phone_number, ci.email as city_hall_email, \
                                re.region_name \
                            FROM agent ag INNER JOIN city_hall ci \
                            ON ag.city_hall_id = ci.id INNER JOIN region re \
                            ON ci.region_id = re.id WHERE re.id=$1', [id])
                .then((result)=>{
                    const jsonResponse = {
                        count: result.rowCount,
                        result: result.rows
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
}

exports.agents_get_agent = (req, res, next)=>{
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                client.query('SELECT ag.id, ag.name, ag.surname, ag.email, ag.phone_number, ag.login, ag.is_admin, \
                                    ci.city_hall_name, ci.address as city_hall_address, ci.po_box as city_hall_po_box, ci.phone_number as city_hall_phone_number, ci.email as city_hall_email, \
                                    re.region_name \
                                FROM agent ag INNER JOIN city_hall ci \
                                ON ag.city_hall_id = ci.id INNER JOIN region re \
                                ON ci.region_id = re.id \
                                WHERE ag.id=$1', [id])
                    .then((result)=>{
                        if(result.rowCount == 0){
                            const jsonResponse = {error: "Council agent not found", request_body: req.body};
                            console.log(jsonResponse);
                            res.status(404).json(jsonResponse);
                        } else {
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

exports.agents_patch_agent = (req, res, next)=>{ 
    const id = parseInt(req.params.id);
    const { name, surname, email, phoneNumber, login, oldPassword, newPassword, isAdmin, cityHallId} = req.body;
    
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
                    client.query('SELECT * FROM agent WHERE id=$1', [id])
                        .then(result => {
                            if(result.rowCount == 0){
                                const jsonResponse = {error:"Council agent does not exist", request_params: req.params};
                                res.status(404).json(jsonResponse);
                            } else {
                                const oldAgent = result.rows[0];
                                bcrypt.compare(oldPassword, oldAgent['password'], function(error, result) {
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
                                                client.query('SELECT * FROM agent WHERE login=$1', [login])
                                                // we should ensure that the new login (if exists) will be unique
                                                    .then(result => {
                                                        if(result.rowCount > 0){
                                                            const jsonResponse = {error: "This login already exists", request_body: req.body};
                                                            console.log(jsonResponse);
                                                            res.status(409).json(jsonResponse);
                                                        } else {
                                                            const query = 'UPDATE agent SET name=$1, surname=$2, email=$3, phone_number=$4, login=$5, password=$6, is_admin=$7, city_hall_id=$8 WHERE id=$9';
                                                            const values = [
                                                                    name ? name:oldAgent['name'],
                                                                    surname ? surname:oldAgent['surname'],
                                                                    email ? email:oldAgent['email'],
                                                                    phoneNumber ? phoneNumber:oldAgent['phone_number'],
                                                                    login ? login:oldAgent['login'],
                                                                    newPassword ? hash:oldAgent['password'],
                                                                    isAdmin !== undefined ? isAdmin:oldAgent['is_admin'],
                                                                    cityHallId ? cityHallId:oldAgent['city_hall_id'],
                                                                    id
                                                                ];
                                                                client.query(query, values)
                                                                    .then(() => {
                                                                        const jsonResponse = {message: 'Agent successfully updated'};
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

exports.agents_delete_agent = (req, res, next)=>{
    const id = parseInt(req.params.id);
    if(!Number.isInteger(id)){
        const jsonResponse = {error: "The 'id' parameter must be an integer", request_params: req.params};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                client.query('DELETE FROM agent WHERE id=$1', [id])
                    .then(result => {
                        if(result.rowCount == 0){
                            const jsonResponse = {error: "Council agent does not exist.", request_params: req.params};
                            console.log(jsonResponse);
                            res.status(404).json(jsonResponse);
                        } else {
                            const jsonResponse = {message:"Agent successfuly deleted"};
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

exports.agents_signup = (req, res, next)=>{
    const { name, surname, email, phoneNumber, password, isAdmin, cityHallId } =  req.body;
    const client = new Client(dbConfig);
    if(email === undefined) {
        const jsonResponse = {error:"'email' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(!emailRegex.test(email)) {
        const jsonResponse = {error: "Invalid email address", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(name === undefined) {
        const jsonResponse = {error:"'name' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(password === undefined) {
        const jsonResponse = {error:"'password' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else if(cityHallId === undefined) {
        const jsonResponse = {error:"'cityHallId' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        res.status(422).json(jsonResponse);
    } else {
        client.connect()
            .then(()=>{
                client.query('SELECT COUNT(*) FROM city_hall WHERE id=$1', [cityHallId])
                    .then( result => {
                            if(result.rows[0].count == 0){
                                const jsonResponse = {error: "Invalid cityHallId parameter", request_body: req.body};
                                console.log(jsonResponse);
                                res.status(422).json(jsonResponse);
                                
                                client.end()
                                    .catch(error=>{ 
                                        const jsonResponse = {
                                            error: error
                                        }
                                        console.log(jsonResponse)
                                        res.status(500).json(jsonResponse) 
                                    });
                            } else {
                                client.query("SELECT COUNT(*) FROM agent WHERE email=$1", [email])
                                    .then((result)=>{
                                        if(result.rows[0].count > 0){
                                            const jsonResponse = {error: "The email already exists"};
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
                                                    const query = 'INSERT INTO agent(name, surname, email, phone_number, login, password, is_admin, city_hall_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
                                                    const values = [name, surname, email, phoneNumber, email, hash,isAdmin === undefined ? false:isAdmin, cityHallId];
                    
                                                    client.query(query, values)
                                                        .then(() => {
                                                            const jsonResponse = {message:"New agent created successfully"};
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
                                                            error.message = "Unable to add new agent to the database";
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
                            }
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
                    error: error.message
                };
                console.log(jsonResponse);
                res.status(500).json(jsonResponse);
            });

    }
}

exports.agents_login = (req, res, next)=>{
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
            client.query('SELECT * FROM agent WHERE login=$1', [login])
                .then(result => {
                    if(result.rowCount > 0){
                        const agent = result.rows[0];
                        bcrypt.compare(password, agent['password'], (error, result) => {
                            if(result){
                                const token = jwt.sign({
                                    id: agent['id'],
                                    login: agent['login'],
                                    isAdmin: agent['is_admin'],
                                    isAgent: true,
                                    isIndividual: false
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
                        res.status(401).json(jsonResponse); // agent not found
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
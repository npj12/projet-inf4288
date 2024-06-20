const { dbConfig } = require("../constants");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

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
                                    isAgent: false,
                                    isIndividual: true,
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
                                                isAdmin: agent['is_admin'],
                                                isAgent: true,
                                                isIndividual: false,
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
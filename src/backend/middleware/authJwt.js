const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
const Role = db.role;
require('dotenv').config({
    path: __dirname + '/.env'
});

verifyToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    console.log(token)

    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        Role.find({
                _id: {
                    $in: user.roles
                }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        Role.find({
                _id: {
                    $in: user.roles
                }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator" || roles[i].name === "admin") { // admins should have 'god mode' and be able to log in where mods can too
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Require Moderator Role!"
                });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;

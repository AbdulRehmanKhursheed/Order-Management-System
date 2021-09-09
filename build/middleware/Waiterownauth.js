"use strict";
const jwteeee = require("jsonwebtoken");
module.exports = function (req, res, next) {
    console.log('in user auth');
    const currentuser = req.body;
    console.log(currentuser);
    const newtoken = req.header('Authorization');
    const token = newtoken && newtoken.split(' ')[1];
    if (!token)
        return res.send(401);
    try {
        const decoded = jwteeee.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        if (req.user.isWaiter) {
            next();
        }
        else {
            return res.send(401);
        }
    }
    catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

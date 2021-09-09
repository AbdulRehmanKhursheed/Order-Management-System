"use strict";
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    console.log('in auth');
    const newtoken = req.header('Authorization');
    const token = newtoken && newtoken.split(' ')[1];
    if (!token)
        return res.send(401);
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        if (req.user.isAdmin) {
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

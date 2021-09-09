"use strict";
const jwteee = require("jsonwebtoken");
module.exports = function (req, res, next) {
    console.log('in mix auth');
    const currentuser = req.body;
    console.log(currentuser);
    const newtoken = req.header('Authorization');
    const token = newtoken && newtoken.split(' ')[1];
    if (!token)
        return res.send(401);
    try {
        const decoded = jwteee.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        if (req.user.isWaiter == true || req.user.isAdmin == true) {
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

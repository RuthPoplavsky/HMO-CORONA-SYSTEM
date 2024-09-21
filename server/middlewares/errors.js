module.exports = function (err, req, res, next) {
    console.log("res: ", res);
    res.status(500).send(`${err}\n your request can not be completed, please try later...`);
}
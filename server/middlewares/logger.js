module.exports = function() {
    return function (req, res, next) {
        console.log(`Time: ${req.body}`);
        if (next) next();
    }
}
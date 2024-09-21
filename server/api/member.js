const express = require('express');
const router = express.Router();
const MemberRoute = require('../routes/member.route');
const memberRoute = new MemberRoute()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
const auth = require("../middlewares/auth");

router.use(auth);

router.get('/', async (req, res) => {
    res.send(await memberRoute.getAll())
})


router.get(`/:id`, async (req, res) => {
    res.send(await memberRoute.getById(req.params.id))
})


router.post(`/`, async (req, res) => {
    const existingMember = await memberRoute.validateById(req.body.id);
    if (existingMember) {
        return res.status(400).json({ error: 'Member already exists' });
    }
    else {
        res.send(await memberRoute.insert(req.body))
    }
})


router.put(`/:id`, async (req, res, next) => {
    user = req.body;
    const existingUser = await memberRoute.getById(req.params.id);

    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    extractedId = existingUser._id

    const result = await memberRoute.update(extractedId.toString(), user);

    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result);
    }

});

router.delete(`/:id`, async (req, res, next) => {

    const result = await memberRoute.delete(req.params.id);
    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result.message);
    }
});

router.use(errorMW);
// router.use(logger);

module.exports = router;
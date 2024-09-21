const express = require('express');
const router = express.Router();
const CoronaDataRoute = require('../routes/coronaData.route');
const coronaDataRoute = new CoronaDataRoute()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
const auth = require("../middlewares/auth");

router.use(auth);
router.use(errorMW);

// Get corona Data - Summary
router.get('/count-active-patients-last-month', async (req, res) => {
    try {
        const count = await coronaDataRoute.countActivePatientsLastMonth();
        res.status(200).send(count);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.get('/count-vaccinated-members', async (req, res) => {
    try {
        const count = await coronaDataRoute.countNotVaccinatedMembers();
        res.status(200).send(count.toString());
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    res.send(await coronaDataRoute.getAll())
})


router.get(`/:memberId`, async (req, res) => {
    res.send(await coronaDataRoute.getByMemberId(req.params.memberId))
})

router.post(`/`, async (req, res) => {
    const exists = await coronaDataRoute.validateById(req.body.id);
    if (exists) {
        return res.status(400).json({ error: "This member's corona data already exists" });
    }
    else {
        res.send(await coronaDataRoute.insert(req.body))
    }
})


router.put(`/:memberId`, async (req, res, next) => {
    data = req.body;
    memberId = req.params.memberId;
    const exists = await coronaDataRoute.getByMemberId(memberId);

    if (!exists) {
        return res.status(404).json({ error: "Member's corona data not found" });
    }

    const result = await coronaDataRoute.update(memberId, data);

    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result);
    }

});

router.delete(`/:memberId`, async (req, res, next) => {

    const result = await coronaDataRoute.delete(req.params.memberId);
    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result.message);
    }
});


// router.use(logger);

module.exports = router;
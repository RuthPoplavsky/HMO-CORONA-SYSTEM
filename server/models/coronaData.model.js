const Joi = require('joi');
const mongoose = require('mongoose');

const VACCINE_MANUFACTURERS = ["Pfizer", "Moderna", "Johnson & Johnson", "AstraZeneca",];

const vaccinationDateSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    manufacturer: { type: String, required: true, enum: Object.values(VACCINE_MANUFACTURERS),} 
});

const coronaDataSchema = new mongoose.Schema({
    memberId: { type: String, required: true, unique: true },
    vaccinationDates: { type: [vaccinationDateSchema], validate: [arrayLimit, '{PATH} exceeds the limit of 4'] }, 
    recoveryDate: { type: Date, required: true },
    positiveResultDate: { type: Date, required: true }
}, { collection: 'corona-data' });

const CoronaDataModel = mongoose.model('CoronaDataModel', coronaDataSchema);

const vaccinationDateJoiSchema = Joi.object({
    date: Joi.date().required(),
    manufacturer: Joi.string().valid(...VACCINE_MANUFACTURERS).required() 
});

const coronaDataJoiSchema = Joi.object({
    memberId: Joi.string().required(),
    vaccinationDates: Joi.array().items(vaccinationDateJoiSchema).max(4).required(),
    recoveryDate: Joi.date().required(),
    positiveResultDate: Joi.date().required()
});

const validateCoronaData = (coronaDataData) => {
    return coronaDataJoiSchema.validate(coronaDataData);
};

function arrayLimit(val) {
    return val.length <= 4;
}

module.exports = {
    CoronaDataModel: CoronaDataModel,
    validateCoronaData: validateCoronaData
};

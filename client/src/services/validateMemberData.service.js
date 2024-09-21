import Joi from 'joi';

const memberSchema = Joi.object({
    id: Joi.string().regex(/^\d{9}$/).required().messages({ 'string.pattern.base': 'ID must contain exactly 9 digits' }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.object({
        city: Joi.string().required(),
        street: Joi.string().required(),
        housenumber: Joi.string().required(),
    }), 
    birthDate: Joi.date().required(),
    phone: Joi.string().regex(/^0\d{1,2}-?\d{7}$/).required().messages({ 'string.pattern.base': 'Phone number must be in Israeli number phon' }),
    mobile: Joi.string().regex(/^05\d-?\d{7}$/).messages({ 'string.pattern.base': 'Mobile number must be in Israeli number phon' }).allow(null, ''),
    photo: Joi.string().allow(null, '')
});


const validateMemberData = (data) => {
    if (data._id) {
        delete data.__v
        delete data._id
        delete data.address._id
    }

    return memberSchema.validate(data);
};

export { validateMemberData };

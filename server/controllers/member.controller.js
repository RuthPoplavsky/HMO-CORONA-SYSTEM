const mongoose = require("mongoose");
const { connect } = require("../models/index");
const { MemberModel } = require("../models/member.model")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadPhoto = upload.single('photo');

module.exports = class MemberController {
    constructor() {
        connect();
    }

    async getAll() {
        let members = await MemberModel.find({}, { _id: 0 });
        return members;
    }

    async getById(memberId) {
        const member = await MemberModel.findOne({ id: memberId });
        if (!member) {
            return { error: 'Member not found' };
        }
        else {
            return { _id: member._id.toString(), ...member.toObject() }
        };

    }

    async insert(data) {
        try {
            if (data.photo) {
                const photoPath = data.photo ? data.photo.path : null;    
                data.photo = photoPath;
            }
            const createdMember = await MemberModel.create(data);
            const result = await MemberModel.findById(createdMember._id, { _id: 0 });
            return result;
        } catch (error) {
            return { error: ['Error inserting member',error] }
        }
    }


    async update(id, data) {
        if (!id || !data) {
            return { error: 'Missing required parameters' };
        }
        let result = await MemberModel.findByIdAndUpdate(id, data, { new: true, select: '-id' });
        return result;
    }


    async delete(id) {
        try {
            const existingMember = await this.getById(id);
            if (!existingMember) {
                return { error: 'Member not found' };
            }
            const extractedId = existingMember._id;
            await MemberModel.findByIdAndRemove(extractedId);

            return { message: 'Member deleted successfully' };
        } catch (error) {
            console.error('Error deleting member:', error);
            return { error: error.message };
        }
    }


    async validateById(id) {
        let result = await MemberModel.findOne({ id: id });
        return result;
    }
}
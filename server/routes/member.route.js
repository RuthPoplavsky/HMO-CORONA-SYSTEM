const myModule = require("../models/member.model");
const validMember = myModule.validateMember;
const CoronaDataController = require("../controllers/coroneData.controller");
const coronaDataController = new CoronaDataController()
const MemberController = require("../controllers/member.controller");
const controller = new MemberController()

module.exports = class MemberRoute {

    async getAll() {
        return await controller.getAll();
    }

    async getById(id) {
        return controller.getById(id)
    }

    async insert(data) {
        const validBody = validMember(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await controller.insert(data);
        }
    }

    async update(id, data) {
        let validBody = validMember(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await controller.update(id, data);
        }
    }

    async delete(id) {
        const res = await controller.delete(id)
        try { coronaDataController.delete(id); }
        catch {
            return res
        }

        return res;
    }

    async validateById(id) {
        return await controller.validateById(id);
    }

}
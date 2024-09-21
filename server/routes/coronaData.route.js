const myModule = require("../models/coronaData.model");
const validCoronaData = myModule.CoronaDataModel;
const CoronaDataController = require("../controllers/coroneData.controller");
const controller = new CoronaDataController()

module.exports = class CoronaDataRoute {

    async getAll() {
        return await controller.getAll();
    }

    async getByMemberId(memberId) {
        return controller.getByMemberId(memberId)
    }

    async insert(data) {
        const validBody = validCoronaData(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await controller.insert(data);
        }
    }

    async update(id, data) {
        let validBody = validCoronaData(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await controller.update(id, data);
        }
    }

    async delete(memberId) {
        return await controller.delete(memberId);
    }

    async validateById(id) {
        return await controller.validateById(id);
    }

    async countActivePatientsLastMonth() {
        return await controller.countActivePatientsLastMonth();
    }

    async countNotVaccinatedMembers() {
        return await controller.countNotVaccinatedMembers();
    }
}
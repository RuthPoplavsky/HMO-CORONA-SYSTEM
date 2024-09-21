import coronaDatasService from '../../services/coronaData.service';

const GetCoronaDataByMemberIdPage = async (memberId) => {
    
    try {
        const coronaDataByMemberId = await coronaDatasService.getCoronaDataByMemberId(memberId);
        return coronaDataByMemberId;
    } catch (error) {
        console.error('Error fetching corona data by member ID:', error);
        throw error; 
    }
};

export default GetCoronaDataByMemberIdPage;

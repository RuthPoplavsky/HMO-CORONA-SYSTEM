import memberService from '../../services/member.service';

const GetMemberByIdPage = async (memberId) => {
    try {
        const memberById = await memberService.getMemberById(memberId);
        return memberById;
    } catch (error) {
        console.error('Error fetching member by ID:', error);
        throw error; 
    }
};

export default GetMemberByIdPage;



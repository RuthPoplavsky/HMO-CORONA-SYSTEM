import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetMemberByIdPage from './member/getMemberById.page';
import GetCoronaDataByMemberIdPage from './coronaData/getCoronaDataByMemberId.page';
import MemberCard from '../components/memberCard/memberCard';
import ErrorModal from '../components/errorModal/errorModal';

const MembershipCardPage = () => {
    const [memberData, setMemberData] = useState(null);
    const [coronaData, setCoronaData] = useState(null);
    const { memberId } = useParams();
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const member = await GetMemberByIdPage(memberId);
                setMemberData(member);

                const coronaData = await GetCoronaDataByMemberIdPage(memberId);
                setCoronaData(coronaData);
            } catch (error) {
                setError("An error occurred. Please try again later");
                setShowModal(true);
            }
        }
        fetchData();
    }, [memberId]);

    return (
        <div>
            {(memberData !== null && coronaData !== null) &&
                <MemberCard member={memberData} coronaData={coronaData} />}
            <ErrorModal show={showModal} message={error} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default MembershipCardPage;

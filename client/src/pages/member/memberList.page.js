import React, { useEffect, useState } from 'react';
import memberService from '../../services/member.service';
import List from '../../components/list/list';
import ErrorModal from '../../components/errorModal/errorModal';

const MemberListPage = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const allMembers = await memberService.getAllMembers();
                setMembers(allMembers);
            }
            catch (error) {
                setError("An error occurred. Please try again later");
                setShowModal(true);
            }
        }
        fetchMembers();
    }, [members]);


    return (
        <div>
            <h1>Member List</h1>
            <div>
                {members.map(member => (
                    <List key={member.id} member={member} />
                ))}
            </div>
            <ErrorModal show={showModal} message={error} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default MemberListPage;

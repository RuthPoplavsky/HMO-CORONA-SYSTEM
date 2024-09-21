import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorModal from '../../components/errorModal/errorModal';
import GenericForm from '../../components/genericForm';
import memberService from '../../services/member.service';
import { validateMemberData } from '../../services/validateMemberData.service';

const UpdateMemberPage = () => {
    const { id } = useParams();
    const [memberData, setMemberData] = useState({
        id: id,
        firstName: '',
        lastName: '',
        address: {
            city: '',
            street: '',
            housenumber: ''
        },
        birthDate: '',
        phone: '',
        mobile: ''
    });
    const fieldsConfig = [
        { name: 'id', label: 'ID', type: 'text', placeholder: 'ID' },
        { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name' },
        { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name' },
        { name: 'address.city', label: 'City', type: 'text', placeholder: 'City' },
        { name: 'address.street', label: 'Street', type: 'text', placeholder: 'Street' },
        { name: 'address.housenumber', label: 'House Number', type: 'text', placeholder: 'House Number' },
        { name: 'birthDate', label: 'Birth Date', type: 'date', placeholder: '' },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Phone' },
        { name: 'mobile', label: 'Mobile', type: 'text', placeholder: 'Mobile' },
    ];

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const formattedDate = (date) => {
        if (date) {
            const date_ = new Date(date);
            return `${date_.getFullYear()}-${(date_.getMonth() + 1).toString().padStart(2, '0')}-${date_.getDate().toString().padStart(2, '0')}`;
        }
        return date;
    }

    useEffect(() => {
        async function fetchMember() {
            try {
                const member = await memberService.getMemberById(id);
                member.birthDate = member.birthDate ? formattedDate(member.birthDate) : '';
                setMemberData(member)
            } catch (error) {
                setErrors("An error occurred. Please try again later");
                setShowModal(true);
                return;
            }
        }
        fetchMember();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = validateMemberData(memberData);
        if (error) {
            setErrors(error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
            setShowModal(true);
            return;
        }
        try {
            await memberService.updateMember(id, memberData);
            console.log('Member updated successfully');
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);
    
            return () => clearTimeout(timer);
    
    
        } catch (error) {
            setErrors("An error occurred. Please try again later");
            setShowModal(true);
        }
    };

    return (
        <div>
            <h1>Update Member</h1>
            <GenericForm
                fields={fieldsConfig}
                formData={memberData}
                setFormData={setMemberData}
                onSubmit={handleSubmit}
            />
            <ErrorModal show={showModal} message={Object.values(errors).join(", ")} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default UpdateMemberPage;


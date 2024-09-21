import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateMemberData } from '../../services/validateMemberData.service';
import memberService from '../../services/member.service'
import ErrorModal from '../../components/errorModal/errorModal';
import GenericForm from '../../components/genericForm';

const AddMemberPage = () => {
    const [newMemberData, setNewMemberData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        address: {
            city: '',
            street: '',
            housenumber: ''
        },
        birthDate: '',
        phone: '',
        mobile: '',
        photo: null
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
        { name: 'photo', label: 'Photo', type: 'file' }
    ];
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = validateMemberData(newMemberData);
        if (error) {
            setErrors(error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
            setShowModal(true);
            return;
        }
        setErrors({});
        const formData = new FormData();
        Object.entries(newMemberData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await memberService.addMember(newMemberData);
        console.log('Form submitted:', newMemberData);
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    };

    return (
        <div>
            <h1>Add Member</h1>
            <GenericForm
                fields={fieldsConfig}
                formData={newMemberData}
                setFormData={setNewMemberData}
                onSubmit={handleSubmit}
                handleFileChange={(e) => setNewMemberData({ ...newMemberData, photo: e.target.files[0] })}
                />
            <ErrorModal show={showModal} message={Object.values(errors).join(", ")} onClose={() => setShowModal(false)} />        </div>
    );
};

export default AddMemberPage;

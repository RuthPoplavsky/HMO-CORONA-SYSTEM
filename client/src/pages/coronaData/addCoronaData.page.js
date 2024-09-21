import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/errorModal/errorModal';
import GenericButton from '../../components/genericButton';
import GenericForm from '../../components/genericForm';
import { VACCINE_MANUFACTURERS } from '../../constant/vaccineManufacturers';
import coronaDatasService from '../../services/coronaData.service';
import { validateCoronaData } from '../../services/validateCoronaData.service';

const AddCoronaDataPage = () => {
    const [newCoronaData, setNewCoronaData] = useState({
        memberId: '',
        vaccinationDates: [{ date: '', manufacturer: '' }],
        recoveryDate: '',
        positiveResultDate: ''
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const fieldsConfig = [
        {
            name: 'memberId',
            label: 'Member ID',
            type: 'text',
            placeholder: 'Enter Member ID',
            path: 'memberId',
        },
        {
            name: 'recoveryDate',
            label: 'Recovery Date',
            type: 'date',
            placeholder: '',
            path: 'recoveryDate',
        },
        {
            name: 'positiveResultDate',
            label: 'Positive Result Date',
            type: 'date',
            placeholder: '',
            path: 'positiveResultDate',
        },
        ...newCoronaData.vaccinationDates.flatMap((date, index) => ([
            {
                name: `vaccinationDates[${index}].date`,
                label: `Vaccination Date ${index + 1}`,
                type: 'date',
                placeholder: '',
                path: `vaccinationDates[${index}].date`,
            },
            {
                name: `vaccinationDates[${index}].manufacturer`,
                label: `Manufacturer ${index + 1}`,
                type: 'select',
                options: VACCINE_MANUFACTURERS.map(manufacturer => ({ value: manufacturer, label: manufacturer })),
                path: `vaccinationDates[${index}].manufacturer`,
            }
        ])),
    ];
    const addVaccinationDate = () => {
        if (newCoronaData.vaccinationDates.length < 4) {
            setNewCoronaData(prevState => ({
                ...prevState,
                vaccinationDates: [...prevState.vaccinationDates, { date: '', manufacturer: '' }]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = validateCoronaData(newCoronaData);
        if (error) {
            setErrors(error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
            setShowModal(true);
            return;
        }
        setErrors({});
        await coronaDatasService.addCoronaData(newCoronaData);
        console.log('Form submitted:', newCoronaData);
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);

    };


    return (
        <div>
            <h1>Add Corona Data</h1>
            <div style={{ width: "50%", margin: "auto" }}>
                <GenericForm
                    fields={fieldsConfig}
                    formData={newCoronaData}
                    setFormData={setNewCoronaData}
                    onSubmit={handleSubmit}
                />
                <GenericButton style={{ margin: "1vh" }} variant="secondary" onClick={addVaccinationDate} label={"Add Vaccination Date"} />
            </div>
            <ErrorModal show={showModal} message={Object.keys(errors).map((key, index) => (
                <div key={index}>{errors[key]}</div>
            ))} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default AddCoronaDataPage;

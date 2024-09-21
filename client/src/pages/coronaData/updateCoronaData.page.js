import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorModal from '../../components/errorModal/errorModal';
import GenericButton from '../../components/genericButton';
import GenericForm from '../../components/genericForm';
import { VACCINE_MANUFACTURERS } from '../../constant/vaccineManufacturers';
import coronaDatasService from '../../services/coronaData.service';
import { validateCoronaData } from '../../services/validateCoronaData.service';

const UpdateCoronaDataPage = () => {
    const { memberId } = useParams();
    const [updatedCoronaData, setUpdatedCoronaData] = useState({
        memberId: memberId,
        vaccinationDates: [{ date: '', manufacturer: '' }],
        recoveryDate: '',
        positiveResultDate: ''
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const isLoading = useRef(false)
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
        ...updatedCoronaData.vaccinationDates.flatMap((date, index) => ([
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

    const formattedDate = (date) => {
        if (date) {
            const date_ = new Date(date);
            return `${date_.getFullYear()}-${(date_.getMonth() + 1).toString().padStart(2, '0')}-${date_.getDate().toString().padStart(2, '0')}`;
        }
        return date;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await coronaDatasService.getCoronaDataByMemberId(memberId);
                data.recoveryDate = data.recoveryDate ? formattedDate(data.recoveryDate) : '';
                data.positiveResultDate = data.positiveResultDate ? formattedDate(data.positiveResultDate) : '';
                data.vaccinationDates.forEach(vaccinationDate => {
                    vaccinationDate.date = vaccinationDate.date ? formattedDate(vaccinationDate.date) : '';
                    delete vaccinationDate._id;
                });
                setUpdatedCoronaData(data);
            } catch (error) {
                setErrors(["Failed to fetch corona data"])
                setShowModal(true);
                return;
            }
        };

        fetchData();
    }, [memberId]);

    const addVaccinationDate = () => {
        if (updatedCoronaData.vaccinationDates.length < 4) {
            setUpdatedCoronaData(prevState => ({
                ...prevState,
                vaccinationDates: [...prevState.vaccinationDates, { date: '', manufacturer: '' }]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = validateCoronaData(updatedCoronaData);
        if (error) {
            setErrors(error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
            setShowModal(true);
            return;
        }
        setErrors({});
        try {
            await coronaDatasService.updateCoronaData(memberId, updatedCoronaData);
            console.log('Corona data updated successfully', updatedCoronaData);
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => clearTimeout(timer);


        } catch (error) {
            setErrors(['Error updating corona data'])
            setShowModal(true);
            console.error('Error updating corona data:', error);
        }
    };

    return (
        <div>
            <h1>Update Corona Data</h1>
            {isLoading && <div>
                <GenericForm
                    fields={fieldsConfig}
                    formData={updatedCoronaData}
                    setFormData={setUpdatedCoronaData}
                    onSubmit={handleSubmit}
                />
                <GenericButton style={{ margin: "1vh" }} variant="secondary" onClick={addVaccinationDate} label={"Add Vaccination Date"} />
            </div>
            }
            <ErrorModal show={showModal} message={Object.values(errors).join(', ')} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default UpdateCoronaDataPage;

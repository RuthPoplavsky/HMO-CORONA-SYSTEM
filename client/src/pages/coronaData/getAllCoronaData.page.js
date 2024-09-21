import React, { useEffect, useState } from 'react';
import coronaDataService from '../../services/coronaData.service';
import ErrorModal from '../../components/errorModal/errorModal';
import GenericCard from '../../components/genericCard';
import { useNavigate } from 'react-router-dom';

const GetAllcoronaDataPage = () => {
    const [coronaData, setcoronaData] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMembers() {
            try {
                const allcoronaData = await coronaDataService.getAllCoronaData();
                setcoronaData(allcoronaData);
                if (allcoronaData === "") {
                    setError("Enter the system password before proceeding");
                    setShowModal(true);
                }
            } catch (err) {
                setError("An error occurred. Please try again later");
                setShowModal(true);
            }
        }
        fetchMembers();
        const timer = setTimeout(() => {
            navigate('/'); 
        }, 5000);

        return () => clearTimeout(timer);
// eslint-disable-next-line
    }, [coronaData]);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '20px' }}>Corona Data for All Members:</h1>
            {coronaData.map((coronaData, index) => (
                <GenericCard
                    key={index}
                    title={`Member ID: ${coronaData.memberId}`}
                    style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
                    content={
                        <div>
                            <div><strong>Recovery Date:</strong> {coronaData.recoveryDate}</div>
                            <div><strong>Positive Result Date:</strong> {coronaData.positiveResultDate}</div>
                            <div><strong>Vaccination Dates:</strong></div>
                            <ul>
                                {coronaData.vaccinationDates.map((vaccination, index) => (
                                    <li key={index} style={{ marginLeft: '20px' }}>
                                        <span><strong>Date:</strong> {vaccination.date}</span>
                                        <span><strong>Manufacturer:</strong> {vaccination.manufacturer}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    />
            ))}
            <ErrorModal show={showModal} message={error} onClose={() => setShowModal(false)} />

        </div>
    );
};

export default GetAllcoronaDataPage;

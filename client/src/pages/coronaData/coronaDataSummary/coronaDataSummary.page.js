import GenericButton from "../../../components/genericButton";
import ErrorModal from "../../../components/errorModal/errorModal";
import React from 'react';
import { useState } from "react";
import MyLineChart from "./lineChart";
import coronaDataService from "../../../services/coronaData.service";

const CoronaDataSummaryPage = () => {

    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showCountNotVaccinatedMembers, setShowCountNotVaccinatedMembers] = useState(false);
    const [activePatients, setActivePatients] = useState([])
    const [countNotVaccinatedMembers, setCountNotVaccinatedMembers] = useState()


    const generateLast30DaysArray = () => {
        const dates = [];
        const now = new Date();
        for (let i = 0; i <= 30; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);
            dates.push(date);
        }
        return dates.reverse();
    };

    const last30Days = generateLast30DaysArray();
    const activePatientsLastMonth = async () => {
        try {
            const rawData = await coronaDataService.getCountActivePatientsLastMonth();
            const data = last30Days.map(date => {
                const dateString = date.toISOString().split('T')[0];
                return {
                    date: dateString,
                    value: rawData[dateString] || 0
                };
            });
            setActivePatients(data)
            setShowChart(!showChart);
        } catch (error) {
            console.error('Error fetching corona data by member ID:', error);
            throw error;
        }
    }

    const numNotBeenVaccinated = async () => {
        try {

            const num = await coronaDataService.getCountNotVaccinatedMembers();
            setCountNotVaccinatedMembers(num)
            setShowCountNotVaccinatedMembers(!showCountNotVaccinatedMembers)
        } catch (error) {
            console.error('Error fetching corona data by member ID:', error);
            throw error;
        }
    }

    return (
        <div className="corona-data-summary-container">
            <h1>Get Corona Data Summary</h1>
            <GenericButton variant="secondary" onClick={activePatientsLastMonth} label="Get a count of active patients last month">
                {showChart ? 'Hide Chart' : 'Show Chart'}
            </GenericButton>
            {showChart && <MyLineChart data={activePatients} />}
            <GenericButton variant="secondary" onClick={numNotBeenVaccinated} label="get the amount of POS members how have not been vaccinated ay all">
                {showCountNotVaccinatedMembers ? 'Hide NumNotBeenVaccinated' : 'Show NumNotBeenVaccinated'}
            </GenericButton>
            <br></br>
            {showCountNotVaccinatedMembers && countNotVaccinatedMembers}
            <ErrorModal show={showModal} message={error} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default CoronaDataSummaryPage